import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IPayosService } from "../../../../Infrastructure/Services/Payment/IPayosService";
import { PayosModel } from "../../../../Infrastructure/Services/Payment/Model/PayosModel";
import PayosService from "../../../../Infrastructure/Services/Payment/PayosService";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import {
  generateTimeStamp,
  hmacSHA256,
} from "../../../Common/Helpers/stringUtils";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
require("dotenv").config();

const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY;
const API_SAVE_ORDER_ENDPOINT = process.env.API_SAVE_ORDER_ENDPOINT;

export async function BuySubscriptionHandler(data: any) {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  const payosService: IPayosService = new PayosService();
  let orderCodeWhenError: string = "";
  try {
    const { userId, subscriptionId } = data;
    const userQueryData = {
      userId: userId,
      isDelete: false,
      isActive: true,
    }
    const user: any = await unitOfWork.userRepository.getUserById(userQueryData);
    if(user.subscriptionId == subscriptionId) throw new CoreException(StatusCodeEnums.Conflict_409, "User already purchase this subscription");
    
    const subscriptionQuery = {
      subscriptionId: subscriptionId,
      isDelete: false,
      isActive: true,
    };
    const subscriptionWithBase: any =
      await unitOfWork.subscriptionRepository.GetSubscriptionById(
        subscriptionQuery
      );
    if(subscriptionWithBase.isDefault) throw new CoreException(StatusCodeEnums.InternalServerError_500, "Can not purchase this because it is free");
    const subscription = {
      id: subscriptionWithBase._id,
      name: subscriptionWithBase.name,
      price: subscriptionWithBase.price,
      quantity: 1,
      description: subscriptionWithBase.description,
    };
    const orderCode = parseInt(await generateTimeStamp());
    const amount = subscription.price;
    const description = `Purchase subscription ${subscription.name}`;
    const cancelUrl = `${API_SAVE_ORDER_ENDPOINT}`;
    const returnUrl = `${API_SAVE_ORDER_ENDPOINT}`;
    const expiredAt = parseInt(await generateTimeStamp()) + 10 * 60;
    const hashString = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
    const signature = await hmacSHA256(PAYOS_CHECKSUM_KEY, hashString);
    const payosData: PayosModel = {
      orderCode: orderCode,
      amount: amount,
      description: description,
      items: [subscription],
      cancelUrl: cancelUrl,
      returnUrl: returnUrl,
      expiredAt: expiredAt,
      signature: signature,
    };

    const result: any = await payosService.PurchaseWithPayos(
      payosData
    );
    orderCodeWhenError = result.paymentLinkId
    if (!result)
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        result.desc
      );
    
    const responseData = {
      subscription: subscriptionWithBase,
      gatewayData: result,
    };
    return responseData;
  } catch (error: any) {
    if(orderCodeWhenError != '') {
      await payosService.PayosGateWayCancelPayment(orderCodeWhenError, "System error");
    }
    throw new CoreException(
      StatusCodeEnums.InternalServerError_500,
      error.message
    );
  }
}

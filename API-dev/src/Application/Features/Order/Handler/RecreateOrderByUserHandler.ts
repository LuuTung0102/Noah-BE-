import mongoose from "mongoose";
import { OrderStatusEnums } from "../../../../Domain/Enums/OrderStatusEnums";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import {
  generateTimeStamp,
  hmacSHA256,
} from "../../../Common/Helpers/stringUtils";
import { PayosModel } from "../../../../Infrastructure/Services/Payment/Model/PayosModel";
import { IPayosService } from "../../../../Infrastructure/Services/Payment/IPayosService";
import PayosService from "../../../../Infrastructure/Services/Payment/PayosService";
require("dotenv").config();

const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY;
const API_SAVE_ORDER_ENDPOINT = process.env.API_SAVE_ORDER_ENDPOINT;
export async function RecreateOrderByUserHandler(data: any) {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  const payosService: IPayosService = new PayosService();
  let orderIdIfCancel: string = "";
  try {
    const session = await unitOfWork.startTransaction();
    const { userId, orderId } = data;
    const query = {
      userId: new mongoose.Types.ObjectId(userId),
      orderId: orderId,
      isPaid: false,
      isDelete: false,
      isActive: true,
    };
    const order: any =
      await unitOfWork.orderRepository.FilterOrderByBothUserIdAndOrderId(query);
    if (order.status == OrderStatusEnums.PENDING)
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        "Can not recreate pending order"
      );
    const subscription = order.subscription[0];
    const orderCode = parseInt(await generateTimeStamp());
    const status = OrderStatusEnums.PENDING;
    const amount = order.amount;
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
    const result: any = await payosService.PurchaseWithPayos(payosData);
    orderIdIfCancel = result.paymentLinkId;
    if (!result)
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        result.desc
      );
    
    // const updateOrderData = {
    //     orderId: result.data.id,
    //     orderCode: orderCode,
    //     isPaid: result.data.isPaid,
    //     status: result.data.status,
    //     qrLink: result.data.checkoutUrl ,
    // }
    order.orderId = result.paymentLinkId;
    order.orderCode = orderCode;
    order.isPaid = false;
    order.status = result.status;
    order.qrLink = result.checkoutUrl
    const queryOrderData = {
        _id: order._id,
        isActive: true,
        isDelete: false,
    };
    const returnResult = await unitOfWork.orderRepository.UpdateOrder(queryOrderData, order, session);
    console.log(returnResult);
    const responseData = {
      subscription: subscription,
      gatewayData: result.data,
    };
    await unitOfWork.commitTransaction();
    return responseData;
  } catch (error: any) {
    await payosService.PayosGateWayCancelPayment(orderIdIfCancel, "System error")
    await unitOfWork.abortTransaction();
    return new CoreException(
      StatusCodeEnums.InternalServerError_500,
      error.message
    );
  }
}

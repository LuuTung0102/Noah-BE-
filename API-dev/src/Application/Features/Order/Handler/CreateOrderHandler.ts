import mongoose from "mongoose";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IPayosService } from "../../../../Infrastructure/Services/Payment/IPayosService";
import PayosService from "../../../../Infrastructure/Services/Payment/PayosService";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";

export async function CreateOrderHandler(data: any) {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  const payosService: IPayosService = new PayosService();
  let orderCodeWhenError: string = "";
  try {
    const session = await unitOfWork.startTransaction();
    const { userId, orderId, subscription, orderCode, orderDescription, checkoutUrl } = data;
    orderCodeWhenError = orderId;
    const subscriptionQueryData = {
      isDelete: false,
      isActive: true,
      subscriptionId: subscription.id
    }
    const subscriptionWithBase: any = await unitOfWork.subscriptionRepository.GetSubscriptionById(subscriptionQueryData);
    const createOrderData = {
      userId: userId,
      orderId: orderId,
      orderCode: orderCode,
      description: orderDescription,
      amount: subscriptionWithBase.price,
      qrLink: checkoutUrl,
      subscription: subscriptionWithBase,
      subscriptionId: subscriptionWithBase.id,
    };
    await unitOfWork.orderRepository.CreateOrder(createOrderData, session);
    
    await unitOfWork.commitTransaction();
  } catch (error: any) {
    if(orderCodeWhenError != '') {
      await payosService.PayosGateWayCancelPayment(orderCodeWhenError, "System error");
    }
    await unitOfWork.abortTransaction();
    throw new CoreException(
      StatusCodeEnums.InternalServerError_500,
      error.message
    );
  }
}

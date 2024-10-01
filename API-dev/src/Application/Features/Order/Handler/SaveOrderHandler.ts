import { IUnitOfWork } from './../../../Persistences/IRepositories/IUnitOfWork';
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { CreateOrderCode } from "../../../Common/Helpers/stringUtils";
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { OrderStatusEnums } from '../../../../Domain/Enums/OrderStatusEnums';
import PayosResponseModel from '../../../../Infrastructure/Services/Payment/Model/PayosResponseModel';

export async function SaveOrderHandler(data: any) {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { orderId, isCancel, status, orderCode } = data;
    const orderQueryData = {
      orderCode: orderCode,
      isActive: true,
      isDelete: false,
    };
    const order: any = await unitOfWork.orderRepository.FilterOrderByOrderCode(orderQueryData)
    const userId = order.userId;
    order.status = status;
    if(!isCancel) {
      order.isPaid = true;
    };
    const updateOrderQueryData = {
      _id: order._id,
      isActive: true,
      isDelete: false,
    };
    const result: any = await unitOfWork.orderRepository.UpdateOrder(updateOrderQueryData, order, session);
    if(status == OrderStatusEnums.CANCEL) return new PayosResponseModel("Cancelled", StatusCodeEnums.OK_200, order);
    const subscriptionQueryData = {
      subscriptionId: order.subscriptionId[0],
      isActive: true,
      isDelete: false,
    };
    const subscription: any = await unitOfWork.subscriptionRepository.GetSubscriptionById(subscriptionQueryData);
    const userQueryData = {
      isActive: true,
      isDelete: false,
      userId: userId,
    }
    const user: any = await unitOfWork.userRepository.getUserById(userQueryData);
    user.subscription = subscription;
    user.subscriptionId = subscription._id;

    let now = new Date(Date.now());

    user.startDateSubscription = Date.now();
    if(!subscription.isDefault) {
      if(subscription.isMonthly) {
        user.endDateSubscription = now.setMonth(now.getMonth() + subscription.unit)
      } else {
        user.endDateSubscription = now.setFullYear(now.getFullYear() + subscription.unit);
      }
    }
    
    await unitOfWork.userRepository.updateUserById(userId, user, session);
    console.log(result);
    await unitOfWork.commitTransaction();
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(
      StatusCodeEnums.InternalServerError_500,
      error.message
    );
  }
}

import mongoose from "mongoose";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { OrderStatusEnums } from "../../../../Domain/Enums/OrderStatusEnums";
import { IPayosService } from "../../../../Infrastructure/Services/Payment/IPayosService";
import PayosService from "../../../../Infrastructure/Services/Payment/PayosService";
import CancelOrderByUserResponse from "../Response/CancelOrderByUserResponse";

export async function CancelOrderByUserHandler(data: any) {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    const payosService: IPayosService = new PayosService();
    try {
        const {userId, orderId, cancellationReason} = data;
        const query = {
            userId: new mongoose.Types.ObjectId(userId),
            orderId: orderId,
            isDelete: false,
            isActive: true,
        }
        const order: any = await unitOfWork.orderRepository.FilterOrderByBothUserIdAndOrderId(query);
        if(!order) return new CoreException(StatusCodeEnums.InternalServerError_500, "Order not found");
        if(order.status == OrderStatusEnums.PAID || order.isPaid == true) return new CoreException(StatusCodeEnums.InternalServerError_500, "This order has been paid already")
        const result: any = await payosService.PayosGateWayCancelPayment(order.orderId, cancellationReason);
        return new CancelOrderByUserResponse("Successful", StatusCodeEnums.OK_200, result.data);
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}
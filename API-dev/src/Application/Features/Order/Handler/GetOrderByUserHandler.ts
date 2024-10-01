import mongoose, { Types } from "mongoose";
import { OrderWithBase } from "./../../../../Domain/Entities/OrderEntites";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import GetOrderByUserResponse from "../Response/GetOrderByUserResponse";
import { IPayosService } from "../../../../Infrastructure/Services/Payment/IPayosService";
import PayosService from "../../../../Infrastructure/Services/Payment/PayosService";
import { OrderStatusEnums } from "../../../../Domain/Enums/OrderStatusEnums";

export async function GetOrderByUserHandler(
  data: any
): Promise<GetOrderByUserResponse | CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  const payosService: IPayosService = new PayosService();
  try {
    const { userId } = data;
    const query = {
      userId: new mongoose.Types.ObjectId(userId),
      isDelete: false,
      isActive: true,
    };
    const order: any = await unitOfWork.orderRepository.GetOrderByUserId(query);
    const newOrder: any[] = [];
      for(const orderx of order){
        try {
          const session = await unitOfWork.startTransaction();
          if(orderx.status == OrderStatusEnums.EXPIRED) await payosService.PayosGateWayCancelPayment(orderx.orderId, "Time expired");
          let gateway: any = await payosService.PayosGateWayGetPaymentLink(
            orderx.orderId
          );
          let queryData = {
            _id: orderx._id,
            isActive: true,
            isDelete: false,
          };
          orderx.status = gateway.data.status;
          if (gateway.data.status == OrderStatusEnums.PAID)
            orderx.isPaid = true;
          await unitOfWork.orderRepository.UpdateOrder(
            queryData,
            orderx,
            session
          );
          await unitOfWork.commitTransaction();
          newOrder.push(orderx);
        } catch (error: any) {
          await unitOfWork.abortTransaction();
          return new CoreException(
            StatusCodeEnums.InternalServerError_500,
            error.message
          );
        }
      };
    console.log(newOrder);
    return new GetOrderByUserResponse(
      "Successful",
      StatusCodeEnums.OK_200,
      newOrder
    );
  } catch (error: any) {
    return new CoreException(
      StatusCodeEnums.InternalServerError_500,
      error.message
    );
  }
}

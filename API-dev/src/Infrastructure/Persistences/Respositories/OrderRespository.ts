import { OrderWithBase } from './../../../Domain/Entities/OrderEntites';
import { ClientSession } from "mongoose";
import { CoreException } from "../../../Application/Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../Domain/Enums/StatusCodeEnums";
import { IOrderRepository } from "../../../Application/Persistences/IRepositories/IOrderRepository";

export default class OrderRepository implements IOrderRepository {
    async CreateOrder(data: any, session: ClientSession): Promise<Object | CoreException> {
        try {
            const result: any = await OrderWithBase.create([data], {session});
            return result;
        } catch (error :any ) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
    async FilterOrderByOrderCode(queryData: any): Promise<typeof OrderWithBase | CoreException> {
        try {
            const query: any = { 
                orderCode: queryData.orderCode,
                isActive: queryData.isActive,
                isDelete: queryData.isDelete,
            };
            const result: any = await OrderWithBase.findOne(query);
            return result;
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
    
    async UpdateOrder(queryData: any, updateData: any, session: ClientSession): Promise<Object | CoreException> {
        try {
            const result: any = await OrderWithBase.updateOne(queryData, updateData, {session});
            return result;
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
    async GetOrderByUserId(query: any): Promise<Array<typeof OrderWithBase> | CoreException> {
        try {
            const result: any = await OrderWithBase.find(query);
            return result;
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
    async FilterOrderByBothUserIdAndOrderId(query: any): Promise<typeof OrderWithBase | CoreException> {
        try {
            const result: any = await OrderWithBase.findOne(query);
            return result;
        } catch (error: any) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}
import { ClientSession } from "mongoose";
import { CoreException } from "../../Common/Exceptions/CoreException";
import { OrderWithBase } from "../../../Domain/Entities/OrderEntites";

export interface IOrderRepository {
    CreateOrder(data: any, session: ClientSession): Promise<Object | CoreException>;
    FilterOrderByOrderCode(queryData: any): Promise<typeof OrderWithBase | CoreException>;
    UpdateOrder(queryData: any, updateData: any, session: ClientSession): Promise<Object | CoreException>;
    GetOrderByUserId(query: any): Promise<Array<typeof OrderWithBase> | CoreException>;
    FilterOrderByBothUserIdAndOrderId(query: any): Promise<typeof OrderWithBase | CoreException>;
}
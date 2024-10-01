import { ClientSession } from "mongoose";
import { CoreException } from "../../Common/Exceptions/CoreException";
import { SubscriptionWithBase } from "../../../Domain/Entities/SubscriptionEntities";

export interface ISubscriptionRepository {
    CreateSubscription(createItemData: any, session: ClientSession): Promise<typeof SubscriptionWithBase | CoreException>;
    GetSubscriptionById(queryData: any): Promise<typeof SubscriptionWithBase | CoreException>;
    GetSubscriptionDefault(query: any): Promise<typeof SubscriptionWithBase | CoreException>;
}
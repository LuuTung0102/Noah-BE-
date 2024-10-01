import mongoose, { ClientSession } from "mongoose";
import { CoreException } from "../../../Application/Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../Domain/Enums/StatusCodeEnums";
import { SubscriptionWithBase } from "../../../Domain/Entities/SubscriptionEntities";

export default class SubscriptionRepository {
    async CreateSubscription(createItemData: any, session: ClientSession): Promise<typeof SubscriptionWithBase | CoreException> {
        try {
            const subscriptionWithBase: any = await SubscriptionWithBase.create([createItemData], {session}); 
            return subscriptionWithBase;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
    async GetSubscriptionById(queryData: any): Promise<typeof SubscriptionWithBase | CoreException> {
        try {
            const query = {
                _id: new mongoose.Types.ObjectId(queryData.subscriptionId),
                isActive: queryData.isActive,
                isDelete: queryData.isDelete,
            };
            const subscriptionWithBase: any = await SubscriptionWithBase.findOne(query)
            return subscriptionWithBase;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
    async GetSubscriptionDefault(query: any): Promise<typeof SubscriptionWithBase | CoreException> {
        try {
            const subscriptionWithBase: any = await SubscriptionWithBase.findOne(query);
            return subscriptionWithBase;
        } catch (error: any) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
        }
    }
}
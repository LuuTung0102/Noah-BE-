import { IPayosService } from './../../Infrastructure/Services/Payment/IPayosService';
import { Request, Response } from "express";
import { StatusCodeEnums } from "../../Domain/Enums/StatusCodeEnums";
import { CreateSubscriptionRequest } from "../../Application/Features/Subcription/Request/CreateSubcriptionRequest";
import { CreateSubcriptionHandler } from "../../Application/Features/Subcription/Handler/CreateSubcriptionHandler";
import { GetSubcriptionRequest } from "../../Application/Features/Subcription/Request/GetSubcriptionRequest";
import { GetSubcriptionHandler } from "../../Application/Features/Subcription/Handler/GetSubcriptionHandler";
import { PayosRequest } from "../../Infrastructure/Services/Payment/Model/PayosRequest";
import PayosService from '../../Infrastructure/Services/Payment/PayosService';
import { OrderStatusEnums } from '../../Domain/Enums/OrderStatusEnums';
import { CreateOrderHandler } from '../../Application/Features/Order/Handler/CreateOrderHandler';
import { BuySubscriptionRequest } from '../../Application/Features/Subcription/Request/BuySubscriptionRequest';
import { BuySubscriptionHandler } from '../../Application/Features/Subcription/Handler/BuySubscriptionHandler';

export default class SubscriptionController {

    async CreateSubscription(req: Request<any, any, CreateSubscriptionRequest>, res: Response) {
        // #swagger.description = "Create new subscription"
        // #swagger.tags = ["Subscriptions"] 
        try {
            const {description, name, price, imagePath, isDefault, isMonthly, unit} = req.body;
            const data = {
                description: description,
                name: name,
                price: price,
                imagePath: imagePath,
                isDefault: isDefault,
                isMonthly: isMonthly,
                unit: unit,
            }
            const result: any = await CreateSubcriptionHandler(data);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }
    async GetSubscriptionById(req: Request<any, any, GetSubcriptionRequest>, res: Response) {
        // #swagger.description = "Get SubscriptionById"
        // #swagger.tags = ["Subscriptions"]
        try {
            const {subscriptionId} = req.params;
            const data = { 
                subscriptionId: subscriptionId
            };
            const result: any = await GetSubcriptionHandler(data);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }

    async BuySubscription(req: Request<any, any, BuySubscriptionRequest>, res: Response) {
        // #swagger.description = "Buy subscription"
        // #swagger.tags = ["Subscriptions"]
        try {
            const {subscriptionId} = req.params;
            const userId = (req as any).user.userId;
            const data = { 
                subscriptionId: subscriptionId,
                userId: userId,
            };

            const result: any = await BuySubscriptionHandler(data);
            
            const orderData = {
                userId: userId,
                orderId: result.gatewayData.paymentLinkId,
                subscription: result.subscription,
                orderCode: result.gatewayData.orderCode,
                orderDescription: result.gatewayData.description,
                checkoutUrl: result.gatewayData.checkoutUrl
            }
            await CreateOrderHandler(orderData);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }
} 
import { RecreateOrderByUserRequest } from './../../Application/Features/Order/Request/RecreateOrderByUser';
import { SaveOrderHandler } from '../../Application/Features/Order/Handler/SaveOrderHandler';
import { Request, Response } from 'express';
import { SaveOrderRequest } from '../../Application/Features/Order/Request/SaveOrderRequest';
import { GetOrderByUserHandler } from '../../Application/Features/Order/Handler/GetOrderByUserHandler';
import { GetOrderByUserRequest } from '../../Application/Features/Order/Request/GetOrderByUserRequest';
import { CancelOrderByUserRequest } from '../../Application/Features/Order/Request/CancelOrderByUserRequest';
import { CancelOrderByUserHandler } from '../../Application/Features/Order/Handler/CancelOrderByUserHandler';
import { StatusCodeEnums } from '../../Domain/Enums/StatusCodeEnums';
import { RecreateOrderByUserHandler } from '../../Application/Features/Order/Handler/RecreateOrderByUserHandler';
export default class OrderController {
    async SaveOrder(req: Request<any, any, SaveOrderRequest>, res: Response) {
        // #swagger.description = "Save order after buy a subscription";
        // #swagger.tags = ["Orders"];
        try {
            const {id, cancel, status, orderCode} = req.query;
            const data = {
                orderId: id,
                isCancel: cancel,
                status: status,
                orderCode: orderCode
            }
            const result: any = await SaveOrderHandler(data);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json({error: error.message});
        }
    }
    async GetOrderByUser(req: Request<any, any, GetOrderByUserRequest>, res: Response) {
        // #swagger.description = "Get order by user";
        // #swagger.tags = ["Orders"];
        try {
            const userId = (req as any).user.userId;
            const data = {
                userId: userId,
            }
            const result: any = await GetOrderByUserHandler(data);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }

    async CancelOrderByUser(req: Request<any, any, CancelOrderByUserRequest>, res: Response) {
        // #swagger.description = "Cancel order by user";
        // #swagger.tags = ["Orders"];
        try {
            const userId = (req as any).user.userId;
            const {orderId} = req.params;
            const {cancellationReason} = req.body;
            const data = {
                userId: userId,
                orderId: orderId,
                cancellationReason: cancellationReason,
            };
            const result: any = await CancelOrderByUserHandler(data);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }
    
    async RecreateOrderByUser(req: Request<any, any, RecreateOrderByUserRequest>, res: Response) {
        // #swagger.description = "Recreate order by user";
        // #swagger.tags = ["Orders"];
        try {
            const userId = (req as any).user.userId;
            const {orderId} = req.params;
            const data = {
                userId: userId,
                orderId: orderId,
            };
            const result: any = await RecreateOrderByUserHandler(data);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }
}
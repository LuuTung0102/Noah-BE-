import { StatusCodeEnums } from './../../Domain/Enums/StatusCodeEnums';
import { Request, Response } from "express";
import { PayosRequest } from "../../Infrastructure/Services/Payment/Model/PayosRequest";
import { IPayosService } from "../../Infrastructure/Services/Payment/IPayosService";
import PayosService from "../../Infrastructure/Services/Payment/PayosService";
import { AnyARecord } from "dns";
import { PayosCancelPaymentRequest } from '../../Infrastructure/Services/Payment/Model/PayosCancelPaymentRequest';

export default class PaymentController {

    async GetPayosDetail(req: Request<any, any, PayosRequest>, res: Response) {
        // #swagger.description = "Get payos payment detail by id"
        // #swagger.tags = ["Payments"]
        const payosService: IPayosService = new PayosService();
        try {
            const {id} = req.params;
            const result: any = await payosService.PayosGateWayGetPaymentLink(id);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }
    async CancelPayosPayment(req: Request<any, any, PayosCancelPaymentRequest>, res: Response) {
        // #swagger.description = "Cancel payos payment by id"
        // #swagger.tags = ["Payments"]
        const payosService: IPayosService = new PayosService();
        try {
            const {id} = req.params;
            const {cancellationReason} = req.body;
            const result: any = await payosService.PayosGateWayCancelPayment(id, cancellationReason);
            res.status(result.statusCode).json(result);
        } catch (error: any) {
            res.status(StatusCodeEnums.InternalServerError_500).json(error.message);
        }
    }
}
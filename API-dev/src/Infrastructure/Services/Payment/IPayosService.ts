import { CoreException } from "../../../Application/Common/Exceptions/CoreException";
import { PayosModel } from "./Model/PayosModel";

export interface IPayosService {
  PayosGateWayCreatePaymentLink(data: PayosModel): Promise<Object>;
  PurchaseWithPayos(payosData: any): Promise<Object | CoreException>;
  PayosGateWayGetPaymentLink(id: string): Promise<Object>;
  PayosGateWayCancelPayment(id: string, cancellationReason: string): Promise<Object>;
}

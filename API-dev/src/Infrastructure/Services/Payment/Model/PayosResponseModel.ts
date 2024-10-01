import { BaseResponse } from "../../../../Application/Common/Model/Response/BaseResponse";
import { OrderStatusEnums } from "../../../../Domain/Enums/OrderStatusEnums";

export default class PayosResponseModel extends BaseResponse {
  private data: {
    id: string;
    orderCode: string;
    amount: number;
    amountPaid: number;
    amountRemaining: number;
    status: OrderStatusEnums;
    createdAt: Date;
    transactions: Array<Object>;
    canceledAt: Date;
    cancellationReason: string;
  };

  constructor(
    message: string,
    statusCode: number,
    data: {
        id: string;
        orderCode: string;
        amount: number;
        amountPaid: number;
        amountRemaining: number;
        status: OrderStatusEnums;
        createdAt: Date;
        transactions: Array<Object>;
        canceledAt: Date;
        cancellationReason: string;
    },
    error?: string
  ) {
    super(message, statusCode, data, error);
    this.data = data;
  }
}

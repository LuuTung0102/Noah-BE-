import { Subscription } from "./../../../../Domain/Entities/SubscriptionEntities";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import { OrderStatusEnums } from "../../../../Domain/Enums/OrderStatusEnums";

export default class GetOrderByUserResponse extends BaseResponse {
  private data: Array<{
    orderId: string;
    orderCode: string;
    description: string;
    amount: number;
    subscription: Array<typeof Subscription>;
    isPaid: boolean;
    status: OrderStatusEnums;
    qrLink: string;
    transactionId: string;
  }>;

  constructor(
    message: string,
    statusCode: number,
    data: Array<{
      orderId: string;
      orderCode: string;
      description: string;
      amount: number;
      subscription: Array<typeof Subscription>;
      isPaid: boolean;
      status: OrderStatusEnums;
      qrLink: string;
      transactionId: string;
    }>,
    error?: string
  ) {
    super(message, statusCode, data, error);
    this.data = data
  }
}

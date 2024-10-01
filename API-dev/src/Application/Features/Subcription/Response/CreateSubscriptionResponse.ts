import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class CreateSubscriptionResponse extends BaseResponse {
  private data: {
    name: string;
    price: number;
    description: string;
    imagePath: string;
  };
  constructor(
    message: string,
    statusCode: number,
    data: {
      name: string;
      price: number;
      description: string;
      imagePath: string;
    },
    error?: string
  ) {
    super(message, statusCode, data, error);
    this.data = {
        name: data.name,
        price: data.price,
        description: data.description,
        imagePath: data.imagePath
    }
  }
}

import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class VerifyEmailResponse extends BaseResponse{
    constructor(message: string, statusCode: number, data: {}, error?: string) {
        super(message, statusCode, data, error)
    }
}
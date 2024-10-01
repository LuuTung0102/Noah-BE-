import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class GetSchoolResponse extends BaseResponse {
    private data : {};
    constructor(message: string, statusCode: number, data: {}, error?: string){
        super(message, statusCode, data, error);
        this.data = data;
    }
}
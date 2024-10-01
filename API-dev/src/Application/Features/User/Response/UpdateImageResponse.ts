import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class UpdateImageResponse extends BaseResponse {
    private data: {
        imageUser: string,
    };
    constructor(message: string, statusCode: number, data: {imageUser: string}, error?: string){
        super(message, statusCode, data, error);
        this.data = {
            imageUser: data.imageUser,
        };
    }
}
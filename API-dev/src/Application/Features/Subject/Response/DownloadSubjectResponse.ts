import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class DownloadSubjectResponse extends BaseResponse {
    private data: {
        url: string
    };
    constructor(
        message: string,
        statusCode: number,
        data: {
            url: string
        },
        error?: string
    ) {
        super(message, statusCode, data, error);
        this.data = data;
    }
}
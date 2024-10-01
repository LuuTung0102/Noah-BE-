import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class getAnswerByIdResponse extends BaseResponse {
    private data: {
        answer: string,
    };
    constructor(
        message: string,
        statusCode: number,
        data: {
            answer: string
        },
        error?: string
    ) {
        super(message, statusCode, data, error);
        this.data = {
            answer: data.answer
        } 

    }
}
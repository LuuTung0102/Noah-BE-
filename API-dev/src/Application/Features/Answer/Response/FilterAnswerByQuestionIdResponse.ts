import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class filterAnswerByQuestionIdResponse extends BaseResponse {
    private data: Array<{
        answer: string,
    }>;
    
    constructor(
        message: string,
        statusCode: number,
        data: Array<{
            answer: string,
        }>,
        error?: string
    ) {
        super(message, statusCode, data, error);
        this.data = data.map(({ answer }) => ({ answer }));
    }
}
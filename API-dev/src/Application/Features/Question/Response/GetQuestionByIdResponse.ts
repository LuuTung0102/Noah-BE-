import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class getQuestionByIdResponse extends BaseResponse {
    private data: {
        questionTopic: string,
        questionDescription: string,
        isImage: boolean,
        imagePath: string,
    };
    constructor(
        message: string,
        statusCode: number,
        data: {
            questionTopic: string,
            questionDescription: string,
            isImage: boolean,
            imagePath: string,
        },
        error?: string
    ) {
        super(message, statusCode, data, error);
        this.data = {
            questionTopic: data.questionTopic,
            questionDescription: data.questionDescription,
            isImage: data.isImage,
            imagePath: data.imagePath
        } 

    }
}
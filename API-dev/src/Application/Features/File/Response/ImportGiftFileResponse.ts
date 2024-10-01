import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class importGiftFileResponse extends BaseResponse {
    private _question:any [];
    private _answer:any [];
    private _questionId:any [];
    private _answerId:any [];
    

    constructor(message: string, statusCode: number, question:any [], answer:any [],questionId:any [], answerId:any [], data:any, error?: string){
        super(message, statusCode,data, error);
        this._question = question;
        this._answer = answer;
        this._questionId = questionId;
        this._answerId = answerId;
    }

    get question(): any[] {
        return this. _question;
    }
    get answer(): any[] {
        return this. _answer;
    }
}
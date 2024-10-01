import mongoose from "mongoose";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import { QuestionWithBase } from "../../../../Domain/Entities/QuestionEntities";
import { AnswerWithBase } from "../../../../Domain/Entities/AnswerEntities";

export class GetSubjectByIdResponse extends BaseResponse {
    private data: {
        subjectId: string
        subjectName: string;
        subjectCode: string;
        semester: number;
        majorName: string;
        imagePath: string;
        question: Array<typeof QuestionWithBase>;
        anwser: Array<typeof AnswerWithBase>;
    };
    constructor(
        message: string,
        statusCode: number,
        data: {
            subjectId: string
            subjectName: string;
            subjectCode: string;
            semester: number;
            question: Array<typeof QuestionWithBase>;
            anwser: Array<typeof AnswerWithBase>;
            majorName: string;
            imagePath: string;
        },
        error?: string
    ) {
        super(message, statusCode, data, error);
        this.data = data;
    }
}
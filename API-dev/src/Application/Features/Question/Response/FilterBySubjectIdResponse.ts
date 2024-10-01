import { Answer } from "./../../../../Domain/Entities/AnswerEntities";
import mongoose from "mongoose";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class filterBySubjectIdResponse extends BaseResponse {
  private data: Array<{
    _id: string,
    questionTopic: string;
    questionDescription: string;
    questionName: string;
    questionCode: string;
    answerId: Array<mongoose.Types.ObjectId>;
    answer: Array<typeof Answer>;
    isImage: boolean;
    imagePath: string;
  }>;

  constructor(
    message: string,
    statusCode: number,
    data: Array<{
      _id: string,
      questionTopic: string;
      questionDescription: string;
      questionName: string;
      questionCode: string;
      answerId: Array<mongoose.Types.ObjectId>;
      answer: Array<typeof Answer>;
      isImage: boolean;
      imagePath: string;
    }>,
    error?: string
  ) {
    super(message, statusCode, data, error);
    this.data = data.map(
      ({
        _id,
        questionTopic,
        questionDescription,
        questionName,
        questionCode,
        answerId,
        answer,
        isImage,
        imagePath,
      }) => ({
        _id,
        questionTopic,
        questionDescription,
        questionName,
        questionCode,
        answerId,
        answer,
        isImage,
        imagePath,
      })
    );
  }
}

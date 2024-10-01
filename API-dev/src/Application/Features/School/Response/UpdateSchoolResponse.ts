import { Major } from "./../../../../Domain/Entities/MajorEntities";
import { Subject } from "./../../../../Domain/Entities/SubjectEntities";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";

export class CreateSchoolResponse extends BaseResponse {
  private data: {
    schoolName: string;
    subject: typeof Subject;
    major: typeof Major;
    imagePath: string;
  };
  constructor(
    message: string,
    statusCode: number,
    data: {
      schoolName: string;
      subject: typeof Subject;
      major: typeof Major;
      imagePath: string;
    },
    error?: string
  ) {
    super(message, statusCode, data, error);
    this.data = {
      schoolName: data.schoolName,
      imagePath: data.imagePath,
      major: data.major,
      subject: data.subject,
    };
  }
}

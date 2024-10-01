import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { md5Encrypt } from "../../../Common/Helpers/passwordUtils";
import { BaseResponse } from "../../../Common/Model/Response/BaseResponse";
import { UpdateSubjectByIdResponse } from "../Response/UpdateSubjectByIdResponse";
import { GetSubjectByIdHandler } from "./GetSubjectByIdHandler";

export async function UpdateSubjectByIdHandler(subjectId: any, data: any): Promise<UpdateSubjectByIdResponse | CoreException> {
    const unitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const prefix = "subjects_";
        data.subjectName = prefix + data.subjectName;
        const subjectCode = await md5Encrypt(data.subjectName);

        const { majorId, subjectName, semester, imagePath } = data;
        const updateData = {
            majorId: majorId,
            subjectName: subjectName,
            semester: semester,
            imagePath: imagePath,
            subjectCode: subjectCode,
            majorName: "aaa"
        }

        const result: any = await unitOfWork.subjectRepository.UpdateSubjectById(subjectId, updateData, session);
        await unitOfWork.commitTransaction();
        return new UpdateSubjectByIdResponse("Succesfully", StatusCodeEnums.OK_200, result);

    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}
import { Session } from "inspector";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { md5Encrypt } from "../../../Common/Helpers/passwordUtils";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { CreateLogResponse } from "../Response/CreateLogResponse";

export async function CreateLogHandler(data: any): Promise<CreateLogResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    const session = await unitOfWork.startTransaction();
    const subjectCodeUnhash = `subjects_${data.subjectCode}`
    try {
        const subjectCode = await md5Encrypt(subjectCodeUnhash);
        const queryData: any = {
            subjectCodeUnhash: data.subjectCode,
            subjectCodeHash: subjectCode,
            isActive: true,
            isDelete: false
        }
        const subject: any = await unitOfWork.subjectRepository.GetSubjectBySubjectCode(subjectCodeUnhash, queryData)
        const dataLog: any = {
            majorId: subject.majorId,
            userId: data.userId,
            subjectId: subject._id,

        }
        const result = await unitOfWork.logRepository.createLog(dataLog, session)
        await unitOfWork.commitTransaction();
        return new CreateLogResponse("Succesfully", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);

    }

}
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { DeleteSubjectByIdResponse } from "../Response/DeleteSubjectByIdResponse";

export async function DeleteSubjectByIdHandler(data:any):Promise<DeleteSubjectByIdResponse|CoreException>{
    const unitOfWork = new UnitOfWork();
    const session = await unitOfWork.startTransaction();
    try {
        const queryData ={
            subjectId: data,
            isDelete: true,
            isActive: true
        }
        const subject: any = await unitOfWork.subjectRepository.DeleteSubjectById(queryData,session);
        await unitOfWork.commitTransaction();
        return new DeleteSubjectByIdResponse("Succesfully", StatusCodeEnums.OK_200,subject)

    } catch (error:any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}
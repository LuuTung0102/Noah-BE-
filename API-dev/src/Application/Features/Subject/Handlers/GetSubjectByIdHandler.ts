import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { GetSubjectByIdResponse } from "../Response/GetSubjectByIdResponse";

export async function GetSubjectByIdHandler(data: any): Promise<GetSubjectByIdResponse | CoreException> {

    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const {subjectId} = data;
        const rootSubjectCollectionQueryData: any = {
            subjectId: subjectId,
            isDelete: false,
            isActive: true
        }
        const rootSubjectCollection: any = await unitOfWork.subjectRepository.GetSubjectById(rootSubjectCollectionQueryData);
        const subjectQueryData = {
            subjectCode: rootSubjectCollection.subjectCode,
            isDelete: false,
            isActive: true,
        }
        const subject: any = await unitOfWork.subjectRepository.GetSubjectBySubjectCode(rootSubjectCollection.subjectName, subjectQueryData);
        const subjectResponseData: any = {
            subjectId : rootSubjectCollection._id,
            subjectName: subject.subjectName,
            subjectCode: subject.subjectCode,
            semester: subject.semester,
            imagePath: subject.imagePath,
            majorName: subject.majorName,
            question: subject.question,
            answer: subject.answer,
        }
        return new GetSubjectByIdResponse("Succesfully", StatusCodeEnums.OK_200, subjectResponseData)
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }

}
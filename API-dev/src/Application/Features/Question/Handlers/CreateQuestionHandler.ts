import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { CreateQuestionResponse } from "../Response/CreateQuestionResponse";


export async function CreateQuestionHandler(data: any): Promise<CreateQuestionResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const createQuestionData: any = {
                questionTopic: data.questionTopic,
                questionDescription: data.questionDescription,
                subjectId: data.subjectId,
                answerId: data.answerId,
                isImage: data.isImage,
                imagePath: data.imagePath,
        };
        const result: any = await unitOfWork.questionRepository.createQuestion(createQuestionData, session);

        await unitOfWork.commitTransaction();
        return new CreateQuestionResponse("Successful", StatusCodeEnums.OK_200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}
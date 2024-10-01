import mongoose from "mongoose";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
import { filterAnswerByQuestionIdResponse } from "../Response/FilterAnswerByQuestionIdResponse";

export async function filterAnswerByQuestionIdHandler(data: any): Promise<filterAnswerByQuestionIdResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        await unitOfWork.startTransaction();
        const answerCollectionQueryData = {
            questionCode: data.questionCode,
            isActive: true,
            isDelete: false,
        };
        const rootAnswerCollection: any = await unitOfWork.answerRepository.GetRootAnswersCollectionByQuestionCode(answerCollectionQueryData);

        // const rootAnswerCollectionQueryData = {
        //     questionCode: rootQuestionCollection.questioncode,
        //     isDelete: false,
        //     isActive: true,
        // }
        // const rootAnswerCollection: any = await unitOfWork.answerRepository.GetAnswersByQuestionCode(rootAnswerCollectionQueryData);
        const answerInCollectionQueryData = {
            questionId: new mongoose.Types.ObjectId(data.questionId),
            isDelete: false,
            isActive: true,
        }
        const answerCollectionResult: any = await unitOfWork.answerRepository.GetAnswersInCollection(answerInCollectionQueryData, rootAnswerCollection.answerName);
        if (answerCollectionResult == null) {
            throw new CoreException(StatusCodeEnums.InternalServerError_500, "Can not find this question Id");
        }
        // const answers = result.map((item: {answer: string}) => item.answer);
        // console.log(answers);
        return new filterAnswerByQuestionIdResponse("Successful", StatusCodeEnums.OK_200, answerCollectionResult)
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        throw new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
    }
}
import { ClientSession } from "mongoose";
import { QuestionModelWithBase, QuestionWithBase } from "../../../Domain/Entities/QuestionEntities";
import { CoreException } from "../../Common/Exceptions/CoreException";

interface IQuestionRepository {
    getQuestionById(queryData: any): Promise<typeof QuestionWithBase|CoreException>;
    filterBySubjectId(queryData: any): Promise<typeof QuestionWithBase | CoreException>
    createQuestion(questionData: any, session: ClientSession): Promise<typeof QuestionWithBase|CoreException>;
    createQuestionCollection(questionData: any, session: ClientSession);
    updateQuestionById(questionId: string, questionData: any, session: ClientSession);
    updateQuestionAnswerById(questionId: string, answerForUpdate: any, session: ClientSession);
    deleteQuestionById(queryData: any, session: ClientSession);
    getQuestionByQuestionCode(queryData: any): Promise<typeof QuestionWithBase| CoreException>;
    filterBySubjectIdCollection(queryData: any): Promise<typeof QuestionModelWithBase[] | CoreException>
    getQuestionInCollectionById(collectionName: string, query: any): Promise<typeof QuestionModelWithBase | CoreException>;
    GetRootQuestionCollection(query: any): Promise<typeof QuestionWithBase | CoreException>
}

export default IQuestionRepository;
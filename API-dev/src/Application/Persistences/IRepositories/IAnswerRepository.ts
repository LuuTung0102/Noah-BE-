import { ClientSession } from "mongoose";
import { AnswerModelWithBase, AnswerWithBase } from "../../../Domain/Entities/AnswerEntities";
import { CoreException } from "../../Common/Exceptions/CoreException";

interface IAnswerRepository {
    getAnswerByAnswerCode(queryData: any): Promise<typeof AnswerWithBase|CoreException>;
    filterAnswersByQuestionId(queryData: any): Promise<typeof AnswerWithBase[]|CoreException>;
    getAnswerById(queryData: any): Promise<typeof AnswerWithBase|CoreException>;
    createAnswer(createAnswerData: any, session: ClientSession): Promise<typeof AnswerWithBase|CoreException>;
    updateAnswerById(answerId: string, answerData: any , session: ClientSession);
    deleteAnswerById(queryData: any, session: ClientSession);
    createAnswerCollection(answerData: any, session: ClientSession);
    GetRootAnswersCollectionByQuestionCode(query: any): Promise<typeof AnswerWithBase | CoreException>;
    GetAnswersInCollection(query: any, collectionName: string): Promise<typeof AnswerModelWithBase[] | CoreException>;
}

export default IAnswerRepository;
import IAnswerRepository from "./IAnswerRepository";
import { IBaseUnitOfWork } from "./IBaseUnitOfWork";
import ILogRepository from "./ILogRepository";
import IMajorRepository from "./IMajorRepository";
import IQuestionRepository from "./IQuestionRepository";
import { IOrderRepository } from "./IOrderRepository";
import IRoleRepository from "./IRoleRepository";
import ISchoolRepository from "./ISchoolRepository";
import ISessionRepository from "./ISessionRepository";
import ISubjectRepository from "./ISubjectRepository";
import { ISubscriptionRepository } from "./ISubscriptionRepository";
import IUserRepository from "./IUserRepository";


export interface IUnitOfWork extends IBaseUnitOfWork{
    userRepository: IUserRepository;
    sessionRepository: ISessionRepository;
    roleRepository: IRoleRepository;
    subscriptionRepository: ISubscriptionRepository;
    orderRepository: IOrderRepository;
    subjectRepository: ISubjectRepository;
    logRepository: ILogRepository;
    questionRepository: IQuestionRepository;
    answerRepository: IAnswerRepository;
    schoolRepository: ISchoolRepository;
    majorRepository: IMajorRepository;
}
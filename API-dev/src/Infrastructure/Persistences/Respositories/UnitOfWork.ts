import { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import { BaseUnitOfWork } from "./BaseUnitOfWork";
import OrderRepository from "./OrderRespository";
import LogRepository from "./LogRepository";
import RoleRepository from "./RoleRepository";
import SessionRepository from "./SessionRepository";
import SubscriptionRepository from "./SubscriptionRepository";
import SubjectRepository from "./SubjectRepository";
import UserRepository from "./UserRepository";
import QuestionRepository from "./QuestionRepository";
import AnswerRepository from "./AnswerRepository";
import {SchoolRepository} from "./SchoolRepository";
import MajorRepository from "./MajorRepository";


export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
    userRepository: UserRepository;
    sessionRepository: SessionRepository;
    roleRepository: RoleRepository;
    subjectRepository: SubjectRepository;
    logRepository: LogRepository;
    questionRepository: QuestionRepository;
    answerRepository: AnswerRepository;
    schoolRepository: SchoolRepository;
    majorRepository: MajorRepository;
    orderRepository: OrderRepository;
    subscriptionRepository: SubscriptionRepository;
    constructor() {
        super();
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
        this.sessionRepository = new SessionRepository();
        this.subjectRepository = new SubjectRepository();
        this.logRepository = new LogRepository();
        this.questionRepository = new QuestionRepository();
        this.answerRepository = new AnswerRepository();
        this.schoolRepository = new SchoolRepository();
        this.majorRepository = new MajorRepository();
        this.orderRepository = new OrderRepository();
        this.subscriptionRepository = new SubscriptionRepository();
    }
}
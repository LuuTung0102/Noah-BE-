import moment from "moment";
import { ForgotPasswordResponse } from "../Response/ForgotPasswordResponse";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
const { md5Encrypt } = require("../../../Common/Helpers/passwordUtils");
const { sendMail } = require("../../../Common/Helpers/emailUtils")

export async function ForgotPasswordHandler(email: string): Promise<ForgotPasswordResponse|CoreException> {
    try {
        const unitOfWork: IUnitOfWork = new UnitOfWork();
        await unitOfWork.startTransaction();
        const queryData: any = {
            isDelete: false,
            isActive: true,
            emailConfirmed: true,
        }

        // const emailError = validationUtils.validateEmail(email);
        // if (emailError){
        //      return new ForgotPasswordResponse("Validation failed", 400, {}, emailError);
        // }
        
        const user: any = await unitOfWork.userRepository.getUserByEmail(email, queryData);
        if (user == null) {
            return new CoreException(StatusCodeEnums.InternalServerError_500, "User Not Found!");
        }

        user.emailCode = await md5Encrypt(user.emailCode);
        user.password = moment().valueOf();
        const emailData: any = {
            fullname: user.fullname,
            email: user.email,
            emailCode: user.emailCode,
            password: user.password,
        }
        const sendMailResponse: string = await sendMail(user.email, "Welcome to NoahQuiz", emailData, "forgotPasswordEmailTemplate.ejs");

        return new ForgotPasswordResponse("Sent Mail Successfully", StatusCodeEnums.Created_201, sendMailResponse)
    } catch (error: any) {
        return new CoreException(StatusCodeEnums.InternalServerError_500 , error.mesagge);
    }
}
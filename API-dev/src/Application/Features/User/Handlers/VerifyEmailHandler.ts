import { VerifyEmailResponse } from './../Response/VerifyEmailResponse';
import { md5Encrypt } from "../../../Common/Helpers/passwordUtils";
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';

export async function verifyEmailHandler (data : any) : Promise<VerifyEmailResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const {email, hash} = data
    // const userRepository: IUserRepository = new UserRepository();


    const queryData: any = {
        isDelete: false,
        isActive: true,
        emailConfirmed: false,
    }
    // const emailError = validationUtils.validateEmail(email);
    // if (emailError){
    //       return new VerifyEmailResponse("Validation failed", 400, {}, emailError);
    // }

    const user: any = await unitOfWork.userRepository.getUserByEmail(email, queryData);
    if (!user) {
      return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
    }     

    const emailHash = await md5Encrypt(user.emailCode);
    console.log(emailHash);
    if (hash != emailHash) {
      return new CoreException(StatusCodeEnums.InternalServerError_500, "Can not verify");
    }

    user.emailCode = Math.random().toString(36).substr(2, 5); 
    user.emailConfirmed = true;

    console.log(user._id.toString());
    // const result = await userRepository.updateDocument(queryData, user);
    await unitOfWork.userRepository.updateUserConfirmEmail(user._id, user, session);
    // return new VerifyEmailResponse("Verify email successful", StatusCodeEnums.OK_200, result);
    await unitOfWork.commitTransaction();
    return new VerifyEmailResponse("Verify email successful", 200, "");
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}
import { CreateUserResponse } from './../Response/CreateUserResponse';
import {sendMail} from '../../../../Application/Common/Helpers/emailUtils';
import { md5Encrypt } from '../../../Common/Helpers/passwordUtils';
import { CoreException } from '../../../Common/Exceptions/CoreException';
import { UnitOfWork } from '../../../../Infrastructure/Persistences/Respositories/UnitOfWork';
import { StatusCodeEnums } from '../../../../Domain/Enums/StatusCodeEnums';
import { IUnitOfWork } from '../../../Persistences/IRepositories/IUnitOfWork';



export async function CreateUserHandler(data: any): Promise<CreateUserResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const {email, fullname, password, phoneNumber, username} = data;
    const roleQueryData: any = {
        isDelete: false,
        isActive: true,
    }


        
    const role: any = await unitOfWork.roleRepository.getRoleByName("User", roleQueryData);
    const subscriptionQueryData = {
      isDefault: true,
      isDelete: false,
      isActive: true,
    }
    const subscription: any = await unitOfWork.subscriptionRepository.GetSubscriptionDefault(subscriptionQueryData);
    const createUserRoleData: any = {
      email: email,
      fullname: fullname,
      password: password,
      subscriptionId: subscription._id,
      subscription: subscription,
      phoneNumber: phoneNumber,
      username: username,
      role_id: role._id
    };
    const result: any = await unitOfWork.userRepository.createUser(createUserRoleData, session);
    const emailHash = await md5Encrypt(result.emailCode);
    const emailData = { 
      email: email,
      fullname: fullname,
      emailCode: emailHash,
    }
    await unitOfWork.commitTransaction();
    await sendMail(email, "Welcome to Noah-Quiz!", emailData, "verifyEmailTemplate.ejs");
  
    return new CreateUserResponse("Successful", StatusCodeEnums.OK_200, result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.message);
  }
}

import { ChangePasswordResponse } from "../../User/Response/ChangePasswordResponse";
import { comparePassword } from "../../../Common/Helpers/passwordUtils";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";
export async function ChangePasswordHandler(data: any): Promise<ChangePasswordResponse|CoreException>{
   const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
        const session = await unitOfWork.startTransaction();
        const {userId, oldpassword, newpassword} = data;
        const userQueryData: any = {
            userId: userId,
            isDelete: false,
            isActive: true,
        }

        // const passwordError = validationUtils.validatePassword(newpassword);

        // if (passwordError){
        //     return new CreateUserResponse("Validation failed", 400, {}, "New " + passwordError);
        // }
        
        // const user: any = await unitOfWork.userRepository.getUserById(userQueryData);
         const user: any = await unitOfWork.userRepository.getUserById(userQueryData);
        if (user == null) {
            return new CoreException(StatusCodeEnums.InternalServerError_500 , "User not found!");
        }

          // So sánh mật k
        const isMatch = await comparePassword(oldpassword, user.password);
        if (!isMatch) {
            return new CoreException(StatusCodeEnums.Unauthorized_401, "Old password is incorrect!");
        }

        // Băm mật khẩu mới
        // const hashedPassword = await hashPassword(newPassword);
        // Cập nhật mật khẩu trong cơ sở dữ liệu
          const changePasswordUserQueryData = {
            userId: userId,
            newPassword: newpassword,
            isActive: true,
            isDelete: false,
          };
        const result: any = await unitOfWork.userRepository.changePasswordUser(changePasswordUserQueryData, session);
        // xóa session
        const sessionQueryData:any ={
          email: user.email,
          isDelete: false,
          isActive:true
      }
        const sessionUser: any = await unitOfWork.sessionRepository.findSessionByEmail(sessionQueryData)
        if (sessionUser !== null && sessionUser.length >= 0) {
            for (const sess of sessionUser) {
                await unitOfWork.sessionRepository.deleteSession(sess._id, session);
            }
        }
        await unitOfWork.commitTransaction();
        return new ChangePasswordResponse("Change password successfully!", 200, result);
    } catch (error: any) {
        await unitOfWork.abortTransaction();
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
    }
}

export default ChangePasswordHandler;
import { UpdatePassResponse } from "../Response/UpdatePassResponse";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";


export async function UpdatePassHandler(data: any): Promise<UpdatePassResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { userId, newpassword } = data;
    // Tạo một đối tượng UserRepository
    // const userRepository: IUserRepository = new UserRepository();

    // Sử dụng phương thức getUserByEmail để lấy thông tin người dùng dựa trên email
    const queryData: any = {
      userId: userId,
      isDelete: false,
      isActive: true,
    };
    const user: any = await unitOfWork.userRepository.getUserById(queryData);

    if (!user) {
      return new CoreException(StatusCodeEnums.InternalServerError_500, "User not found!");
    }
    let emailConfirmed = user.emailConfirmed;
    if(!emailConfirmed) emailConfirmed = true;
    const updateData = {
      email: user.email,
      newPassword: newpassword,
      emailConfirmed: emailConfirmed
    };

    const result: any = await unitOfWork.userRepository.uploadPass(updateData, session);
    await unitOfWork.commitTransaction();
    // Trả về thông báo thành công
    return new UpdatePassResponse("Password updated successfully", StatusCodeEnums.OK_200,result);
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);
  }
}

export default UpdatePassHandler;
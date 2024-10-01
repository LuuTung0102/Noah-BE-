import { LoginResponse } from "../Response/LoginResponse";
import { addDuration, encodejwt } from "../../../Common/Helpers/jwtUtils";
const { comparePassword } = require("../../../Common/Helpers/passwordUtils");
import { CoreException } from "../../../Common/Exceptions/CoreException";

import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CreateUserSessionDTO } from "../Commands/CreateUserSessionDTO";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";

async function LoginHandler(data: any): Promise<LoginResponse | CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { deviceId, ipAddress, email, password } = data;

    const queryData: any = {
      isDelete: false,
      isActive: true,
      emailConfirmed: true,
    };

    // const emailError = validationUtils.validateEmail(email);
    // const passwordError = validationUtils.validatePassword(password);
    // if (emailError ||  passwordError) {
    //     // Construct error message with appropriate separators
    //     let errorMessage = '';
    //     if (emailError) errorMessage += emailError + '; ';
    //     if (passwordError) errorMessage += passwordError + '; '
    //     errorMessage = errorMessage.trim().replace(/;+$/, '');
    //     return new LoginResponse("Validation failed", 400, data, errorMessage);
    // }

    const user: any = await unitOfWork.userRepository.getUserByEmail(
      email,
      queryData
    );
    if (!user) {
      return new CoreException(
        StatusCodeEnums.InternalServerError_500,
        "User not found!"
      );
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return new CoreException(
        StatusCodeEnums.Unauthorized_401,
        "Password is not match!"
      );
    }

    const token = await encodejwt(user);

    const queryDataSession: any = {
      email: email.toLowerCase(),
      ipAddress: ipAddress,
      deviceId: deviceId,
      isDelete: true,
    };

    const sessionUser: any =
      await unitOfWork.sessionRepository.findSessionByEmailAndIP(
        queryDataSession
      );
    if (sessionUser != null) {
      await unitOfWork.sessionRepository.deleteSession(
        sessionUser._id,
        session
      );
    }

    const tokenExpiryDate: any = addDuration(token.expiresIn || "");
    const refreshTokenExpiryDate = addDuration(process.env.REACT_APP_EXPIRE_REFRESH_TOKEN || "");

    // const dataForCreateSession: any = {
    //     user: user,
    //     token: token,
    //     deviceId: deviceId,
    //     ipAddress: ipAddress,
    //     refreshTokenExpiryDate: refreshTokenExpiryDate,
    //     tokenExpiryDate: tokenExpiryDate,
    // }
    const createSessionDTO = new CreateUserSessionDTO(
      user._id,
      user.email,
      user.name || "unknown",
      user.username.toLowerCase(),
      token.token,
      token.refreshToken,
      refreshTokenExpiryDate,
      tokenExpiryDate,
      deviceId,
      ipAddress
    );
    await unitOfWork.sessionRepository.createSession(createSessionDTO, session);
    // await CreateSessionHandler(dataForCreateSession);

    const dataTokenResponse = {
      accessToken: token.token,
      refreshToken: token.refreshToken,
      expireIn: token.expiresIn || "",
    };

    const loginResponse = new LoginResponse(
      "Success",
      StatusCodeEnums.OK_200,
      dataTokenResponse
    );
    await unitOfWork.commitTransaction();
    return loginResponse;
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    return new CoreException(
      StatusCodeEnums.InternalServerError_500,
      error.message
    );
  }
}

export default LoginHandler;

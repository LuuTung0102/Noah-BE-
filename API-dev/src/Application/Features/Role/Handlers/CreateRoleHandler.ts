import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import { CreateRoleResponse } from "../Response/CreateRoleResponse";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";

export async function CreateRoleHandler(data: any): Promise<CreateRoleResponse|CoreException> {
  const unitOfWork: IUnitOfWork = new UnitOfWork();
  try {
    const session = await unitOfWork.startTransaction();
    const { name, description, isAdmin, listClaim } = data;
    const createRoledata: any = {
      name: name,
      description: description,
      isAdmin: isAdmin,
      listClaim: listClaim,
    };
    const result =  await unitOfWork.roleRepository.createRole(createRoledata, session);
    await unitOfWork.commitTransaction();
    return new CreateRoleResponse("Create role successful", StatusCodeEnums.Created_201, {});
  } catch (error: any) {
    await unitOfWork.abortTransaction();
    throw new Error("Error at CreateRoleHandler: " + error.message);
  }
}

import { StatusCodeEnums } from "../../../../Domain/Enums/StatusCodeEnums";
import { CoreException } from "../../../Common/Exceptions/CoreException";
import { UnitOfWork } from "../../../../Infrastructure/Persistences/Respositories/UnitOfWork";
import GetRoleByIdResponse from "../Response/GetRoleByIdResponse";
import { IUnitOfWork } from "../../../Persistences/IRepositories/IUnitOfWork";

export async function GetRoleByIdHandler(data: any): Promise<GetRoleByIdResponse|CoreException> {
    const unitOfWork: IUnitOfWork = new UnitOfWork();
    try {
       
        await unitOfWork.startTransaction();
        const {id} = data;
        const queryData: any = {
            isActive: true,
            isDelete: false,
        }
        const result: any = await unitOfWork.roleRepository.getRoleById(id, queryData);
        if(result == null) throw new Error("Can not find this role");
        const responseData = {
            name: result.name,
            description: result.description,
            isAdmin: result.isAdmin,
            listClaim: result.listClaim,
        }
        const a = new GetRoleByIdResponse("Successfull", StatusCodeEnums.OK_200, responseData);
        return new GetRoleByIdResponse(
            "Successful",
            StatusCodeEnums.OK_200,
            responseData,
        );
    } catch (error: any) {  
        return new CoreException(StatusCodeEnums.InternalServerError_500, error.mesagge);

    }
}

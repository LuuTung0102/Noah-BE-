import { CreateRoleRequest } from "./../../Application/Features/Role/Request/CreateRoleRequest";
import { GetRoleByIdHandler } from "../../Application/Features/Role/Handlers/GetRoleByIdHandler";
import RoleRepository from "../../Infrastructure/Persistences/Respositories/RoleRepository";
import { GetRoleByIdRequest } from "./../../Application/Features/Role/Request/GetRoleByIdRequest";
import { Request, Response } from 'express';
import { CreateRoleHandler } from "../../Application/Features/Role/Handlers/CreateRoleHandler";

export default class RoleController {
  // private roleRopository: RoleRepository;
  // constructor() {
  //     this.roleRopository = new RoleRepository();
  // }
  async getRoleById(req: Request<any, any, GetRoleByIdRequest>, res: Response): Promise<void> {
    // #swagger.description = 'get role by Id'
    // #swagger.tags = ["Role"]
    try {
      const { roleId } = req.params;
      const data: any = {
        id: roleId,
      };
      const result: any = await GetRoleByIdHandler(data);
      res.status(result.statusCode).json({ data: result });
      if (result.error != undefined || result.error) {
        res.status(result.statusCode).json({ error: result.error });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  async createRole(req: Request<any, any, CreateRoleRequest>, res: Response): Promise<void>{
    // #swagger.description = 'Create role'
    // #swagger.tags = ["Role"]
    try {
      const { name, description, isAdmin, listClaim } = req.body;
      const data: any = {
        name: name,
        description: description,
        isAdmin: isAdmin,
        listClaim: listClaim,
      };
      const result: any = await CreateRoleHandler(data);
      res.status(result.statusCode).json({ data: result });

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

import { UnitOfWork } from './UnitOfWork';
import mongoose, { ClientSession } from "mongoose";
import IRoleRepository from "../../../Application/Persistences/IRepositories/IRoleRepository";
import { Role, RoleWithBase } from "../../../Domain/Entities/RoleEntities";
import BaseRepository from "./BaseRepository";

const collectionName: string = "userroles";

export default class RoleRepository extends BaseRepository<typeof Role> implements IRoleRepository{
    constructor(){
        super(collectionName)
    }
    async getRoleById(roleId: number | mongoose.Types.ObjectId, queryData: any): Promise<typeof RoleWithBase | null>  {
        try {
            roleId = new mongoose.Types.ObjectId(roleId);
            const query = {
                _id: roleId,
                isActive: queryData.isActive,
                isDelete: queryData.isDelete,
            };
            const roles: typeof RoleWithBase[] = await RoleWithBase.find(query);
            // const roles = await this.findDocuments(query, null, {});
            if(roles == null) return null;
            return roles[0];
        } catch (error: any) {
            throw new Error("Error at getRoleById in RoleRepository: " + error.message);
        }
    }
    async createRole(createRoleData: any, session: ClientSession): Promise<typeof RoleWithBase> {
        try {
            const roleWithBase: any = await RoleWithBase.create([createRoleData], {session});
            return roleWithBase;
        } catch (error: any) {
            throw new Error("Error at createRole in RoleRepository: " + error.message);

        }
    }
    async getRoleByName(roleName: string, queryData: any): Promise<typeof RoleWithBase | null>{
        try {
            const query = {
                name: roleName,
                isActive: queryData.isActive,
                isDelete: queryData.isDelete,
            }
            const role: typeof RoleWithBase[] = await RoleWithBase.find(query);
            if(role == null) return null;
            return role[0];
        } catch (error: any) {
            throw new Error("Error at getRoleByName in RoleRepository: " + error.message);
        }
    }

}
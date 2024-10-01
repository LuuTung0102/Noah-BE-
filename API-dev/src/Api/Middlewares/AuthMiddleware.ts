const jwt = require('jsonwebtoken');
import {Request, Response, NextFunction} from 'express'
import SessionRepository from "../../Infrastructure/Persistences/Respositories/SessionRepository";
import mongoose from 'mongoose';
import RoleRepository from '../../Infrastructure/Persistences/Respositories/RoleRepository';
import { UnitOfWork } from '../../Infrastructure/Persistences/Respositories/UnitOfWork';
const moment = require('moment-timezone');

async function authenticateToken(req: any, res: any, next: any){
    const unitOfWork = new UnitOfWork();
    const session = await unitOfWork.startTransaction();
   
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // No token provided
    }
 
    // Find the session associated with the token
    unitOfWork.sessionRepository.findSessionByToken(token).then( sessionUser => {
        if (!sessionUser) {
            return res.sendStatus(401); // No session found for this token
        }

        // Check if the token is expired
        // const now = new Date();
        const now = moment();
        if (sessionUser.expireDate < now) {
            // Token has expired, delete the session
             unitOfWork.sessionRepository.deleteSession(sessionUser._id, session).then(() => {
                return res.sendStatus(401); // Unauthorized due to expired token
            });
        } else {
            // Verify the token is valid and not tampered with
            jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err: any, user: any) => {
                if (err) {
                    return res.sendStatus(403); // Token is invalid
                }
                req.user = user; // Attach the user to the request object
                req.session = session; // Attach the session to the request object
                console.log("done authen");
                unitOfWork.commitTransaction();
                next(); // Proceed to the next middleware or request handler
            });
        }
    }).catch(err => {
        unitOfWork.abortTransaction();
        console.error(err);
        return res.sendStatus(500); // Internal server error
    });
}

function authorizationMiddleware(requiredRoles: any) {
    return (req: any, res: any, next: any) => {
        const roleRepository = new RoleRepository();
        const jwtuser = req.user;
        console.log("requiredRoles",requiredRoles);
        console.log("jwtuser ",jwtuser.roleId);
        const queryData = {
            isActive: true,
            isDelete: false
        }
        roleRepository.getRoleById(jwtuser.roleId, queryData).then((userRole: any) => {
            // Kiểm tra vai trò của người dùng
        console.log("findById(jwtuser.roleId).then(userRole ",userRole);

            if (!userRole || !requiredRoles.includes(userRole.name)) {
                return res.status(403).json({ message: "Không có quyền thực hiện hành động này" });
            }
            next();
        }).catch((error: any) => {
            console.error(error);
            return res.status(500).json({ message: "Lỗi máy chủ" });
        });
    };
}


module.exports = {
    authenticateToken,
    authorizationMiddleware,
}
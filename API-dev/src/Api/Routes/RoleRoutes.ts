import RoleController from "../Controllers/RoleController";
import express from 'express';

const router = express.Router();

const roleController = new RoleController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");


// router.post("/roles", roleController.getRoleById.bind(roleController));
// router.post("/roles/create-role", roleController.createRole.bind(roleController));
router.post("/role/:roleId", authenticateToken, authorizationMiddleware(["Admin"]), roleController.getRoleById);
// router.post("/role/create-role/", authenticateToken, authorizationMiddleware(["Admin"]), roleController.createRole);
router.post("/role/create-role/v2", roleController.createRole);
module.exports = router

import express from 'express';
import SchoolController from "../Controllers/SchoolController";
import MajorController from '../Controllers/MajorController';

const router = express.Router();
const majorController = new MajorController();

const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");


router.post("/major/create", authenticateToken, authorizationMiddleware(["Admin"]), majorController.createMajor);
router.get("/major/getAll", majorController.getAllMajors);
router.put("/major/update/:majorId", authenticateToken, authorizationMiddleware(["Admin"]), majorController.updateMajorById);
router.delete("/major/delete/:majorId", authenticateToken, authorizationMiddleware(["Admin"]), majorController.deleteMajorById);
router.delete("/major/delete-soft/:majorId", authenticateToken, authorizationMiddleware(["Admin"]), majorController.deleteMajorSoftById);
router.get("/major/getMajorById/:majorId", authenticateToken, majorController.getMajorById);


module.exports = router
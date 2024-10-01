
import express from 'express';
import SchoolController from "../Controllers/SchoolController";

const router = express.Router();

const schoolController = new SchoolController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");


router.post("/school/create", authenticateToken, authorizationMiddleware(["Admin"]), schoolController.createSchool);
router.get('/school/getAllSchool', authenticateToken, schoolController.getAllSchools)
router.get('/school/:schoolId', authenticateToken, schoolController.getSchoolById)
router.delete('/school/delete/:schoolId', authenticateToken, authorizationMiddleware(["Admin"]), schoolController.deleteSchoolById)
router.put('/school/update/:schoolId', authenticateToken, authorizationMiddleware(["Admin"]), schoolController.updateSchoolById)

module.exports = router
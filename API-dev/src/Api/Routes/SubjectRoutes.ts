import express from "express";
import SubjectController from "../Controllers/SubjectController";
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");
import multer from "multer";
const upload = multer({ dest: 'uploads/' })



const router = express.Router();
const subjectController = new SubjectController();
router.post("/subject/create", authenticateToken, authorizationMiddleware(["Admin"]), upload.single('file'),subjectController.createSubject)
router.get("/subject/get-subject/:subjectId", subjectController.getSubjectById)
router.put("/subject/update/:subjectId", authenticateToken, authorizationMiddleware(["Admin"]), subjectController.updateSubjectById)
router.delete("/subject/delete/:subjectId", authenticateToken, authorizationMiddleware(["Admin"]), subjectController.deleteSubjectById)
router.post("/subject/download/:subjectId", authenticateToken, subjectController.downloadSubject) 
router.get("/subject", subjectController.getAllSubjects)





module.exports = router;
import express from "express";
import QuestionController from "../Controllers/QuestionController";

const router = express.Router();

const questionController = new QuestionController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");

router.post("/question/create-question", authenticateToken, authorizationMiddleware(["Admin"]), questionController.createQuestion);
router.get("/question/:questionId", questionController.getQuestionById);
router.get("/question/filter/:subjectId", questionController.filterBySubjectId);
router.post("/question/update-question", authenticateToken, authorizationMiddleware(["Admin"]), questionController.updateQuestionById);
router.delete("/question/delete/:questionId", authenticateToken, authorizationMiddleware(["Admin"]), questionController.deleteQuestionById);

module.exports = router
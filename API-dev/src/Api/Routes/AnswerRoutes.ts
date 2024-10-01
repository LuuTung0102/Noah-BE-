import express from 'express'
import AnswerController from '../Controllers/AnswerController';

const router = express.Router();

const answerController = new AnswerController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");

router.post("/answer/create-answer", authenticateToken, authorizationMiddleware(["Admin"]), answerController.createAnswer);
router.get("/answer/filter/:questionId", answerController.filterAnswerByQuestionId);
router.get("/answer/:answerId", answerController.getAnswerById);
router.post("/answer/update-answer", authenticateToken, authorizationMiddleware(["Admin"]), answerController.updateAnswerById);
router.delete("/answer/delete/:answerId", authenticateToken, authorizationMiddleware(["Admin"]), answerController.deleteAnswerById);

module.exports = router;
import express from "express";
import FileController from "../Controllers/FileController";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

const fileController = new FileController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");

router.post('/file/import', authenticateToken, authorizationMiddleware(["Admin"]), upload.single('file'), fileController.importGiftFile);

module.exports = router;

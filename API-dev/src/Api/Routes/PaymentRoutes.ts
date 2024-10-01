import express from 'express';
import PaymentController from '../Controllers/PaymentController';

const router = express.Router();

const paymentController = new PaymentController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");



router.post("/payment/:id", authenticateToken, authorizationMiddleware(["Admin"]), paymentController.GetPayosDetail);
router.delete("/payment/:id", authenticateToken, authorizationMiddleware(["Admin"]), paymentController.CancelPayosPayment)
module.exports = router
import express from 'express';
import OrderController from '../Controllers/OrderController';

const router = express.Router();

const orderController = new OrderController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");


// router.post("/roles", roleController.getRoleById.bind(roleController));
// router.post("/roles/create-role", roleController.createRole.bind(roleController));
router.get("/order/save", orderController.SaveOrder);
router.get("/order/my-order", authenticateToken, orderController.GetOrderByUser);
router.delete("/order/my-order/cancel/:orderId", authenticateToken, orderController.CancelOrderByUser);
router.post("/order/my-order/recreate/:orderId", authenticateToken, orderController.RecreateOrderByUser);
// router.post("/role/create-role/", authenticateToken, authorizationMiddleware(["Admin"]), roleController.createRole);

module.exports = router
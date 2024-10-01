import express from 'express';
import SubscriptionController from '../Controllers/SubcriptionController';

const router = express.Router();

const subscriptionController = new SubscriptionController();
const {authenticateToken, authorizationMiddleware} = require("../Middlewares/AuthMiddleware");


// router.post("/roles", roleController.getRoleById.bind(roleController));
// router.post("/roles/create-role", roleController.createRole.bind(roleController));
router.post("/subscription", subscriptionController.CreateSubscription);
router.get("/subscription/:subscriptionId", authenticateToken, subscriptionController.GetSubscriptionById);
router.post("/subscription/purchase/:subscriptionId", authenticateToken, subscriptionController.BuySubscription);
module.exports = router
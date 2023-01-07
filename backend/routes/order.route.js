const express = require("express");

const auth = require("../middlewares/auth.middleware");
const orderController = require("../controllers/order.controller");

const orderRoute = express.Router();

orderRoute.get("/orders", orderController.getOrders);
orderRoute.get("/orders/:id", orderController.getById);
orderRoute.post("/orders", orderController.createOrder);
orderRoute.put("/orders/:id", orderController.updateOrder);
orderRoute.delete("/orders/:id", orderController.deleteOrder);

module.exports = orderRoute;

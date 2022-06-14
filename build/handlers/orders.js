"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const jwtAuth_1 = __importDefault(require("./jwtAuth"));
const store = new orders_1.ordersStore();
const index = async (_req, res, next) => {
    try {
        const orders = await store.index();
        res.json(orders);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res, next) => {
    const order = {
        status: req.body.status,
        user_id: req.body.user_id,
    };
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res, next) => {
    const id = req.params.id;
    try {
        const order = await store.show(parseInt(id));
        res.json(order);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const order = await store.delete(parseInt(id));
        res.json(order);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const addProduct = async (req, res, next) => {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const orders_routes = (app) => {
    app.get("/orders", jwtAuth_1.default, index);
    app.get("/orders/:id", jwtAuth_1.default, show);
    app.post("/orders", jwtAuth_1.default, create);
    app.delete("/orders/:id", jwtAuth_1.default, deleteOrder);
    app.post("/orders/:id/products", jwtAuth_1.default, addProduct);
};
exports.default = orders_routes;

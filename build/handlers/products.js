"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const jwtAuth_1 = __importDefault(require("./jwtAuth"));
const store = new products_1.productsStore();
const index = async (req, res, next) => {
    try {
        const product = await store.index();
        res.json(product);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const newProduct = await store.create(product);
        res.json(newProduct);
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
        const product = await store.show(parseInt(id));
        res.json(product);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const update = async (req, res, next) => {
    const product = {
        id: req.params.id,
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const updatedProduct = await store.update(product);
        res.json(updatedProduct);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await store.delete(parseInt(id));
        res.json(product);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const products_routes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", jwtAuth_1.default, create);
    app.patch("/products/:id", update);
    app.delete("/products/:id", deleteProduct);
};
exports.default = products_routes;

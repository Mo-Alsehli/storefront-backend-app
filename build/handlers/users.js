"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtAuth_1 = __importDefault(require("./jwtAuth"));
dotenv_1.default.config();
const tokenSecret = process.env.TOKEN_SECRET;
const store = new users_1.userModel();
const index = async (_req, res, next) => {
    try {
        const user = await store.index();
        res.json(user);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res, next) => {
    try {
        const id = req.params.id;
        const oneUser = await store.show(id);
        res.json(oneUser);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res, next) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, tokenSecret);
        res.json(token);
        res.send(newUser);
        next();
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authinticate = async (req, res, next) => {
    const existingUser = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const myUser = await store.authinticate(existingUser.username, existingUser.password);
        res.json(myUser);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await store.delete(parseInt(id));
        res.json(user);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const updateUser = async (req, res, next) => {
    const updatedUser = {
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const user = await store.update(updatedUser);
        res.json(user);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const users_routes = (app) => {
    app.get("/users", jwtAuth_1.default, index);
    app.post("/users", create);
    app.get("/users/:id", jwtAuth_1.default, show);
    app.post("/users/authinticate", authinticate);
    app.delete("/users/:id", jwtAuth_1.default, deleteUser);
    app.patch("/users", jwtAuth_1.default, updateUser);
};
exports.default = users_routes;

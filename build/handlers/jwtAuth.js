"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtAuth = (req, res, next) => {
    try {
        const authorizationHead = req.headers.authorization;
        const token = authorizationHead?.split(' ')[1];
        if (token) {
            let result = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
        else {
            res.send('No Token Provided');
            console.log('No Token Provided');
        }
        next();
    }
    catch (error) {
        res.status(401);
        res.json(`Access denied, Invalid token. ${error}`);
        console.log(error);
    }
};
exports.default = jwtAuth;

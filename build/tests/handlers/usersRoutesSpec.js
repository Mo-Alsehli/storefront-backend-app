"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../../database");
const users_1 = require("../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new users_1.userModel();
const request = (0, supertest_1.default)(server_1.default);
var token = "";
describe("Testing The User Routes Status", () => {
    it("User Index Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/users").expect(200);
    });
    it("User Create Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default)
            .post("/users")
            .expect(200);
    });
    it("User Index Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/users").expect(200);
    });
    it("User Show Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/users/1").expect(200);
    });
});
describe("Testing The User API Endpoints", () => {
    afterAll(async () => {
        const conn = await database_1.Client.connect();
        const sql = "DELETE FROM users CASCADE;";
        await conn.query(sql);
        conn.release();
    });
    it("Testing Create EndPoint", async () => {
        token = jsonwebtoken_1.default.sign({
            firstname: "hazem",
            lastname: "reda",
            username: "hazem_reda",
            password: "hazem123",
        }, process.env.TOKEN_SECRET);
        const res = await request
            .post("/users")
            .send({
            firstname: "hazem",
            lastname: "reda",
            username: "hazem_reda",
            password: "hazem123",
        });
        expect(res.status).toBe(200);
    });
    it("Testing Authinticate Endpoint", async () => {
        const res = await request
            .post("/users/authinticate")
            .set("Content-Type", "application/json")
            .send({ username: "hazem", password: "reda" });
        expect(res.status).toBe(200);
    });
    it("Testing Index EndPoint", async () => {
        const res = await request
            .get("/users")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("Testing show EndPoint", async () => {
        const res = await request
            .get("/users/1")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("Testing Delete EndPoint", async () => {
        const res = await request
            .delete("/users/1")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("Testing Update EndPoint", async () => {
        const res = await request
            .patch("/users")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send({
            firstname: "hazem",
            lastname: "alsehli",
            username: "hazem_alsehli",
            password: "hazem123",
        });
        expect(res.status).toBe(200);
    });
});

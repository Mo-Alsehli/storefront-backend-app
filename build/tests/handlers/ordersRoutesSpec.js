"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../../database");
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new orders_1.ordersStore();
const userStore = new users_1.userModel();
const request = (0, supertest_1.default)(server_1.default);
var token = "";
describe("Testing The Order Routes Status", () => {
    it("Order Index Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/orders").expect(200);
    });
    it("Order Create Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).post("/orders").send({ status: "complete", userId: 1 });
    });
    it("Order Index Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/orders").expect(200);
    });
    it("Order Show Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/orders/1").expect(200);
    });
});
describe("Testing The Orders API Endpoints", () => {
    var createUser = {};
    var order = {};
    beforeAll(async () => {
        createUser = await userStore.create({ firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123' });
        token = jsonwebtoken_1.default.sign({ firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123' }, process.env.TOKEN_SECRET);
    });
    afterAll(async () => {
        const conn = await database_1.Client.connect();
        const sql = "DELETE FROM orders CASCADE;";
        await conn.query(sql);
        conn.release();
    });
    it("Testing Create EndPoint", async () => {
        order = {
            status: "active",
            user_id: createUser.id,
        };
        const res = await request
            .post("/orders")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send(order);
        expect(res.status).toBe(200);
    });
    it("Testing Index EndPoint", async () => {
        const res = await request
            .get("/orders")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("Testing show EndPoint", async () => {
        const res = await request
            .get("/orders/1")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("Testing Delete EndPoint", async () => {
        const res = await request
            .delete("/orders/1")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});

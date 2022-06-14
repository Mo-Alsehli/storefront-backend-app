"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../../database");
const products_1 = require("../../models/products");
const users_1 = require("../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new products_1.productsStore();
const userStore = new users_1.userModel();
const request = (0, supertest_1.default)(server_1.default);
var token = "";
describe("Testing The Product Routes Status", () => {
    it("Product Index Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/prodcuts").expect(200);
    });
    it("Product Create Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).post("/produts").send({ name: "test_product", price: 20 });
    });
    it("Product Index Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/products").expect(200);
    });
    it("Product Show Should Return A Success Status", () => {
        (0, supertest_1.default)(server_1.default).get("/products/1").expect(200);
    });
});
describe("Testing The Products API Endpoints", () => {
    afterAll(async () => {
        const conn = await database_1.Client.connect();
        const sql = "DELETE FROM products;";
        await conn.query(sql);
        conn.release();
    });
    beforeAll(async () => {
        let createUser = await userStore.create({ firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123' });
        token = jsonwebtoken_1.default.sign({ firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123' }, process.env.TOKEN_SECRET);
    });
    it("Testing Create EndPoint", async () => {
        const res = await request
            .post("/products")
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send({
            name: "car",
            price: 20000,
        });
        expect(res.status).toBe(200);
    });
    it("Testing Index EndPoint", async () => {
        const res = await request
            .get("/products");
        expect(res.status).toBe(200);
    });
    it("Testing show EndPoint", async () => {
        const res = await request
            .get("/products/1");
        expect(res.status).toBe(200);
    });
    it("Testing Delete EndPoint", async () => {
        const res = await request
            .delete("/products/1");
        expect(res.status).toBe(200);
    });
    it("Testing Update EndPoint", async () => {
        const res = await request
            .patch("/products/2")
            .set("Content-Type", "application/json")
            .send({
            name: "labtop",
            price: 2000,
        });
        expect(res.status).toBe(200);
    });
});

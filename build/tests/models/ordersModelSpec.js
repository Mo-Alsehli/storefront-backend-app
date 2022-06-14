"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../../models/orders");
const database_1 = require("../../database");
const users_1 = require("../../models/users");
const store = new orders_1.ordersStore();
const userStore = new users_1.userModel();
describe("Testing The Methods Exist For Orders", () => {
    it("Testing Index Method Exist", () => {
        expect(store.index).toBeDefined();
    });
    it("Testing show Method Exist", () => {
        expect(store.show).toBeDefined();
    });
    it("Testing create Method Exist", () => {
        expect(store.create).toBeDefined();
    });
    it("Testing delete Method Exist", () => {
        expect(store.delete).toBeDefined();
    });
});
describe("Testing Order Model Logic", () => {
    var createUser = {};
    var order = {};
    beforeAll(async () => {
        createUser = await userStore.create({ firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123' });
    });
    afterAll(async () => {
        const conn = await database_1.Client.connect();
        const sql = "DELETE FROM orders;";
        await conn.query(sql);
        conn.release();
    });
    it("Testing Index Method (Getting All orders) For Order Model", async () => {
        const orders = await store.index();
        expect(orders.length).toBe(0);
    });
    it("Testing Create Method For Order Models", async () => {
        order = { status: "active", user_id: createUser.id };
        const createOrder = await store.create(order);
        order.id = createOrder.id;
        expect(createOrder.status).toBe("active");
    });
    it("Testing Show Method (Getting One Order) For Order Model", async () => {
        const returnedOrder = (await store.show(order.id));
        expect(returnedOrder.status).toBe("active");
    });
    it("Testing Delete Method For Order", async () => {
        const deleted = await store.delete(order.id);
        expect(deleted.status).toBe('active');
    });
});

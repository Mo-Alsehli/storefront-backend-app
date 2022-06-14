"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersStore = void 0;
const database_1 = require("../database");
require("express-async-errors");
class ordersStore {
    // Getting All Existing Products.
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM orders;";
            const result = await conn.query(sql);
            return result.rows;
        }
        catch (error) {
            console.log(`Couldn't Get Orders`);
            throw new Error(`${error}`);
        }
    }
    // Creating A New Product.
    async create(o) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;";
            const result = await conn.query(sql, [o.status, o.user_id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (error) {
            console.log(`Unable To Create A New Order: ${error}`);
            throw new Error(`${error}`);
        }
    }
    // Showing A Specific Product.
    async show(id) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT id, status, user_id FROM orders WHERE id=$1;";
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            return order;
        }
        catch (error) {
            console.log(`Unable To Find Order Of Id: ${id}`);
            throw new Error(`${error}`);
        }
    }
    // Deleting A Specific Product.
    async delete(id) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "DELETE FROM orders WHERE id=$1 RETURNING id, status, user_id;";
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (error) {
            console.log(`Unable To Delete Order With Id: ${id}`);
            throw new Error(`${error}`);
        }
    }
    // Adding A Product To A Specific Order.
    async addProduct(quantity, orderId, productId) {
        // First Checking If The Order We Are Adding Products To Is Active Or Complete.
        try {
            const ordersql = "SELECT * FROM orders WHERE id=($1)";
            const conn = await database_1.Client.connect();
            const result = await conn.query(ordersql, [orderId]);
            const order = result.rows[0];
            if (order.status !== "active") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
            }
            conn.release();
        }
        catch (err) {
            throw new Error(`${err}`);
        }
        // Then Adding The Product If The Order Is Still Active.
        try {
            const conn = await database_1.Client.connect();
            const sql = "INSERT INTO order_products (quantity, ordersId, productsId) VALUES ($1, $2, $3) RETURNING *;";
            const result = await conn.query(sql, [quantity, orderId, productId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Couldn't Add Product With Id: ${productId}`);
        }
    }
}
exports.ordersStore = ordersStore;

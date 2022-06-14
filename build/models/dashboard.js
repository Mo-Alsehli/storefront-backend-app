"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = require("../database");
class DashboardQueries {
    // Get all users that have made orders
    async usersWithOrders() {
        try {
            const conn = await database_1.Client.connect();
            const sql = 'SELECT firstname, lastname FROM users INNER JOIN orders ON users.id = orders.userId';
            const result = await conn.query(sql);
            const users = result.rows;
            conn.release();
            return users;
        }
        catch (error) {
            throw new Error(`unable get users with orders: ${error}`);
        }
    }
    async getProductsInOrders() {
        try {
            const conn = await database_1.Client.connect();
            const sql = 'SELECT name, price FROM products INNER JOIN order_products ON products.id = order_products.productsId;';
            const result = await conn.query(sql);
            const products = result.rows;
            return products;
        }
        catch (error) {
            throw new Error(`Couldn't Get Products In The Order: ${error}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsStore = void 0;
const database_1 = require("../database");
class productsStore {
    // Getting All Existing Products.
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM products;";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            console.log(`Couldn't Get Products`);
            throw new Error(`${error}`);
        }
    }
    // Creating A New Product.
    async create(p) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *;";
            const result = await conn.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (error) {
            console.log(`Unable To Create A New Product`);
            throw new Error(`${error}`);
        }
    }
    // Showing A Specific Product.
    async show(id) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT id, name, price FROM products WHERE id=$1;";
            const reslut = await conn.query(sql, [id]);
            const product = reslut.rows[0];
            conn.release();
            return product;
        }
        catch (error) {
            console.log(`Unable To Find Product Of Id: ${id}`);
            throw new Error(`${error}`);
        }
    }
    // Deleting A Specific Product.
    async delete(id) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "DELETE FROM products WHERE id=$1 RETURNING id, name, price;";
            const reslut = await conn.query(sql, [id]);
            conn.release();
            return reslut.rows[0];
        }
        catch (error) {
            console.log(`Unable To Delete Product With Id: ${id}`);
            throw new Error(`${error}`);
        }
    }
    // Updating A Product
    async update(p) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING id, name, price;";
            const result = await conn.query(sql, [p.name, p.price, p.id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            console.log(`Couldn't Update User With Id: ${p.id}`);
            console.log(error);
        }
    }
}
exports.productsStore = productsStore;

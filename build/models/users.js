"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const database_1 = require("../database");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
const saltRounds = SALT_ROUNDS;
const pepper = BCRYPT_PASSWORD;
class userModel {
    // Getting Users Method
    async index() {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT * FROM users;";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get Users ${err}`);
        }
    }
    //Getting One User.
    async show(id) {
        try {
            const conn = await database_1.Client.connect();
            const sql = "SELECT id, firstname, lastname, username FROM users WHERE id=$1;";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            console.log(`Couldn't Get User With id: ${id}`);
            console.log(error);
        }
    }
    // Creating new user method.
    async create(u) {
        try {
            const conn = await database_1.Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES ( $1, $2, $3, $4) RETURNING *;';
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (error) {
            console.error(error);
        }
    }
    // Authinticating User Method.
    async authinticate(username, password) {
        try {
            const conn = await database_1.Client.connect();
            const sql = 'SELECT password FROM users WHERE username=$1;';
            const result = await conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    const sql = 'SELECT firstname, lastname, username FROM users WHERE username=$1;';
                    const userInfo = await conn.query(sql, [username]);
                    return userInfo.rows[0];
                }
            }
            conn.release();
            return null;
        }
        catch (error) {
            console.log(`couldn't get user: ${username}`);
            console.log(error);
        }
    }
    // Deleting A User Method   
    async delete(id) {
        try {
            const conn = await database_1.Client.connect();
            const sql = 'DELETE FROM users where id=$1 RETURNING id, firstname, lastname, username;';
            const result = await conn.query(sql, [id]);
            return result.rows[0];
        }
        catch (error) {
            console.log(`Couldn't Delete User With id: ${id}`);
            console.log(error);
        }
    }
    // Updating A User
    async update(u) {
        try {
            const conn = await database_1.Client.connect();
            const sql = 'UPDATE users SET firstname=$1, lastname=$2, username=$3, password=$4 WHERE id=$5 RETURNING id, firstname, lastname, username;';
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash, u.id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            console.log(`Couldn't Update User With Id: ${u.id}`);
            console.log(error);
        }
    }
}
exports.userModel = userModel;

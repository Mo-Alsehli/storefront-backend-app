import {Client} from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const {SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;
const saltRounds = SALT_ROUNDS as string;
const pepper = BCRYPT_PASSWORD;

export type User =  {
    id?:number;
    firstname:string;
    lastname:string;
    username: string;
    password: string;
}

export class userModel {
    // Getting Users Method
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM users;";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get Users ${err}`);
        }
}
    //Getting One User.
    async show(id: number): Promise<User | undefined>{
        try {
            const conn = await Client.connect();
            const sql = "SELECT id, firstname, lastname, username FROM users WHERE id=$1;";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            console.log(`Couldn't Get User With id: ${id}`);
            console.log(error);
        }
    }
    // Creating new user method.
    async create(u: User){
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES ( $1, $2, $3, $4) RETURNING *;'
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))

            const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash])
            const user: User = result.rows[0];
             
            conn.release();
            return user;
        } catch (error) {
            console.error(error);
        }
    }
    // Authinticating User Method.
    async authinticate(username: string, password: string) {    
        try {
            const conn = await Client.connect();
            const sql = 'SELECT password FROM users WHERE username=$1;';
            const result = await conn.query(sql, [username]);
            if(result.rows.length){
                const user = result.rows[0];
                if(bcrypt.compareSync(password + pepper, user.password)){
                    const sql = 'SELECT firstname, lastname, username FROM users WHERE username=$1;';
                    const userInfo = await conn.query(sql, [username]);
                    return userInfo.rows[0];
                }
            }
                conn.release();
                return null;
        } catch (error) {
            console.log(`couldn't get user: ${username}`);
            console.log(error);
        }
    }

    // Deleting A User Method   
   async delete(id: number) {
       try {
           const conn = await Client.connect();
           const sql = 'DELETE FROM users where id=$1 RETURNING id, firstname, lastname, username;';
           const result = await conn.query(sql, [id]);
           return result.rows[0];
       } catch (error) {
           console.log(`Couldn't Delete User With id: ${id}`);
           console.log(error);
       }
   }

   // Updating A User
   async update( u: User) {
       try {
           const conn = await Client.connect();
           const sql = 'UPDATE users SET firstname=$1, lastname=$2, username=$3, password=$4 WHERE id=$5 RETURNING id, firstname, lastname, username;';
           const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
           const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash, u.id]);
           conn.release();
           return result.rows[0];
       } catch (error) {
           console.log(`Couldn't Update User With Id: ${u.id}`);
           console.log(error);
       }
   }
}

import app from "../../server";
import supertest from "supertest";
import { Client } from "../../database";
import { Order, ordersStore } from "../../models/orders";
import { User, userModel } from "../../models/users";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const store = new ordersStore();
const userStore = new userModel();
const request = supertest(app);
var token = "";

describe("Testing The Order Routes Status", () => {
  it("Order Index Should Return A Success Status", () => {
    supertest(app).get("/orders").expect(200);
  });

  it("Order Create Should Return A Success Status", () => {
    supertest(app).post("/orders").send({ status: "complete", userId: 1 });
  });

  it("Order Index Should Return A Success Status", () => {
    supertest(app).get("/orders").expect(200);
  });

  it("Order Show Should Return A Success Status", () => {
    supertest(app).get("/orders/1").expect(200);
  });
});

 describe("Testing The Orders API Endpoints", () => {
    var createUser = {} as User;
    var order = {} as Order;
 
   beforeAll(async () => {
      createUser = await userStore.create({firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123'} as User) as User;
      token = jwt.sign({firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123'}, process.env.TOKEN_SECRET as unknown as string)
     });

  afterAll(async () => {
    const conn = await Client.connect();
    const sql = "DELETE FROM orders CASCADE;";
    await conn.query(sql);
    conn.release();
  });
  
  it("Testing Create EndPoint", async () => {
      order = {
        status: "active",
        user_id: createUser.id as number,
      } as unknown as Order;
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
      .set("Authorization", `Bearer ${token}`)
      ;

    expect(res.status).toBe(200);
  });

  it("Testing show EndPoint", async () => {
    const res = await request
      .get("/orders/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      ;

    expect(res.status).toBe(200);
  });

  it("Testing Delete EndPoint", async () => {
    const res = await request
      .delete("/orders/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      ;

    expect(res.status).toBe(200);
  });
});
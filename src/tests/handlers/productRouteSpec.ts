import app from "../../server";
import supertest from "supertest";
import { Client } from "../../database";
import { Product, productsStore } from "../../models/products";
import { User, userModel } from "../../models/users";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new productsStore();
const userStore = new userModel();
const request = supertest(app);
var token = "";

describe("Testing The Product Routes Status", () => {
  it("Product Index Should Return A Success Status", () => {
    supertest(app).get("/prodcuts").expect(200);
  });

  it("Product Create Should Return A Success Status", () => {
    supertest(app).post("/produts").send({ name: "test_product", price: 20 });
  });

  it("Product Index Should Return A Success Status", () => {
    supertest(app).get("/products").expect(200);
  });

  it("Product Show Should Return A Success Status", () => {
    supertest(app).get("/products/1").expect(200);
  });
});

describe("Testing The Products API Endpoints", () => {

  afterAll(async () => {
    const conn = await Client.connect();
    const sql = "DELETE FROM products;";
    await conn.query(sql);
    conn.release();
  });

  beforeAll(async () => {
    let createUser = await userStore.create({firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123'} as User) as User;
    token = jwt.sign({firstname: 'mo', lastname: 'magdi', username: 'mo_magdi', password: 'mo123'}, process.env.TOKEN_SECRET as unknown as string)
   });

  it("Testing Create EndPoint", async () => {
    const res = await request
      .post("/products")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "car",
        price: 20000,
      } as unknown as Product);
    expect(res.status).toBe(200);
  });

  it("Testing Index EndPoint", async () => {
    const res = await request
      .get("/products")

    expect(res.status).toBe(200);
  });

  it("Testing show EndPoint", async () => {
    const res = await request
      .get("/products/1")

    expect(res.status).toBe(200);
  });

   it("Testing Delete EndPoint", async () => {
    const res = await request
      .delete("/products/1")

    expect(res.status).toBe(200);
  });

  it("Testing Update EndPoint", async () => {
    const res = await request
      .patch("/products/2")
      .set("Content-Type", "application/json")
      .send({
        name: "labtop",
        price: 2000,
      } as unknown as Product);
    expect(res.status).toBe(200);
  }); 
});
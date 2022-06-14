import app from "../../server";
import supertest from "supertest";
import { Client } from "../../database";
import { User, userModel } from "../../models/users";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const store = new userModel();
const request = supertest(app);
var token = "";

describe("Testing The User Routes Status", () => {
  it("User Index Should Return A Success Status", () => {
    supertest(app).get("/users").expect(200);
  });

  it("User Create Should Return A Success Status", () => {
    supertest(app)
      .post("/users")
      .expect(200);
  });

  it("User Index Should Return A Success Status", () => {
    supertest(app).get("/users").expect(200);
  });

  it("User Show Should Return A Success Status", () => {
    supertest(app).get("/users/1").expect(200);
  });
});

describe("Testing The User API Endpoints", () => {

afterAll(async () => {
    const conn = await Client.connect();
   const sql = "DELETE FROM users CASCADE;";
    await conn.query(sql);
    conn.release();
});

  it("Testing Create EndPoint", async () => {
    token = jwt.sign({
      firstname: "hazem",
      lastname: "reda",
      username: "hazem_reda",
      password: "hazem123",
    }, process.env.TOKEN_SECRET as unknown as string);
    const res = await request
      .post("/users")
      .send({
        firstname: "hazem",
        lastname: "reda",
        username: "hazem_reda",
        password: "hazem123",
      } as unknown as User);
    expect(res.status).toBe(200);
  });

  it("Testing Authinticate Endpoint", async () => {
    const res = await request
      .post("/users/authinticate")
      .set("Content-Type", "application/json")
      .send({ username: "hazem", password: "reda" });
    expect(res.status).toBe(200);
  });

  it("Testing Index EndPoint", async () => {
    const res = await request
      .get("/users")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("Testing show EndPoint", async () => {
    const res = await request
      .get("/users/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("Testing Delete EndPoint", async () => {
    const res = await request
      .delete("/users/1")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("Testing Update EndPoint", async () => {
    const res = await request
      .patch("/users")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstname: "hazem",
        lastname: "alsehli",
        username: "hazem_alsehli",
        password: "hazem123",
      } as unknown as User);
    expect(res.status).toBe(200);
  });
});

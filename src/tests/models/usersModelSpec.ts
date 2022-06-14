import { Client } from "../../database";
import { User, userModel } from "../../models/users";


const store = new userModel();

describe("Testing The Methods Exist For Users", () => {
  it("Testing Index Method Exist", () => {
    expect(store.index).toBeDefined();
  });

  it("Testing show Method Exist", () => {
    expect(store.show).toBeDefined();
  });

  it("Testing create Method Exist", () => {
    expect(store.create).toBeDefined();
  });

  it("Testing Authinticate Method Exist", () => {
    expect(store.authinticate).toBeDefined();
  });

  it("Testing delete Method Exist", () => {
    expect(store.delete).toBeDefined();
  });
});

let user = {
  firstname: "mohamed",
  lastname: "magdi",
  username: "mohamed_magdi",
  password: "mohamed123",
} as User;


describe("Testing User Model Logic", () => {

  beforeAll(async () => {
      const create = await store.create(user) as User;
       user.id =  create.id;
  });

  afterAll(async () => {
      const conn = await Client.connect();
     const sql = "DELETE FROM users CASCADE;";
      await conn.query(sql);
      conn.release();
  });
  it("Testing Index Method (Getting All Users) For Users", async () => {
      const users = await store.index();
      expect(users.length).toBeGreaterThan(1);
  });

  it("Testing Create Method For Users", async () => {
      const newUser = {
        firstname: "hazem",
        lastname: "reda",
        username: "hazem_reda",
        password: "hazem123",
      } as User;
      const createUser = await store.create(newUser) as User;
      newUser.id = createUser.id;
      expect(createUser.firstname).toEqual("hazem");
      expect(createUser.lastname).toEqual("reda");
      expect(createUser.username).toEqual("hazem_reda");
  });

  it("Testing Show Method (Getting One User) For Users", async () => {
      const returnedUser = await store.show(user.id as number) as User;
      expect(returnedUser.firstname).toEqual("mohamed");
      expect(returnedUser.lastname).toEqual("magdi");
      expect(returnedUser.username).toEqual("mohamed_magdi");
  });

  it("Testing Authiticate Method For Users", async () => {
      const authinticated = await store.authinticate(
        user.username,
        user.password
      ) as User;
      expect(authinticated.firstname).toEqual("mohamed");
      expect(authinticated.lastname).toEqual("magdi");
      expect(authinticated.username).toEqual("mohamed_magdi");
  });
 
   it("Testing Delete Method For Users", async() => {
      const deleted = await store.delete(user.id as number) as User;
      expect(deleted.firstname).toEqual("mohamed");
      expect(deleted.lastname).toEqual("magdi");
      expect(deleted.username).toEqual("mohamed_magdi");
  });

  it("Testing Update Method For Users", async() => {
      const updated: User = {
        id: user.id as number + 1,
        firstname: "Hazem",
        lastname: "Alsehli",
        username: "hazem_alsehli",
        password: "hazem123",
      };
      const UpdatedUser = await store.update(updated) as User;
      expect(UpdatedUser.firstname).toBe("Hazem");
      expect(UpdatedUser.lastname).toBe("Alsehli");
      expect(UpdatedUser.username).toBe("hazem_alsehli");
    });
});



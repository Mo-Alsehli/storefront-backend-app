import express, { NextFunction, Request, Response } from "express";
import { User, userModel } from "../models/users";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import jwtAuth from './jwtAuth';

dotenv.config();
const tokenSecret: string = process.env.TOKEN_SECRET as unknown as string;
const store = new userModel();

const index = async (_req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await store.index();
    res.json(user);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const id = req.params.id as unknown as number;
    const oneUser = await store.show(id);

    res.json(oneUser);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response, next:NextFunction) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
    res.send(newUser);
    next();
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authinticate = async (req: Request, res: Response, next:NextFunction) => {
  const existingUser = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const myUser = await store.authinticate(
      existingUser.username,
      existingUser.password
    );
    res.json(myUser);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deleteUser = async (req: Request, res: Response, next:NextFunction) => {
  const id = req.params.id;
  try {
    const user = await store.delete(parseInt(id));

    res.json(user);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const updateUser = async (req: Request, res: Response, next:NextFunction) => {
  const updatedUser: User = {
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await store.update(updatedUser);
    res.json(user);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const users_routes = (app: express.Application) => {
  app.get("/users",jwtAuth, index);
  app.post("/users", create);
  app.get("/users/:id",jwtAuth, show);
  app.post("/users/authinticate", authinticate);
  app.delete("/users/:id", jwtAuth, deleteUser);
  app.patch("/users", jwtAuth, updateUser);
};

export default users_routes;

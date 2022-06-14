import express, { NextFunction, Request, Response } from "express";
import { Product, productsStore } from "../models/products";
import jwtAuth from './jwtAuth';

const store = new productsStore();

const index = async (req: Request, res: Response, next:Function) => {
  try {
    const product = await store.index();
    res.json(product);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const create = async (req: Request, res: Response, next:NextFunction) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const show = async (req: Request, res: Response, next:NextFunction) => {
  const id = req.params.id;
  try {
    const product = await store.show(parseInt(id));
    res.json(product);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const update = async (req: Request, res: Response, next:NextFunction) => {
  const product: Product = {
    id: req.params.id as unknown as number,
    name: req.body.name,
    price: req.body.price as unknown as number,
  };
  try {
    const updatedProduct = await store.update(product);
    res.json(updatedProduct);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const deleteProduct = async (req: Request, res: Response, next:NextFunction) => {
  const id = req.params.id;
  try {
    const product = await store.delete(parseInt(id));
    res.json(product);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const products_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products",jwtAuth,  create);
  app.patch("/products/:id", update);
  app.delete("/products/:id", deleteProduct);
};

export default products_routes;

import express, { NextFunction, Request, Response } from "express";
import { Order, ordersStore } from "../models/orders";
import jwtAuth from './jwtAuth';


const store = new ordersStore();

const index = async (_req: Request, res: Response, next:NextFunction) => {
  try {
    const orders = await store.index();
    res.json(orders);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const create = async (req: Request, res: Response, next: NextFunction) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id,
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const show = async (req: Request, res: Response, next:NextFunction) => {
  const id = req.params.id;
  try {
    const order = await store.show(parseInt(id));
    res.json(order);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const deleteOrder = async (req: Request, res: Response, next:NextFunction) => {
  const id = req.params.id;
  try {
    const order = await store.delete(parseInt(id));
    res.json(order);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response, next:NextFunction) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);

    res.json(addedProduct);
    next();
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const orders_routes = (app: express.Application) => {
  app.get("/orders", jwtAuth,  index);
  app.get("/orders/:id", jwtAuth, show);
  app.post("/orders", jwtAuth, create);
  app.delete("/orders/:id", jwtAuth, deleteOrder);
  app.post("/orders/:id/products", jwtAuth, addProduct);
};

export default orders_routes;

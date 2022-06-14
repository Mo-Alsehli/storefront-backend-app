import express, {Request, Response} from 'express';
import {DashboardQueries} from '../models/dashboard';

const store = new DashboardQueries();

const getUsersWithOrders = async (_req: Request, res: Response) =>{
    try {
        const usersWithOrders = await store.usersWithOrders();
        res.json(usersWithOrders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getProductsInOrders = async(_req: Request, res: Response) =>{
    try {
        const productsInOrders = await store.getProductsInOrders();
        res.json(productsInOrders);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}


const dashboard_routes = (app: express.Application)=>{
    app.get('/dashboard/users_orders', getUsersWithOrders);
    app.get('/dashboard/products_orders', getProductsInOrders);
}

export default dashboard_routes;
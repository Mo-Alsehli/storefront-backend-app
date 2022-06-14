"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../models/dashboard");
const store = new dashboard_1.DashboardQueries();
const getUsersWithOrders = async (_req, res) => {
    try {
        const usersWithOrders = await store.usersWithOrders();
        res.json(usersWithOrders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const getProductsInOrders = async (_req, res) => {
    try {
        const productsInOrders = await store.getProductsInOrders();
        res.json(productsInOrders);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const dashboard_routes = (app) => {
    app.get('/dashboard/users_orders', getUsersWithOrders);
    app.get('/dashboard/products_orders', getProductsInOrders);
};
exports.default = dashboard_routes;

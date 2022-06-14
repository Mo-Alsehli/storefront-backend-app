CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    ordersId bigint REFERENCES orders(id),
    productsId bigint REFERENCES products(id)
);
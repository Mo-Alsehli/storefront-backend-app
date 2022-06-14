import {Client} from '../database';

export class DashboardQueries {
  // Get all users that have made orders
  async usersWithOrders(): Promise<{firstName: string, lastName: string}[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT firstname, lastname FROM users INNER JOIN orders ON users.id = orders.userId';

      const result = await conn.query(sql)
      const users = result.rows;
      conn.release()

      return users;
    } catch (error) {
      throw new Error(`unable get users with orders: ${error}`)
    } 
  }

  async getProductsInOrders():Promise<{ name: string; price: string; }[]> {
      try {
          const conn = await Client.connect();
          const sql = 'SELECT name, price FROM products INNER JOIN order_products ON products.id = order_products.productsId;';
          const result = await conn.query(sql);
          const products = result.rows;
          return products;
          
      } catch (error) {
          throw new Error(`Couldn't Get Products In The Order: ${error}`)
      }
  }
}


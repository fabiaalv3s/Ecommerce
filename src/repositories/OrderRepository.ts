import { Pool } from 'pg';
import { Database } from '../database/database';
import { IOrderRepository } from './IOrderRepository';
import { OrderCreateDTO, OrderResponseDTO, OrderItem } from '../models/Order';
import { ProductRepository } from './ProductRepository';

export class OrderRepository implements IOrderRepository {
  private _pool: Pool | null = null;
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  private get pool(): Pool {
    if (!this._pool) {
      this._pool = Database.getPool();
    }
    return this._pool;
  }

  async create(orderData: OrderCreateDTO): Promise<OrderResponseDTO> {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      // Calculate total amount
      let totalAmount = 0;
      for (const item of orderData.items) {
        const product = await this.productRepository.findById(item.product_id);
        if (!product) {
          throw new Error(`Product with id ${item.product_id} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
        totalAmount += product.price * item.quantity;
      }

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders (user_id, total_amount, status) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [orderData.user_id, totalAmount, 'pending']
      );
      const order = orderResult.rows[0];

      // Create order items and update stock
      const orderItems: OrderItem[] = [];
      for (const item of orderData.items) {
        const product = await this.productRepository.findById(item.product_id);
        if (!product) continue;

        const itemResult = await client.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price) 
           VALUES ($1, $2, $3, $4) 
           RETURNING *`,
          [order.id, item.product_id, item.quantity, product.price]
        );
        orderItems.push(itemResult.rows[0]);

        // Update product stock
        await client.query(
          `UPDATE products SET stock = stock - $1 WHERE id = $2`,
          [item.quantity, item.product_id]
        );
      }

      await client.query('COMMIT');

      return {
        ...order,
        items: orderItems,
      };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<OrderResponseDTO | null> {
    const orderResult = await this.pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderResult.rows.length === 0) {
      return null;
    }

    const order = orderResult.rows[0];
    const itemsResult = await this.pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [id]
    );

    return {
      ...order,
      items: itemsResult.rows,
    };
  }

  async findByUserId(userId: number): Promise<OrderResponseDTO[]> {
    const ordersResult = await this.pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    const orders: OrderResponseDTO[] = [];
    for (const order of ordersResult.rows) {
      const itemsResult = await this.pool.query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [order.id]
      );
      orders.push({
        ...order,
        items: itemsResult.rows,
      });
    }

    return orders;
  }

  async findAll(): Promise<OrderResponseDTO[]> {
    const ordersResult = await this.pool.query(
      'SELECT * FROM orders ORDER BY created_at DESC'
    );

    const orders: OrderResponseDTO[] = [];
    for (const order of ordersResult.rows) {
      const itemsResult = await this.pool.query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [order.id]
      );
      orders.push({
        ...order,
        items: itemsResult.rows,
      });
    }

    return orders;
  }

  async updateStatus(id: number, status: string): Promise<OrderResponseDTO | null> {
    const result = await this.pool.query(
      `UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];
    const itemsResult = await this.pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [id]
    );

    return {
      ...order,
      items: itemsResult.rows,
    };
  }
}



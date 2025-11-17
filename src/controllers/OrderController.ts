import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { AuthRequest } from '../middleware/auth.middleware';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  /**
   * @swagger
   * /api/orders:
   *   post:
   *     summary: Create a new order
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - items
   *             properties:
   *               items:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     product_id:
   *                       type: integer
   *                     quantity:
   *                       type: integer
   *     responses:
   *       201:
   *         description: Order created successfully
   */
  create = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const orderData = {
        user_id: req.user.id,
        items: req.body.items,
      };

      const order = await this.orderService.createOrder(orderData);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  /**
   * @swagger
   * /api/orders/{id}:
   *   get:
   *     summary: Get order by ID
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Order found
   */
  getById = async (req: Request, res: Response) => {
    try {
      const order = await this.orderService.getOrderById(parseInt(req.params.id));
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  /**
   * @swagger
   * /api/orders/user/{userId}:
   *   get:
   *     summary: Get orders by user ID
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of orders
   */
  getByUserId = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const userId = parseInt(req.params.userId);
      
      // Users can only see their own orders unless they're admin
      if (req.user.id !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      const orders = await this.orderService.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  /**
   * @swagger
   * /api/orders:
   *   get:
   *     summary: Get all orders (admin only)
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of all orders
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  /**
   * @swagger
   * /api/orders/{id}/status:
   *   put:
   *     summary: Update order status
   *     tags: [Orders]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *     responses:
   *       200:
   *         description: Order status updated
   */
  updateStatus = async (req: Request, res: Response) => {
    try {
      const order = await this.orderService.updateOrderStatus(
        parseInt(req.params.id),
        req.body.status
      );
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}



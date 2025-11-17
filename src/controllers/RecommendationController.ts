import { Request, Response } from 'express';
import { RecommendationService } from '../services/RecommendationService';
import { AuthRequest } from '../middleware/auth.middleware';

export class RecommendationController {
  private recommendationService: RecommendationService;

  constructor() {
    this.recommendationService = new RecommendationService();
  }

  /**
   * @swagger
   * /api/recommendations/user/{userId}:
   *   get:
   *     summary: Get product recommendations for a user
   *     tags: [Recommendations]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: integer
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *     responses:
   *       200:
   *         description: List of recommended products
   */
  getForUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

      const recommendations = await this.recommendationService.getRecommendationsForUser(
        userId,
        limit
      );
      res.json(recommendations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  /**
   * @swagger
   * /api/recommendations/similar/{productId}:
   *   get:
   *     summary: Get similar products to a given product
   *     tags: [Recommendations]
   *     parameters:
   *       - in: path
   *         name: productId
   *         required: true
   *         schema:
   *           type: integer
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 5
   *     responses:
   *       200:
   *         description: List of similar products
   */
  getSimilar = async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

      const similar = await this.recommendationService.getSimilarProducts(productId, limit);
      res.json(similar);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}



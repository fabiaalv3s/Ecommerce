import { Router } from 'express';
import { RecommendationController } from '../controllers/RecommendationController';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const recommendationController = new RecommendationController();

// Routes
router.get('/user/:userId', authenticate, recommendationController.getForUser);
router.get('/similar/:productId', recommendationController.getSimilar);

export { router as recommendationRoutes };





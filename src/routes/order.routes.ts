import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();
const orderController = new OrderController();

// Routes - IMPORTANTE: rotas específicas antes de rotas com parâmetros
router.post('/', authenticate, orderController.create);
router.get('/user/:userId', authenticate, orderController.getByUserId);
router.get('/', authenticate, authorize('admin'), orderController.getAll);
router.put('/:id/status', authenticate, orderController.updateStatus);
router.get('/:id', authenticate, orderController.getById);

export { router as orderRoutes };



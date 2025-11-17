import { Router } from 'express';
import { ChatbotController } from '../controllers/ChatbotController';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const chatbotController = new ChatbotController();

// Routes
router.post('/message', authenticate, chatbotController.sendMessage);

export { router as chatbotRoutes };



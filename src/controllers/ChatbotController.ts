import { Request, Response } from 'express';
import { ChatbotService } from '../services/ChatbotService';
import { AuthRequest } from '../middleware/auth.middleware';

export class ChatbotController {
  private chatbotService: ChatbotService;

  constructor() {
    this.chatbotService = new ChatbotService();
  }

  /**
   * @swagger
   * /api/chatbot/message:
   *   post:
   *     summary: Send a message to the chatbot
   *     tags: [Chatbot]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - message
   *             properties:
   *               message:
   *                 type: string
   *     responses:
   *       200:
   *         description: Chatbot response
   */
  sendMessage = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { message } = req.body;
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Message is required and must be a non-empty string' });
      }

      const response = await this.chatbotService.processMessage(req.user.id, message.trim());
      res.json({ response });
    } catch (error: any) {
      console.error('Chatbot Controller Error:', error);
      // Sempre retornar uma resposta válida, mesmo em caso de erro
      res.status(500).json({ 
        error: error.message || 'Error processing message',
        response: 'Desculpe, ocorreu um erro. Por favor, tente novamente.'
      });
    }
  };
}



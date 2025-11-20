import OpenAI from 'openai';
import { ProductRepository } from '../repositories/ProductRepository';
import { OrderRepository } from '../repositories/OrderRepository';

export class ChatbotService {
  private openai: OpenAI;
  private productRepository: ProductRepository;
  private orderRepository: OrderRepository;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️  OPENAI_API_KEY não configurada. O chatbot funcionará em modo fallback.');
    }
    this.openai = new OpenAI({
      apiKey: apiKey || 'dummy-key',
    });
    this.productRepository = new ProductRepository();
    this.orderRepository = new OrderRepository();
  }

  async processMessage(userId: number, message: string): Promise<string> {
    try {
      // Get context about user's orders and available products
      const userOrders = await this.orderRepository.findByUserId(userId);
      const products = await this.productRepository.findAll();

      // Create context for the chatbot
      const context = this.buildContext(userOrders, products);

      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy-key') {
        console.log('🤖 [CHATBOT] Modo FALLBACK ativado - OpenAI API não configurada');
        return this.getFallbackResponse(message, products, userOrders);
      }

      try {
        console.log('🤖 [CHATBOT] Usando OpenAI API (GPT-3.5-turbo)...');
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Você é um assistente virtual de uma loja de e-commerce. 
              Você ajuda clientes com informações sobre produtos, pedidos e perguntas gerais.
              Seja amigável, conciso e prestativo. Responda sempre em português brasileiro.
              ${context}`,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        });

        const aiResponse = completion.choices[0].message.content || 'Desculpe, não consegui processar sua mensagem.';
        console.log('✅ [CHATBOT] Resposta da IA recebida com sucesso');
        return aiResponse;
      } catch (openaiError: any) {
        console.error('❌ [CHATBOT] Erro na OpenAI API:', openaiError.message);
        console.log('🔄 [CHATBOT] Alternando para modo FALLBACK devido ao erro');
        // Se erro da API, usar fallback
        return this.getFallbackResponse(message, products, userOrders);
      }
    } catch (error: any) {
      console.error('Chatbot Service Error:', error);
      return 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.';
    }
  }

  private getFallbackResponse(message: string, products: any[], userOrders: any[]): string {
    const lowerMessage = message.toLowerCase();
    
    // Respostas inteligentes baseadas em palavras-chave
    if (lowerMessage.includes('produto') || lowerMessage.includes('product') || lowerMessage.includes('comprar')) {
      const categories = [...new Set(products.map(p => p.category))];
      return `Temos ${products.length} produtos disponíveis nas categorias: ${categories.join(', ')}. Você pode navegar pelos produtos na página de produtos ou me dizer o que está procurando!`;
    }
    
    if (lowerMessage.includes('pedido') || lowerMessage.includes('order') || lowerMessage.includes('compra')) {
      if (userOrders.length === 0) {
        return 'Você ainda não realizou nenhum pedido. Que tal começar a comprar?';
      }
      return `Você tem ${userOrders.length} pedido(s). Você pode ver seus pedidos na página "Meus Pedidos". Posso ajudá-lo com mais informações sobre algum pedido específico?`;
    }

    if (lowerMessage.includes('carrinho') || lowerMessage.includes('cart')) {
      return 'Você pode adicionar produtos ao carrinho clicando no botão "Adicionar ao Carrinho" na página do produto. Depois, acesse o carrinho pelo menu superior.';
    }

    if (lowerMessage.includes('categoria') || lowerMessage.includes('category')) {
      const categories = [...new Set(products.map(p => p.category))];
      return `Nossas categorias são: ${categories.join(', ')}. Qual categoria você gostaria de explorar?`;
    }

    if (lowerMessage.includes('preço') || lowerMessage.includes('price') || lowerMessage.includes('barato')) {
      const cheapest = products.sort((a, b) => Number(a.price) - Number(b.price))[0];
      if (cheapest) {
        return `Nosso produto mais barato é ${cheapest.name} por R$ ${Number(cheapest.price).toFixed(2)}. Quer ver mais produtos?`;
      }
    }

    // Resposta padrão
    return `Olá! Posso ajudá-lo com informações sobre produtos, pedidos, categorias e muito mais. O que você gostaria de saber?`;
  }

  private buildContext(orders: any[], products: any[]): string {
    let context = `\n\nContexto da loja:\n`;
    context += `- Total de produtos disponíveis: ${products.length}\n`;
    context += `- Categorias: ${[...new Set(products.map(p => p.category))].join(', ')}\n`;
    
    if (orders.length > 0) {
      context += `- Total de pedidos do usuário: ${orders.length}\n`;
      const totalSpent = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
      context += `- Total gasto: R$ ${totalSpent.toFixed(2)}\n`;
    }

    context += `\nProdutos em destaque:\n`;
    products.slice(0, 5).forEach((product, index) => {
      const price = Number(product.price || 0);
      context += `${index + 1}. ${product.name} - R$ ${price.toFixed(2)} (${product.category})\n`;
    });

    return context;
  }
}



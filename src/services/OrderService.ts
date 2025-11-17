import { IOrderRepository } from '../repositories/IOrderRepository';
import { OrderRepository } from '../repositories/OrderRepository';
import { OrderCreateDTO, OrderResponseDTO } from '../models/Order';
import { UserInteractionRepository } from '../repositories/UserInteractionRepository';

export class OrderService {
  private orderRepository: IOrderRepository;
  private interactionRepository: UserInteractionRepository;

  constructor(
    orderRepository?: IOrderRepository,
    interactionRepository?: UserInteractionRepository
  ) {
    this.orderRepository = orderRepository || new OrderRepository();
    this.interactionRepository = interactionRepository || new UserInteractionRepository();
  }

  async createOrder(orderData: OrderCreateDTO): Promise<OrderResponseDTO> {
    const order = await this.orderRepository.create(orderData);

    // Record interactions for ML
    for (const item of order.items) {
      await this.interactionRepository.create({
        user_id: orderData.user_id,
        product_id: item.product_id,
        interaction_type: 'purchase',
      });
    }

    return order;
  }

  async getOrderById(id: number): Promise<OrderResponseDTO | null> {
    return await this.orderRepository.findById(id);
  }

  async getOrdersByUserId(userId: number): Promise<OrderResponseDTO[]> {
    return await this.orderRepository.findByUserId(userId);
  }

  async getAllOrders(): Promise<OrderResponseDTO[]> {
    return await this.orderRepository.findAll();
  }

  async updateOrderStatus(id: number, status: string): Promise<OrderResponseDTO | null> {
    return await this.orderRepository.updateStatus(id, status);
  }
}



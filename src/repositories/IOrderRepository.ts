import { Order, OrderCreateDTO, OrderResponseDTO } from '../models/Order';

export interface IOrderRepository {
  create(order: OrderCreateDTO): Promise<OrderResponseDTO>;
  findAll(): Promise<OrderResponseDTO[]>;
  findById(id: number): Promise<OrderResponseDTO | null>;
  findByUserId(userId: number): Promise<OrderResponseDTO[]>;
  updateStatus(id: number, status: string): Promise<OrderResponseDTO | null>;
}



import { UserInteraction } from '../models/UserInteraction';

export interface IUserInteractionRepository {
  create(interaction: UserInteraction): Promise<UserInteraction>;
  findByUserId(userId: number): Promise<UserInteraction[]>;
  findByProductId(productId: number): Promise<UserInteraction[]>;
  getInteractionCount(userId: number, productId: number, type: string): Promise<number>;
}





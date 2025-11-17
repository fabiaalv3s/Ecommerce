import { Pool } from 'pg';
import { Database } from '../database/database';
import { IUserInteractionRepository } from './IUserInteractionRepository';
import { UserInteraction } from '../models/UserInteraction';

export class UserInteractionRepository implements IUserInteractionRepository {
  private _pool: Pool | null = null;

  private get pool(): Pool {
    if (!this._pool) {
      this._pool = Database.getPool();
    }
    return this._pool;
  }

  async create(interaction: UserInteraction): Promise<UserInteraction> {
    const result = await this.pool.query(
      `INSERT INTO user_interactions (user_id, product_id, interaction_type) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [interaction.user_id, interaction.product_id, interaction.interaction_type]
    );
    return result.rows[0];
  }

  async findByUserId(userId: number): Promise<UserInteraction[]> {
    const result = await this.pool.query(
      'SELECT * FROM user_interactions WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  async findByProductId(productId: number): Promise<UserInteraction[]> {
    const result = await this.pool.query(
      'SELECT * FROM user_interactions WHERE product_id = $1 ORDER BY created_at DESC',
      [productId]
    );
    return result.rows;
  }

  async getInteractionCount(
    userId: number,
    productId: number,
    type: string
  ): Promise<number> {
    const result = await this.pool.query(
      `SELECT COUNT(*) as count 
       FROM user_interactions 
       WHERE user_id = $1 AND product_id = $2 AND interaction_type = $3`,
      [userId, productId, type]
    );
    return parseInt(result.rows[0].count);
  }
}



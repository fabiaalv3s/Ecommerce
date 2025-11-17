import { Pool } from 'pg';
import { Database } from '../database/database';
import { IUserRepository } from './IUserRepository';
import { User, UserCreateDTO, UserResponseDTO } from '../models/User';
import bcrypt from 'bcryptjs';

export class UserRepository implements IUserRepository {
  private _pool: Pool | null = null;

  private get pool(): Pool {
    if (!this._pool) {
      this._pool = Database.getPool();
    }
    return this._pool;
  }

  async create(userData: UserCreateDTO): Promise<UserResponseDTO> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await this.pool.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, role, created_at, updated_at`,
      [userData.name, userData.email, hashedPassword, userData.role || 'customer']
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<UserResponseDTO | null> {
    const result = await this.pool.query(
      `SELECT id, name, email, role, created_at, updated_at 
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const result = await this.pool.query(
      `SELECT id, name, email, role, created_at, updated_at FROM users`
    );
    return result.rows;
  }

  async update(id: number, userData: Partial<User>): Promise<UserResponseDTO | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (userData.name) {
      updates.push(`name = $${paramCount++}`);
      values.push(userData.name);
    }
    if (userData.email) {
      updates.push(`email = $${paramCount++}`);
      values.push(userData.email);
    }
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      updates.push(`password = $${paramCount++}`);
      values.push(hashedPassword);
    }
    if (userData.role) {
      updates.push(`role = $${paramCount++}`);
      values.push(userData.role);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await this.pool.query(
      `UPDATE users SET ${updates.join(', ')} 
       WHERE id = $${paramCount} 
       RETURNING id, name, email, role, created_at, updated_at`,
      values
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}



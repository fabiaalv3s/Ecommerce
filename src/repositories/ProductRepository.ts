import { Pool } from 'pg';
import { Database } from '../database/database';
import { IProductRepository, ProductFilters } from './IProductRepository';
import { Product, ProductCreateDTO, ProductUpdateDTO } from '../models/Product';

export class ProductRepository implements IProductRepository {
  private _pool: Pool | null = null;

  private get pool(): Pool {
    if (!this._pool) {
      this._pool = Database.getPool();
    }
    return this._pool;
  }

  async create(productData: ProductCreateDTO): Promise<Product> {
    const result = await this.pool.query(
      `INSERT INTO products (name, description, price, category, stock, image_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        productData.name,
        productData.description,
        productData.price,
        productData.category,
        productData.stock,
        productData.image_url,
      ]
    );
    return result.rows[0];
  }

  async findById(id: number): Promise<Product | null> {
    const result = await this.pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findAll(filters?: ProductFilters): Promise<Product[]> {
    let query = 'SELECT * FROM products WHERE 1=1';
    const values: any[] = [];
    let paramCount = 1;

    if (filters?.category) {
      query += ` AND category = $${paramCount++}`;
      values.push(filters.category);
    }

    if (filters?.minPrice !== undefined) {
      query += ` AND price >= $${paramCount++}`;
      values.push(filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query += ` AND price <= $${paramCount++}`;
      values.push(filters.maxPrice);
    }

    if (filters?.search) {
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      values.push(`%${filters.search}%`);
      paramCount++;
    }

    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          query += ' ORDER BY price ASC';
          break;
        case 'price_desc':
          query += ' ORDER BY price DESC';
          break;
        case 'name_asc':
          query += ' ORDER BY name ASC';
          break;
        case 'name_desc':
          query += ' ORDER BY name DESC';
          break;
        case 'created_at_desc':
          query += ' ORDER BY created_at DESC';
          break;
      }
    } else {
      query += ' ORDER BY created_at DESC';
    }

    const result = await this.pool.query(query, values);
    return result.rows;
  }

  async update(id: number, productData: ProductUpdateDTO): Promise<Product | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (productData.name) {
      updates.push(`name = $${paramCount++}`);
      values.push(productData.name);
    }
    if (productData.description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(productData.description);
    }
    if (productData.price !== undefined) {
      updates.push(`price = $${paramCount++}`);
      values.push(productData.price);
    }
    if (productData.category) {
      updates.push(`category = $${paramCount++}`);
      values.push(productData.category);
    }
    if (productData.stock !== undefined) {
      updates.push(`stock = $${paramCount++}`);
      values.push(productData.stock);
    }
    if (productData.image_url !== undefined) {
      updates.push(`image_url = $${paramCount++}`);
      values.push(productData.image_url);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await this.pool.query(
      `UPDATE products SET ${updates.join(', ')} 
       WHERE id = $${paramCount} 
       RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.pool.query('DELETE FROM products WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}



import { Product, ProductCreateDTO, ProductUpdateDTO } from '../models/Product';

export interface IProductRepository {
  create(product: ProductCreateDTO): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(filters?: ProductFilters): Promise<Product[]>;
  update(id: number, product: ProductUpdateDTO): Promise<Product | null>;
  delete(id: number): Promise<boolean>;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'created_at_desc';
}



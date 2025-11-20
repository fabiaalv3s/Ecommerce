import { IProductRepository, ProductFilters } from '../repositories/IProductRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { Product, ProductCreateDTO, ProductUpdateDTO } from '../models/Product';

export class ProductService {
  private productRepository: IProductRepository;

  constructor(productRepository?: IProductRepository) {
    this.productRepository = productRepository || new ProductRepository();
  }

  async createProduct(productData: ProductCreateDTO): Promise<Product> {
    if (productData.price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (productData.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    return await this.productRepository.create(productData);
  }

  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }

  async getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    return await this.productRepository.findAll(filters);
  }

  async updateProduct(id: number, productData: ProductUpdateDTO): Promise<Product | null> {
    if (productData.price !== undefined && productData.price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (productData.stock !== undefined && productData.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    return await this.productRepository.update(id, productData);
  }

  async deleteProduct(id: number): Promise<boolean> {
    return await this.productRepository.delete(id);
  }
}





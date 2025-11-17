import { Database } from './database';
import { UserRepository } from '../repositories/UserRepository';
import { ProductRepository } from '../repositories/ProductRepository';

async function seed() {
  try {
    await Database.initialize();
    console.log('🌱 Starting database seed...');

    const userRepository = new UserRepository();
    const productRepository = new ProductRepository();

    // Create admin user
    try {
      const existingAdmin = await userRepository.findByEmail('admin@ecommerce.com');
      if (!existingAdmin) {
        const admin = await userRepository.create({
          name: 'Admin',
          email: 'admin@ecommerce.com',
          password: 'admin123',
          role: 'admin',
        });
        console.log('✅ Admin user created:', admin.email);
      } else {
        console.log('ℹ️  Admin user already exists');
      }
    } catch (error: any) {
      console.log('ℹ️  Error creating admin user:', error.message);
    }

    // Create test user
    try {
      const existingUser = await userRepository.findByEmail('joao@test.com');
      if (!existingUser) {
        const user = await userRepository.create({
          name: 'João Silva',
          email: 'joao@test.com',
          password: '123456',
          role: 'customer',
        });
        console.log('✅ Test user created:', user.email);
      } else {
        console.log('ℹ️  Test user already exists');
      }
    } catch (error: any) {
      console.log('ℹ️  Error creating test user:', error.message);
    }

    // Create sample products with real image URLs
    const products = [
      {
        name: 'Notebook Dell Inspiron',
        description: 'Notebook com processador Intel i5, 8GB RAM, 256GB SSD',
        price: 2999.99,
        category: 'Eletrônicos',
        stock: 10,
        image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      },
      {
        name: 'Smartphone Samsung Galaxy',
        description: 'Smartphone Android com 128GB de armazenamento',
        price: 1499.99,
        category: 'Eletrônicos',
        stock: 15,
        image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      },
      {
        name: 'Camiseta Básica',
        description: 'Camiseta 100% algodão, várias cores disponíveis',
        price: 49.99,
        category: 'Roupas',
        stock: 50,
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
      },
      {
        name: 'Tênis Esportivo',
        description: 'Tênis para corrida e caminhada, confortável e durável',
        price: 199.99,
        category: 'Esportes',
        stock: 30,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      },
      {
        name: 'Livro: Aprendendo TypeScript',
        description: 'Guia completo para aprender TypeScript do zero',
        price: 79.99,
        category: 'Livros',
        stock: 20,
        image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
      },
      {
        name: 'Mesa de Escritório',
        description: 'Mesa moderna para home office, 120x60cm',
        price: 399.99,
        category: 'Casa',
        stock: 12,
        image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      },
      {
        name: 'Fone de Ouvido Bluetooth',
        description: 'Fone com cancelamento de ruído e bateria de longa duração',
        price: 299.99,
        category: 'Eletrônicos',
        stock: 25,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      },
      {
        name: 'Jaqueta Jeans',
        description: 'Jaqueta jeans clássica, tamanhos P ao GG',
        price: 129.99,
        category: 'Roupas',
        stock: 18,
        image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
      },
    ];

    for (const product of products) {
      try {
        await productRepository.create(product);
        console.log(`✅ Product created: ${product.name}`);
      } catch (error) {
        console.log(`ℹ️  Product might already exist: ${product.name}`);
      }
    }

    console.log('✅ Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();


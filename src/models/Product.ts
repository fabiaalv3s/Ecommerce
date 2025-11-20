export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProductCreateDTO {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  image_url?: string;
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  image_url?: string;
}





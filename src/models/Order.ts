export interface Order {
  id?: number;
  user_id: number;
  total_amount: number;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at?: Date;
}

export interface OrderCreateDTO {
  user_id: number;
  items: OrderItemCreateDTO[];
}

export interface OrderItemCreateDTO {
  product_id: number;
  quantity: number;
}

export interface OrderResponseDTO extends Order {
  items: OrderItem[];
}



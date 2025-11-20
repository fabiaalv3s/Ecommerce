export interface UserInteraction {
  id?: number;
  user_id: number;
  product_id: number;
  interaction_type: 'view' | 'purchase' | 'cart' | 'favorite';
  created_at?: Date;
}





export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: CategoryType;
  stock: number;
  rating: number;
}

export type CategoryType = 
  | 'Electronics' 
  | 'Clothing' 
  | 'Books' 
  | 'Home & Kitchen' 
  | 'Sports' 
  | 'Beauty' 
  | 'Toys' 
  | 'Jewelry';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
} 
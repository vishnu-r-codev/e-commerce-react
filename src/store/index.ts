import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import productReducer from './productSlice';
import { ProductState } from './productSlice';
import { CartState } from './cartSlice';
import { AuthState } from './authSlice';

export interface RootState {
  products: ProductState;
  cart: CartState;
  auth: AuthState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch; 
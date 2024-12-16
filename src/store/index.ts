import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import searchReducer from './searchSlice';
import productReducer from './productSlice';

// Load cart state from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save cart state to localStorage
const saveCartState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Handle errors
  }
};

const preloadedState = {
  cart: loadCartState()
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    search: searchReducer,
    products: productReducer
  },
  preloadedState
});

// Subscribe to store changes and save cart state
store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
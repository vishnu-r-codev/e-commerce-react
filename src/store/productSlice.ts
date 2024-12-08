import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, mockProducts } from '../services/mockData';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    priceRange: [number, number];
    rating: number | null;
    sortBy: string | null;
  };
}

const initialState: ProductState = {
  products: mockProducts,
  loading: false,
  error: null,
  filters: {
    category: null,
    priceRange: [0, 5000],
    rating: null,
    sortBy: null
  }
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  }
});

export const { setProducts, setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  filters: {
    category: string[];
    priceRange: [number, number] | null;
    rating: number | null;
  };
}

const initialState: SearchState = {
  query: '',
  filters: {
    category: [],
    priceRange: null,
    rating: null
  }
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<SearchState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSearch: (state) => {
      state.query = '';
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  }
});

export const { setSearchQuery, setFilters, clearSearch, clearFilters } = searchSlice.actions;
export default searchSlice.reducer; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

// Mock authentication API calls
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // Simulate API call
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          resolve({
            id: 1,
            email: credentials.email,
            name: 'Test User'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; name: string }) => {
    // Simulate API call
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.floor(Math.random() * 1000),
          email: userData.email,
          name: userData.name
        });
      }, 1000);
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 
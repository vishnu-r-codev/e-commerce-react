import { User } from '../types';

// Mock user data
const mockUsers = [
  {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    password: 'password123' // In real app, passwords would be hashed
  }
];

interface LoginResponse {
  user: User;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === credentials.email);

    if (!user || user.password !== credentials.password) {
      throw new Error('Invalid email or password');
    }

    // Create mock response
    const response: LoginResponse = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(7)
    };

    return response;
  },

  async validateToken(token: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock token validation - in real app, would verify JWT
    return token.startsWith('mock-jwt-token-');
  },

  async register(userData: { email: string; password: string; name: string }): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    // Create new mock user
    const newUser = {
      id: mockUsers.length + 1,
      email: userData.email,
      name: userData.name,
      password: userData.password
    };

    mockUsers.push(newUser);

    // Return login response
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(7)
    };
  },

  async forgotPassword(email: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('No account found with this email');
    }

    // In real app, would send password reset email
    console.log('Password reset email sent to:', email);
  }
}; 
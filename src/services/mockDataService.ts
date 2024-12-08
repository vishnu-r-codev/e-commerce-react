import { Product, CategoryType } from '../types';

class MockDataService {
  private categories: CategoryType[] = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Kitchen',
    'Sports',
    'Beauty',
    'Toys',
    'Jewelry'
  ];

  private products: Product[] = [
    // Similar mock data as in Angular version
  ];

  async getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.products), 500);
    });
  }

  async getProductsByCategory(category: CategoryType): Promise<Product[]> {
    return new Promise((resolve) => {
      const filteredProducts = this.products.filter(p => p.category === category);
      setTimeout(() => resolve(filteredProducts), 500);
    });
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return new Promise((resolve) => {
      const product = this.products.find(p => p.id === id);
      setTimeout(() => resolve(product), 500);
    });
  }

  async searchProducts(query: string): Promise<Product[]> {
    return new Promise((resolve) => {
      const searchResults = this.products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setTimeout(() => resolve(searchResults), 500);
    });
  }
}

export const mockDataService = new MockDataService(); 
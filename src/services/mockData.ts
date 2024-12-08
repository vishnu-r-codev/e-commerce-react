export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  description: string;
  inStock: boolean;
}

const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Kitchen',
  'Sports',
  'Beauty',
  'Toys',
  'Jewelry'
];

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let id = 1;

  categories.forEach(category => {
    for (let i = 1; i <= 50; i++) {
      products.push({
        id: id++,
        name: `${category} Item ${i}`,
        price: Number((Math.random() * 1000 + 100).toFixed(2)),
        rating: Math.floor(Math.random() * 3) + 3, // Rating between 3-5
        category,
        description: `High-quality ${category.toLowerCase()} item with premium features and reliable performance.`,
        inStock: Math.random() > 0.2 // 80% chance of being in stock
      });
    }
  });

  return products;
};

export const mockProducts = generateProducts();

export const getProductsByCategory = (category: string) => {
  return mockProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductById = (id: number) => {
  return mockProducts.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return mockProducts
    .filter(product => product.rating === 5)
    .slice(0, 4);
}; 
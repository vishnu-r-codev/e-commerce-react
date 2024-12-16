import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  reviews: number;
}

interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
  filters: {
    sortBy: string;
    category: string[];
    priceRange: [number, number] | null;
    rating: number | null;
  };
}

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
  filters: {
    sortBy: 'featured',
    category: [],
    priceRange: null,
    rating: null
  }
};

// Helper function to generate mock products
const generateMockProducts = () => {
  const products: Product[] = [];
  let id = 1;

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Sports",
    "Books",
    "Beauty",
    "Toys",
    "Automotive",
    "Health",
    "Garden"
  ];

  const electronicsItems = [
    "Smartphone", "Laptop", "Tablet", "Smartwatch", "Headphones", 
    "TV", "Camera", "Speaker", "Gaming Console", "Monitor"
  ];

  const clothingItems = [
    "T-Shirt", "Jeans", "Dress", "Jacket", "Sweater", 
    "Shoes", "Socks", "Hat", "Scarf", "Gloves"
  ];

  const homeItems = [
    "Coffee Maker", "Blender", "Toaster", "Microwave", "Air Fryer",
    "Vacuum", "Lamp", "Pillow", "Blanket", "Curtains"
  ];

  const sportsItems = [
    "Yoga Mat", "Dumbbells", "Tennis Racket", "Basketball", "Soccer Ball",
    "Running Shoes", "Bike", "Skateboard", "Golf Clubs", "Boxing Gloves"
  ];

  const booksGenres = [
    "Fiction", "Mystery", "Science Fiction", "Biography", "Self-Help",
    "History", "Cooking", "Travel", "Business", "Art"
  ];

  const beautyItems = [
    "Shampoo", "Moisturizer", "Lipstick", "Mascara", "Face Mask",
    "Perfume", "Nail Polish", "Hair Dryer", "Face Wash", "Sunscreen"
  ];

  const toysItems = [
    "Action Figure", "Board Game", "Puzzle", "Doll", "Building Blocks",
    "Remote Car", "Art Set", "Science Kit", "Plush Toy", "Musical Toy"
  ];

  const automotiveItems = [
    "Car Charger", "Air Freshener", "Floor Mats", "Seat Covers", "Tool Kit",
    "Jump Starter", "Dash Cam", "Phone Mount", "Tire Gauge", "Car Vacuum"
  ];

  const healthItems = [
    "Vitamins", "First Aid Kit", "Blood Pressure Monitor", "Fitness Tracker",
    "Massage Gun", "Essential Oils", "Sleep Aid", "Protein Powder", "Resistance Bands"
  ];

  const gardenItems = [
    "Plant Pot", "Garden Tools", "Seeds", "Watering Can", "Bird Feeder",
    "Solar Lights", "Lawn Mower", "Fertilizer", "Gloves", "Wind Chimes"
  ];

  const itemsByCategory = {
    Electronics: electronicsItems,
    Clothing: clothingItems,
    "Home & Kitchen": homeItems,
    Sports: sportsItems,
    Books: booksGenres,
    Beauty: beautyItems,
    Toys: toysItems,
    Automotive: automotiveItems,
    Health: healthItems,
    Garden: gardenItems
  };

  // Generate 50 products for each category
  categories.forEach(category => {
    const baseItems = itemsByCategory[category];
    for (let i = 0; i < 50; i++) {
      const baseItem = baseItems[i % baseItems.length];
      const variant = Math.floor(i / baseItems.length) + 1;
      const variantName = variant > 1 ? ` ${variant}` : '';
      
      products.push({
        id: id++,
        name: `${baseItem}${variantName}`,
        description: `High-quality ${baseItem.toLowerCase()} for your needs`,
        price: Math.round((20 + Math.random() * 480) * 100) / 100,
        category,
        image: `https://via.placeholder.com/300?text=${baseItem.replace(' ', '+')}`,
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        stock: Math.floor(10 + Math.random() * 90),
        reviews: Math.floor(10 + Math.random() * 490)
      });
    }
  });

  return products;
};

const mockProducts = generateMockProducts();

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProducts;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer; 
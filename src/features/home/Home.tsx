import { useNavigate } from 'react-router-dom';
import CategoryCard from './components/CategoryCard';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import './styles/Home.scss';

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Electronics', icon: 'computer' },
    { id: 2, name: 'Clothing', icon: 'shopping_bag' },
    { id: 3, name: 'Books', icon: 'menu_book' },
    { id: 4, name: 'Home & Kitchen', icon: 'kitchen' },
    { id: 5, name: 'Sports', icon: 'sports_soccer' },
    { id: 6, name: 'Beauty', icon: 'spa' },
    { id: 7, name: 'Toys', icon: 'toys' },
    { id: 8, name: 'Jewelry', icon: 'diamond' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Adidas Smartphone Pro Model',
      price: 902.11,
      rating: 5,
      image: '/images/products/adidas-phone.jpg'
    },
    {
      id: 2,
      name: 'Tablet Pro HP Gen 6',
      price: 2744.75,
      rating: 5,
      image: '/images/products/tablet-hp.jpg'
    },
    {
      id: 3,
      name: 'Asus Bluetooth Speaker',
      price: 2443.21,
      rating: 4,
      image: '/images/products/asus-speaker.jpg'
    },
    {
      id: 4,
      name: 'Gaming Laptop LG Ultra',
      price: 768.71,
      rating: 5,
      image: '/images/products/lg-laptop.jpg'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to My Shop</h1>
          <p>Discover amazing products at great prices</p>
          <button onClick={() => navigate('/products')}>Shop Now</button>
        </div>
      </section>

      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {categories.map(category => (
            <CategoryCard 
              key={category.id}
              name={category.name}
              icon={category.icon}
              onClick={() => navigate(`/products?category=${category.name.toLowerCase()}`)}
            />
          ))}
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              onClick={() => navigate(`/products/${product.id}`)}
            />
          ))}
        </div>
      </section>

      <Features />

      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get updates about new products and special offers</p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home; 
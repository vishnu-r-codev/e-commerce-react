import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchProducts, setFilters } from '../../store/productSlice';
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import './styles/ProductList.scss';

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
  { label: 'Most Reviewed', value: 'reviews_desc' }
];

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48, 96];

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, isLoading, filters } = useSelector((state: RootState) => state.products);
  const { query } = useSelector((state: RootState) => state.search);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [jumpToPage, setJumpToPage] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ sortBy: e.target.value }));
  };

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Apply search query
    if (query) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => 
        filters.category.includes(product.category)
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => 
        product.rating >= filters.rating
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews_desc':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default: // 'featured'
        filtered.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = Number(jumpToPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
      setJumpToPage('');
    }
  };

  if (isLoading) {
    return (
      <div className="product-list-page">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="product-list-page">
      <div className="product-list-header">
        <h1>All Products</h1>
        <div className="header-actions">
          <select 
            value={filters.sortBy}
            onChange={handleSortChange}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button 
            className="mobile-filter-toggle"
            onClick={() => setShowMobileFilters(true)}
          >
            <i className="material-icons">filter_list</i>
            Filters
          </button>
        </div>
      </div>

      <div className="product-list-layout">
        <aside className={`filters-sidebar ${showMobileFilters ? 'mobile-active' : ''}`}>
          <div className="filters-header">
            <h2>Filters</h2>
            <button 
              className="close-filters"
              onClick={() => setShowMobileFilters(false)}
            >
              <i className="material-icons">close</i>
            </button>
          </div>
          <ProductFilters onClose={() => setShowMobileFilters(false)} />
        </aside>

        <main className="products-main">
          {query && (
            <div className="search-results">
              <h2>Search Results for "{query}"</h2>
              <span>({filteredProducts.length} products found)</span>
            </div>
          )}

          <div className="products-grid">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length > 0 && (
            <div className="pagination-container">
              <div className="pagination-controls">
                <div className="items-per-page">
                  <label>Items per page:</label>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="items-select"
                  >
                    {ITEMS_PER_PAGE_OPTIONS.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <form onSubmit={handleJumpToPage} className="jump-to-page">
                  <label>Go to page:</label>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    placeholder={`1-${totalPages}`}
                  />
                  <button type="submit" disabled={!jumpToPage}>Go</button>
                </form>
              </div>

              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <i className="material-icons">chevron_left</i>
                  Previous
                </button>

                <div className="page-numbers">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page and one page before and after current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          className={`page-number ${pageNumber === currentPage ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    // Show dots if there's a gap
                    if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="page-dots">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                  <i className="material-icons">chevron_right</i>
                </button>
              </div>

              <div className="pagination-info">
                Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </div>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList; 
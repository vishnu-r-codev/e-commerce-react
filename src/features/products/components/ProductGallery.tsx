import { useState } from 'react';
import './ProductGallery.scss';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="product-gallery">
      <div className="main-image">
        <img src={images[selectedImage]} alt={productName} />
      </div>
      {images.length > 1 && (
        <div className="thumbnail-list">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`${productName} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery; 
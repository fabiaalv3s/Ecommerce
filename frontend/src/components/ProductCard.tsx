import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // garante que price é number
  const priceNumber = Number(product.price ?? 0);
  const stockNumber = Number(product.stock ?? 0);
  const [imageError, setImageError] = React.useState(false);

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image">
        {product.image_url && !imageError ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="product-image-placeholder">
            {product.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-footer">
          <span className="product-price">
            R$ {priceNumber.toFixed(2)}
          </span>
          {stockNumber > 0 ? (
            <span className="product-stock in-stock">Em estoque</span>
          ) : (
            <span className="product-stock out-of-stock">Sem estoque</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

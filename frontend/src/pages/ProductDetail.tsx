import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { productApi } from '../api/products';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [imageError, setImageError] = React.useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(Number(id)),
    enabled: !!id,
  });

  const { data: similarProducts } = useQuery({
    queryKey: ['similar', id],
    queryFn: () => productApi.getSimilar(Number(id!)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (product) {
      addToCart(product, 1);
      alert('Produto adicionado ao carrinho!');
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando produto...</div>;
  }

  if (!product) {
    return <div className="error">Produto não encontrado</div>;
  }

  // Garante que price e stock são números (PostgreSQL retorna DECIMAL como string)
  const priceNumber = Number(product.price ?? 0);
  const stockNumber = Number(product.stock ?? 0);

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Voltar
      </button>

      <div className="product-detail-content">
        <div className="product-image-section">
          {product.image_url && !imageError ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="product-image-placeholder-large">
              {product.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">R$ {priceNumber.toFixed(2)}</p>
          <p className="product-description">{product.description || 'Sem descrição'}</p>
          <div className="product-stock-info">
            {stockNumber > 0 ? (
              <span className="in-stock">✓ Em estoque ({stockNumber} unidades)</span>
            ) : (
              <span className="out-of-stock">✗ Sem estoque</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={stockNumber === 0}
            className="btn btn-primary btn-large"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>

      {similarProducts && similarProducts.length > 0 && (
        <section className="similar-products">
          <h2>Produtos Similares</h2>
          <div className="products-grid">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;



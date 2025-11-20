import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { productApi } from '../api/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendations', user?.id],
    queryFn: () => (user ? productApi.getRecommendations(user.id) : []),
    enabled: isAuthenticated && !!user,
  });

  const { data: products } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productApi.getAll({ sortBy: 'created_at_desc' }),
  });

  return (
    <div className="home">
      <section className="hero">
        <h1>Bem-vindo ao Ecommerce Inteligente</h1>
        <p>Descubra produtos incríveis com recomendações personalizadas</p>
      </section>

      {isAuthenticated && recommendations && recommendations.length > 0 && (
        <section className="section">
          <h2>Recomendados para Você</h2>
          <div className="products-grid">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2>Produtos em Destaque</h2>
        {isLoading ? (
          <div className="loading">Carregando...</div>
        ) : (
          <div className="products-grid">
            {products?.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;





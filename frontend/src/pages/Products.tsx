import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productApi, ProductFilters } from '../api/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    sortBy: 'created_at_desc',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productApi.getAll({ ...filters, search: searchTerm || undefined }),
  });

  const categories = ['Eletrônicos', 'Roupas', 'Casa', 'Esportes', 'Livros'];

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value || undefined }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchTerm || undefined }));
  };

  return (
    <div className="products-page">
      <h1>Produtos</h1>

      <div className="products-filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </form>

        <div className="filters-row">
          <div className="filter-group">
            <label>Categoria:</label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Todas</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Preço Mínimo:</label>
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) =>
                handleFilterChange('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)
              }
              placeholder="0"
            />
          </div>

          <div className="filter-group">
            <label>Preço Máximo:</label>
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) =>
                handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)
              }
              placeholder="9999"
            />
          </div>

          <div className="filter-group">
            <label>Ordenar por:</label>
            <select
              value={filters.sortBy || 'created_at_desc'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="created_at_desc">Mais Recentes</option>
              <option value="price_asc">Menor Preço</option>
              <option value="price_desc">Maior Preço</option>
              <option value="name_asc">Nome A-Z</option>
              <option value="name_desc">Nome Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && <div className="loading">Carregando produtos...</div>}
      {error && <div className="error">Erro ao carregar produtos</div>}

      {products && (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="no-products">Nenhum produto encontrado</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;





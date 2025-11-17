import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../../api/products';
import { Product } from '../../types';
import AdminNav from '../../components/AdminNav';
import './AdminProducts.css';

const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: '',
  });

  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productApi.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => productApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsModalOpen(false);
      resetForm();
      alert('Produto criado com sucesso!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Erro ao criar produto');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => productApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      setIsModalOpen(false);
      setEditingProduct(null);
      resetForm();
      alert('Produto atualizado com sucesso!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Erro ao atualizar produto');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      alert('Produto deletado com sucesso!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Erro ao deletar produto');
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image_url: '',
    });
    setEditingProduct(null);
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        image_url: product.image_url || '',
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      image_url: formData.image_url || undefined,
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id!, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="admin-products">
      <AdminNav />
      <div className="admin-header">
        <h1>Gerenciar Produtos</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          + Novo Produto
        </button>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>R$ {Number(product.price).toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="btn btn-secondary btn-small"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id!)}
                    className="btn btn-danger btn-small"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Preço *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estoque *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Categoria *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Roupas">Roupas</option>
                  <option value="Casa">Casa</option>
                  <option value="Esportes">Esportes</option>
                  <option value="Livros">Livros</option>
                </select>
              </div>
              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;


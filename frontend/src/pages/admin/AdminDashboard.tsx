import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { productApi } from '../../api/products';
import { orderApi } from '../../api/orders';
import { userApi } from '../../api/users';
import AdminNav from '../../components/AdminNav';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data: products } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productApi.getAll(),
  });

  const { data: orders } = useQuery({
    queryKey: ['admin-all-orders'],
    queryFn: () => orderApi.getAll(),
    enabled: !!user && user.role === 'admin',
  });

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => userApi.getAll(),
  });

  const totalProducts = products?.length || 0;
  const totalOrders = orders?.length || 0;
  const totalUsers = users?.length || 0;
  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;

  return (
    <div className="admin-dashboard">
      <AdminNav />
      <h1>Painel Administrativo</h1>
      <p className="admin-welcome">Bem-vindo, {user?.name}!</p>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{totalProducts}</h3>
            <p>Produtos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{totalOrders}</h3>
            <p>Pedidos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{totalUsers}</h3>
            <p>Usuários</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>R$ {totalRevenue.toFixed(2)}</h3>
            <p>Receita Total</p>
          </div>
        </div>
      </div>

      <div className="admin-quick-actions">
        <h2>Ações Rápidas</h2>
        <div className="actions-grid">
          <Link to="/admin/products" className="action-card">
            <span className="action-icon">📦</span>
            <h3>Gerenciar Produtos</h3>
            <p>Criar, editar e remover produtos</p>
          </Link>

          <Link to="/admin/orders" className="action-card">
            <span className="action-icon">🛒</span>
            <h3>Gerenciar Pedidos</h3>
            <p>Visualizar e atualizar pedidos</p>
          </Link>

          <Link to="/admin/users" className="action-card">
            <span className="action-icon">👥</span>
            <h3>Gerenciar Usuários</h3>
            <p>Visualizar e gerenciar usuários</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


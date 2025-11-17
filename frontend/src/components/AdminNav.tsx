import { Link, useLocation } from 'react-router-dom';
import './AdminNav.css';

const AdminNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="admin-nav">
      <div className="admin-nav-container">
        <Link to="/admin" className={`admin-nav-link ${isActive('/admin') ? 'active' : ''}`}>
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className={`admin-nav-link ${isActive('/admin/products') ? 'active' : ''}`}
        >
          Produtos
        </Link>
        <Link
          to="/admin/orders"
          className={`admin-nav-link ${isActive('/admin/orders') ? 'active' : ''}`}
        >
          Pedidos
        </Link>
        <Link
          to="/admin/users"
          className={`admin-nav-link ${isActive('/admin/users') ? 'active' : ''}`}
        >
          Usuários
        </Link>
      </div>
    </nav>
  );
};

export default AdminNav;


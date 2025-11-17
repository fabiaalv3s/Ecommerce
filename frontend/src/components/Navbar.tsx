import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🛍️ Ecommerce Inteligente
        </Link>
        <div className="navbar-links">
          <Link to="/">Início</Link>
          <Link to="/products">Produtos</Link>
          {isAuthenticated ? (
            <>
              <Link to="/cart">
                Carrinho {getItemCount() > 0 && <span className="cart-badge">({getItemCount()})</span>}
              </Link>
              <Link to="/orders">Meus Pedidos</Link>
              {user?.role === 'admin' && (
                <Link to="/admin">Admin</Link>
              )}
              <span className="navbar-user">Olá, {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/register">Cadastrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


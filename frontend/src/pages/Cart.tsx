import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { orderApi } from '../api/orders';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      };

      await orderApi.create(orderData);
      clearCart();
      alert('Pedido realizado com sucesso!');
      navigate('/orders');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao realizar pedido');
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Carrinho</h1>
        <div className="empty-cart">
          <p>Seu carrinho está vazio</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary">
            Ver Produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Carrinho</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => {
            const itemPrice = Number(item.product.price ?? 0);
            return (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-category">{item.product.category}</p>
                  <p className="cart-item-price">R$ {itemPrice.toFixed(2)}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="btn-quantity"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="btn-quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-total">
                    R$ {(itemPrice * item.quantity).toFixed(2)}
                  </p>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="btn btn-danger btn-small"
                >
                  Remover
                </button>
              </div>
            </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h2>Resumo do Pedido</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>R$ {getTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>R$ {getTotal().toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="btn btn-success btn-large">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;



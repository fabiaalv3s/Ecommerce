import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { orderApi } from '../api/orders';
import './Orders.css';

const Orders = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => (user ? orderApi.getByUserId(user.id) : []),
    enabled: !!user,
  });

  if (isLoading) {
    return <div className="loading">Carregando pedidos...</div>;
  }

  return (
    <div className="orders-page">
      <h1>Meus Pedidos</h1>
      {!orders || orders.length === 0 ? (
        <div className="empty-orders">
          <p>Você ainda não realizou nenhum pedido</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Pedido #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="order-status">
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item) => {
                  const itemPrice = Number(item.price ?? 0);
                  return (
                    <div key={item.id} className="order-item">
                      <span>Produto ID: {item.product_id}</span>
                      <span>Quantidade: {item.quantity}</span>
                      <span>R$ {itemPrice.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="order-total">
                <strong>Total: R$ {Number(order.total_amount ?? 0).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;



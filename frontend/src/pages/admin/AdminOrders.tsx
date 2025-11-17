import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../../api/orders';
import { Order } from '../../types';
import AdminNav from '../../components/AdminNav';
import './AdminOrders.css';

const AdminOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-all-orders'],
    queryFn: () => orderApi.getAll(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      orderApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-orders'] });
      alert('Status atualizado com sucesso!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.error || 'Erro ao atualizar status');
    },
  });

  const handleStatusChange = (orderId: number, newStatus: string) => {
    if (window.confirm(`Deseja alterar o status para "${newStatus}"?`)) {
      updateStatusMutation.mutate({ id: orderId, status: newStatus });
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando pedidos...</div>;
  }

  return (
    <div className="admin-orders">
      <AdminNav />
      <h1>Gerenciar Pedidos</h1>

      {!orders || orders.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum pedido encontrado</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order: Order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Pedido #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="order-user">Usuário ID: {order.user_id}</p>
                </div>
                <div className="order-status-control">
                  <label>Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id!, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pendente</option>
                    <option value="processing">Processando</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregue</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>
              <div className="order-items">
                <h4>Itens:</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <span>Produto ID: {item.product_id}</span>
                    <span>Qtd: {item.quantity}</span>
                    <span>R$ {Number(item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: R$ {Number(order.total_amount).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;


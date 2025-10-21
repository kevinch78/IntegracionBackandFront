// src/views/CartView.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../services/CartContext';
import { createOrder } from '../services/orders';

export default function CartView() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const orderItems = items.map(item => ({
        productId: item.id,
        amount: item.quantity,
      }));
      await createOrder(orderItems);
      clearCart();
      alert('¡Orden creada exitosamente!');
      navigate('/api/profile');
    } catch (err) {
      setError('No se pudo crear la orden. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <button onClick={() => navigate('/api/products')} className="px-6 py-2 bg-emerald-600 text-white rounded-lg">
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mi Carrito</h1>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {items.map(item => (
            <li key={item.id} className="flex items-center py-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-slate-500">Cantidad: {item.quantity}</p>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-right">
          <p className="text-lg">
            Total ({totalItems} productos): <span className="font-bold text-2xl text-emerald-500">${totalPrice.toFixed(2)}</span>
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-4 w-full md:w-auto px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Realizar Pedido'}
          </button>
        </div>
      </div>
    </div>
  );
}
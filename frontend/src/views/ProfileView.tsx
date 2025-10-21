// src/views/ProfileView.tsx
import React, { useEffect, useState } from 'react';
import { getMe, getMyOrders } from '../services/profile';

interface User {
  id: number;
  email: string;
  role: string;
}

interface Order {
  id: number;
  total: number;
  createdAt: string;
}

export const ProfileView: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMe(), getMyOrders()])
      .then(([u, o]) => {
        setUser(u);
        setOrders(o);
      })
      .catch((err) => console.error('Error cargando perfil:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (!user) return <p>No se pudo cargar el usuario</p>;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Mi Perfil</h2>
        <div className="space-y-2">
          <p className="text-slate-700 dark:text-slate-300">
            <strong className="font-semibold text-slate-800 dark:text-slate-200">Email:</strong> {user.email}
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <strong className="font-semibold text-slate-800 dark:text-slate-200">Rol:</strong>
            <span className="ml-2 px-2 py-1 text-sm rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              {user.role}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Mis Órdenes</h3>
        {orders.length > 0 ? (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li key={order.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-700 dark:border-slate-600 flex justify-between items-center">
                <span className="font-medium">Orden #{order.id}</span>
                <span className="text-slate-600 dark:text-slate-300">Fecha: {new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Total: ${order.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">Aún no has realizado ninguna orden.</p>
        )}
      </div>
    </div>
  );
};

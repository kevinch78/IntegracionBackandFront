// src/views/ProductDetailView.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/products';
import { useCart } from '../services/CartContext';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: {
    name: string;
  };
};

export default function ProductDetailView() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getProduct(id)
      .then(data => setProduct(data))
      .catch(() => setError('No se pudo cargar el producto.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    navigate('/api/cart');
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden md:flex">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 md:h-auto object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{product.category.name}</span>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{product.name}</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-4">{product.description}</p>
          </div>
          <div className="mt-6">
            <span className="text-4xl font-bold text-emerald-500">${product.price}</span>
            <button
              onClick={handleAddToCart}
              className="w-full mt-4 px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
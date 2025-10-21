// src/views/AddProductView.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/products';
import { listCategories } from '../services/caategories';

interface Category {
  id: number;
  name: string;
}

export default function AddProductView() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listCategories()
      .then(setCategories)
      .catch(() => setError('No se pudieron cargar las categorías.'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      setError('Debes seleccionar una categoría.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newProduct = await createProduct({
        name,
        price,
        description,
        categoryId: Number(categoryId),
        images: image,
      });
      alert('Producto creado exitosamente');
      navigate(`/api/products/${newProduct.id}`);
    } catch (err) {
      setError('Error al crear el producto. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre del Producto</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL de la Imagen</label>
          <input type="url" value={image} onChange={e => setImage(e.target.value)} className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required>
            <option value="" disabled>Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-60">
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
}
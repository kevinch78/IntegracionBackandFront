// src/views/CategoriesView.tsx
import { useEffect, useState } from 'react'; // React import removed as it's not strictly needed for functional components
import { listCategories } from '../services/caategories';

interface Category {
  id: number;
  name: string;
}

export const CategoriesView = () => { // Changed to a regular functional component
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(`Error: ${err.data?.message || 'No se pudo cargar'}`))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Categorías de Productos</h2>
        {categories.length > 0 ? (
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id} className="p-3 border rounded-md bg-slate-50 dark:bg-slate-700 dark:border-slate-600 font-medium">{cat.name}</li>
            ))}
          </ul>
        ) : <p className="text-slate-500 dark:text-slate-400">No se encontraron categorías.</p>}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as productsService from '../services/products';
import * as categoriesService from '../services/caategories';



interface Category {
  id: number;
  name: string;
}

const CreateProductView: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Asumo que tienes una función para listar categorías en tus servicios
        const fetchedCategories = await categoriesService.listCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError('No se pudieron cargar las categorías. Asegúrate de haber iniciado sesión.');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !price || !categoryId || !image) {
      setError('Por favor, completa todos los campos requeridos.');
      setIsLoading(false);
      return;
    }

    try {
      const newProduct = {
        name,
        price: parseInt(price, 10),
        description,
        categoryId: parseInt(categoryId, 10),
        images: [image], // El DTO espera un array de imágenes
      };

      await productsService.createProduct(newProduct);
      alert('¡Producto creado con éxito!');
      navigate('/api/products');
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al crear el producto. Verifica que tienes permisos de administrador.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Precio:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">URL de la Imagen:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Categoría:</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-2 border rounded" required>
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300">
          {isLoading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default CreateProductView;
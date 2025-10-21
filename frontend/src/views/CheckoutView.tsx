import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutView: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePurchase = async () => {
    setIsProcessing(true);
    setError(null);

    // Simulación de llamada a la API
    // En un caso real, aquí llamarías a tu servicio de órdenes.
    // await ordersService.createOrder({ ... });

    setTimeout(() => {
      // Simulación exitosa
      console.log('Compra procesada exitosamente.');
      alert('¡Gracias por tu compra! Serás redirigido a la lista de productos.');
      
      // Redirigir al inicio de los productos
      navigate('/api/products');

      // Simulación de error (puedes descomentar para probar)
      // setError('Hubo un problema al procesar tu pago.');
      // setIsProcessing(false);
    }, 2000); // Simula una espera de 2 segundos
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="text-gray-700 mb-6">Estás a punto de finalizar tu compra. ¡Gracias por elegirnos!</p>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button onClick={handlePurchase} disabled={isProcessing} className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-green-300 transition-colors">
          {isProcessing ? 'Procesando compra...' : 'Confirmar y Pagar'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutView;
import React from 'react';

const ProductAvailability = ({ bookedDates = [] }) => {
  // Lógica para verificar si una fecha está ocupada y cambiar su color visualmente
  return (
    <div className="availability-section bg-gray-50 p-6 rounded-lg border my-4">
      <h3 className="text-xl font-bold mb-2 text-gray-800 border-b pb-2">Disponibilidad</h3>
      <p className="text-sm text-gray-600 mb-4">Selecciona las fechas de tu estadía o reserva:</p>
      
    
      <div className="flex flex-col md:flex-row gap-4">
        <div className="calendar-box bg-white p-4 border rounded shadow-sm flex-1">
          <span className="font-semibold text-gray-700">Calendario de Fechas Disponibles</span>
        
         <div className="mt-4 p-4 text-center bg-gray-100 rounded text-gray-500">
            [ Componente de Calendario Doble Integrado ]
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAvailability;
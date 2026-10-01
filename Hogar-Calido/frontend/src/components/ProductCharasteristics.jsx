import React from 'react';
import { FaWifi, FaSwimmingPool, FaTv, FaUtensils, FaSnowflake, FaPaw, FaCar } from 'react-icons/fa';

// Mapeo de iconos según la característica
const iconMap = {
  'Wifi': <FaWifi />,
  'Pileta': <FaSwimmingPool />,
  'Televisor': <FaTv />,
  'Cocina': <FaUtensils />,
  'Aire acondicionado': <FaSnowflake />,
  'Apto mascotas': <FaPaw />,
  'Estacionamiento gratuito': <FaCar />
};

export const ProductCharacteristics = ({ characteristics = [] }) => {
  return (
    <div style={{ background: '#f8fafc', padding: '30px 40px', borderRadius: '12px', marginTop: '30px' }}>
      <h3 style={{ borderBottom: '2px solid #38bdf8', paddingBottom: '10px', color: '#0f172a', fontSize: '22px' }}>
        ¿Qué ofrece este lugar?
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {characteristics.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155', fontSize: '16px', fontWeight: '500' }}>
            <span style={{ fontSize: '20px', color: '#0284c7' }}>
              {iconMap[item.name] || <FaWifi />}
            </span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
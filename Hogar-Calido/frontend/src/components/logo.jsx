import React from 'react';

export const Logo = ({ size = 42 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Fondo con silueta de Casa Gamer (Bordes redondeados + Escudo) */}
      <path 
        d="M50 8 
           L88 38 
           C88 38 88 78 88 82 
           C88 88 82 92 76 92 
           L24 92 
           C18 92 12 88 12 82 
           C12 78 12 38 12 38 
           Z" 
        fill="#0F172A" 
        stroke="#38BDF8" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />

      {/* Detalles del Gamepad/Control integrados en la estructura inferior */}
      {/* D-Pad (Cruceta a la izquierda) */}
      <path d="M26 58 H34 M30 54 V62" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />

      {/* Botones de acción Gamer (a la derecha) */}
      <circle cx="68" cy="56" r="2" fill="#38BDF8" />
      <circle cx="74" cy="60" r="2" fill="#38BDF8" />

      {/* Letra 'J' Mayúscula en el centro con resplandor neón */}
      <path 
        d="M58 35 
           V62 
           C58 70 50 74 42 70 
           C38 68 36 63 38 59" 
        stroke="#38BDF8" 
        strokeWidth="7" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Chimenea con efecto de señal/Cálida */}
      <path d="M70 24 V16 H76 V29" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="73" cy="11" r="1.5" fill="#38BDF8" />
    </svg>
  );
};
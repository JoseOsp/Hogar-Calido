import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Tu componente de Logo original
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
      <path 
        d="M50 8 L88 38 C88 38 88 78 88 82 C88 88 82 92 76 92 L24 92 C18 92 12 88 12 82 C12 78 12 38 12 38 Z" 
        fill="#0F172A" 
        stroke="#38BDF8" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />
      <path d="M26 58 H34 M30 54 V62" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="68" cy="56" r="2" fill="#38BDF8" />
      <circle cx="74" cy="60" r="2" fill="#38BDF8" />
      <path 
        d="M58 35 V62 C58 70 50 74 42 70 C38 68 36 63 38 59" 
        stroke="#38BDF8" 
        strokeWidth="7" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path d="M70 24 V16 H76 V29" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="73" cy="11" r="1.5" fill="#38BDF8" />
    </svg>
  );
};

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 40px', 
      backgroundColor: '#ffffff', 
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Logo y Nombre de la App */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Logo size={42} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
            Hogar Cálido
          </span>
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
            E-commerce
          </span>
        </div>
      </Link>

      {/* Botones de Autenticación / Menú de Usuario */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>
              Hola, {user.name || user.email || 'Usuario'}
            </span>
            <button 
              onClick={logout} 
              style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: '#0f172a', fontWeight: '600', fontSize: '14px', padding: '8px 14px', borderRadius: '6px' }}>
              Iniciar Sesión
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: '600', fontSize: '14px', padding: '8px 18px', borderRadius: '6px', boxShadow: '0 2px 5px rgba(2, 132, 199, 0.2)' }}>
              Crear Cuenta
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
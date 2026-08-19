import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo'; // <-- Agrega esta línea

export const Home = () => {
  const categorias = [
    { id: 1, titulo: 'Salón y Sofás', items: '120 productos', imagen: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop' },
    { id: 2, titulo: 'Comedor y Sillas', items: '85 productos', imagen: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&auto=format&fit=crop' },
    { id: 3, titulo: 'Dormitorio', items: '94 productos', imagen: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&auto=format&fit=crop' },
    { id: 4, titulo: 'Iluminación y Deco', items: '150 productos', imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop' },
  ];

  const destacados = [
    {
      id: 1,
      categoria: 'MUEBLES DE INTERIOR',
      nombre: 'Juego de Comedor Escandinavo',
      descripcion: 'Mesa de roble macizo con 4 sillas ergonómicas de acabado natural.',
      precio: '$45.000 / mes',
      puntuacion: '4.9 ★',
      imagen: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      categoria: 'ILUMINACIÓN',
      nombre: 'Lámpara de Pie Nórdica',
      descripcion: 'Diseño minimalista con base de madera y luz cálida regulable.',
      precio: '$12.500 / mes',
      puntuacion: '4.8 ★',
      imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#0f172a', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Navbar con marca propia */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 50px', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Logo size={42} />
          
          <div>
            <span style={{ fontWeight: '800', fontSize: '20px', color: '#0f172a', letterSpacing: '-0.5px' }}>Hogar Cálido</span>
            <span style={{ display: 'block', fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Confort & Diseño para tu espacio</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{ padding: '9px 18px', border: '1.5px solid #cbd5e1', borderRadius: '8px', backgroundColor: 'transparent', color: '#334155', fontWeight: '600', cursor: 'pointer' }}>Crear cuenta</button>
          <button style={{ padding: '9px 18px', border: 'none', borderRadius: '8px', backgroundColor: '#0f172a', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>Iniciar sesión</button>
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '9px 18px', border: 'none', borderRadius: '8px', backgroundColor: '#38bdf8', color: '#fff', fontWeight: '600', cursor: 'pointer', marginLeft: '8px' }}>
              Panel Admin
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section Banner */}
      <section style={{ backgroundColor: '#0f172a', color: '#fff', padding: '60px 20px', textAlign: 'center', backgroundImage: 'radial-gradient(circle at top, #1e293b, #0f172a)' }}>
        <h1 style={{ margin: '0 0 12px 0', fontSize: '36px', fontWeight: '800', letterSpacing: '-1px' }}>Encuentra el mobiliario perfecto para tu hogar</h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px auto' }}>Alquila o compra piezas exclusivas para transformar tus ambientes con elegancia.</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', maxWidth: '750px', margin: '0 auto', backgroundColor: '#fff', padding: '8px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <input 
            type="text" 
            placeholder="🔍 ¿Qué mueble o categoría buscas?" 
            style={{ padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0', flex: '2', minWidth: '220px', fontSize: '15px', outline: 'none', color: '#334155' }}
          />
          <button style={{ padding: '14px 28px', backgroundColor: '#38bdf8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
            Buscar productos
          </button>
        </div>
      </section>

      {/* Categorías de Muebles */}
      <section style={{ maxWidth: '1150px', margin: '40px auto', padding: '0 25px' }}>
        <h2 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '20px', fontWeight: '700' }}>Explora por categorías</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }}>
          {categorias.map((cat) => (
            <div key={cat.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'transform 0.2s' }}>
              <img src={cat.imagen} alt={cat.titulo} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', color: '#0f172a', fontWeight: '600' }}>{cat.titulo}</h3>
                <span style={{ fontSize: '13px', color: '#64748b' }}>{cat.items}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Productos Destacados */}
      <section style={{ maxWidth: '1150px', margin: '40px auto 100px auto', padding: '0 25px' }}>
        <h2 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '20px', fontWeight: '700' }}>Productos destacados</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' }}>
          {destacados.map((prod) => (
            <div key={prod.id} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', display: 'flex' }}>
              <img src={prod.imagen} alt={prod.nombre} style={{ width: '45%', height: '210px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700', letterSpacing: '0.5px' }}>{prod.categoria}</span>
                    <span style={{ backgroundColor: '#f1f5f9', color: '#0f172a', padding: '2px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '12px' }}>{prod.puntuacion}</span>
                  </div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#0f172a', fontWeight: '700' }}>{prod.nombre}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>{prod.descripcion}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{prod.precio}</span>
                  <button style={{ padding: '8px 14px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                    Ver detalle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer corporativo */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '20px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1e293b' }}>
        <span style={{ fontSize: '13px' }}>© 2026 Hogar Cálido. Todos los derechos reservados.</span>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: '#f8fafc' }}>
          <span style={{ cursor: 'pointer' }}>Términos</span>
          <span style={{ cursor: 'pointer' }}>Privacidad</span>
          <span style={{ cursor: 'pointer' }}>Contacto</span>
        </div>
      </footer>

    </div>
  );
};
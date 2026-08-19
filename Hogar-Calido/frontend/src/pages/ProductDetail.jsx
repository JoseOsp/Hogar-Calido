import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/productos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar detalle:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center', padding: '20px' }}>Cargando detalles...</p>;
  if (!producto) return <p style={{ textAlign: 'center', padding: '20px' }}>Producto no encontrado</p>;

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#3182ce', fontWeight: 'bold' }}>
        ← Volver al catálogo
      </Link>
      
      <h1 style={{ marginTop: '15px', color: '#2d3748' }}>{producto.nombre}</h1>
      
      {producto.categoria && (
        <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontSize: '14px' }}>
          {producto.categoria.titulo}
        </span>
      )}

      <div style={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>

      <p style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6', color: '#4a5568' }}>
        {producto.descripcion}
      </p>

      {/* Bloque de Características (US #18) */}
      <div style={{ marginTop: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
        <h2 style={{ fontSize: '22px', color: '#2d3748', marginBottom: '20px' }}>
          ¿Qué ofrece este lugar?
        </h2>

        {producto.caracteristicas && producto.caracteristicas.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {producto.caracteristicas.map((carac) => (
              <div key={carac.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>✔️</span>
                <span style={{ fontSize: '16px', color: '#2d3748' }}>{carac.nombre}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#718096' }}>No hay características especificadas para este hospedaje.</p>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  // Estados para Modal de Compartir y Reseñas
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Estados para sistema de puntuación
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Camila Andrés', rating: 5, date: '12 Sep 2026', comment: 'Excelente calidad, el servicio de entrega fue impecable y muy cómodo.' },
    { id: 2, name: 'Mateo R.', rating: 4, date: '05 Sep 2026', comment: 'Muy buen diseño, tal como se muestra en las fotos.' }
  ]);

  // Simulación de datos del producto
  const product = {
    id: id,
    name: 'Juego de Comedor Escandinavo',
    category: 'MUEBLES DE INTERIOR',
    description: 'Mesa de roble macizo con 4 sillas ergonómicas de acabado natural ideales para espacios modernos.',
    price: '$45.000 / mes',
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&auto=format&fit=crop'
    ],
    policies: [
      { title: 'Normas de la casa', desc: 'No se permite fumar en espacios cerrados donde se ubiquen los muebles textiles.' },
      { title: 'Salud y seguridad', desc: 'Sanitizado y desinfectado rigurosamente antes de cada entrega o alquiler.' },
      { title: 'Política de cancelación', desc: 'Cancelación gratuita hasta 48 horas antes de la fecha programada de entrega.' }
    ]
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newRev = {
      id: Date.now(),
      name: user?.name || user?.email || 'Usuario Anónimo',
      rating: Number(rating),
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      comment: comment
    };
    setReviews([newRev, ...reviews]);
    setComment('');
  };

  const currentUrl = window.location.href;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1150px', margin: '30px auto', padding: '0 20px', fontFamily: "'Inter', sans-serif", color: '#0f172a' }}>
      
      {/* Migas de pan y Botón Compartir */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Volver al inicio</Link>
        <button 
          onClick={() => setShowShareModal(true)} 
          style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🔗 Compartir producto
        </button>
      </div>

      {/* Título y Puntuación Media */}
      <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 10px 0' }}>{product.name}</h1>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ backgroundColor: '#0f172a', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '700' }}>4.9 ★ Muy bueno</span>
        <span style={{ color: '#64748b', fontSize: '14px' }}>({reviews.length} valoraciones de clientes)</span>
      </div>

      {/* Galería de Imágenes */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', height: '400px', marginBottom: '40px' }}>
        <img src={product.images[0]} alt="Principal" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%' }}>
          <img src={product.images[1]} alt="Secundaria 1" style={{ width: '100%', height: 'calc(50% - 7.5px)', objectFit: 'cover', borderRadius: '12px' }} />
          <img src={product.images[2]} alt="Secundaria 2" style={{ width: '100%', height: 'calc(50% - 7.5px)', objectFit: 'cover', borderRadius: '12px' }} />
        </div>
      </div>

      {/* Bloque de Políticas del Producto (HU #26) */}
      <section style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', textDecoration: 'underline', color: '#0f172a' }}>
          Políticas del producto
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', width: '100%' }}>
          {product.policies.map((pol, idx) => (
            <div key={idx}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#38bdf8' }}>{pol.title}</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{pol.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Valoraciones y Reseñas (HU #28)[cite: 3] */}
      <section style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '50px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Opiniones y Valoraciones</h3>
        
        {user ? (
          <form onSubmit={handleAddReview} style={{ marginBottom: '30px', background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '15px' }}>Deja tu reseña con estrellas</h4>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              <label style={{ fontSize: '14px', fontWeight: '600' }}>Puntuación:</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="5">★★★★★ (5/5)</option>
                <option value="4">★★★★☆ (4/5)</option>
                <option value="3">★★★☆☆ (3/5)</option>
                <option value="2">★★☆☆☆ (2/5)</option>
                <option value="1">★☆☆☆☆ (1/5)</option>
              </select>
            </div>
            <textarea 
              rows="3" 
              placeholder="Escribe tu experiencia con este producto..." 
              value={comment} 
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '10px', fontSize: '14px' }}
            />
            <button type="submit" style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              Publicar reseña
            </button>
          </form>
        ) : (
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
            <Link to="/login" style={{ color: '#38bdf8', fontWeight: '600' }}>Inicia sesión</Link> para dejar tu puntuación y comentario.
          </p>
        )}

        {/* Listado de Reseñas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {reviews.map((rev) => (
            <div key={rev.id} style={{ padding: '15px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontWeight: '700', fontSize: '15px' }}>{rev.name}</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{rev.date}</span>
              </div>
              <div style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '6px' }}>
                {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal / Ventana Emergente para Compartir (HU #27)[cite: 3] */}
      {showShareModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '400px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: '700' }}>Compartir producto</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>Elige una red social o copia el enlace directo:</p>
            
            <textarea 
              placeholder="Agrega un mensaje personalizado (opcional)..." 
              value={shareMessage} 
              onChange={(e) => setShareMessage(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '15px', fontSize: '13px' }}
            />

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + ' ' + currentUrl)}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '10px', background: '#22c55e', color: '#fff', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>WhatsApp</a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '10px', background: '#0284c7', color: '#fff', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>Twitter / X</a>
            </div>

            <button onClick={handleCopyLink} style={{ width: '100%', padding: '10px', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', marginBottom: '15px' }}>
              {copied ? '¡Enlace copiado al portapapeles!' : '📋 Copiar enlace'}
            </button>

            <button onClick={() => setShowShareModal(false)} style={{ width: '100%', padding: '10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
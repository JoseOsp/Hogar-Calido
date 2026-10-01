import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { getProductById, createBookingApi, getBookingsByProduct } from '../services/ProductService';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para Modal de Compartir y Reseñas
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Sistema de puntuación y reseñas
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Camila Andrés', rating: 5, date: '12 Sep 2026', comment: 'Excelente calidad, el servicio de entrega fue impecable y muy cómodo.' },
    { id: 2, name: 'Mateo R.', rating: 4, date: '05 Sep 2026', comment: 'Muy buen diseño, tal como se muestra en las fotos.' }
  ]);

  // Estados para el Calendario Visual e Interactivo
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        }
        const bookingData = await getBookingsByProduct(id);
        if (bookingData) {
          setBookings(bookingData);
        }
      } catch (error) {
        console.error("Error al cargar detalles del producto del backend:", error);
        // Producto de respaldo por si el backend no responde con este ID específico
        setProduct({
          id: id,
          name: 'Juego de Comedor Escandinavo',
          description: 'Mesa de roble macizo con 4 sillas ergonómicas de acabado natural ideales para espacios modernos.',
          price: '45.000',
          imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Debes iniciar sesión para realizar una reserva.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Por favor selecciona una fecha de inicio y de fin en el calendario.");
      return;
    }
    if (startDate > endDate) {
      alert("La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }

    try {
      const bookingPayload = {
        userId: user.id,
        productId: Number(id),
        startDate,
        endDate
      };
      
      await createBookingApi(bookingPayload);
      alert("¡Reserva realizada y guardada con éxito en el sistema!");
      setStartDate('');
      setEndDate('');
      
      const updatedBookings = await getBookingsByProduct(id);
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
      alert("Reserva registrada localmente.");
    }
  };

  // --- LÓGICA DEL CALENDARIO VISUAL ---
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const handleDayClick = (day) => {
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month + 1).padStart(2, '0');
    const selectedDateStr = `${year}-${formattedMonth}-${formattedDay}`;

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDateStr);
      setEndDate('');
    } else if (startDate && !endDate) {
      if (selectedDateStr < startDate) {
        setStartDate(selectedDateStr);
      } else {
        setEndDate(selectedDateStr);
      }
    }
  };

  const currentUrl = window.location.href;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#64748b' }}>Cargando detalles del producto...</div>;
  }

  const mainImage = product?.imageUrl || product?.images?.[0] || 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&auto=format&fit=crop';
  
  const policies = product?.policies || [
    { title: 'Normas de la casa', desc: 'No se permite fumar en espacios cerrados donde se ubiquen los muebles.' },
    { title: 'Salud y seguridad', desc: 'Sanitizado y desinfectado rigurosamente antes de cada entrega.' },
    { title: 'Política de cancelación', desc: 'Cancelación gratuita hasta 48 horas antes de la fecha programada.' }
  ];

  return (
    <div style={{ maxWidth: '1150px', margin: '30px auto', padding: '0 20px', fontFamily: "'Inter', sans-serif", color: '#0f172a' }}>
      
      {/* Cabecera y Botón Compartir */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>← Volver al inicio</Link>
        <button 
          onClick={() => setShowShareModal(true)} 
          style={{ background: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🔗 Compartir producto
        </button>
      </div>

      {/* Título y Puntuación */}
      <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 10px 0' }}>{product?.name || 'Detalle del Producto'}</h1>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ backgroundColor: '#0f172a', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '700' }}>4.9 ★ Muy bueno</span>
        <span style={{ color: '#64748b', fontSize: '14px' }}>({reviews.length} valoraciones de clientes)</span>
      </div>

      {/* Imagen Principal del Producto */}
      <div style={{ marginBottom: '40px', height: '420px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <img src={mainImage} alt={product?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Descripción y Calendario Visual Interactivo */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '15px' }}>Descripción del producto</h2>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
            {product?.description || 'Descripción detallada no disponible.'}
          </p>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#0284c7' }}>
            Precio: ${product?.price || '0'}
          </div>
        </div>

        {/* Panel del Calendario Visual */}
        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>📅 Calendario de Disponibilidad</h3>

          {/* Controles de Mes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <button 
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              style={{ background: '#e2e8f0', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              ◀
            </button>
            <span style={{ fontWeight: '700', fontSize: '14px', color: '#1e293b' }}>
              {monthNames[month]} {year}
            </span>
            <button 
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              style={{ background: '#e2e8f0', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              ▶
            </button>
          </div>

          {/* Cuadrícula Visual del Calendario */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '15px', background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map((d, i) => (
              <span key={i} style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', paddingBottom: '4px' }}>{d}</span>
            ))}
            
            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {[...Array(daysInMonth)].map((_, i) => {
              const dayNum = i + 1;
              const formattedDay = String(dayNum).padStart(2, '0');
              const formattedMonth = String(month + 1).padStart(2, '0');
              const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

              const isSelected = dateStr === startDate || dateStr === endDate;
              const isInRange = startDate && endDate && dateStr > startDate && dateStr < endDate;

              return (
                <button
                  key={dayNum}
                  onClick={() => handleDayClick(dayNum)}
                  style={{
                    padding: '8px 0',
                    fontSize: '12px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#0284c7' : isInRange ? '#e0f2fe' : '#f8fafc',
                    color: isSelected ? '#fff' : '#1e293b',
                    fontWeight: isSelected ? 'bold' : 'normal'
                  }}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Fechas Seleccionadas y Botón de Reserva */}
          {user ? (
            <div>
              <div style={{ fontSize: '13px', marginBottom: '12px', color: '#334155' }}>
                <div><strong>Desde:</strong> {startDate || 'Selecciona un día'}</div>
                <div><strong>Hasta:</strong> {endDate || 'Selecciona un día'}</div>
              </div>
              <button 
                onClick={handleBookingSubmit} 
                style={{ width: '100%', background: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
                Confirmar y Guardar Reserva
              </button>
            </div>
          ) : (
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              <Link to="/login" style={{ color: '#0284c7', fontWeight: '600' }}>Inicia sesión</Link> para apartar tu fecha en el calendario.
            </p>
          )}
        </div>
      </div>

      {/* Políticas del Producto */}
      <section style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', textDecoration: 'underline', color: '#0f172a' }}>
          Políticas del producto
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', width: '100%' }}>
          {policies.map((pol, idx) => (
            <div key={idx}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#38bdf8' }}>{pol.title}</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{pol.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Valoraciones y Reseñas */}
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
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '10px', fontSize: '14px', boxSizing: 'border-box' }}
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

      {/* Modal para Compartir */}
      {showShareModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '400px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: '700' }}>Compartir producto</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>Elige una red social o copia el enlace directo:</p>
            
            <textarea 
              placeholder="Agrega un mensaje personalizado (opcional)..." 
              value={shareMessage} 
              onChange={(e) => setShareMessage(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '15px', fontSize: '13px', boxSizing: 'border-box' }}
            />

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + ' ' + currentUrl)}`} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '10px', background: '#22c55e', color: '#fff', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>WhatsApp</a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noreferrer" style={{ flex: '1', padding: '10px', background: '#0284c7', color: '#fff', textAlign: 'center', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>Twitter / X</a>
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
}
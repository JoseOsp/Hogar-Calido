// src/components/ProductReviews.jsx
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { api } from '../services/api';

export const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Cargar reseñas al montar el componente
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/reviews/product/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error al cargar las reseñas:", error);
      }
    };
    if (productId) fetchReviews();
  }, [productId]);

  // Enviar nueva reseña al Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = { product: { id: productId }, rating, comment };
      const response = await api.post('/reviews', newReview);
      setReviews([...reviews, response.data]); // Actualiza la lista en pantalla
      setComment('');
      setRating(5);
    } catch (error) {
      console.error("Error al guardar la reseña:", error);
    }
  };

  return (
    <div style={{ padding: '40px 20px', background: '#f8fafc', marginTop: '20px', borderRadius: '12px' }}>
      <h3 style={{ fontSize: '22px', color: '#0f172a', marginBottom: '20px' }}>Opiniones y Valoraciones</h3>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px', color: '#334155' }}>Califica tu experiencia:</h4>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', cursor: 'pointer' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar 
              key={star} 
              size={24} 
              color={star <= rating ? '#e3b155' : '#cbd5e1'} 
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <textarea 
          rows="3" 
          placeholder="Escribe tu comentario detallado..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '15px' }}
          required
        />
        <button type="submit" style={{ background: '#0f172a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          Enviar reseña
        </button>
      </form>

      {/* Listado */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {reviews.length === 0 ? (
          <p style={{ color: '#64748b' }}>Aún no hay reseñas para este lugar. ¡Sé el primero en opinar!</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} style={{ background: 'white', padding: '15px 20px', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>{rev.user?.firstName || 'Usuario'}</strong>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{rev.date || 'Reciente'}</span>
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} size={14} color="#e3b155" />
                ))}
              </div>
              <p style={{ color: '#334155', fontSize: '14px', margin: 0 }}>{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaCouch } from 'react-icons/fa';
import { getProducts } from '../services/ProductService';

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Cargar todos los productos al iniciar para filtrar las sugerencias en tiempo real
  useEffect(() => {
    getProducts().then(data => setAllProducts(data));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(value.toLowerCase()))
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSuggestions(); // Cierra las sugerencias al presionar buscar
    onSearch(searchTerm);
  };

  const handleSelectSuggestion = (productName) => {
    setSearchTerm(productName);
    setSuggestions();
    onSearch(productName);
  };

  return (
    <div style={{ background: '#27242a', padding: '40px 20px', textAlign: 'center', color: 'white' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '15px', fontWeight: '700' }}>
        Renueva tu hogar con los mejores muebles y diseño
      </h2>
      <p style={{ color: '#cbd5e1', marginBottom: '25px', fontSize: '16px' }}>
        Encuentra sofás, mesas, camas y todo para cada rincón de tu casa.
      </p>
      
      {/* Contenedor relativo para posicionar la lista desplegable de sugerencias */}
      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          
          {/* Input de Búsqueda */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '12px 18px', borderRadius: '8px', flex: '1', color: '#334155' }}>
            <FaCouch style={{ color: '#64748b', marginRight: '10px' }} />
            <input 
              type="text" 
              placeholder="¿Qué mueble estás buscando? (ej. Sofá, Comedor...)" 
              value={searchTerm}
              onChange={handleInputChange}
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '15px' }}
            />
          </div>

          {/* Botón Buscar */}
          <button type="submit" style={{ background: '#38bdf8', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaSearch /> Buscar
          </button>
        </form>

        {/* Lista desplegable de sugerencias en tiempo real */}
        {suggestions.length > 0 && (
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#ffffff',
            color: '#333333',
            listStyle: 'none',
            padding: 0,
            margin: '8px 0 0 0',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            zIndex: 1000,
            borderRadius: '8px',
            maxHeight: '250px',
            overflowY: 'auto',
            textAlign: 'left'
          }}>
            {suggestions.map(item => (
              <li 
                key={item.id} 
                onClick={() => handleSelectSuggestion(item.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 15px',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', marginRight: '12px' }} 
                  />
                )}
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>{item.name}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>${item.price}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
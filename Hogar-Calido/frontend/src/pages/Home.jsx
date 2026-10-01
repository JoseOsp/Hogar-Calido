import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { getProducts } from '../services/ProductService';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando productos recomendados:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '50px' }}>
            
            {/* Sección del buscador superior (ajusta según tu diseño visual actual) */}
            <div style={{ backgroundColor: '#1e293b', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
                <h1 style={{ marginBottom: '10px', fontSize: '2.2rem' }}>Renueva tu hogar con los mejores muebles y diseño</h1>
                <p style={{ marginBottom: '30px', color: '#cbd5e1' }}>Encuentra sofás, mesas, camas y todo para cada rincón de tu casa.</p>
                
                {/* Aquí insertamos el Buscador */}
                <SearchBar />
            </div>

            {/* Sección de Productos Recomendados */}
            <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                <h2 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '20px' }}>Productos Recomendados</h2>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#64748b' }}>Cargando productos...</p>
                ) : products.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#64748b' }}>No se encontraron productos disponibles.</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '20px'
                    }}>
                        {products.map(product => (
                            <div key={product.id} style={{
                                background: 'white',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                border: '1px solid #e2e8f0',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                                />
                                <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', margin: '0 0 8px 0', color: '#1e293b' }}>{product.name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0 0 12px 0' }}>{product.description}</p>
                                    </div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#0284c7' }}>
                                        ${product.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
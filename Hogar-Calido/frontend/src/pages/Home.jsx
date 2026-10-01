import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { getProducts, toggleFavoriteApi, getFavoritesByUser } from '../services/ProductService';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function Home() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar productos y favoritos del usuario si está logueado
        const loadData = async () => {
            try {
                const productData = await getProducts();
                setProducts(productData);

                if (user && user.id) {
                    const favs = await getFavoritesByUser(user.id);
                    // Suponiendo que el backend retorna una lista de objetos Favorite con productId
                    setFavorites(favs.map(f => f.productId));
                }
            } catch (err) {
                console.error("Error cargando datos del Home:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user]);

    const handleToggleFavorite = async (productId, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert("Debes iniciar sesión para agregar productos a favoritos.");
            return;
        }

        try {
            const success = await toggleFavoriteApi(user.id, productId);
            if (success) {
                if (favorites.includes(productId)) {
                    setFavorites(favorites.filter(id => id !== productId));
                } else {
                    setFavorites([...favorites, productId]);
                }
            }
        } catch (error) {
            console.error("Error al actualizar favorito:", error);
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '50px' }}>
            
            {/* Sección del buscador superior */}
            <div style={{ backgroundColor: '#1e293b', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
                <h1 style={{ marginBottom: '10px', fontSize: '2.2rem' }}>Renueva tu hogar con los mejores muebles y diseño</h1>
                <p style={{ marginBottom: '30px', color: '#cbd5e1' }}>Encuentra sofás, mesas, camas y todo para cada rincón de tu casa.</p>
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
                        {products.map(product => {
                            const isFav = favorites.includes(product.id);
                            return (
                                <div key={product.id} style={{
                                    background: 'white',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                    border: '1px solid #e2e8f0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative'
                                }}>
                                    {/* Botón de Favorito */}
                                    <button 
                                        onClick={(e) => handleToggleFavorite(product.id, e)}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '36px',
                                            height: '36px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            fontSize: '18px',
                                            zIndex: 2
                                        }}
                                        title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                                    >
                                        {isFav ? '❤️' : '🤍'}
                                    </button>

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
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#0284c7' }}>
                                                ${product.price}
                                            </span>
                                            <Link 
                                                to={`/product/${product.id}`} 
                                                style={{ padding: '6px 12px', background: '#0f172a', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
                                                Ver detalle
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
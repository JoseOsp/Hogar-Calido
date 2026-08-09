import React, { useState, useEffect } from 'react';

export const PanelAdmin = () => {
  const [vistaActual, setVistaActual] = useState('inicio');
  const [productos, setProductos] = useState([]);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  useEffect(() => {
    if (vistaActual === 'lista') {
      obtenerProductos();
    }
  }, [vistaActual]);

  const obtenerProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/productos');
      if (!response.ok) throw new Error('Error al conectar con la API');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.log('Error o API no disponible, mostrando datos de prueba:', error);
      // Datos de prueba locales
      setProductos([
        { id: 1, nombre: 'Silla de Comedor Madera' },
        { id: 2, nombre: 'Mesa Auxiliar Roble' },
        { id: 3, nombre: 'Lámpara de Escritorio LED' }
      ]);
    }
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;

    try {
      const response = await fetch(`http://localhost:8080/api/productos/${productoAEliminar.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProductos(productos.filter((prod) => prod.id !== productoAEliminar.id));
      } else {
        // Si no hay backend, lo eliminamos localmente para probar la interfaz
        setProductos(productos.filter((prod) => prod.id !== productoAEliminar.id));
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      // Simulación de eliminación local si la API falla
      setProductos(productos.filter((prod) => prod.id !== productoAEliminar.id));
    } finally {
      setProductoAEliminar(null);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>Panel de Administración</h1>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setVistaActual('lista')}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#38bdf8', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Lista de productos
        </button>
      </div>

      {vistaActual === 'lista' && (
        <div>
          <h2>Lista de productos</h2>
          <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9' }}>
                <th>Id</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No hay productos cargados.</td>
                </tr>
              ) : (
                productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.nombre}</td>
                    <td>
                      <button 
                        onClick={() => setProductoAEliminar(prod)}
                        style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Eliminar producto
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {productoAEliminar && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', textAlign: 'center', width: '350px' }}>
            <h3>¿Desea eliminar el producto?</h3>
            <p><strong>{productoAEliminar.nombre}</strong> (ID: {productoAEliminar.id})</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <button 
                onClick={confirmarEliminacion} 
                style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Aceptar
              </button>
              <button 
                onClick={() => setProductoAEliminar(null)} 
                style={{ backgroundColor: '#6b7280', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
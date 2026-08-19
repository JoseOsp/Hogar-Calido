import { useState, useEffect } from 'react';

export const Admin = () => {
  // Estados para Categorías
  const [categoria, setCategoria] = useState({ titulo: '', descripcion: '', urlImagen: '' });
  // Estados para Características
  const [caracteristica, setCaracteristica] = useState({ nombre: '', icono: '' });
  // Estados para Usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/usuarios');
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      }
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  };

  // Guardar nueva categoría (US #21)
  const handleCategoriaSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoria)
      });
      if (res.ok) {
        setMensaje('Categoría creada con éxito');
        setCategoria({ titulo: '', descripcion: '', urlImagen: '' });
      }
    } catch (err) {
      setMensaje('Error al crear categoría');
    }
  };

  // Guardar nueva característica (US #17)
  const handleCaracteristicaSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/caracteristicas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(caracteristica)
      });
      if (res.ok) {
        setMensaje('Característica agregada con éxito');
        setCaracteristica({ nombre: '', icono: '' });
      }
    } catch (err) {
      setMensaje('Error al crear característica');
    }
  };

  // Cambiar rol de usuario (US #16)
  const handleCambiarRol = async (id, nuevoRol) => {
    try {
      const res = await fetch(`http://localhost:8080/api/auth/usuarios/${id}/rol`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol: nuevoRol })
      });
      if (res.ok) {
        setMensaje('Rol actualizado correctamente');
        cargarUsuarios();
      }
    } catch (err) {
      setMensaje('Error al actualizar el rol');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px' }}>
      <h1>Panel de Administración</h1>
      {mensaje && <p style={{ padding: '10px', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>{mensaje}</p>}

      {/* Sección 1: Crear Categoría */}
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Agregar Nueva Categoría</h2>
        <form onSubmit={handleCategoriaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Título" value={categoria.titulo} onChange={(e) => setCategoria({...categoria, titulo: e.target.value})} required style={{ padding: '8px' }} />
          <input type="text" placeholder="Descripción" value={categoria.descripcion} onChange={(e) => setCategoria({...categoria, descripcion: e.target.value})} required style={{ padding: '8px' }} />
          <input type="text" placeholder="URL de la Imagen" value={categoria.urlImagen} onChange={(e) => setCategoria({...categoria, urlImagen: e.target.value})} required style={{ padding: '8px' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Guardar Categoría</button>
        </form>
      </section>

      {/* Sección 2: Crear Característica */}
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Agregar Característica</h2>
        <form onSubmit={handleCaracteristicaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Nombre (ej. WiFi, Pileta)" value={caracteristica.nombre} onChange={(e) => setCaracteristica({...caracteristica, nombre: e.target.value})} required style={{ padding: '8px' }} />
          <input type="text" placeholder="Nombre de ícono o clase" value={caracteristica.icono} onChange={(e) => setCaracteristica({...caracteristica, icono: e.target.value})} style={{ padding: '8px' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#38a169', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Guardar Característica</button>
        </form>
      </section>

      {/* Sección 3: Asignar Roles de Usuario */}
      <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Gestión de Usuarios y Permisos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f7fafc', textAlign: 'left' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Usuario</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Rol Actual</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{u.nombre} {u.apellido}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{u.email}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}><strong>{u.rol}</strong></td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {u.rol === 'ROLE_ADMIN' ? (
                    <button onClick={() => handleCambiarRol(u.id, 'ROLE_USER')} style={{ padding: '5px 10px', backgroundColor: '#e53e3e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Quitar Admin</button>
                  ) : (
                    <button onClick={() => handleCambiarRol(u.id, 'ROLE_ADMIN')} style={{ padding: '5px 10px', backgroundColor: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Hacer Admin</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
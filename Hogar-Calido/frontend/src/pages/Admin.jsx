import React, { useState } from 'react';

export const Admin = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Salón y Sofás', count: 120 },
    { id: 2, name: 'Comedor y Sillas', count: 85 },
    { id: 3, name: 'Dormitorio', count: 94 }
  ]);

  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      setCategoryToDelete(null);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px' }}>Panel de Administración - Gestión de Categorías</h2>
      
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '12px', fontSize: '14px' }}>Categoría</th>
              <th style={{ padding: '12px', fontSize: '14px' }}>Productos Asociados</th>
              <th style={{ padding: '12px', fontSize: '14px', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>{cat.name}</td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#64748b' }}>{cat.count} productos</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button 
                    onClick={() => setCategoryToDelete(cat)}
                    style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Preventivo de Confirmación (HU #29)[cite: 3] */}
      {categoryToDelete && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '400px', maxWidth: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#dc2626', fontWeight: '700' }}>¿Estás seguro de eliminar esta categoría?</h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: '20px' }}>
              Estás a punto de eliminar la categoría <strong>{categoryToDelete.name}</strong>. Esta acción podría afectar a los <strong>{categoryToDelete.count} productos asociados</strong> a la misma.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setCategoryToDelete(null)} style={{ flex: 1, padding: '10px', background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button onClick={confirmDeleteCategory} style={{ flex: 1, padding: '10px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                Confirmar y eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
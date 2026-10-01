import React from 'react';

export const ProductPolicies = () => {
  const policies = [
    { title: "Normas de la casa", description: "Check-in: 15:00 - 21:00\nCheckout: 10:00\nNo se permiten fiestas\nNo fumar en las instalaciones" },
    { title: "Salud y seguridad", description: "Se aplican las pautas de distanciamiento social.\nDetector de monóxido de carbono instalado.\nExtintor de incendios disponible." },
    { title: "Políticas de cancelación", description: "Agrega las fechas de tu viaje para conocer las políticas de cancelación de esta estadía." }
  ];

  return (
    <div style={{ padding: '40px 20px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '30px', borderBottom: '2px solid #0f172a', paddingBottom: '10px', display: 'inline-block' }}>
        Qué tenés que saber
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {policies.map((policy, idx) => (
          <div key={idx}>
            <h4 style={{ fontSize: '18px', color: '#0f172a', marginBottom: '12px', fontWeight: '700' }}>{policy.title}</h4>
            <p style={{ fontSize: '14px', color: '#475569', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
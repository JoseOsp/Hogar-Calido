const API_URL = 'http://localhost:8080/api';

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

// Servicios de Favoritos
export const getFavoritesByUser = async (userId) => {
  const response = await fetch(`${API_URL}/favorites/user/${userId}`);
  return response.json();
};

export const toggleFavoriteApi = async (userId, productId) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId })
  });
  return response.ok;
};

// Servicios de Reservas / Calendario (Sprint 3)
export const getBookingsByProduct = async (productId) => {
  const response = await fetch(`${API_URL}/bookings/product/${productId}`);
  return response.json();
};

export const createBookingApi = async (bookingData) => {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  if (!response.ok) throw new Error("No se pudo completar la reserva");
  return response.json();
};
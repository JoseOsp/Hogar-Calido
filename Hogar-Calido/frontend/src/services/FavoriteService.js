// src/services/favoriteService.js
import { api } from './api';

export const favoriteService = {
  getFavoritesByUser: (userId) => api.get(`/favorites/user/${userId}`),
  addFavorite: (userId, productId) => api.post('/favorites', { userId, productId }),
  removeFavorite: (userId, productId) => api.delete(`/favorites`, { data: { userId, productId } })
};
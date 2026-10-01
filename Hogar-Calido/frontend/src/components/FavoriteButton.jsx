
import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';

const FavoriteButton = ({ productId }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Debes iniciar sesión para agregar a favoritos.");
      return;
    }
    
    // Cambia el estado local y llama a tu API de favoritos
    setIsFavorite(!isFavorite);
    // await productService.toggleFavorite(user.id, productId);
  };

  return (
    <button onClick={toggleFavorite} className="absolute top-3 right-3 text-red-500 text-xl bg-white p-2 rounded-full shadow">
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default FavoriteButton;
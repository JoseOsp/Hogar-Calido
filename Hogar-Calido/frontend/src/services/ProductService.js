const API_URL = 'http://localhost:8080/api/products';

export const getProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        return await response.json();
    } catch (error) {
        console.error("Error en productService:", error);
        return [];
    }
};
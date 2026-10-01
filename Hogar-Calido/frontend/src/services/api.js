// src/services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Asegúrate de que coincida con el puerto de Spring Boot
  headers: {
    'Content-Type': 'application/json'
  }
});
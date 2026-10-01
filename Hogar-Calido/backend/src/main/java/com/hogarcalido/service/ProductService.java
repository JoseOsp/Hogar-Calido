package com.hogarcalido.service;

import com.hogarcalido.model.Product;
import com.hogarcalido.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> obtenerTodos() {
        return productRepository.findAll();
    }

    public Optional<Product> obtenerPorId(Long id) {
        return productRepository.findById(id);
    }

    public Product guardar(Product producto) {
        return productRepository.save(producto);
    }

    public void eliminar(Long id) {
        productRepository.deleteById(id);
    }
}
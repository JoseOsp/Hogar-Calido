package com.hogarcalido.controller;

import com.hogarcalido.model.Review;
import com.hogarcalido.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*") // Ajusta según tu configuración de CORS
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // Endpoint para buscar reseñas por ID de producto
    // Coincide con: /reviews/product/1
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProduct(@PathVariable Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return ResponseEntity.ok(reviews);
    }
}
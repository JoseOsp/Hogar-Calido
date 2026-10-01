package com.hogarcalido.controller;

import com.hogarcalido.model.Favorite;
import com.hogarcalido.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @GetMapping("/user/{userId}")
    public List<Favorite> getFavoritesByUser(@PathVariable Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<?> toggleFavorite(@RequestBody Favorite favorite) {
        if (favoriteRepository.existsByUserIdAndProductId(favorite.getUserId(), favorite.getProductId())) {
            favoriteRepository.deleteByUserIdAndProductId(favorite.getUserId(), favorite.getProductId());
            return ResponseEntity.ok("Eliminado de favoritos");
        } else {
            Favorite saved = favoriteRepository.save(favorite);
            return ResponseEntity.ok(saved);
        }
    }
}
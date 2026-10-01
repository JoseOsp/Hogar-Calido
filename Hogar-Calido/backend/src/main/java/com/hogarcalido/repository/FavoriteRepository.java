// src/main/java/com/hogarcalido/repository/FavoriteRepository.java
package com.hogarcalido.repository;

import com.hogarcalido.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
}
package com.hogarcalido.repository;

import com.hogarcalido.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
    boolean existsByUserIdAndProductId(Long userId, Long productId);
}
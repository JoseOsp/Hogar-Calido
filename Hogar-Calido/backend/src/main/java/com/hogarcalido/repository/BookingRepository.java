package com.hogarcalido.repository;

import com.hogarcalido.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByProductId(Long productId);
    List<Booking> findByUserId(Long userId);
}
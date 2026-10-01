package com.hogarcalido.controller;

import com.hogarcalido.model.Booking;
import com.hogarcalido.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Obtener las reservas de un producto específico
    @GetMapping("/product/{productId}")
    public List<Booking> getBookingsByProduct(@PathVariable Long productId) {
        return bookingRepository.findByProductId(productId);
    }

    // Guardar una nueva reserva
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        if (booking.getUserId() == null || booking.getProductId() == null || booking.getStartDate() == null || booking.getEndDate() == null) {
            return ResponseEntity.badRequest().body("Faltan datos obligatorios para la reserva.");
        }
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }
}
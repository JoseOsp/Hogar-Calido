package com.hogarcalido.service;

import com.hogarcalido.model.User;
import com.hogarcalido.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User register(User user) {
        // Encriptar obligatoriamente la contraseña
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Asegurar rol estándar por defecto
        if (user.getRole() == null) {
            user.setRole("ROLE_USER");
        }
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            if (passwordEncoder.matches(rawPassword, userOpt.get().getPassword())) {
                return userOpt;
            }
        }
        return Optional.empty();
    }
}
package com.hogarcalido.service;

import com.hogarcalido.model.Usuario;
import com.hogarcalido.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario register(Usuario usuario) {
        usuario.setPassword(
            passwordEncoder.encode(usuario.getPassword())
        );

        if (usuario.getRol() == null || usuario.getRol().isBlank()) {
            usuario.setRol("ROLE_USER");
        }

        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> login(String email, String rawPassword) {
        Optional<Usuario> usuarioOpt =
                usuarioRepository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            if (passwordEncoder.matches(
                    rawPassword,
                    usuarioOpt.get().getPassword())) {

                return usuarioOpt;
            }
        }

        return Optional.empty();
    }
}
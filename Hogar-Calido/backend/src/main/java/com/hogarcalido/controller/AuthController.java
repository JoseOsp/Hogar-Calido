package com.hogarcalido.controller;

import com.hogarcalido.model.Usuario;
import com.hogarcalido.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    // US #13: Registrar usuario
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.registrar(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // US #14: Identificar usuario / Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        String email = credenciales.get("email");
        String password = credenciales.get("password");

        Optional<Usuario> usuarioOpt = usuarioService.buscarPorEmail(email);

        if (usuarioOpt.isPresent() && usuarioOpt.get().getPassword().equals(password)) {
            Usuario u = usuarioOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("id", u.getId());
            response.put("nombre", u.getNombre());
            response.put("apellido", u.getApellido());
            response.put("email", u.getEmail());
            response.put("rol", u.getRol());
            response.put("mensaje", "Inicio de sesión exitoso");
            return ResponseEntity.ok(response);
        }

        Map<String, String> error = new HashMap<>();
        error.put("mensaje", "Credenciales incorrectas");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    // Listar usuarios (para administración)
    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios() {
        return usuarioService.obtenerTodos();
    }

    // US #16: Otorgar o quitar permisos de administrador
    @PutMapping("/usuarios/{id}/rol")
    public ResponseEntity<Usuario> cambiarRol(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevoRol = body.get("rol");
        return ResponseEntity.ok(usuarioService.cambiarRol(id, nuevoRol));
    }
}
package com.hogarcalido.controller;

import com.hogarcalido.dto.UsuarioResponseDTO; // Importamos el DTO que creamos antes
import com.hogarcalido.model.Usuario;
import com.hogarcalido.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder; // Importamos para verificar la contraseña encriptada
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inyectamos el PasswordEncoder para el login seguro

    // US #13: Registrar usuario (Ahora devolvemos un DTO para no exponer datos sensibles)
    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.registrar(usuario);
            UsuarioResponseDTO usuarioDTO = new UsuarioResponseDTO(nuevoUsuario); // Ocultamos contraseña
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioDTO);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // US #14: Identificar usuario / Login seguro con BCrypt
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciales) {
        String email = credenciales.get("email");
        String password = credenciales.get("password");

        Optional<Usuario> usuarioOpt = usuarioService.buscarPorEmail(email);

        // Usamos passwordEncoder.matches() porque la contraseña de la BD está encriptada
        if (usuarioOpt.isPresent() && passwordEncoder.matches(password, usuarioOpt.get().getPassword())) {
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

    // Listar usuarios (Protegido con DTO para que no se filtren contraseñas de nadie)
    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioResponseDTO>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.obtenerTodos();
        List<UsuarioResponseDTO> usuariosDTO = usuarios.stream()
                .map(UsuarioResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(usuariosDTO);
    }

    // US #16: Otorgar o quitar permisos de administrador
    @PutMapping("/usuarios/{id}/rol")
    public ResponseEntity<UsuarioResponseDTO> cambiarRol(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String nuevoRol = body.get("rol");
        Usuario usuarioActualizado = usuarioService.cambiarRol(id, nuevoRol);
        return ResponseEntity.ok(new UsuarioResponseDTO(usuarioActualizado));
    }
}
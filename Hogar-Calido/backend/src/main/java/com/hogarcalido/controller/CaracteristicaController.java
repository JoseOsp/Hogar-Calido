package com.hogarcalido.controller;

import com.hogarcalido.model.Caracteristica;
import com.hogarcalido.service.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/caracteristicas")
@CrossOrigin(origins = "*")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaService caracteristicaService;

    @GetMapping
    public List<Caracteristica> obtenerTodas() {
        return caracteristicaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caracteristica> obtenerPorId(@PathVariable Long id) {
        return caracteristicaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Caracteristica> crear(@RequestBody Caracteristica caracteristica) {
        return ResponseEntity.ok(caracteristicaService.guardar(caracteristica));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        caracteristicaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
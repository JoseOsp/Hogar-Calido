package com.hogarcalido.config;

import com.hogarcalido.model.Caracteristica;
import com.hogarcalido.model.Categoria;
import com.hogarcalido.model.Producto;
import com.hogarcalido.repository.CaracteristicaRepository;
import com.hogarcalido.repository.CategoriaRepository;
import com.hogarcalido.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(
            ProductoRepository productoRepo,
            CategoriaRepository categoriaRepo,
            CaracteristicaRepository caracteristicaRepo) {
        return args -> {
            if (productoRepo.count() == 0) {
                // 1. Crear Categorías iniciales
                Categoria cabanas = categoriaRepo.save(new Categoria("Cabañas", "Alojamiento acogedor en la naturaleza", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"));
                Categoria deptos = categoriaRepo.save(new Categoria("Departamentos", "Ubicaciones céntricas y modernas", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"));

                // 2. Crear Características iniciales
                Caracteristica wifi = caracteristicaRepo.save(new Caracteristica("WiFi", "wifi"));
                Caracteristica tv = caracteristicaRepo.save(new Caracteristica("Televisor", "tv"));
                Caracteristica aire = caracteristicaRepo.save(new Caracteristica("Aire acondicionado", "snowflake"));
                Caracteristica cocina = caracteristicaRepo.save(new Caracteristica("Cocina", "utensils"));

                // 3. Crear Productos de prueba con sus relaciones asociadas
                productoRepo.save(new Producto(
                    "Cabaña Alpina", 
                    "Hermosa cabaña en la montaña con vista panorámica y chimenea.", 
                    120.0, 
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
                    cabanas,
                    List.of(wifi, tv, cocina)
                ));

                productoRepo.save(new Producto(
                    "Departamento Centro", 
                    "Moderno departamento monoambiente equipado en el centro de la ciudad.", 
                    85.0, 
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
                    deptos,
                    List.of(wifi, tv, aire)
                ));
            }
        };
    }
}
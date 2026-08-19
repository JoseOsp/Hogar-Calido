package com.hogarcalido.config;

import com.hogarcalido.model.Producto;
import com.hogarcalido.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ProductoRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Producto(
                    "Cabaña Alpina", 
                    "Hermosa cabaña en la montaña con vista panorámica y chimenea.", 
                    120.0, 
                    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb", 
                    "Cabañas"
                ));
                repository.save(new Producto(
                    "Departamento Centro", 
                    "Moderno departamento monoambiente equipado en el centro de la ciudad.", 
                    85.0, 
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688", 
                    "Departamentos"
                ));
            }
        };
    }
}
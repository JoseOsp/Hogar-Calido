package com.hogarcalido.config;

import com.hogarcalido.model.Product;
import com.hogarcalido.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository) {

        return args -> {

            if (productRepository.count() == 0) {

                productRepository.save(
                    new Product(
                        "Sofá Moderno Minimalista",
                        "Sofá tapizado en tela de alta resistencia, ideal para salas.",
                        450.00,
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
                        "Salas"
                    )
                );

                productRepository.save(
                    new Product(
                        "Mesa de Comedor Elegante",
                        "Comedor de madera de roble con capacidad para 6 personas.",
                        320.00,
                        "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf",
                        "Comedores"
                    )
                );

                productRepository.save(
                    new Product(
                        "Cama King Size Confort",
                        "Estructura de madera sólida con cabecera capitonada.",
                        550.00,
                        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                        "Dormitorios"
                    )
                );

                productRepository.save(
                    new Product(
                        "Silla Ergonómica de Escritorio",
                        "Perfecta para oficina en casa con soporte lumbar.",
                        120.00,
                        "c:\Users\pc\Downloads\image silla ergonomica.jpeg",
                        "Oficina"
                    )
                );
            }
        };
    }
}
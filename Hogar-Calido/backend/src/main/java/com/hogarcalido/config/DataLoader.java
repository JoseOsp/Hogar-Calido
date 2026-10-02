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
                
                // --- PRODUCTOS 1 AL 8 ---
                
                Product p1 = new Product();
                p1.setName("Mesa de Centro Clásica");
                p1.setDescription("Mesa elegante para sala de estar con acabado en madera.");
                p1.setPrice(150.00);
                p1.setImageUrl("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p1);

                Product p2 = new Product();
                p2.setName("Silla de Comedor Moderna");
                p2.setDescription("Silla tapizada muy cómoda para el comedor.");
                p2.setPrice(85.00);
                p2.setImageUrl("https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p2);

                Product p3 = new Product();
                p3.setName("Sofá 2 Cuerpos");
                p3.setDescription("Sofá compacto ideal para departamentos modernos.");
                p3.setPrice(400.00);
                p3.setImageUrl("https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p3);

                Product p4 = new Product();
                p4.setName("Estantería de Madera");
                p4.setDescription("Estante de 4 niveles para libros y decoración.");
                p4.setPrice(120.00);
                p4.setImageUrl("https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p4);

                Product p5 = new Product();
                p5.setName("Juego de Comedor Escandinavo");
                p5.setDescription("Mesa de roble macizo con 6 sillas ergonomicas tapizadas, ideal para espacios modernos y calidos.");
                p5.setPrice(450.00);
                p5.setImageUrl("https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p5);

                Product p6 = new Product();
                p6.setName("Sofa Modular Contemporaneo");
                p6.setDescription("Sofa de 3 cuerpos en L con tela aterciopelada antimanchas y maximo confort.");
                p6.setPrice(780.00);
                p6.setImageUrl("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p6);

                Product p7 = new Product();
                p7.setName("Cama King Size Minimalista");
                p7.setDescription("Estructura de madera de pino natural con respaldar capitone de disenio elegante.");
                p7.setPrice(620.00);
                p7.setImageUrl("https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p7);

                Product p8 = new Product();
                p8.setName("Escritorio Ejecutivo en L");
                p8.setDescription("Escritorio moderno para oficina en casa con cajonera incorporada y acabado antirrayas.");
                p8.setPrice(310.00);
                p8.setImageUrl("https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p8);

                // --- PRODUCTOS 9 AL 16 ---

                Product p9 = new Product();
                p9.setName("Sillón Individual de Lectura");
                p9.setDescription("Butaca acogedora con cojín lumbar, perfecta para crear un rincón de lectura.");
                p9.setPrice(220.00);
                p9.setImageUrl("https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p9);

                Product p10 = new Product();
                p10.setName("Mesa de Comedor Redonda");
                p10.setDescription("Mesa circular de diseño nórdico con capacidad para 4 personas, acabado mate.");
                p10.setPrice(340.00);
                // URL corregida y garantizada para la mesa redonda:
                p10.setImageUrl("https://images.unsplash.com/photo-1605239435870-67df4c54a0b3?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p10);

                Product p11 = new Product();
                p11.setName("Cómoda de 6 Cajones");
                p11.setDescription("Mueble organizador de gran capacidad con tiradores metálicos discretos.");
                p11.setPrice(290.00);
                p11.setImageUrl("https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p11);

                Product p12 = new Product();
                p12.setName("Banco Zapatero Recibidor");
                p12.setDescription("Banco organizador de calzado para la entrada con asiento acolchado.");
                p12.setPrice(95.00);
                p12.setImageUrl("https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p12);

                Product p13 = new Product();
                p13.setName("Mesa de Noche Minimalista");
                p13.setDescription("Velador flotante de madera con un cajón organizador y diseño limpio.");
                p13.setPrice(65.00);
                p13.setImageUrl("https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p13);

                Product p14 = new Product();
                p14.setName("Lámpara de Pie LED");
                p14.setDescription("Lámpara de iluminación indirecta con estructura metálica esbelta.");
                p14.setPrice(75.00);
                p14.setImageUrl("https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p14);

                Product p15 = new Product();
                p15.setName("Centro de Entretenimiento TV");
                p15.setDescription("Mueble multimedia para pantallas de hasta 65 pulgadas con compartimentos ocultos.");
                p15.setPrice(350.00);
                p15.setImageUrl("https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p15);

                Product p16 = new Product();
                p16.setName("Espejo de Cuerpo Entero");
                p16.setDescription("Espejo decorativo con marco de madera fina para dormitorio o vestidor.");
                p16.setPrice(110.00);
                p16.setImageUrl("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p16);
            }
        };
    }
}
# Hogar Cálido

## 01. Definición del Proyecto
Hogar Cálido es una plataforma web (e-commerce) enfocada en el alquiler de muebles y artículos para el hogar. La solución permite a los usuarios explorar catálogos por categorías, realizar búsquedas personalizadas y visualizar detalles de productos, además de contar con un panel de administración para la gestión del catálogo.

## 02. Identidad de Marca
- **Nombre:** Hogar Cálido
- **Colores Principales:** `#0f172a` (Oscuro) y `#38bdf8` (Azul Celeste/Gamer)
- **Logo:** Vectorizado con iniciales integradas.

## 03. Planificación y Ejecución de Tests

| ID Test | Historia de Usuario | Descripción del Test | Resultado Esperado | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | Acceso al panel | Navegar a `/admin` desde el botón de la Home | Carga la vista del Panel de Administración | **Exitoso** |
| **TC02** | Ver catálogo | Clic en "Lista de productos" | Se despliega la tabla con Id, Imagen, Nombre y Acciones | **Exitoso** |
| **TC03** | Modal de eliminación | Clic en "Eliminar producto" | Se abre la ventana modal con opciones Aceptar y Cancelar | **Exitoso** |
| **TC04** | Cancelar eliminación | Clic en "Cancelar" dentro del modal | El modal se cierra sin alterar la lista | **Exitoso** |
| **TC05** | Confirmar eliminación | Clic en "Aceptar" dentro del modal | Envía la petición `DELETE` a la API en Java y remueve el producto | **Exitoso** |
## Plan de Pruebas y Control de Calidad (QA) - Sprint 2

| ID | User Story Relacionada | Escenario / Caso de Prueba | Resultado Esperado | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | **US #13:** Registrar usuario | Registro con datos válidos | Se crea el usuario en BD y redirige al login. | **PASO** |
| **TC02** | **US #13:** Registrar usuario | Registro con email duplicado | Muestra mensaje de error: "El email ya está registrado". | **PASO** |
| **TC03** | **US #14:** Iniciar sesión | Login con credenciales correctas | Autentica al usuario y guarda sesión en localStorage. | **PASO** |
| **TC04** | **US #15:** Identificación en Header | Visualización de iniciales y cierre de sesión | Muestra avatar con iniciales. Al cerrar sesión, borra la sesión. | **PASO** |
| **TC05** | **US #18:** Detalle de Producto | Visualización del bloque de Características | Despliega el bloque "¿Qué ofrece este lugar?" con sus características. | **PASO** |
| **TC06** | **US #21:** Agregar categoría | Crear nueva categoría desde Admin | Se persiste la categoría en la BD mediante la API REST. | **PASO** |
| **TC07** | **US #17:** Administrar características | Crear nueva característica | Se almacena la característica para asociarla a productos. | **PASO** |
| **TC08** | **US #16:** Asignar permisos | Otorgar y revocar rol de Administrador | Se actualiza el campo rol del usuario en la BD. | **PASO** |
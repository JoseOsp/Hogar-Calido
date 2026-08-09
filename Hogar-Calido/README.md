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
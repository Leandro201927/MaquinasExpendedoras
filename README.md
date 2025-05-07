# Máquina Expendedora - Aplicación Web

## Descripción

Máquina Expendedora es una aplicación web desarrollada con Next.js que simula una máquina expendedora de productos de primera necesidad (snacks y bebidas). Los usuarios pueden navegar por un catálogo de productos, filtrarlos por categoría y precio, añadirlos a un carrito de compra y finalizar la compra con información de pago.

Este proyecto fue desarrollado como parte de un trabajo académico, siguiendo los requisitos específicos del curso.

## Características

- **Página de requerimientos de compra**: Formulario inicial para ingresar datos de compra y presupuesto.
- **Lista de productos**: Visualización de productos con scroll infinito para cargar más elementos.
- **Filtrado de productos**: Posibilidad de filtrar por categoría y precio.
- **Detalle de producto**: Vista detallada de cada producto seleccionado.
- **Carrito de compras**: Gestión de productos seleccionados con posibilidad de eliminar ítems.
- **Proceso de pago**: Formulario para ingresar datos de tarjeta y completar la compra.
- **Diseño responsive**: Interfaz adaptable a diferentes tamaños de pantalla.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web.
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript**: Superconjunto de JavaScript con tipado estático.
- **SASS**: Preprocesador CSS para estilos avanzados.
- **Context API**: Para la gestión del estado global de la aplicación.

## Requisitos

- Node.js 18.17.0 o superior
- npm 9.6.7 o superior

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/maquina-expendedora.git
   cd maquina-expendedora
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   ```
   http://localhost:3000
   ```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run start`: Inicia la aplicación construida para producción.
- `npm run lint`: Ejecuta el linter para verificar el código.

## Estructura del Proyecto

```
maquina-expendedora/
├── src/                    # Código fuente
│   ├── app/                # Rutas y páginas (Next.js App Router)
│   ├── components/         # Componentes React
│   ├── context/            # Contexto global con React Context API
│   ├── data/               # Datos mock para la aplicación
│   ├── hooks/              # Hooks personalizados
│   ├── styles/             # Estilos SCSS globales
│   └── types/              # Definiciones de tipos TypeScript
├── public/                 # Archivos públicos (imágenes, etc.)
├── next.config.mjs         # Configuración de Next.js
└── package.json            # Dependencias y scripts
```

## Flujo de la Aplicación

1. **Página Inicial**: El usuario completa un formulario con sus datos de compra.
2. **Catálogo de Productos**: Se muestran los productos disponibles que se pueden filtrar.
3. **Selección de Productos**: El usuario puede ver detalles y agregar productos al carrito.
4. **Carrito de Compras**: Revisión de productos seleccionados y total a pagar.
5. **Información de Pago**: El usuario ingresa datos de tarjeta para completar la compra.
6. **Confirmación**: Se muestra un mensaje de éxito y se reinicia el proceso.

## Autores

- Tu Nombre

## Licencia

Este proyecto es un trabajo académico y no está licenciado para uso comercial.

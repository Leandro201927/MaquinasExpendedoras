# Sistema de Compras React - Productos de Primera Necesidad

## 📌 Funcionalidad
Aplicación React que permite gestionar requerimientos de compra de productos esenciales como snacks, bebidas y artículos de primera necesidad, con filtros inteligentes y proceso de compra completo.

## 🚀 Tecnologías
- React + Vite
- React Router
- Context API + Hooks
- Tailwind CSS
- JavaScript moderno (ES6+)

## 🗂 Estructura

```
/src
  /components         -> Componentes reutilizables
    ProductoCard.jsx    -> Tarjeta de producto con 4 atributos clave
    FiltroProductos.jsx -> Filtros con select y búsqueda libre
    DetalleProducto.jsx -> Modal con todos los atributos y botón agregar
  /pages              -> Vistas principales del sistema
    RequerimientosCompra.jsx -> Formulario de requerimientos
    VistaProductos.jsx       -> Catálogo con scroll infinito
    CarritoCompras.jsx       -> Carrito con validación de tarjeta
  /context            -> Context API para manejo de estado global
    RequerimientosContext.jsx -> Estado de requerimientos de compra
    CarritoContext.jsx        -> Estado del carrito y productos
  /services           -> Comunicación con APIs simuladas
    productosService.js -> Simulación de BD local con JSON
  /hooks              -> Hooks personalizados
    useInfiniteScroll.js -> Hook para scroll infinito
    useForm.js           -> Hook para manejo de formularios
  /utils              -> Funciones utilitarias y validaciones
    validaciones.js -> Todas las validaciones del sistema
  /data               -> Datos mock
    productos.json -> Dataset de productos simulados
  /styles             -> Archivos de estilos
    globals.css -> Estilos globales con Tailwind
  App.jsx             -> Enrutador principal
  main.jsx            -> Entrada principal (ReactDOM)
```

## ⚙️ Funcionalidades

### 📋 Requerimientos de Compra
- **Formulario controlado** con validaciones en useState
- **Validaciones estrictas**:
  - Nombre máximo 20 caracteres, solo letras
  - Presupuesto solo numérico en formato COP
- **Radio buttons** para tipo de entrega (domicilio/recoger)
- **Botones**: "Iniciar Compra" y "Limpiar"
- **Redirección** solo si validación correcta
- **Contexto global** para persistir datos

### 🛍️ Vista de Productos
- **Scroll infinito** con IntersectionObserver
- **Carga progresiva** de 15 productos por vez
- **Filtros dinámicos**:
  - Select por categoría (Snacks, Bebidas, Lácteos, Cereales, Panadería)
  - Búsqueda libre por texto
  - Botones "Filtrar" y "Limpiar"
- **Tarjetas de producto** muestran 4 atributos clave
- **Modal de detalle** con todos los atributos
- **Botón "Agregar al Carrito"** funcional
- **Navegación** para cancelar o ir al carrito

### 🛒 Carrito de Compras
- **Tabla de productos** con opción eliminar
- **Resumen detallado**:
  - Total de productos
  - Cargo adicional de $10,000
  - Validación vs presupuesto inicial
- **Formulario de tarjeta** con validaciones:
  - Número de tarjeta (16 dígitos, algoritmo Luhn)
  - Fecha MM/AA (validación de vencimiento)
  - CVV oculto con ícono mostrar/ocultar
  - Nombre del titular
- **Botones**: "Confirmar Compra" y "Limpiar"
- **Deshabilitación** del botón tras envío
- **Manejo de errores** y redirección exitosa

## 🔧 Características Técnicas

### Hooks Personalizados
- `useInfiniteScroll`: Carga progresiva con IntersectionObserver
- `useForm`: Validaciones reutilizables para formularios
- `useRequerimientos`: Gestión del estado de requerimientos
- `useCarrito`: Gestión del estado del carrito

### Validaciones Implementadas
- **Nombre**: Máximo 20 caracteres, solo letras y espacios
- **Presupuesto**: Solo números, formato COP, mínimo $10,000
- **Tarjeta**: 16 dígitos, algoritmo de Luhn, fecha válida
- **CVV**: 3 dígitos numéricos
- **Filtros**: Validación de existencia en dataset

### Manejo de Estado
- **Context API** para estado global
- **useReducer** para lógica compleja del carrito
- **Persistencia** de datos entre vistas
- **Validaciones** en tiempo real

## 🎨 Diseño y UX
- **Responsive design** con Tailwind CSS
- **Componentes modulares** y reutilizables
- **Estados de carga** y feedback visual
- **Manejo de errores** amigable al usuario
- **Accesibilidad básica** (aria-labels, focus)
- **Animaciones** y transiciones suaves

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
   ```bash
# Clonar el repositorio
git clone [URL-del-repositorio]
cd sistema-compras-react

# Instalar dependencias
   npm install

# Ejecutar en modo desarrollo
   npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📱 Uso de la Aplicación

1. **Inicio**: Complete el formulario de requerimientos
   - Ingrese su nombre (máx 20 caracteres)
   - Defina su presupuesto (mín $10,000 COP)
   - Seleccione tipo de entrega
   - Click en "Iniciar Compra"

2. **Catálogo**: Explore y filtre productos de primera necesidad
   - Use filtros por categoría (Snacks, Bebidas, Lácteos, etc.)
   - Busque por nombre o marca específica
   - Scroll para cargar más productos automáticamente
   - Click en "Ver Detalles" para información completa
   - Agregue productos al carrito

3. **Carrito**: Revise y complete su compra
   - Verifique productos seleccionados
   - Asegúrese de no exceder su presupuesto
   - Complete información de tarjeta
   - Confirme su compra

## 🧪 Características de Desarrollo

### Buenas Prácticas Implementadas
- **Código modular** y bien documentado
- **Hooks en la parte superior** de componentes
- **Separación de responsabilidades** clara
- **Manejo de errores** robusto
- **Optimización de rendimiento**
- **Código limpio** y mantenible

### Validaciones Robustas
- **Validación en tiempo real** con feedback visual
- **Algoritmo de Luhn** para números de tarjeta
- **Formateo automático** de inputs
- **Prevención de errores** del usuario

## 📊 Datos de Demostración

El sistema incluye 20 productos de primera necesidad con:
- **Categorías**: Snacks, Bebidas, Lácteos, Cereales, Panadería
- **Marcas**: Margarita, Coca-Cola, Oreo, Cristal, Jet, Bimbo, Pringles, etc.
- **Precios**: Desde $1,500 hasta $15,000 COP (precios realistas)
- **Productos típicos**: Papas fritas, gaseosas, galletas, agua, chocolate, pan, leche, yogurt, café

## 🔍 Detalles de Implementación

### Scroll Infinito
- **IntersectionObserver** para detección de scroll
- **Carga progresiva** de 15 productos por página
- **Estados de loading** y manejo de errores
- **Optimización de rendimiento**

### Filtros Dinámicos
- **Select categoría** con opciones del dataset de productos alimenticios
- **Búsqueda libre** por nombre, marca y descripción
- **Aplicación inmediata** con estado de loading
- **Indicadores visuales** de filtros activos

### Validación de Presupuesto
- **Comparación en tiempo real** con total del carrito
- **Cargo adicional** de $10,000 automático
- **Feedback visual** cuando se excede
- **Bloqueo de compra** si excede presupuesto

## 🎯 Objetivos Cumplidos

✅ **Arquitectura de componentes** funcionales con Hooks  
✅ **Scroll infinito** con IntersectionObserver  
✅ **Filtros dinámicos** funcionales para productos alimenticios  
✅ **Validaciones estrictas** según especificaciones  
✅ **Context API** para estado global  
✅ **Formularios controlados** con validación  
✅ **Navegación** con React Router  
✅ **Diseño responsive** y moderno  
✅ **Manejo de errores** robusto  
✅ **Código modular** y documentado  

## 🛒 Productos Incluidos

### Snacks
- Papas fritas Margarita ($2,500)
- Galletas Oreo ($4,500)
- Chocolate Jet ($3,500)
- Papas Pringles ($8,500)
- Maní japonés ($3,200)
- Galletas Noel soda ($2,200)
- Galletas Festival vainilla ($3,800)

### Bebidas
- Coca-Cola 350ml ($3,000)
- Agua Cristal 500ml ($1,500)
- Jugo Hit mango ($2,800)
- Pepsi 350ml ($2,900)
- Gatorade azul ($4,500)
- Jugo Del Valle naranja 1L ($6,500)
- Café Juan Valdez ($15,000)
- Té Hatsu limón ($4,200)

### Lácteos
- Leche Alquería 1L ($4,200)
- Yogurt Alpina fresa ($3,800)
- Queso Colanta campesino ($8,500)

### Otros
- Pan Bimbo integral ($5,500)
- Cereal Zucaritas ($12,000)

## 👨‍💻 Información del Proyecto

- **Curso**: Interfaces en React 711-2025
- **Tipo**: Proyecto Final
- **Tecnología Principal**: React con Hooks modernos
- **Temática**: Productos de primera necesidad y alimentación
- **Duración de Demo**: 6 minutos
- **Estado**: ✅ Completado

---

**Desarrollado con ❤️ usando React + Vite + Tailwind CSS**

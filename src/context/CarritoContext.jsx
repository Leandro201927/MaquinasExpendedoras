import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  productos: [],
  total: 0,
  cantidad: 0,
  cargoAdicional: 0 // $10,000 si aplica
};

// Acciones
const ACTIONS = {
  AGREGAR_PRODUCTO: 'AGREGAR_PRODUCTO',
  ELIMINAR_PRODUCTO: 'ELIMINAR_PRODUCTO',
  LIMPIAR_CARRITO: 'LIMPIAR_CARRITO',
  CALCULAR_TOTALES: 'CALCULAR_TOTALES'
};

// Reducer
const carritoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.AGREGAR_PRODUCTO: {
      const productoExistente = state.productos.find(p => p.id === action.payload.id);
      let nuevosProductos;
      
      if (productoExistente) {
        nuevosProductos = state.productos.map(p =>
          p.id === action.payload.id
            ? { ...p, cantidadCarrito: p.cantidadCarrito + 1 }
            : p
        );
      } else {
        nuevosProductos = [...state.productos, { ...action.payload, cantidadCarrito: 1 }];
      }
      
      return calcularTotales({ ...state, productos: nuevosProductos });
    }
    
    case ACTIONS.ELIMINAR_PRODUCTO: {
      const nuevosProductos = state.productos.filter(p => p.id !== action.payload);
      return calcularTotales({ ...state, productos: nuevosProductos });
    }
    
    case ACTIONS.LIMPIAR_CARRITO:
      return initialState;
    
    case ACTIONS.CALCULAR_TOTALES:
      return calcularTotales(state);
    
    default:
      return state;
  }
};

// Función auxiliar para calcular totales
const calcularTotales = (state) => {
  const cantidad = state.productos.reduce((acc, producto) => acc + producto.cantidadCarrito, 0);
  const subtotal = state.productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidadCarrito), 0);
  
  // Cargo adicional de $10,000 si hay productos en el carrito
  const cargoAdicional = cantidad > 0 ? 10000 : 0;
  const total = subtotal + cargoAdicional;
  
  return {
    ...state,
    cantidad,
    total,
    cargoAdicional
  };
};

// Contexto
const CarritoContext = createContext();

// Provider
export const CarritoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carritoReducer, initialState);

  const actions = {
    agregarProducto: (producto) => dispatch({ type: ACTIONS.AGREGAR_PRODUCTO, payload: producto }),
    eliminarProducto: (productoId) => dispatch({ type: ACTIONS.ELIMINAR_PRODUCTO, payload: productoId }),
    limpiarCarrito: () => dispatch({ type: ACTIONS.LIMPIAR_CARRITO }),
    calcularTotales: () => dispatch({ type: ACTIONS.CALCULAR_TOTALES })
  };

  // Función para verificar si un producto está en el carrito
  const estaEnCarrito = (productoId) => {
    return state.productos.some(p => p.id === productoId);
  };

  // Función para obtener la cantidad de un producto en el carrito
  const obtenerCantidad = (productoId) => {
    const producto = state.productos.find(p => p.id === productoId);
    return producto ? producto.cantidadCarrito : 0;
  };

  return (
    <CarritoContext.Provider value={{ 
      ...state, 
      ...actions, 
      estaEnCarrito, 
      obtenerCantidad 
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
}; 
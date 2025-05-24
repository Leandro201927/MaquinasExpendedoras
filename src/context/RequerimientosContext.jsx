import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  nombre: '',
  presupuesto: 0,
  tipoEntrega: 'domicilio', // 'domicilio' o 'recoger'
  direccion: '', // Nueva dirección para entrega a domicilio
  isValidated: false
};

// Acciones
const ACTIONS = {
  SET_NOMBRE: 'SET_NOMBRE',
  SET_PRESUPUESTO: 'SET_PRESUPUESTO',
  SET_TIPO_ENTREGA: 'SET_TIPO_ENTREGA',
  SET_DIRECCION: 'SET_DIRECCION', // Nueva acción para dirección
  SET_VALIDATED: 'SET_VALIDATED',
  LIMPIAR: 'LIMPIAR'
};

// Reducer
const requerimientosReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NOMBRE:
      return { ...state, nombre: action.payload };
    case ACTIONS.SET_PRESUPUESTO:
      return { ...state, presupuesto: action.payload };
    case ACTIONS.SET_TIPO_ENTREGA:
      return { ...state, tipoEntrega: action.payload };
    case ACTIONS.SET_DIRECCION:
      return { ...state, direccion: action.payload };
    case ACTIONS.SET_VALIDATED:
      return { ...state, isValidated: action.payload };
    case ACTIONS.LIMPIAR:
      return { ...initialState };
    default:
      return state;
  }
};

// Contexto
const RequerimientosContext = createContext();

// Provider
export const RequerimientosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requerimientosReducer, initialState);

  const actions = {
    setNombre: (nombre) => dispatch({ type: ACTIONS.SET_NOMBRE, payload: nombre }),
    setPresupuesto: (presupuesto) => dispatch({ type: ACTIONS.SET_PRESUPUESTO, payload: presupuesto }),
    setTipoEntrega: (tipo) => dispatch({ type: ACTIONS.SET_TIPO_ENTREGA, payload: tipo }),
    setDireccion: (direccion) => dispatch({ type: ACTIONS.SET_DIRECCION, payload: direccion }),
    setValidated: (isValid) => dispatch({ type: ACTIONS.SET_VALIDATED, payload: isValid }),
    limpiar: () => dispatch({ type: ACTIONS.LIMPIAR })
  };

  return (
    <RequerimientosContext.Provider value={{ ...state, ...actions }}>
      {children}
    </RequerimientosContext.Provider>
  );
};

// Hook personalizado
export const useRequerimientos = () => {
  const context = useContext(RequerimientosContext);
  if (!context) {
    throw new Error('useRequerimientos debe usarse dentro de RequerimientosProvider');
  }
  return context;
}; 
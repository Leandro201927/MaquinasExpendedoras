import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, Store } from 'lucide-react';
import { useRequerimientos } from '../context/RequerimientosContext';
import { useForm } from '../hooks/useForm';
import { validarNombre, validarPresupuesto, validarDireccion, formatearPrecio } from '../utils/validaciones';

const RequerimientosCompra = () => {
  const navigate = useNavigate();
  const { setNombre, setPresupuesto, setTipoEntrega, setDireccion, setValidated } = useRequerimientos();
  
  // Estado para mostrar mensajes
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Configuración inicial del formulario
  const initialValues = {
    nombre: '',
    presupuesto: '',
    tipoEntrega: 'domicilio',
    direccion: ''
  };

  // Reglas de validación
  const validationRules = {
    nombre: (value) => validarNombre(value),
    presupuesto: (value) => validarPresupuesto(value),
    direccion: (value, allValues) => {
      // Solo validar dirección si el tipo de entrega es domicilio
      if (allValues.tipoEntrega === 'domicilio') {
        return validarDireccion(value);
      }
      return '';
    }
  };

  // Hook de formulario
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    isValid
  } = useForm(initialValues, validationRules);

  // Limpiar mensajes después de 5 segundos
  useEffect(() => {
    if (mensaje.texto) {
      const timer = setTimeout(() => {
        setMensaje({ tipo: '', texto: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  // Manejar cambio en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'presupuesto') {
      // Solo permitir números para presupuesto
      const numeroLimpio = value.replace(/[^\d]/g, '');
      handleChange(name, numeroLimpio);
    } else {
      handleChange(name, value);
    }
  };

  // Manejar cambio en radio buttons
  const handleRadioChange = (e) => {
    const nuevoTipo = e.target.value;
    handleChange('tipoEntrega', nuevoTipo);
    
    // Si cambia a "recoger", limpiar la dirección
    if (nuevoTipo === 'recoger') {
      handleChange('direccion', '');
    }
  };

  // Formatear presupuesto para mostrar
  const formatearPresupuestoDisplay = (valor) => {
    if (!valor) return '';
    const numero = parseInt(valor);
    if (isNaN(numero)) return '';
    return formatearPrecio(numero);
  };

  // Verificar si el formulario está completo
  const isFormComplete = () => {
    const baseComplete = values.nombre && values.presupuesto && isValid;
    if (values.tipoEntrega === 'domicilio') {
      return baseComplete && values.direccion && !errors.direccion;
    }
    return baseComplete;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate() && isFormComplete()) {
      // Guardar datos en el contexto global
      setNombre(values.nombre);
      setPresupuesto(parseInt(values.presupuesto));
      setTipoEntrega(values.tipoEntrega);
      setDireccion(values.direccion);
      setValidated(true);
      
      setMensaje({
        tipo: 'success',
        texto: 'Requerimientos guardados correctamente. Redirigiendo...'
      });
      
      // Redireccionar después de un breve delay
      setTimeout(() => {
        navigate('/productos');
      }, 1500);
    } else {
      setMensaje({
        tipo: 'error',
        texto: 'Por favor, corrija los errores en el formulario'
      });
    }
  };

  // Limpiar formulario
  const handleLimpiar = () => {
    reset();
    setMensaje({ tipo: '', texto: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Requerimientos de Compra
          </h1>
          <p className="text-gray-600 text-lg">
            Complete la información necesaria para iniciar su proceso de compra
          </p>
        </motion.div>

        {/* Mensaje de estado */}
        <AnimatePresence>
          {mensaje.texto && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-2xl shadow-lg ${
                mensaje.tipo === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${
                  mensaje.tipo === 'success' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {mensaje.tipo === 'success' ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{mensaje.texto}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulario */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm shadow-xl rounded-3xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nombre */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={values.nombre}
                onChange={handleInputChange}
                onBlur={() => handleBlur('nombre')}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                  errors.nombre && touched.nombre 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 bg-white'
                }`}
                placeholder="Ingrese su nombre completo"
                maxLength="20"
                aria-describedby={errors.nombre ? 'nombre-error' : undefined}
              />
              {errors.nombre && touched.nombre && (
                <p id="nombre-error" className="mt-1 text-sm text-red-600">
                  {errors.nombre}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Máximo 20 caracteres, solo letras y espacios
              </p>
            </motion.div>

            {/* Campo Presupuesto */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="presupuesto" className="block text-sm font-semibold text-gray-700 mb-2">
                Presupuesto *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                <input
                  type="text"
                  id="presupuesto"
                  name="presupuesto"
                  value={values.presupuesto}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('presupuesto')}
                  className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                    errors.presupuesto && touched.presupuesto 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 bg-white'
                  }`}
                  placeholder="10000"
                  aria-describedby={errors.presupuesto ? 'presupuesto-error' : undefined}
                />
              </div>
              {values.presupuesto && !errors.presupuesto && (
                <p className="mt-1 text-sm text-green-600 font-medium">
                  {formatearPresupuestoDisplay(values.presupuesto)}
                </p>
              )}
              {errors.presupuesto && touched.presupuesto && (
                <p id="presupuesto-error" className="mt-1 text-sm text-red-600">
                  {errors.presupuesto}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Mínimo $10,000 COP
              </p>
            </motion.div>

            {/* Tipo de Entrega */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <fieldset>
                <legend className="block text-sm font-semibold text-gray-700 mb-4">
                  Tipo de Entrega *
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer ${
                      values.tipoEntrega === 'domicilio' 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'bg-white hover:bg-gray-50'
                    } border-2 border-gray-200 rounded-2xl p-4 transition-all duration-200`}
                  >
                    <input
                      type="radio"
                      id="domicilio"
                      name="tipoEntrega"
                      value="domicilio"
                      checked={values.tipoEntrega === 'domicilio'}
                      onChange={handleRadioChange}
                      className="sr-only"
                    />
                    <label htmlFor="domicilio" className="cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Home className={`w-6 h-6 ${
                          values.tipoEntrega === 'domicilio' 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`} />
                        <div>
                          <span className="font-semibold text-gray-800">Entrega a domicilio</span>
                          <span className="block text-sm text-gray-500">
                            Reciba su pedido en la comodidad de su hogar
                          </span>
                        </div>
                      </div>
                    </label>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer ${
                      values.tipoEntrega === 'recoger' 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'bg-white hover:bg-gray-50'
                    } border-2 border-gray-200 rounded-2xl p-4 transition-all duration-200`}
                  >
                    <input
                      type="radio"
                      id="recoger"
                      name="tipoEntrega"
                      value="recoger"
                      checked={values.tipoEntrega === 'recoger'}
                      onChange={handleRadioChange}
                      className="sr-only"
                    />
                    <label htmlFor="recoger" className="cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Store className={`w-6 h-6 ${
                          values.tipoEntrega === 'recoger' 
                            ? 'text-blue-600' 
                            : 'text-gray-400'
                        }`} />
                        <div>
                          <span className="font-semibold text-gray-800">Recoger en tienda</span>
                          <span className="block text-sm text-gray-500">
                            Retire su pedido en nuestras instalaciones
                          </span>
                        </div>
                      </div>
                    </label>
                  </motion.div>
                </div>
              </fieldset>
            </motion.div>

            {/* Campo Dirección (condicional) */}
            <AnimatePresence>
              {values.tipoEntrega === 'domicilio' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <label htmlFor="direccion" className="block text-sm font-semibold text-gray-700 mb-2">
                    Dirección de Entrega *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="direccion"
                      name="direccion"
                      value={values.direccion}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('direccion')}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                        errors.direccion && touched.direccion 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300 bg-white'
                      }`}
                      placeholder="Ej: Calle 123 # 45-67, Barrio Centro"
                      maxLength="100"
                      aria-describedby={errors.direccion ? 'direccion-error' : undefined}
                    />
                  </div>
                  {errors.direccion && touched.direccion && (
                    <p id="direccion-error" className="mt-1 text-sm text-red-600">
                      {errors.direccion}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Dirección completa incluyendo número, barrio o referencia
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botones */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!isFormComplete()}
                className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg ${
                  isFormComplete()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-4 focus:ring-blue-200'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Iniciar Compra
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleLimpiar}
                className="flex-1 py-4 px-8 border-2 border-gray-300 rounded-2xl font-bold text-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-200 shadow-lg"
              >
                Limpiar
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Información adicional */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            ¿Qué sigue después?
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Podrá navegar por nuestro catálogo de productos</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Filtrar productos según sus preferencias</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Agregar productos a su carrito de compras</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>Finalizar su compra de forma segura</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default RequerimientosCompra; 
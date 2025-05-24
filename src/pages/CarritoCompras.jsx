import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCarrito } from '../context/CarritoContext';
import { useRequerimientos } from '../context/RequerimientosContext';
import { useForm } from '../hooks/useForm';
import {
  formatearPrecio,
  validarNumeroTarjeta,
  validarFechaVencimiento,
  validarCVV,
  validarTitular,
  formatearNumeroTarjeta
} from '../utils/validaciones';
import ConfirmacionCompra from '../components/ConfirmacionCompra';
import ReciboElectronico from '../components/ReciboElectronico';

const CarritoCompras = () => {
  const navigate = useNavigate();
  const { productos, total, cantidad, cargoAdicional, eliminarProducto, limpiarCarrito } = useCarrito();
  const { nombre, presupuesto, tipoEntrega, direccion, isValidated } = useRequerimientos();

  // Estados locales
  const [mostrarCVV, setMostrarCVV] = useState(false);
  const [comprando, setComprando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  
  // Estados para popup y recibo
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarRecibo, setMostrarRecibo] = useState(false);
  const [datosCompra, setDatosCompra] = useState(null);
  const [numeroOrden, setNumeroOrden] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');

  // Verificar validación de requerimientos
  useEffect(() => {
    if (!isValidated) {
      navigate('/');
      return;
    }
  }, [isValidated, navigate]);

  // Configuración del formulario de tarjeta
  const initialValues = {
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvv: '',
    titular: ''
  };

  const validationRules = {
    numeroTarjeta: (value) => validarNumeroTarjeta(value),
    fechaVencimiento: (value) => validarFechaVencimiento(value),
    cvv: (value) => validarCVV(value),
    titular: (value) => validarTitular(value)
  };

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

  // Verificar si excede el presupuesto
  const excedePrecupuesto = total > presupuesto;
  const diferenciaPrecupuesto = total - presupuesto;

  // Generar número de orden único
  const generarNumeroOrden = () => {
    const fecha = new Date();
    const año = fecha.getFullYear().toString().slice(-2);
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minuto = fecha.getMinutes().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    
    return `${año}${mes}${dia}${hora}${minuto}${random}`;
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'numeroTarjeta') {
      // Formatear número de tarjeta con espacios
      const numeroLimpio = value.replace(/\s/g, '');
      if (numeroLimpio.length <= 16) {
        const numeroFormateado = formatearNumeroTarjeta(numeroLimpio);
        handleChange(name, numeroFormateado);
      }
    } else if (name === 'fechaVencimiento') {
      // Formatear fecha MM/AA
      const valor = value.replace(/\D/g, '');
      let valorFormateado = valor;
      if (valor.length >= 2) {
        valorFormateado = valor.slice(0, 2) + '/' + valor.slice(2, 4);
      }
      if (valorFormateado.length <= 5) {
        handleChange(name, valorFormateado);
      }
    } else if (name === 'cvv') {
      // Solo números para CVV
      const valor = value.replace(/\D/g, '');
      if (valor.length <= 3) {
        handleChange(name, valor);
      }
    } else {
      handleChange(name, value);
    }
  };

  // Eliminar producto del carrito
  const handleEliminarProducto = (productoId) => {
    eliminarProducto(productoId);
    toast.success('Producto eliminado del carrito', {
      icon: '🗑️',
      duration: 2000,
    });
  };

  // Limpiar carrito
  const handleLimpiarCarrito = () => {
    limpiarCarrito();
    reset();
    toast.success('Carrito vaciado', {
      icon: '🧹',
      duration: 2000,
    });
  };

  // Preparar compra (mostrar popup de confirmación)
  const handlePrepararCompra = async (e) => {
    e.preventDefault();
    
    // Verificar que todos los campos estén completos
    const camposCompletos = values.numeroTarjeta && values.fechaVencimiento && values.cvv && values.titular;
    
    // Validar formulario primero
    const formIsValid = validate();
    
    // Verificar campos completos Y sin errores
    if (!camposCompletos) {
      toast.error('Complete todos los campos de la tarjeta', {
        duration: 4000,
      });
      return;
    }
    
    if (!formIsValid) {
      toast.error('Corrija los errores en el formulario', {
        duration: 4000,
      });
      return;
    }

    if (excedePrecupuesto) {
      toast.error(`El total excede su presupuesto por ${formatearPrecio(diferenciaPrecupuesto)}`, {
        duration: 4000,
      });
      return;
    }

    if (productos.length === 0) {
      toast.error('No hay productos en el carrito', {
        duration: 3000,
      });
      return;
    }

    // Preparar datos para la confirmación
    const datosParaConfirmacion = {
      productos,
      total,
      cargoAdicional,
      datosCliente: {
        nombre,
        presupuesto
      },
      datosPago: {
        numeroTarjeta: values.numeroTarjeta,
        titular: values.titular,
        fechaVencimiento: values.fechaVencimiento
      },
      tipoEntrega,
      direccion
    };

    setDatosCompra(datosParaConfirmacion);
    setMostrarConfirmacion(true);
    
    toast.success('Revise los datos antes de confirmar', {
      icon: '🔍',
      duration: 3000,
    });
  };

  // Procesar compra definitiva
  const handleConfirmarCompra = async () => {
    setComprando(true);
    
    try {
      // Mostrar notificación de procesamiento
      const processingToast = toast.loading('Procesando su pago...', {
        duration: Infinity,
      });

      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Quitar toast de procesamiento
      toast.dismiss(processingToast);
      
      // Generar datos de la compra
      const ordenId = generarNumeroOrden();
      const fechaActual = new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      setNumeroOrden(ordenId);
      setFechaCompra(fechaActual);

      // Notificación de éxito
      toast.success('¡Compra realizada exitosamente!', {
        icon: '🎉',
        duration: 4000,
      });

      // Cerrar popup de confirmación
      setMostrarConfirmacion(false);

      // Limpiar carrito y formulario
      limpiarCarrito();
      reset();

      // Mostrar recibo después de un breve delay
      setTimeout(() => {
        setMostrarRecibo(true);
      }, 500);

    } catch (error) {
      console.error('Error en el procesamiento:', error);
      toast.error('Error al procesar la compra. Intente nuevamente.', {
        duration: 4000,
      });
    } finally {
      setComprando(false);
    }
  };

  // Cancelar confirmación
  const handleCancelarConfirmacion = () => {
    setMostrarConfirmacion(false);
    toast('Compra cancelada', {
      icon: '❌',
      duration: 2000,
    });
  };

  // Cerrar recibo y volver al inicio
  const handleCerrarRecibo = () => {
    setMostrarRecibo(false);
    setDatosCompra(null);
    navigate('/');
  };

  // Funciones para el recibo
  const handleDescargarPDF = (elemento) => {
    toast.success('Funcionalidad de descarga en desarrollo', {
      icon: '📄',
      duration: 3000,
    });
  };

  const handleCompartirRecibo = () => {
    if (navigator.share) {
      navigator.share({
        title: `Recibo de Compra #${numeroOrden}`,
        text: `He realizado una compra en Tienda Virtual por ${formatearPrecio(total)}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(`Recibo de Compra #${numeroOrden} - Total: ${formatearPrecio(total)}`);
      toast.success('Información copiada al portapapeles', {
        icon: '📋',
        duration: 3000,
      });
    }
  };

  // Limpiar mensajes después de tiempo
  useEffect(() => {
    if (mensaje.texto && mensaje.tipo !== 'success') {
      const timer = setTimeout(() => {
        setMensaje({ tipo: '', texto: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  if (!isValidated) {
    return null;
  }

  // Si está mostrando el recibo, renderizar solo eso
  if (mostrarRecibo) {
    return (
      <ReciboElectronico
        datosCompra={datosCompra}
        numeroOrden={numeroOrden}
        fechaCompra={fechaCompra}
        onCerrar={handleCerrarRecibo}
        onDescargarPDF={handleDescargarPDF}
        onCompartir={handleCompartirRecibo}
      />
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Carrito de Compras
              </h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/productos')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Seguir comprando</span>
              </motion.button>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 inline-block shadow-lg border border-white/20">
              <p className="text-gray-700 font-medium">
                Cliente: <span className="text-blue-600 font-bold">{nombre}</span> - 
                Presupuesto: <span className="text-green-600 font-bold">
                  {formatearPrecio(presupuesto)}
                </span>
              </p>
            </div>
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
                }`}
              >
                <p className="font-medium">{mensaje.texto}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tabla de productos */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
                      Productos ({cantidad} {cantidad === 1 ? 'artículo' : 'artículos'})
                    </h2>
                    {productos.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLimpiarCarrito}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
                      >
                        <Trash2 size={16} />
                        <span>Limpiar carrito</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                {productos.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Producto</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Cantidad</th>
                          <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Precio Unit.</th>
                          <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Total</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {productos.map((producto, index) => (
                          <tr
                            key={producto.id}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center space-x-4"
                              >
                                <img
                                  src={producto.imagen}
                                  alt={producto.nombre}
                                  className="w-16 h-16 object-cover rounded-xl shadow-md"
                                  onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiNGOUZBRkIiLz4KPGI+PHBhdGggZD0iTTMyIDQyTDI0IDI4SDQwTDMyIDQyWiIgZmlsbD0iI0QxRDVEQSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMjIiIHI9IjUiIGZpbGw9IiNEMUQ1REEiLz4KPC9zdmc+';
                                  }}
                                />
                                <div>
                                  <div className="font-semibold text-gray-900">{producto.nombre}</div>
                                  <div className="text-sm text-gray-500">{producto.categoria} - {producto.marca}</div>
                                </div>
                              </motion.div>
                            </td>
                            <td className="px-6 py-4 text-center font-medium text-gray-900">
                              {producto.cantidadCarrito}
                            </td>
                            <td className="px-6 py-4 text-right font-medium text-gray-900">
                              {formatearPrecio(producto.precio)}
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-green-600">
                              {formatearPrecio(producto.precio * producto.cantidadCarrito)}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEliminarProducto(producto.id)}
                                className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={16} />
                              </motion.button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-6 py-16 text-center">
                    <div className="text-8xl mb-6">🛒</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Tu carrito está vacío</h3>
                    <p className="text-gray-600 mb-6 text-lg">Agrega productos desde nuestro catálogo</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/productos')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-lg"
                    >
                      Ver productos
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Resumen y formulario de pago */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Resumen de compra */}
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen de Compra</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Productos ({cantidad})</span>
                    <span className="font-semibold text-gray-900">
                      {formatearPrecio(total - cargoAdicional)}
                    </span>
                  </div>
                  
                  {cargoAdicional > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Cargo de servicio</span>
                      <span className="font-semibold text-gray-900">{formatearPrecio(cargoAdicional)}</span>
                    </div>
                  )}
                  
                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className={total > presupuesto ? 'text-red-600' : 'text-green-600'}>
                        {formatearPrecio(total)}
                      </span>
                    </div>
                  </div>

                  {/* Validación de presupuesto */}
                  <div className="mt-6 p-4 rounded-2xl border-2">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Presupuesto disponible:</span>
                      <span className="font-bold text-green-600">{formatearPrecio(presupuesto)}</span>
                    </div>
                    {excedePrecupuesto && (
                      <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-200">
                        <div className="text-red-800 font-bold">
                          ⚠️ Excede por: {formatearPrecio(diferenciaPrecupuesto)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Formulario de tarjeta */}
              {productos.length > 0 && (
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Información de Pago</h3>
                  
                  <form onSubmit={handlePrepararCompra} className="space-y-6">
                    {/* Número de tarjeta */}
                    <div>
                      <label htmlFor="numeroTarjeta" className="block text-sm font-semibold text-gray-700 mb-2">
                        Número de Tarjeta *
                      </label>
                      <input
                        type="text"
                        id="numeroTarjeta"
                        name="numeroTarjeta"
                        value={values.numeroTarjeta}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('numeroTarjeta')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                          errors.numeroTarjeta && touched.numeroTarjeta ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.numeroTarjeta && touched.numeroTarjeta && (
                        <p className="mt-1 text-sm text-red-600">{errors.numeroTarjeta}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Fecha de vencimiento */}
                      <div>
                        <label htmlFor="fechaVencimiento" className="block text-sm font-semibold text-gray-700 mb-2">
                          Fecha MM/AA *
                        </label>
                        <input
                          type="text"
                          id="fechaVencimiento"
                          name="fechaVencimiento"
                          value={values.fechaVencimiento}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('fechaVencimiento')}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                            errors.fechaVencimiento && touched.fechaVencimiento ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="12/25"
                        />
                        {errors.fechaVencimiento && touched.fechaVencimiento && (
                          <p className="mt-1 text-sm text-red-600">{errors.fechaVencimiento}</p>
                        )}
                      </div>

                      {/* CVV */}
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV *
                        </label>
                        <div className="relative">
                          <input
                            type={mostrarCVV ? 'text' : 'password'}
                            id="cvv"
                            name="cvv"
                            value={values.cvv}
                            onChange={handleInputChange}
                            onBlur={() => handleBlur('cvv')}
                            className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                              errors.cvv && touched.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="123"
                          />
                          <button
                            type="button"
                            onClick={() => setMostrarCVV(!mostrarCVV)}
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {mostrarCVV ? '👁️' : '🔒'}
                          </button>
                        </div>
                        {errors.cvv && touched.cvv && (
                          <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                        )}
                      </div>
                    </div>

                    {/* Titular */}
                    <div>
                      <label htmlFor="titular" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del Titular *
                      </label>
                      <input
                        type="text"
                        id="titular"
                        name="titular"
                        value={values.titular}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('titular')}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 ${
                          errors.titular && touched.titular ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Nombre como aparece en la tarjeta"
                      />
                      {errors.titular && touched.titular && (
                        <p className="mt-1 text-sm text-red-600">{errors.titular}</p>
                      )}
                    </div>

                    {/* Botones */}
                    <div className="space-y-4 pt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={comprando || productos.length === 0 || excedePrecupuesto || !values.numeroTarjeta || !values.fechaVencimiento || !values.cvv || !values.titular}
                        className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg ${
                          !comprando && productos.length > 0 && !excedePrecupuesto && values.numeroTarjeta && values.fechaVencimiento && values.cvv && values.titular
                            ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white focus:ring-4 focus:ring-green-200'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Proceder al Pago {total > 0 && `(${formatearPrecio(total)})`}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => reset()}
                        disabled={comprando}
                        className="w-full py-3 px-6 border-2 border-gray-300 rounded-2xl font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Limpiar Formulario
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Popup de confirmación */}
      <ConfirmacionCompra
        isVisible={mostrarConfirmacion}
        onConfirmar={handleConfirmarCompra}
        onCancelar={handleCancelarConfirmacion}
        datosCompra={datosCompra}
        cargando={comprando}
      />
    </>
  );
};

export default CarritoCompras; 
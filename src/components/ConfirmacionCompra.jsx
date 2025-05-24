import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CreditCard, Package, MapPin, Store } from 'lucide-react';
import { formatearPrecio } from '../utils/validaciones';

const ConfirmacionCompra = ({ 
  isVisible, 
  onConfirmar, 
  onCancelar, 
  datosCompra,
  cargando = false 
}) => {
  if (!datosCompra) return null;

  const {
    productos = [],
    total = 0,
    cargoAdicional = 0,
    datosCliente = {},
    datosPago = {},
    tipoEntrega = 'domicilio',
    direccion = ''
  } = datosCompra;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleConfirmar = () => {
    if (cargando) return;
    onConfirmar();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onCancelar}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Confirmar Compra</h2>
                    <p className="text-sm text-gray-500">Revise los detalles antes de proceder</p>
                  </div>
                </div>
                <button
                  onClick={onCancelar}
                  disabled={cargando}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-6 space-y-6">
                {/* Información del cliente */}
                <div className="bg-blue-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Información de Entrega
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Cliente:</span>
                      <span className="font-medium text-blue-900">{datosCliente.nombre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Presupuesto:</span>
                      <span className="font-medium text-blue-900">{formatearPrecio(datosCliente.presupuesto)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Entrega:</span>
                      <div className="flex items-center space-x-2">
                        {tipoEntrega === 'domicilio' ? (
                          <>
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-blue-900">A domicilio</span>
                          </>
                        ) : (
                          <>
                            <Store className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-blue-900">Recoger en tienda</span>
                          </>
                        )}
                      </div>
                    </div>
                    {tipoEntrega === 'domicilio' && direccion && (
                      <div className="flex justify-between">
                        <span className="text-blue-700">Dirección:</span>
                        <span className="font-medium text-blue-900 text-right max-w-xs">{direccion}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Productos */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Productos ({productos.length})
                  </h3>
                  <div className="max-h-40 overflow-y-auto space-y-3">
                    {productos.map((producto) => (
                      <div key={producto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-12 h-12 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iI0Y5RkFGQiIvPgo8cGF0aCBkPSJNMjQgMzJMMTYgMjBIMzJMMjQgMzJaIiBmaWxsPSIjRDFENUREIi8+CjxjaXJjbGUgY3g9IjI0IiBjeT0iMTYiIHI9IjQiIGZpbGw9IiNEMUQ1REQiLz4KPC9zdmc+';
                            }}
                          />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{producto.nombre}</p>
                            <p className="text-xs text-gray-500">{producto.categoria}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 text-sm">
                            {producto.cantidadCarrito}x {formatearPrecio(producto.precio)}
                          </p>
                          <p className="text-xs text-gray-500">
                            = {formatearPrecio(producto.precio * producto.cantidadCarrito)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información de pago */}
                <div className="bg-green-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Método de Pago
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Tarjeta:</span>
                      <span className="font-medium text-green-900">**** **** **** {datosPago.numeroTarjeta?.slice(-4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Titular:</span>
                      <span className="font-medium text-green-900">{datosPago.titular}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Vencimiento:</span>
                      <span className="font-medium text-green-900">{datosPago.fechaVencimiento}</span>
                    </div>
                  </div>
                </div>

                {/* Resumen financiero */}
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Resumen Total</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal productos:</span>
                      <span className="text-gray-900">{formatearPrecio(total - cargoAdicional)}</span>
                    </div>
                    {cargoAdicional > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cargo de servicio:</span>
                        <span className="text-gray-900">{formatearPrecio(cargoAdicional)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900">Total a pagar:</span>
                        <span className="text-green-600">{formatearPrecio(total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advertencia */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Importante</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Al confirmar, se procesará el pago y no podrá cancelar la transacción. 
                        Revise todos los datos antes de continuar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer con botones */}
              <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
                <button
                  onClick={onCancelar}
                  disabled={cargando}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <motion.button
                  whileHover={{ scale: cargando ? 1 : 1.02 }}
                  whileTap={{ scale: cargando ? 1 : 0.98 }}
                  onClick={handleConfirmar}
                  disabled={cargando}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {cargando ? (
                    <>
                      <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Confirmar y Pagar {formatearPrecio(total)}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmacionCompra; 
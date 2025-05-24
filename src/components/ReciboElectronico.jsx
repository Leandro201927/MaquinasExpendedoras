import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, PrinterIcon, Share, Calendar, MapPin, Store, CreditCard, Package } from 'lucide-react';
import { formatearPrecio } from '../utils/validaciones';

const ReciboElectronico = ({ 
  datosCompra, 
  numeroOrden,
  fechaCompra,
  onCerrar,
  onDescargarPDF,
  onCompartir 
}) => {
  const reciboRef = useRef(null);

  const {
    productos = [],
    total = 0,
    cargoAdicional = 0,
    datosCliente = {},
    datosPago = {},
    tipoEntrega = 'domicilio',
    direccion = ''
  } = datosCompra;

  const handleImprimir = () => {
    window.print();
  };

  const handleDescargar = () => {
    if (onDescargarPDF) {
      onDescargarPDF(reciboRef.current);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header de éxito */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2">
            ¡Compra Exitosa!
          </h1>
          <p className="text-gray-600 text-lg">
            Su orden ha sido procesada correctamente
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{fechaCompra}</span>
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleImprimir}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <PrinterIcon className="w-5 h-5" />
            <span>Imprimir</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDescargar}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Descargar PDF</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCompartir}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Share className="w-5 h-5" />
            <span>Compartir</span>
          </motion.button>
        </motion.div>

        {/* Recibo */}
        <motion.div 
          ref={reciboRef}
          variants={itemVariants}
          className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200 print:shadow-none print:border-black"
        >
          {/* Header del recibo */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-2">Recibo Electrónico</h2>
                <p className="text-blue-100">Tienda Virtual - Productos de Primera Necesidad</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">#{numeroOrden}</div>
                <div className="text-blue-100 text-sm">Orden de Compra</div>
              </div>
            </div>
          </div>

          {/* Información principal */}
          <div className="p-8 space-y-8">
            {/* Datos del cliente y entrega */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cliente */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-bold text-blue-900 text-lg mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Información del Cliente
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-blue-700 font-medium block">Nombre:</span>
                    <span className="text-blue-900 font-bold">{datosCliente.nombre}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium block">Presupuesto:</span>
                    <span className="text-blue-900 font-bold">{formatearPrecio(datosCliente.presupuesto)}</span>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium block">Fecha de compra:</span>
                    <span className="text-blue-900 font-bold">{fechaCompra}</span>
                  </div>
                </div>
              </div>

              {/* Entrega */}
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold text-green-900 text-lg mb-4 flex items-center">
                  {tipoEntrega === 'domicilio' ? (
                    <MapPin className="w-5 h-5 mr-2" />
                  ) : (
                    <Store className="w-5 h-5 mr-2" />
                  )}
                  Información de Entrega
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-green-700 font-medium block">Tipo:</span>
                    <span className="text-green-900 font-bold">
                      {tipoEntrega === 'domicilio' ? 'Entrega a domicilio' : 'Recoger en tienda'}
                    </span>
                  </div>
                  {tipoEntrega === 'domicilio' && direccion && (
                    <div>
                      <span className="text-green-700 font-medium block">Dirección:</span>
                      <span className="text-green-900 font-bold">{direccion}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-green-700 font-medium block">Estado:</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-200 text-green-800">
                      ✅ Confirmado
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Método de Pago
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-600 font-medium block">Tarjeta:</span>
                  <span className="text-gray-900 font-bold">**** **** **** {datosPago.numeroTarjeta?.slice(-4)}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium block">Titular:</span>
                  <span className="text-gray-900 font-bold">{datosPago.titular}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium block">Estado:</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-200 text-green-800">
                    💳 Aprobado
                  </span>
                </div>
              </div>
            </div>

            {/* Productos */}
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Productos Comprados ({productos.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-700">Producto</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-700">Cantidad</th>
                      <th className="border border-gray-300 px-4 py-3 text-right font-bold text-gray-700">Precio Unit.</th>
                      <th className="border border-gray-300 px-4 py-3 text-right font-bold text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto, index) => (
                      <tr key={producto.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-3">
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
                              <div className="font-medium text-gray-900">{producto.nombre}</div>
                              <div className="text-sm text-gray-500">{producto.categoria} - {producto.marca}</div>
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-medium">
                          {producto.cantidadCarrito}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                          {formatearPrecio(producto.precio)}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-right font-bold">
                          {formatearPrecio(producto.precio * producto.cantidadCarrito)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totales */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Resumen Total</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Subtotal productos:</span>
                  <span className="font-bold text-gray-900">{formatearPrecio(total - cargoAdicional)}</span>
                </div>
                {cargoAdicional > 0 && (
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Cargo de servicio:</span>
                    <span className="font-bold text-gray-900">{formatearPrecio(cargoAdicional)}</span>
                  </div>
                )}
                <div className="border-t-2 border-gray-300 pt-3">
                  <div className="flex justify-between text-2xl font-black">
                    <span className="text-gray-900">Total Pagado:</span>
                    <span className="text-green-600">{formatearPrecio(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
              <h3 className="font-bold text-yellow-800 text-lg mb-3">Información Importante</h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Este recibo es válido como comprobante de compra</li>
                <li>• Guarde este documento para cualquier consulta o reclamo</li>
                <li>• Su pedido será procesado en las próximas 24 horas</li>
                {tipoEntrega === 'domicilio' ? (
                  <li>• El tiempo de entrega estimado es de 1-3 días hábiles</li>
                ) : (
                  <li>• Su pedido estará listo para recoger en 2-4 horas</li>
                )}
                <li>• Para consultas, contáctenos con el número de orden: #{numeroOrden}</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-100 p-6 text-center border-t">
            <p className="text-gray-600 font-medium">
              ¡Gracias por su compra! - Tienda Virtual de Productos de Primera Necesidad
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Generado automáticamente el {fechaCompra}
            </p>
          </div>
        </motion.div>

        {/* Botón para continuar */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCerrar}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg"
          >
            Continuar Comprando
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReciboElectronico; 
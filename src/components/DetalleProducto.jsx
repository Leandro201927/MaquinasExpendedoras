import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShoppingCart, 
  Package, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw, 
  Headphones,
  Check,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCarrito } from '../context/CarritoContext';
import { formatearPrecio } from '../utils/validaciones';

const DetalleProducto = ({ producto, onCerrar, isVisible }) => {
  const { agregarProducto, estaEnCarrito, obtenerCantidad } = useCarrito();
  const [agregando, setAgregando] = useState(false);

  if (!isVisible || !producto) return null;

  const {
    id,
    nombre,
    precio,
    categoria,
    marca,
    descripcion,
    imagen,
    stock,
    color,
    garantia
  } = producto;

  // Manejar agregar al carrito
  const handleAgregarCarrito = async () => {
    setAgregando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      agregarProducto(producto);
      
      toast.success('¡Producto agregado al carrito!', {
        duration: 3000,
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: 'bold',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
      });
      
    } catch (error) {
      toast.error('Error al agregar producto', {
        duration: 3000,
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    } finally {
      setAgregando(false);
    }
  };

  const cantidadEnCarrito = obtenerCantidad(id);
  const yaEstaEnCarrito = estaEnCarrito(id);

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      <motion.div 
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onCerrar}
      >
        <motion.div 
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl"
        >
          {/* Header del modal */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 rounded-t-3xl z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Detalle del Producto
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onCerrar}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Cerrar"
              >
                <X size={24} />
              </motion.button>
            </div>
          </div>

          {/* Contenido del modal */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Imagen del producto */}
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={imagen}
                    alt={nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (e.target.src !== 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgOTBIMTcwVjExMEgxMzBWOTBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xMzAgNzBIMTcwVjkwSDEzMFY3MFoiIGZpbGw9IiM5QjlCQTMiLz4KPHBhdGggZD0iTTE0NSA1NUwxNjUgNzVIMTI1TDE0NSA1NVoiIGZpbGw9IiM5QjlCQTMiLz4KPC9zdmc+') {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgOTBIMTcwVjExMEgxMzBWOTBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xMzAgNzBIMTcwVjkwSDEzMFY3MFoiIGZpbGw9IiM5QjlCQTMiLz4KPHBhdGggZD0iTTE0NSA1NUwxNjUgNzVIMTI1TDE0NSA1NVoiIGZpbGw9IiM5QjlCQTMiLz4KPC9zdmc+';
                      }
                    }}
                  />
                </motion.div>
                
                {/* Indicadores de stock */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  {stock <= 5 && stock > 0 && (
                    <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
                      <AlertTriangle size={16} />
                      <span>¡Solo quedan {stock} unidades!</span>
                    </div>
                  )}
                  {stock === 0 && (
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      Producto agotado
                    </div>
                  )}
                  {stock > 5 && (
                    <div className="bg-gradient-to-r from-green-400 to-green-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
                      <Check size={16} />
                      <span>Disponible</span>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Información del producto */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                {/* Título y precio */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                      {categoria}
                    </div>
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 mb-3 leading-tight">{nombre}</h1>
                  <div className="flex items-center space-x-3 mb-2">
                    <Star className="text-yellow-400" size={20} />
                    <span className="text-lg font-semibold text-gray-600">{marca}</span>
                  </div>
                  <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {formatearPrecio(precio)}
                  </p>
                </div>

                {/* Información básica */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
                  >
                    <p className="text-sm text-blue-600 font-medium">Categoría</p>
                    <p className="font-bold text-blue-900">{categoria}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200"
                  >
                    <p className="text-sm text-purple-600 font-medium">Marca</p>
                    <p className="font-bold text-purple-900">{marca}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
                  >
                    <p className="text-sm text-green-600 font-medium">Color</p>
                    <p className="font-bold text-green-900">{color}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200"
                  >
                    <p className="text-sm text-orange-600 font-medium">Garantía</p>
                    <p className="font-bold text-orange-900">{garantia}</p>
                  </motion.div>
                </div>

                {/* Descripción */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{descripcion}</p>
                </div>

                {/* Stock disponible */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Disponibilidad</h3>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Package className="text-gray-600" size={20} />
                      <span className="text-gray-600 font-medium">Stock disponible:</span>
                    </div>
                    <span className={`font-bold text-lg ${
                      stock > 10 ? 'text-green-600' : stock > 0 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {stock > 0 ? `${stock} unidades` : 'Agotado'}
                    </span>
                  </div>
                  {yaEstaEnCarrito && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-700 font-medium">En tu carrito:</span>
                        <span className="font-bold text-blue-900">{cantidadEnCarrito} unidades</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botón agregar al carrito */}
                <motion.button
                  whileHover={{ scale: stock === 0 ? 1 : 1.02 }}
                  whileTap={{ scale: stock === 0 ? 1 : 0.98 }}
                  onClick={handleAgregarCarrito}
                  disabled={stock === 0 || agregando}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                    stock === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : agregando
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white cursor-wait'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>
                    {stock === 0 
                      ? 'Sin Stock' 
                      : agregando 
                        ? 'Agregando...' 
                        : yaEstaEnCarrito 
                          ? 'Agregar otra unidad'
                          : 'Agregar al Carrito'
                    }
                  </span>
                </motion.button>

                {/* Información adicional */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6"
                >
                  <h4 className="font-bold text-blue-900 mb-4 text-lg">Beneficios de compra</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="text-blue-600" size={20} />
                      <span className="text-blue-700 font-medium">Garantía {garantia}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Truck className="text-blue-600" size={20} />
                      <span className="text-blue-700 font-medium">Envío gratis &gt;$100k</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Headphones className="text-blue-600" size={20} />
                      <span className="text-blue-700 font-medium">Soporte 24/7</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RotateCcw className="text-blue-600" size={20} />
                      <span className="text-blue-700 font-medium">30 días devolución</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Footer del modal */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-3xl">
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCerrar}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-white transition-colors font-medium"
              >
                Cerrar
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DetalleProducto; 
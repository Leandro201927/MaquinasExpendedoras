import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, Star, AlertTriangle } from 'lucide-react';
import { formatearPrecio } from '../utils/validaciones';

const ProductoCard = ({ producto, onVerDetalle }) => {
  const {
    id,
    nombre,
    precio,
    categoria,
    marca,
    imagen,
    stock
  } = producto;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.2 }
    }
  };

  const imageVariants = {
    hover: { scale: 1.05 }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group relative border border-gray-100"
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <motion.img
          variants={imageVariants}
          src={imagen}
          alt={nombre}
          className="w-full h-full object-cover"
          onError={(e) => {
            if (e.target.src !== 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgOTBIMTcwVjExMEgxMzBWOTBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xMzAgNzBIMTcwVjkwSDEzMFY3MFoiIGZpbGw9IiM5QjlCQTMiLz4KPHBhdGggZD0iTTE0NSA1NUwxNjUgNzVIMTI1TDE0NSA1NVoiIGZpbGw9IiM5QjlCQTMiLz4KPC9zdmc+') {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgOTBIMTcwVjExMEgxMzBWOTBaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xMzAgNzBIMTcwVjkwSDEzMFY3MFoiIGZpbGw9IiM5QjlCQTMiLz4KPHBhdGggZD0iTTE0NSA1NUwxNjUgNzVIMTI1TDE0NSA1NVoiIGZpbGw9IiM5QjlCQTMiLz4KPC9zdmc+';
            }
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {stock <= 5 && stock > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3"
          >
            <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
              <AlertTriangle size={12} />
              <span>¡Pocas!</span>
            </div>
          </motion.div>
        )}
        
        {stock === 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3"
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Agotado
            </div>
          </motion.div>
        )}

        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
            {categoria}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] leading-tight">
          {nombre}
        </h3>

        <div className="flex items-center space-x-2 mb-3">
          <Star size={16} className="text-yellow-400" />
          <span className="text-sm font-medium text-gray-600">{marca}</span>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {formatearPrecio(precio)}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Package size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">Stock:</span>
          </div>
          <span className={`text-sm font-semibold ${
            stock > 10 
              ? 'text-green-600' 
              : stock > 0 
                ? 'text-orange-600' 
                : 'text-red-600'
          }`}>
            {stock > 0 ? `${stock} unidades` : 'Agotado'}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: stock === 0 ? 1 : 1.02 }}
          whileTap={{ scale: stock === 0 ? 1 : 0.98 }}
          onClick={() => onVerDetalle(producto)}
          disabled={stock === 0}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            stock === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform'
          }`}
          aria-label={`Ver detalles de ${nombre}`}
        >
          <ShoppingCart size={18} />
          <span>{stock === 0 ? 'Sin Stock' : 'Ver Detalles'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductoCard; 
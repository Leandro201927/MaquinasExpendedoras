import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Loader2, MapPin, Store } from 'lucide-react';
import { useRequerimientos } from '../context/RequerimientosContext';
import { useCarrito } from '../context/CarritoContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import productosService from '../services/productosService';
import ProductoCard from '../components/ProductoCard';
import FiltroProductos from '../components/FiltroProductos';
import DetalleProducto from '../components/DetalleProducto';

const VistaProductos = () => {
  const navigate = useNavigate();
  const { nombre, presupuesto, tipoEntrega, direccion, isValidated } = useRequerimientos();
  const { cantidad: cantidadCarrito } = useCarrito();

  // Estados para productos
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [error, setError] = useState('');

  // Estados para filtros
  const [filtrosActivos, setFiltrosActivos] = useState({
    categoria: '',
    busqueda: ''
  });
  const [aplicandoFiltros, setAplicandoFiltros] = useState(false);

  // Estados para modal de detalle
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  // Verificar si el usuario completó los requerimientos
  useEffect(() => {
    if (!isValidated) {
      navigate('/');
      return;
    }
  }, [isValidated, navigate]);

  // Función para cargar productos
  const cargarProductos = useCallback(async (pagina = 1, filtros = {}, resetear = false) => {
    setLoading(true);
    setError('');

    try {
      let resultado;
      
      // Si hay filtros, usar el método de filtrar, si no, paginación normal
      if (filtros.categoria || filtros.busqueda) {
        resultado = await productosService.filtrar(filtros, pagina);
      } else {
        resultado = await productosService.obtenerConPaginacion(pagina);
      }

      if (resetear) {
        setProductos(resultado.productos);
      } else {
        setProductos(prev => [...prev, ...resultado.productos]);
      }

      setHasMore(resultado.hayMas);
      setPaginaActual(pagina);
      
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar productos. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar productos iniciales
  useEffect(() => {
    if (isValidated) {
      cargarProductos(1, filtrosActivos, true);
    }
  }, [isValidated, cargarProductos]);

  // Función para cargar más productos (scroll infinito)
  const cargarMasProductos = useCallback(() => {
    if (!loading && hasMore) {
      cargarProductos(paginaActual + 1, filtrosActivos, false);
    }
  }, [loading, hasMore, paginaActual, filtrosActivos, cargarProductos]);

  // Hook de scroll infinito
  if (process.env.NODE_ENV === 'development') {
    console.log('--- VistaProductos: Props to useInfiniteScroll ---', { cargarMasProductos, hasMore, loading });
  }
  const { 
    isFetching, 
    lastElementRef, 
    error: scrollError, 
    resetInfiniteScroll,
    loadMore 
  } = useInfiniteScroll(
    cargarMasProductos,
    hasMore,
    loading
  );

  // Manejar aplicación de filtros
  const handleFiltrar = async (nuevosFiltros) => {
    setAplicandoFiltros(true);
    setFiltrosActivos(nuevosFiltros);
    resetInfiniteScroll(); // Resetear scroll infinito al filtrar
    await cargarProductos(1, nuevosFiltros, true);
    setAplicandoFiltros(false);
  };

  // Manejar limpieza de filtros
  const handleLimpiarFiltros = async () => {
    setAplicandoFiltros(true);
    const filtrosVacios = { categoria: '', busqueda: '' };
    setFiltrosActivos(filtrosVacios);
    resetInfiniteScroll(); // Resetear scroll infinito al limpiar filtros
    await cargarProductos(1, filtrosVacios, true);
    setAplicandoFiltros(false);
  };

  // Manejar ver detalle del producto
  const handleVerDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarDetalle(true);
  };

  // Manejar cerrar detalle
  const handleCerrarDetalle = () => {
    setMostrarDetalle(false);
    setProductoSeleccionado(null);
  };

  // Navegar al carrito
  const handleIrCarrito = () => {
    navigate('/carrito');
  };

  // Cancelar compra
  const handleCancelarCompra = () => {
    if (window.confirm('¿Está seguro que desea cancelar la compra? Perderá toda la información ingresada.')) {
      navigate('/');
    }
  };

  if (!isValidated) {
    return null; // O un componente de loading
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header con animación */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              <span>Volver a Requerimientos</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/carrito')}
              className="relative flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-200"
            >
              <ShoppingCart size={20} />
              <span>Carrito</span>
              {cantidadCarrito > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
                >
                  {cantidadCarrito}
                </motion.span>
              )}
            </motion.button>
          </div>

          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
            >
              Catálogo de Productos
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 inline-block shadow-lg border border-white/20"
            >
              <div className="space-y-3">
                <p className="text-gray-700 font-medium">
                  Cliente: <span className="text-blue-600 font-bold">{nombre}</span> - 
                  Presupuesto: <span className="text-green-600 font-bold">{new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                  }).format(presupuesto)}</span>
                </p>
                
                {/* Información de entrega */}
                <div className="flex items-center justify-center space-x-2 text-sm">
                  {tipoEntrega === 'domicilio' ? (
                    <>
                      <MapPin size={16} className="text-blue-500" />
                      <span className="text-gray-600">Entrega a:</span>
                      <span className="text-blue-600 font-semibold">{direccion}</span>
                    </>
                  ) : (
                    <>
                      <Store size={16} className="text-green-500" />
                      <span className="text-gray-600">Recoger en:</span>
                      <span className="text-green-600 font-semibold">Tienda</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <FiltroProductos
            onFiltrar={handleFiltrar}
            onLimpiar={handleLimpiarFiltros}
            filtrosActivos={filtrosActivos}
          />
        </motion.div>

        {/* Indicador de productos cargados */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 inline-block shadow-lg border border-white/20">
            <p className="text-gray-700 font-medium">
              <span className="text-blue-600 font-bold">{productos.length}</span> productos cargados
              {hasMore && (
                <span className="text-gray-500 ml-2">
                  📜 Scroll infinito activo
                </span>
              )}
              {!hasMore && productos.length > 0 && (
                <span className="text-green-600 ml-2">
                  ✅ Catálogo completo
                </span>
              )}
              {(loading || isFetching) && (
                <span className="text-blue-500 ml-2">
                  ⏳ Cargando...
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Grid de productos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {productos.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {productos.map((producto, index) => (
                  <motion.div
                    key={producto.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.05,
                        duration: 0.3 
                      }
                    }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <ProductoCard
                      producto={producto}
                      onVerDetalle={handleVerDetalle}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : !loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No hay productos disponibles
                </h3>
                <p className="text-gray-600 mb-6">
                  {filtrosActivos.categoria || filtrosActivos.busqueda
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'No se encontraron productos en el catálogo'
                  }
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLimpiarFiltros}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Limpiar Filtros
                </motion.button>
              </div>
            </motion.div>
          ) : null}
        </motion.div>

        {/* Indicador de carga */}
        {(loading || isFetching) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-8"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 flex items-center space-x-3">
              <Loader2 className="animate-spin text-blue-600" size={24} />
              <span className="text-gray-700 font-medium">
                {loading && productos.length === 0 ? 'Cargando productos...' : 'Cargando más productos...'}
              </span>
            </div>
          </motion.div>
        )}

        {/* Botón manual de cargar más (como alternativa al scroll infinito) */}
        {hasMore && !loading && !isFetching && productos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center py-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMore}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-200 flex items-center space-x-3"
            >
              <ArrowLeft className="rotate-180" size={20} />
              <span>Cargar más productos</span>
            </motion.button>
          </motion.div>
        )}

        {/* Error de scroll infinito */}
        {scrollError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 shadow-lg max-w-md mx-auto">
              <div className="text-2xl mb-2">⚠️</div>
              <h4 className="text-lg font-bold text-orange-800 mb-2">Error al cargar más productos</h4>
              <p className="text-orange-600 text-sm mb-3">{scrollError}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMore}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Intentar de nuevo
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Indicador cuando no hay más productos */}
        {!hasMore && productos.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 shadow-lg max-w-md mx-auto">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">¡Has visto todo!</h3>
              <p className="text-green-600">
                Has visto todos los productos disponibles ({productos.length} productos)
              </p>
            </div>
          </motion.div>
        )}

        {/* Debug info para desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-xs z-50"
          >
            <div className="text-yellow-400 font-bold mb-2">🔍 Scroll Infinito Debug:</div>
            <div>• Productos: {productos.length}</div>
            <div>• Cargando: {loading ? '✅' : '❌'}</div>
            <div>• Fetching: {isFetching ? '✅' : '❌'}</div>
            <div>• Hay más: {hasMore ? '✅' : '❌'}</div>
            <div>• Página: {paginaActual}</div>
            <div>• Error scroll: {scrollError ? '❌' : '✅'}</div>
            <div>• Filtros: {JSON.stringify(filtrosActivos)}</div>
          </motion.div>
        )}

        {/* Elemento invisible para detectar scroll (solo si hay más productos) */}
        {hasMore && productos.length > 0 && (
          <div 
            ref={lastElementRef} 
            className="h-8 w-full flex items-center justify-center"
            style={{ 
              background: process.env.NODE_ENV === 'development' ? 'rgba(255,0,0,0.1)' : 'transparent',
              border: process.env.NODE_ENV === 'development' ? '2px dashed red' : 'none'
            }}
          >
            {process.env.NODE_ENV === 'development' && (
              <span className="text-red-500 text-xs font-mono">
                🎯 SCROLL TRIGGER ZONE
              </span>
            )}
          </div>
        )}

        {/* Indicador de error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-lg max-w-md mx-auto">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">Error al cargar productos</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Reintentar
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de detalle del producto */}
      <DetalleProducto
        producto={productoSeleccionado}
        isVisible={mostrarDetalle}
        onCerrar={handleCerrarDetalle}
      />
    </div>
  );
};

export default VistaProductos; 
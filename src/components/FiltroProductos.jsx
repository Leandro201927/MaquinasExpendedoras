import React, { useState, useEffect } from 'react';
import productosService from '../services/productosService';

const FiltroProductos = ({ onFiltrar, onLimpiar, filtrosActivos }) => {
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: '',
    busqueda: ''
  });

  // Cargar categorías al montar el componente
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categoriasData = await productosService.obtenerCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    cargarCategorias();
  }, []);

  // Sincronizar filtros locales con filtros activos
  useEffect(() => {
    if (filtrosActivos) {
      setFiltros({
        categoria: filtrosActivos.categoria || '',
        busqueda: filtrosActivos.busqueda || ''
      });
    }
  }, [filtrosActivos]);

  // Manejar cambios en los filtros
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Aplicar filtros
  const handleFiltrar = (e) => {
    e.preventDefault();
    
    // Limpiar espacios en blanco
    const filtrosLimpios = {
      categoria: filtros.categoria.trim(),
      busqueda: filtros.busqueda.trim()
    };

    onFiltrar(filtrosLimpios);
  };

  // Limpiar filtros
  const handleLimpiar = () => {
    const filtrosVacios = {
      categoria: '',
      busqueda: ''
    };
    setFiltros(filtrosVacios);
    onLimpiar();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Filtrar Productos
      </h2>
      
      <form onSubmit={handleFiltrar} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filtro por categoría (Select) */}
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              value={filtros.categoria}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de búsqueda libre */}
          <div>
            <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-2">
              Búsqueda libre
            </label>
            <input
              type="text"
              id="busqueda"
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleChange}
              placeholder="Buscar por nombre, marca o descripción..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-blue-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Filtrar
          </button>
          
          <button
            type="button"
            onClick={handleLimpiar}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-gray-200 flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Limpiar
          </button>
        </div>
      </form>

      {/* Indicadores de filtros activos */}
      {(filtrosActivos?.categoria || filtrosActivos?.busqueda) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Filtros activos:</p>
          <div className="flex flex-wrap gap-2">
            {filtrosActivos.categoria && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Categoría: {filtrosActivos.categoria}
                <button
                  type="button"
                  onClick={() => {
                    const nuevosFiltros = { ...filtrosActivos, categoria: '' };
                    onFiltrar(nuevosFiltros);
                  }}
                  className="ml-1.5 text-blue-400 hover:text-blue-600"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
            {filtrosActivos.busqueda && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Búsqueda: "{filtrosActivos.busqueda}"
                <button
                  type="button"
                  onClick={() => {
                    const nuevosFiltros = { ...filtrosActivos, busqueda: '' };
                    onFiltrar(nuevosFiltros);
                  }}
                  className="ml-1.5 text-green-400 hover:text-green-600"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltroProductos; 
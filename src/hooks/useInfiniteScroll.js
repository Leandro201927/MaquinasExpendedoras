import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook personalizado para implementar scroll infinito con IntersectionObserver
 * @param {Function} callback - Función a ejecutar cuando se alcanza el final del scroll
 * @param {boolean} hasMore - Indica si hay más elementos para cargar
 * @param {boolean} loading - Indica si está cargando datos actualmente
 * @returns {Array} [isFetching, lastElementRef, error]
 */
export const useInfiniteScroll = (callback, hasMore, loading) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef();
  const previousCallbackRef = useRef();

  // Función que se ejecuta cuando el IntersectionObserver detecta el elemento
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    
    // Solo activar si:
    // 1. El elemento está en la vista
    // 2. Hay más elementos para cargar
    // 3. No está cargando actualmente
    // 4. No está ya fetching
    if (target.isIntersecting && hasMore && !loading && !isFetching) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Activando carga automática por scroll infinito');
      }
      setIsFetching(true);
      setError(null);
    }
  }, [hasMore, loading, isFetching]);

  // Configurar el IntersectionObserver
  useEffect(() => {
    const options = {
      root: null, // viewport como root
      rootMargin: "100px", // Cargar 100px antes de llegar al final
      threshold: 0.1 // Activar cuando el 10% del elemento esté visible
    };
    
    // Crear nuevo observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(handleObserver, options);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  // Ejecutar callback cuando se necesita cargar más datos
  useEffect(() => {
    if (!isFetching || loading) return;
    
    fetchMoreData();
  }, [isFetching, loading]);

  // Función para cargar más datos
  const fetchMoreData = useCallback(async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('📦 Cargando más productos...');
      }
      await callback();
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Productos cargados exitosamente');
      }
    } catch (error) {
      console.error('❌ Error al cargar más datos:', error);
      setError(error.message || 'Error al cargar más productos');
    } finally {
      setIsFetching(false);
    }
  }, [callback]);

  // Función para observar el elemento de referencia (último elemento)
  const lastElementRef = useCallback((node) => {
    // No observar si está cargando
    if (loading) return;
    
    // Desconectar observer anterior
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Observar nuevo nodo si existe
    if (node && observerRef.current) {
      if (process.env.NODE_ENV === 'development') {
        console.log('👀 Observando último elemento para scroll infinito');
      }
      observerRef.current.observe(node);
    }
  }, [loading]);

  // Función para resetear el estado (útil para filtros)
  const resetInfiniteScroll = useCallback(() => {
    setIsFetching(false);
    setError(null);
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  // Función manual para cargar más (botón de "Cargar más")
  const loadMore = useCallback(async () => {
    if (loading || isFetching || !hasMore) return;
    
    setIsFetching(true);
    setError(null);
    
    try {
      await callback();
    } catch (error) {
      console.error('Error al cargar más datos manualmente:', error);
      setError(error.message || 'Error al cargar más productos');
    } finally {
      setIsFetching(false);
    }
  }, [callback, loading, isFetching, hasMore]);

  return {
    isFetching,
    lastElementRef,
    error,
    resetInfiniteScroll,
    loadMore
  };
}; 
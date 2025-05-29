import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook personalizado para implementar scroll infinito con IntersectionObserver
 * @param {Function} callback - Función a ejecutar cuando se alcanza el final del scroll
 * @param {boolean} hasMore - Indica si hay más elementos para cargar
 * @param {boolean} loading - Indica si está cargando datos actualmente (estado del componente padre)
 * @returns {object} Contiene isFetching, lastElementRef, error, resetInfiniteScroll, loadMore
 */
export const useInfiniteScroll = (callback, hasMoreProp, loadingProp) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const observerRef = useRef();

  // Refs to hold the latest values of props and state for the observer callback
  const hasMoreRef = useRef(hasMoreProp);
  const loadingRef = useRef(loadingProp);
  const isFetchingRef = useRef(isFetching);

  // Update refs whenever props/state change
  useEffect(() => {
    hasMoreRef.current = hasMoreProp;
  }, [hasMoreProp]);

  useEffect(() => {
    loadingRef.current = loadingProp;
  }, [loadingProp]);

  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  const handleObserver = useCallback((entries) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('--- handleObserver CALLED! ---', entries);
    }
    const target = entries[0];
    if (!target) {
      if (process.env.NODE_ENV === 'development') {
        console.log('--- handleObserver: No target in entries ---');
      }
      return;
    }

    const currentHasMore = hasMoreRef.current;
    const currentLoading = loadingRef.current;
    const currentIsFetching = isFetchingRef.current;

    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 IntersectionObserver state (via refs):', {
        isIntersecting: target.isIntersecting,
        hasMore: currentHasMore,
        parentLoading: currentLoading,
        hookIsFetching: currentIsFetching
      });
    }
    
    if (target.isIntersecting && currentHasMore && !currentLoading && !currentIsFetching) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Triggering fetch due to scroll (setIsFetching will be true)...');
      }
      setIsFetching(true);
      setError(null);
    } else if (process.env.NODE_ENV === 'development' && target.isIntersecting) {
      console.log('❌ Fetch not triggered despite intersection because (checked refs):', {
        hasMore: currentHasMore,
        parentLoading: currentLoading,
        hookIsFetching: currentIsFetching,
        conditionHasMore: !currentHasMore,
        conditionParentLoading: currentLoading,
        conditionHookIsFetching: currentIsFetching
      });
    }
  }, [setIsFetching, setError]); // Now depends only on stable setters

  // Configurar el IntersectionObserver
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "300px",
      threshold: 0.1
    };
    
    if (process.env.NODE_ENV === 'development') {
      console.log('--- useInfiniteScroll: Creating/Recreating IntersectionObserver ---', 
        { 
          hasMore: hasMoreRef.current, 
          loading: loadingRef.current, 
          isFetching: isFetchingRef.current 
        }
      );
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver(handleObserver, options);
    const currentObserver = observerRef.current; // Capture instance for cleanup
    
    return () => {
      currentObserver.disconnect();
      if (process.env.NODE_ENV === 'development') {
        console.log('--- useInfiniteScroll: Disconnected IntersectionObserver in cleanup ---');
      }
    };
  }, [handleObserver]); // This will now be stable

  const fetchMoreData = useCallback(async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 fetchMoreData: Calling parent callback...');
    }
    try {
      await callback();
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ fetchMoreData: Parent callback successful');
      }
    } catch (err) {
      console.error('❌ fetchMoreData: Error in parent callback:', err);
      setError(err.message || 'Error al cargar más productos');
    } finally {
      setIsFetching(false);
      if (process.env.NODE_ENV === 'development') {
        console.log('🏁 fetchMoreData: Finished, isFetching set to false');
      }
    }
  }, [callback, setIsFetching, setError]);

  useEffect(() => {
    const currentLoading = loadingRef.current; // Read from ref
    const currentIsFetching = isFetchingRef.current; // Read from ref

    if (currentIsFetching && !currentLoading) {
      if (process.env.NODE_ENV === 'development') {
        console.log('--- useEffect [isFetching, loading]: Conditions met (via refs), calling fetchMoreData ---', 
          { isFetching: currentIsFetching, loading: currentLoading }
        );
      }
      fetchMoreData();
    } else if (process.env.NODE_ENV === 'development') {
      if (currentIsFetching && currentLoading) {
         console.log('--- useEffect [isFetching, loading]: isFetching is true, but parent is loading (via refs). Waiting. ---', 
           { isFetching: currentIsFetching, loading: currentLoading }
         );
      }
    }
    // This effect should run when the *logical conditions* based on isFetching or loading change.
    // We use the refs for reading, but depend on the actual states for reactivity.
  }, [isFetching, loadingProp, fetchMoreData]); 

  const lastElementRef = useCallback((node) => {
    const currentParentLoading = loadingRef.current; // Read from ref
    if (process.env.NODE_ENV === 'development') {
      console.log('--- lastElementRef CALLED ---', { 
        node: node ? 'Node provided' : 'Node is null', 
        parentLoading: currentParentLoading, // Log the value it's using
        propLoading: loadingProp // Log the current prop value for comparison
      });
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
      if (process.env.NODE_ENV === 'development') {
        console.log('--- lastElementRef: Disconnected current observer via disconnect() ---');
      }
    }

    // Decision should be based on the most up-to-date loadingProp
    if (loadingProp) { 
      if (process.env.NODE_ENV === 'development') {
        console.log('--- lastElementRef: Bailing out: loadingProp is true. Element will not be observed. ---');
      }
      return;
    }
    
    if (node && observerRef.current) {
      if (process.env.NODE_ENV === 'development') {
        console.log('👀 lastElementRef: Observing new node with current observer instance.', node);
      }
      observerRef.current.observe(node);
    } else if (process.env.NODE_ENV === 'development') {
      console.log('--- lastElementRef: Not observing node.', { 
        hasNode: !!node, 
        hasObserverInstance: !!observerRef.current,
        loadingProp // Log loadingProp here too
      });
    }
    // Add loadingProp to dependencies to re-run when it changes.
  }, [loadingProp]); 

  const resetInfiniteScroll = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('--- resetInfiniteScroll CALLED ---');
    }
    setIsFetching(false);
    setError(null);
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, [setIsFetching, setError]);

  const loadMore = useCallback(async () => {
    const currentParentLoading = loadingRef.current;
    const currentIsFetching = isFetchingRef.current;
    const currentHasMore = hasMoreRef.current;

    if (currentParentLoading || currentIsFetching || !currentHasMore) {
      if (process.env.NODE_ENV === 'development') {
        console.log('--- loadMore: Bailing out (checked refs) ---', 
          { loading: currentParentLoading, isFetching: currentIsFetching, hasMore: currentHasMore }
        );
      }
      return;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log('--- loadMore: Manually triggering fetch (setIsFetching true) ---');
    }
    setIsFetching(true);
    setError(null);
  }, [setIsFetching, setError]);

  return {
    isFetching,
    lastElementRef,
    error,
    resetInfiniteScroll,
    loadMore
  };
}; 
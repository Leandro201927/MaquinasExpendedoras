'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps {
  initialData: any[];
  itemsPerPage: number;
  total: number;
}

export const useInfiniteScroll = ({
  initialData,
  itemsPerPage,
  total
}: UseInfiniteScrollProps) => {
  const [data, setData] = useState<any[]>(initialData.slice(0, itemsPerPage));
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setData(initialData.slice(0, itemsPerPage));
    setPage(1);
    setHasMore(initialData.length > itemsPerPage);
  }, [initialData, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const nextPage = page + 1;
    
    // Simulamos carga asíncrona
    setTimeout(() => {
      const startIndex = 0;
      const endIndex = nextPage * itemsPerPage;
      const newData = initialData.slice(startIndex, endIndex);
      
      setData(newData);
      setPage(nextPage);
      
      // Verificamos si hay más datos para cargar
      setHasMore(endIndex < total);
      setLoading(false);
    }, 500);
  }, [loading, hasMore, page, initialData, itemsPerPage, total]);

  const handleScroll = useCallback((event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    
    // Si estamos cerca del final del scroll, cargamos más datos
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMore();
    }
  }, [loadMore]);

  return {
    data,
    loading,
    hasMore,
    handleScroll,
    loadMore
  };
}; 
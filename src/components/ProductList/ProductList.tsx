'use client';

import { useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import styles from './ProductList.module.scss';

export const ProductList = () => {
  const { filteredProducts, setSelectedProduct } = useAppContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { data, loading, hasMore, handleScroll } = useInfiniteScroll({
    initialData: filteredProducts,
    itemsPerPage: 15,
    total: filteredProducts.length
  });
  
  return (
    <div 
      className={styles.container} 
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {data.length > 0 ? (
        <div className={styles.grid}>
          {data.map(product => (
            <div key={product.id} className={styles.gridItem}>
              <ProductCard 
                product={product} 
                onSelect={setSelectedProduct} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No se encontraron productos con los filtros seleccionados.</p>
        </div>
      )}
      
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando más productos...</p>
        </div>
      )}
      
      {!hasMore && data.length > 0 && (
        <div className={styles.endMessage}>
          <p>No hay más productos para mostrar</p>
        </div>
      )}
    </div>
  );
}; 
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { ProductList } from '@/components/ProductList';
import { ProductDetail } from '@/components/ProductDetail';
import { ProductFilters } from '@/components/ProductFilters';
import styles from './page.module.scss';

export default function ProductsPage() {
  const router = useRouter();
  const { purchaseRequirements } = useAppContext();
  
  // Verificar si los requerimientos están completos
  useEffect(() => {
    if (!purchaseRequirements) {
      router.push('/');
    }
  }, [purchaseRequirements, router]);
  
  // Si no hay requerimientos, no mostrar nada mientras redirige
  if (!purchaseRequirements) {
    return null;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Productos</h1>
        <p className={styles.subtitle}>
          Selecciona los productos que deseas comprar
        </p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ProductFilters />
        </div>
        
        <div className={styles.main}>
          <ProductList />
        </div>
        
        <div className={styles.detail}>
          <ProductDetail />
        </div>
      </div>
    </div>
  );
} 
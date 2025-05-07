'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { CartList } from '@/components/CartList';
import { CreditCardForm } from '@/components/CreditCardForm';
import styles from './page.module.scss';

export default function CartPage() {
  const router = useRouter();
  const { purchaseRequirements, cartItems } = useAppContext();
  
  // Verificar si los requerimientos están completos y si hay items en el carrito
  useEffect(() => {
    if (!purchaseRequirements) {
      router.push('/');
    } else if (cartItems.length === 0) {
      router.push('/products');
    }
  }, [purchaseRequirements, cartItems, router]);
  
  // Si no hay requerimientos o items, no mostrar nada mientras redirige
  if (!purchaseRequirements || cartItems.length === 0) {
    return null;
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Carrito de Compras</h1>
        <p className={styles.subtitle}>
          Revisa tus productos seleccionados e información de pago
        </p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.cartSection}>
          <h2 className={styles.sectionTitle}>Compra Actual</h2>
          <CartList />
        </div>
        
        <div className={styles.paymentSection}>
          <CreditCardForm />
        </div>
      </div>
    </div>
  );
} 
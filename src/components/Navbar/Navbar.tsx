'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/Button';
import styles from './Navbar.module.scss';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { clearPurchase, cartItems } = useAppContext();
  
  // No mostrar la barra de navegación en la página inicial
  if (pathname === '/') {
    return null;
  }
  
  const handleCancelPurchase = () => {
    clearPurchase();
    router.push('/');
  };
  
  const handleContinueShopping = () => {
    router.push('/products');
  };
  
  const handleCompletePurchase = () => {
    router.push('/cart');
  };
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={handleCancelPurchase}>
          Máquina Expendedora
        </Link>
        
        <div className={styles.actions}>
          {pathname === '/products' && (
            <>
              <Button variant="outline" onClick={handleCancelPurchase}>
                Cancelar Compra
              </Button>
              
              <Button variant="primary" onClick={handleCompletePurchase}>
                Completar Compra
                {cartItems.length > 0 && (
                  <span className={styles.badge}>{cartItems.length}</span>
                )}
              </Button>
            </>
          )}
          
          {pathname === '/cart' && (
            <>
              <Button variant="outline" onClick={handleCancelPurchase}>
                Cancelar Compra
              </Button>
              
              <Button variant="primary" onClick={handleContinueShopping}>
                Seguir Comprando
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}; 
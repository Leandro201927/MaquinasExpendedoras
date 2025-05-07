'use client';

import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/Button';
import styles from './CartList.module.scss';

export const CartList = () => {
  const { cartItems, removeFromCart, totalPrice, isDelivery } = useAppContext();
  
  // Formatear el precio como moneda colombiana
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No hay productos en el carrito.</p>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCost = isDelivery ? 10000 : 0;
  
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className={styles.tableRow}>
                <td className={styles.productCell}>
                  <div className={styles.productInfo}>
                    <div className={styles.imageContainer}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className={styles.productImage}
                      />
                    </div>
                    <span className={styles.productName}>{item.name}</span>
                  </div>
                </td>
                <td>{formatPrice(item.price)}</td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.price * item.quantity)}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className={styles.summary}>
        <h3 className={styles.summaryTitle}>Resumen de Compra</h3>
        
        <div className={styles.summaryItem}>
          <span>Productos</span>
          <span>{cartItems.length} items</span>
        </div>
        
        <div className={styles.summaryItem}>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className={styles.summaryItem}>
          <span>Envío</span>
          <span>{isDelivery ? formatPrice(deliveryCost) : 'Gratis'}</span>
        </div>
        
        <div className={`${styles.summaryItem} ${styles.totalRow}`}>
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}; 
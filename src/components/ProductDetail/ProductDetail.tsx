'use client';

import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/Button';
import styles from './ProductDetail.module.scss';

export const ProductDetail = () => {
  const { selectedProduct, addToCart } = useAppContext();
  
  if (!selectedProduct) {
    return (
      <div className={styles.emptyState}>
        <h3>Selecciona un producto</h3>
        <p>Haz clic en "Ver Detalle" en un producto para ver su información completa</p>
      </div>
    );
  }
  
  const { name, price, image, category, stock, description } = selectedProduct;
  
  // Formatear el precio como moneda colombiana
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(price);
  
  const handleAddToCart = () => {
    addToCart(selectedProduct);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          priority
        />
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.stock}>
            Disponibles: <strong>{stock}</strong>
          </span>
        </div>
        
        <p className={styles.description}>{description}</p>
        
        <div className={styles.priceContainer}>
          <span className={styles.price}>{formattedPrice}</span>
        </div>
        
        <Button 
          variant="primary" 
          onClick={handleAddToCart} 
          disabled={stock === 0}
          fullWidth
        >
          {stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </Button>
      </div>
    </div>
  );
}; 
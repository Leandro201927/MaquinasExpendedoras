'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/Button';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  const { name, price, image, category, isPopular } = product;
  
  // Formatear el precio como moneda colombiana
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(price);
  
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={isPopular}
          />
        </div>
        {isPopular && <span className={styles.popularBadge}>Popular</span>}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <div className={styles.details}>
          <span className={styles.price}>{formattedPrice}</span>
          <span className={styles.category}>{category}</span>
        </div>
        <Button 
          variant="primary" 
          onClick={() => onSelect(product)}
          className={styles.button}
        >
          Ver Detalle
        </Button>
      </div>
    </div>
  );
}; 
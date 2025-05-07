'use client';

import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard = ({ product, showAddToCart = true }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isAuthenticated, isCustomer } = useAuth();
  
  const { id, name, price, image, description, stock, category, location } = product;

  // Usar una imagen placeholder disponible
  const placeholderImage = '/vercel.svg';

  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  // Para formatear el precio en euros
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);

  let stockClass = 'stock ';
  let stockText = '';
  
  if (stock > 5) {
    stockClass += 'in-stock';
    stockText = 'En stock';
  } else if (stock > 0) {
    stockClass += 'low-stock';
    stockText = `Solo ${stock} disponibles`;
  } else {
    stockClass += 'out-stock';
    stockText = 'Agotado';
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="image-placeholder">
          <span>Sin imagen</span>
        </div>
        {/* Imagen placeholder */}
        <Image 
          src={placeholderImage}
          alt={name}
          fill
          style={{ objectFit: 'contain', padding: '0.5rem' }}
        />
        {/* Etiqueta de categoría */}
        <div className="tag-container">
          <span className="tag">{category}</span>
        </div>
      </div>
      
      <div className="card-body">
        <h3 title={name}>
          {name.length > 20 ? `${name.substring(0, 20)}...` : name}
        </h3>
        
        <p className="description" title={description}>
          {description.length > 35 ? `${description.substring(0, 35)}...` : description}
        </p>
        
        <div className="product-info">
          <span className="price">{formattedPrice}</span>
          
          {location && (
            <span className="location-tag">{location}</span>
          )}
        </div>
        
        <div className="product-actions">
          <span className={stockClass}>
            {stockText}
          </span>
          
          {showAddToCart && isAuthenticated && isCustomer && stock > 0 && (
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm"
            >
              Añadir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 
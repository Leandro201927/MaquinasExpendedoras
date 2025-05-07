'use client';

import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import styles from './ProductFilters.module.scss';

export const ProductFilters = () => {
  const { products, setFilteredProducts } = useAppContext();
  
  const [category, setCategory] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  
  // Obtener todas las categorías únicas
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  const handleFilterApply = () => {
    let filtered = [...products];
    
    // Filtrar por categoría si se seleccionó una
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Filtrar por precio máximo si se ingresó uno
    if (maxPrice && parseFloat(maxPrice) > 0) {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
    }
    
    // Aplicar filtros
    setFilteredProducts(filtered);
  };
  
  const handleResetFilters = () => {
    setCategory('');
    setMaxPrice('');
    setFilteredProducts(products);
  };
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filtros</h3>
      
      <div className={styles.filterGroup}>
        <label className={styles.label}>Categoría</label>
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.filterGroup}>
        <Input
          label="Precio máximo"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Ingrese precio máximo"
          min="0"
          fullWidth
        />
      </div>
      
      <div className={styles.buttonGroup}>
        <Button
          variant="primary"
          onClick={handleFilterApply}
        >
          Filtrar
        </Button>
        
        <Button
          variant="outline"
          onClick={handleResetFilters}
        >
          Limpiar Filtros
        </Button>
      </div>
    </div>
  );
}; 
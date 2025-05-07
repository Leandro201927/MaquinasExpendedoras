'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import styles from './RequirementsForm.module.scss';
import { PurchaseRequirements } from '@/types';

export const RequirementsForm = () => {
  const router = useRouter();
  const { setPurchaseRequirements } = useAppContext();
  
  const [formData, setFormData] = useState<PurchaseRequirements>({
    customerName: '',
    budget: 0,
    address: '',
    deliveryType: 'pickup'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'El nombre es requerido';
    } else if (formData.customerName.length > 20) {
      newErrors.customerName = 'El nombre no debe exceder 20 caracteres';
    }
    
    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = 'El presupuesto debe ser mayor a 0';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    
    if (!formData.deliveryType) {
      newErrors.deliveryType = 'Seleccione un tipo de entrega';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulamos una petición a un servidor
    setTimeout(() => {
      setPurchaseRequirements(formData);
      router.push('/products');
      setIsSubmitting(false);
    }, 800);
  };
  
  const handleReset = () => {
    setFormData({
      customerName: '',
      budget: 0,
      address: '',
      deliveryType: 'pickup'
    });
    setErrors({});
  };
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <Input
          label="Nombre"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          placeholder="Ingrese su nombre"
          error={errors.customerName}
          maxLength={20}
          fullWidth
        />
      </div>
      
      <div className={styles.formGroup}>
        <Input
          label="Presupuesto máximo (COP)"
          name="budget"
          type="number"
          value={formData.budget === 0 ? '' : formData.budget}
          onChange={handleInputChange}
          placeholder="Ingrese su presupuesto"
          error={errors.budget}
          min={1}
          fullWidth
        />
      </div>
      
      <div className={styles.formGroup}>
        <Input
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Ingrese su dirección"
          error={errors.address}
          fullWidth
        />
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.radioGroupLabel}>Tipo de entrega</label>
        <div className={styles.radioGroup}>
          <div className={styles.radioItem}>
            <input
              type="radio"
              id="pickup"
              name="deliveryType"
              value="pickup"
              checked={formData.deliveryType === 'pickup'}
              onChange={handleRadioChange}
            />
            <label htmlFor="pickup">Recoger en tienda</label>
          </div>
          
          <div className={styles.radioItem}>
            <input
              type="radio"
              id="delivery"
              name="deliveryType"
              value="delivery"
              checked={formData.deliveryType === 'delivery'}
              onChange={handleRadioChange}
            />
            <label htmlFor="delivery">Entrega a domicilio</label>
          </div>
        </div>
        {errors.deliveryType && <p className={styles.error}>{errors.deliveryType}</p>}
      </div>
      
      <div className={styles.buttonGroup}>
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Iniciar Compra
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Limpiar Campos
        </Button>
      </div>
    </form>
  );
}; 
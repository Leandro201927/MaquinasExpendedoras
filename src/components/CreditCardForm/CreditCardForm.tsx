'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import styles from './CreditCardForm.module.scss';

export const CreditCardForm = () => {
  const router = useRouter();
  const { purchaseRequirements, totalPrice, setCreditCard, clearPurchase } = useAppContext();
  
  const [cardData, setCardData] = useState({
    number: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const formatCardNumber = (value: string) => {
    return value
      .replace(/[^\d]/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };
  
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, '').slice(0, 4);
    
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    
    return cleaned;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^\d]/g, '').slice(0, 3);
    }
    
    setCardData({
      ...cardData,
      [name]: formattedValue
    });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const { number, expiryDate, cvv, cardholderName } = cardData;
    
    // Validar número de tarjeta
    const cleanedNumber = number.replace(/\s/g, '');
    if (!cleanedNumber) {
      newErrors.number = 'El número de tarjeta es requerido';
    } else if (cleanedNumber.length !== 16) {
      newErrors.number = 'El número de tarjeta debe tener 16 dígitos';
    }
    
    // Validar fecha de expiración
    if (!expiryDate) {
      newErrors.expiryDate = 'La fecha de expiración es requerida';
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'El formato debe ser MM/AA';
    } else {
      const [month, year] = expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Mes inválido';
      } else if (
        parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = 'La tarjeta ha expirado';
      }
    }
    
    // Validar CVV
    if (!cvv) {
      newErrors.cvv = 'El código de seguridad es requerido';
    } else if (cvv.length !== 3) {
      newErrors.cvv = 'El código debe tener 3 dígitos';
    }
    
    // Validar nombre del titular
    if (!cardholderName.trim()) {
      newErrors.cardholderName = 'El nombre del titular es requerido';
    }
    
    // Validar que el presupuesto no sea excedido
    if (purchaseRequirements && totalPrice > purchaseRequirements.budget) {
      newErrors.budget = `El total excede su presupuesto de ${new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      }).format(purchaseRequirements.budget)}`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulamos una petición a un servidor para procesar el pago
    setTimeout(() => {
      setCreditCard(cardData);
      setSuccessMessage('¡Pago realizado con éxito! Redireccionando...');
      
      // Redirigir a la página inicial después de 2 segundos
      setTimeout(() => {
        clearPurchase();
        router.push('/');
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Información de Pago</h3>
      
      {successMessage ? (
        <div className={styles.successMessage}>
          <p>{successMessage}</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <Input
              label="Número de Tarjeta"
              name="number"
              value={cardData.number}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              error={errors.number}
              maxLength={19}
              fullWidth
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <Input
                label="Fecha de Expiración"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/AA"
                error={errors.expiryDate}
                maxLength={5}
                fullWidth
              />
            </div>
            
            <div className={styles.formGroup}>
              <Input
                label="Código de Seguridad"
                name="cvv"
                value={cardData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                error={errors.cvv}
                maxLength={3}
                type="password"
                showPasswordToggle
                fullWidth
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <Input
              label="Nombre del Titular"
              name="cardholderName"
              value={cardData.cardholderName}
              onChange={handleInputChange}
              placeholder="NOMBRE COMO APARECE EN LA TARJETA"
              error={errors.cardholderName}
              fullWidth
            />
          </div>
          
          {errors.budget && (
            <div className={styles.budgetError}>
              <p>{errors.budget}</p>
            </div>
          )}
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Confirmar Compra
          </Button>
        </form>
      )}
    </div>
  );
}; 
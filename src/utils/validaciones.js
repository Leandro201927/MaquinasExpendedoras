/**
 * Funciones de validación para el sistema de compras
 */

// Validación para el nombre (máximo 20 caracteres, sin números ni símbolos)
export const validarNombre = (nombre) => {
  if (!nombre || nombre.trim() === '') {
    return 'El nombre es requerido';
  }
  
  if (nombre.length > 20) {
    return 'El nombre no puede exceder 20 caracteres';
  }
  
  // Solo letras y espacios
  const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
  if (!regex.test(nombre)) {
    return 'El nombre solo puede contener letras y espacios';
  }
  
  return '';
};

// Validación para el presupuesto (solo números, formato COP)
export const validarPresupuesto = (presupuesto) => {
  const valor = typeof presupuesto === 'string' 
    ? parseInt(presupuesto.replace(/[^\d]/g, '')) 
    : presupuesto;
    
  if (!valor || valor <= 0) {
    return 'El presupuesto debe ser mayor a 0';
  }
  
  if (valor < 10000) {
    return 'El presupuesto mínimo es $10,000 COP';
  }
  
  return '';
};

// Validación para dirección de entrega a domicilio
export const validarDireccion = (direccion) => {
  if (!direccion || direccion.trim() === '') {
    return 'La dirección es requerida para entrega a domicilio';
  }
  
  if (direccion.length < 10) {
    return 'La dirección debe tener al menos 10 caracteres';
  }
  
  if (direccion.length > 100) {
    return 'La dirección no puede exceder 100 caracteres';
  }
  
  // Verificar que contenga letras y números (dirección válida)
  const tieneLetras = /[a-zA-ZÀ-ÿ]/.test(direccion);
  const tieneNumeros = /\d/.test(direccion);
  
  if (!tieneLetras || !tieneNumeros) {
    return 'La dirección debe contener letras y números (ej: Calle 123 # 45-67)';
  }
  
  return '';
};

// Validación para número de tarjeta (16 dígitos)
export const validarNumeroTarjeta = (numero) => {
  if (!numero) {
    return 'El número de tarjeta es requerido';
  }
  
  // Remover espacios y guiones
  const numeroLimpio = numero.replace(/[\s-]/g, '');
  
  if (numeroLimpio.length !== 16) {
    return 'El número de tarjeta debe tener 16 dígitos';
  }
  
  if (!/^\d+$/.test(numeroLimpio)) {
    return 'El número de tarjeta solo puede contener dígitos';
  }
  
  // Validación adicional con algoritmo de Luhn (opcional)
  if (!validarLuhn(numeroLimpio)) {
    return 'Número de tarjeta inválido';
  }
  
  return '';
};

// Algoritmo de Luhn para validar números de tarjeta
const validarLuhn = (numero) => {
  let suma = 0;
  let alternar = false;
  
  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = parseInt(numero.charAt(i));
    
    if (alternar) {
      digito *= 2;
      if (digito > 9) {
        digito -= 9;
      }
    }
    
    suma += digito;
    alternar = !alternar;
  }
  
  return suma % 10 === 0;
};

// Validación para fecha de vencimiento (MM/AA)
export const validarFechaVencimiento = (fecha) => {
  if (!fecha) {
    return 'La fecha de vencimiento es requerida';
  }
  
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(fecha)) {
    return 'Formato inválido. Use MM/AA';
  }
  
  const [mes, año] = fecha.split('/');
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear() % 100; // Últimos 2 dígitos
  const mesActual = fechaActual.getMonth() + 1;
  
  const añoTarjeta = parseInt(año);
  const mesTarjeta = parseInt(mes);
  
  // Verificar que la fecha no esté vencida
  if (añoTarjeta < añoActual || (añoTarjeta === añoActual && mesTarjeta < mesActual)) {
    return 'La tarjeta está vencida';
  }
  
  return '';
};

// Validación para CVV (3 dígitos)
export const validarCVV = (cvv) => {
  if (!cvv) {
    return 'El CVV es requerido';
  }
  
  if (cvv.length !== 3) {
    return 'El CVV debe tener 3 dígitos';
  }
  
  if (!/^\d{3}$/.test(cvv)) {
    return 'El CVV solo puede contener dígitos';
  }
  
  return '';
};

// Validación para titular de tarjeta
export const validarTitular = (titular) => {
  if (!titular || titular.trim() === '') {
    return 'El nombre del titular es requerido';
  }
  
  if (titular.length > 50) {
    return 'El nombre del titular no puede exceder 50 caracteres';
  }
  
  // Solo letras y espacios
  const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
  if (!regex.test(titular)) {
    return 'El nombre del titular solo puede contener letras y espacios';
  }
  
  return '';
};

// Función para formatear precio en COP
export const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(precio);
};

// Función para formatear número de tarjeta con espacios
export const formatearNumeroTarjeta = (numero) => {
  const numeroLimpio = numero.replace(/\s/g, '');
  const grupos = numeroLimpio.match(/.{1,4}/g);
  return grupos ? grupos.join(' ') : numeroLimpio;
};

// Función para validar filtros de productos
export const validarFiltro = (valor, productos) => {
  if (!valor || valor.trim() === '') {
    return true; // Filtro vacío es válido
  }
  
  // Verificar si existe al menos un producto que coincida
  const valorMinuscula = valor.toLowerCase();
  const existe = productos.some(producto => 
    producto.nombre.toLowerCase().includes(valorMinuscula) ||
    producto.categoria.toLowerCase().includes(valorMinuscula) ||
    producto.marca.toLowerCase().includes(valorMinuscula)
  );
  
  return existe;
}; 
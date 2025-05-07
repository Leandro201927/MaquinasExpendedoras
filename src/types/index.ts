// Tipo para los requerimientos de compra
export interface PurchaseRequirements {
  customerName: string;
  budget: number;
  address: string;
  deliveryType: 'pickup' | 'delivery';
}

// Tipo para los productos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  location?: string; // Posición en la máquina expendedora
  isActive: boolean;
}

// Tipo para items en el carrito
export interface CartItem {
  product: Product;
  quantity: number;
}

// Tipo para la tarjeta de crédito
export interface CreditCard {
  number: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export type Role = 'admin' | 'customer' | 'operator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'mobile';
  createdAt: Date;
  machineId?: string; // ID de la máquina expendedora
}

export interface Machine {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'maintenance' | 'offline';
  products: Product[];
} 
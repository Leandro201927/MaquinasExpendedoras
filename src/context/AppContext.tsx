'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, PurchaseRequirements, CartItem, CreditCard } from '@/types';

interface AppContextProps {
  purchaseRequirements: PurchaseRequirements | null;
  setPurchaseRequirements: (requirements: PurchaseRequirements) => void;
  products: Product[];
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  totalPrice: number;
  creditCard: CreditCard | null;
  setCreditCard: (card: CreditCard) => void;
  clearCart: () => void;
  clearPurchase: () => void;
  isDelivery: boolean;
}

const defaultContext: AppContextProps = {
  purchaseRequirements: null,
  setPurchaseRequirements: () => {},
  products: [],
  filteredProducts: [],
  setFilteredProducts: () => {},
  selectedProduct: null,
  setSelectedProduct: () => {},
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  totalPrice: 0,
  creditCard: null,
  setCreditCard: () => {},
  clearCart: () => {},
  clearPurchase: () => {},
  isDelivery: false,
};

const AppContext = createContext<AppContextProps>(defaultContext);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
  initialProducts: Product[];
}

export const AppProvider = ({ children, initialProducts }: AppProviderProps) => {
  const [purchaseRequirements, setPurchaseRequirementsState] = useState<PurchaseRequirements | null>(null);
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [creditCard, setCreditCard] = useState<CreditCard | null>(null);

  // Determinar si el tipo de entrega es delivery
  const isDelivery = purchaseRequirements?.deliveryType === 'delivery';

  // Calcular precio total con domicilio incluido si es delivery
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCost = isDelivery ? 10000 : 0;
  const totalPrice = subtotal + deliveryCost;

  const setPurchaseRequirements = (requirements: PurchaseRequirements) => {
    setPurchaseRequirementsState(requirements);
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Incrementar la cantidad si ya está en el carrito
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Agregar nuevo producto al carrito con cantidad 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearPurchase = () => {
    setPurchaseRequirementsState(null);
    setCartItems([]);
    setCreditCard(null);
    setSelectedProduct(null);
  };

  const value = {
    purchaseRequirements,
    setPurchaseRequirements,
    products,
    filteredProducts,
    setFilteredProducts,
    selectedProduct,
    setSelectedProduct,
    cartItems,
    addToCart,
    removeFromCart,
    totalPrice,
    creditCard,
    setCreditCard,
    clearCart,
    clearPurchase,
    isDelivery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 
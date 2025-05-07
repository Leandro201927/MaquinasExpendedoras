import { Machine, Order, Product, User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Customer User",
    email: "customer@example.com",
    role: "customer",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Operator User",
    email: "operator@example.com",
    role: "operator",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Coca-Cola",
    description: "Refresco de cola",
    price: 1.5,
    image: "/images/coca-cola.jpg",
    category: "bebidas",
    stock: 10,
    location: "A1",
    isActive: true
  },
  {
    id: "2",
    name: "Doritos",
    description: "Nachos con sabor a queso",
    price: 1.2,
    image: "/images/doritos.jpg",
    category: "snacks",
    stock: 15,
    location: "B2",
    isActive: true
  },
  {
    id: "3",
    name: "Snickers",
    description: "Barra de chocolate con caramelo",
    price: 1.0,
    image: "/images/snickers.jpg",
    category: "dulces",
    stock: 20,
    location: "C3",
    isActive: true
  },
  {
    id: "4",
    name: "Agua Mineral",
    description: "Botella de agua mineral",
    price: 1.0,
    image: "/images/agua.jpg",
    category: "bebidas",
    stock: 12,
    location: "A2",
    isActive: true
  },
  {
    id: "5",
    name: "KitKat",
    description: "Chocolate con galleta",
    price: 1.1,
    image: "/images/kitkat.jpg",
    category: "dulces",
    stock: 8,
    location: "C4",
    isActive: true
  },
  {
    id: "6",
    name: "Lay's",
    description: "Patatas fritas",
    price: 1.3,
    image: "/images/lays.jpg",
    category: "snacks",
    stock: 18,
    location: "B3",
    isActive: true
  }
];

export const mockMachines: Machine[] = [
  {
    id: "1",
    name: "Máquina Campus Norte",
    location: "Edificio A, Planta 1",
    status: "active",
    products: mockProducts.slice(0, 3)
  },
  {
    id: "2",
    name: "Máquina Campus Sur",
    location: "Edificio B, Planta 2",
    status: "active",
    products: mockProducts.slice(3, 6)
  },
  {
    id: "3",
    name: "Máquina Biblioteca",
    location: "Biblioteca Central",
    status: "maintenance",
    products: []
  }
];

export const mockOrders: Order[] = [
  {
    id: "1",
    userId: "2",
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[2], quantity: 1 }
    ],
    total: 4.0,
    status: "completed",
    paymentMethod: "card",
    createdAt: new Date("2023-05-01"),
    machineId: "1"
  },
  {
    id: "2",
    userId: "2",
    items: [
      { product: mockProducts[3], quantity: 1 },
      { product: mockProducts[4], quantity: 2 }
    ],
    total: 3.2,
    status: "pending",
    paymentMethod: "cash",
    createdAt: new Date("2023-05-05"),
    machineId: "2"
  }
]; 
import { Product } from '../types';

// Datos de productos para la máquina expendedora
const products: Product[] = [
  // Bebidas
  {
    id: 1,
    name: 'Agua Mineral 500ml',
    price: 1500,
    image: 'https://picsum.photos/seed/agua1/300/200',
    category: 'bebidas',
    stock: 20,
    description: 'Agua mineral sin gas en botella de 500ml, perfecta para refrescarse en cualquier momento del día.',
    isPopular: true
  },
  {
    id: 2,
    name: 'Coca-Cola 350ml',
    price: 2000,
    image: 'https://picsum.photos/seed/coca2/300/200',
    category: 'bebidas',
    stock: 15,
    description: 'Refresco de cola en lata de 350ml, bebida gaseosa refrescante para cualquier momento.',
    isPopular: true
  },
  {
    id: 3,
    name: 'Jugo de Naranja 300ml',
    price: 2200,
    image: 'https://picsum.photos/seed/jugo3/300/200',
    category: 'bebidas',
    stock: 12,
    description: 'Jugo natural de naranja en botella de 300ml, sin conservantes artificiales.',
    isPopular: false
  },
  {
    id: 4,
    name: 'Bebida Energética 250ml',
    price: 2500,
    image: 'https://picsum.photos/seed/energia4/300/200',
    category: 'bebidas',
    stock: 18,
    description: 'Bebida energética en lata de 250ml, para momentos de máximo rendimiento.',
    isPopular: true
  },
  {
    id: 5,
    name: 'Té Verde 500ml',
    price: 1800,
    image: 'https://picsum.photos/seed/te5/300/200',
    category: 'bebidas',
    stock: 10,
    description: 'Té verde en botella, bebida refrescante con antioxidantes naturales.',
    isPopular: false
  },
  
  // Snacks
  {
    id: 6,
    name: 'Papas Fritas 45g',
    price: 1700,
    image: 'https://picsum.photos/seed/papas6/300/200',
    category: 'snacks',
    stock: 22,
    description: 'Papas fritas crujientes en bolsa individual de 45g, perfectas para un snack rápido.',
    isPopular: true
  },
  {
    id: 7,
    name: 'Chocolate con leche 50g',
    price: 2100,
    image: 'https://picsum.photos/seed/choco7/300/200',
    category: 'snacks',
    stock: 18,
    description: 'Barra de chocolate con leche, dulce y cremoso para satisfacer antojos.',
    isPopular: true
  },
  {
    id: 8,
    name: 'Galletas de vainilla 6und',
    price: 1300,
    image: 'https://picsum.photos/seed/galletas8/300/200',
    category: 'snacks',
    stock: 25,
    description: 'Paquete de 6 galletas de vainilla, crujientes y dulces.',
    isPopular: false
  },
  {
    id: 9,
    name: 'Chicles de menta 10und',
    price: 800,
    image: 'https://picsum.photos/seed/chicles9/300/200',
    category: 'snacks',
    stock: 30,
    description: 'Chicles de menta refrescantes, paquete con 10 unidades.',
    isPopular: false
  },
  {
    id: 10,
    name: 'Barrita de cereal',
    price: 1200,
    image: 'https://picsum.photos/seed/cereal10/300/200',
    category: 'snacks',
    stock: 15,
    description: 'Barra de cereal con frutas, energía natural para cualquier momento del día.',
    isPopular: true
  },
  
  // Sándwiches y comidas rápidas
  {
    id: 11,
    name: 'Sándwich de jamón y queso',
    price: 3500,
    image: 'https://picsum.photos/seed/sandwich11/300/200',
    category: 'comidas',
    stock: 8,
    description: 'Sándwich fresco de jamón y queso, envuelto individualmente para mantener su frescura.',
    isPopular: true
  },
  {
    id: 12,
    name: 'Ensalada de frutas 250g',
    price: 2800,
    image: 'https://picsum.photos/seed/ensalada12/300/200',
    category: 'comidas',
    stock: 6,
    description: 'Ensalada de frutas frescas variadas, un snack saludable y refrescante.',
    isPopular: false
  },
  {
    id: 13,
    name: 'Yogurt con cereales',
    price: 2300,
    image: 'https://picsum.photos/seed/yogurt13/300/200',
    category: 'comidas',
    stock: 10,
    description: 'Yogurt natural con mezcla de cereales crujientes, opción saludable y deliciosa.',
    isPopular: false
  },
  {
    id: 14,
    name: 'Wrap de pollo',
    price: 3800,
    image: 'https://picsum.photos/seed/wrap14/300/200',
    category: 'comidas',
    stock: 5,
    description: 'Wrap de tortilla con pollo, verduras y aderezo, comida rápida y saludable.',
    isPopular: true
  },
  {
    id: 15,
    name: 'Croissant de mantequilla',
    price: 2500,
    image: 'https://picsum.photos/seed/croissant15/300/200',
    category: 'comidas',
    stock: 7,
    description: 'Croissant de mantequilla recién horneado, perfecto para un desayuno rápido.',
    isPopular: true
  },
  
  // Continuar con más productos para el scroll infinito
  {
    id: 16,
    name: 'Refresco de limón 350ml',
    price: 1800,
    image: 'https://picsum.photos/seed/limon16/300/200',
    category: 'bebidas',
    stock: 14,
    description: 'Refresco de limón en lata de 350ml, refrescante y cítrico.',
    isPopular: false
  },
  {
    id: 17,
    name: 'Agua con gas 500ml',
    price: 1600,
    image: 'https://picsum.photos/seed/aguagas17/300/200',
    category: 'bebidas',
    stock: 16,
    description: 'Agua mineral con gas en botella de 500ml, refrescante con burbujas.',
    isPopular: false
  },
  {
    id: 18,
    name: 'Batido de chocolate 300ml',
    price: 2800,
    image: 'https://picsum.photos/seed/batido18/300/200',
    category: 'bebidas',
    stock: 9,
    description: 'Batido de chocolate, bebida cremosa y deliciosa para los amantes del chocolate.',
    isPopular: false
  },
  {
    id: 19,
    name: 'Café americano 200ml',
    price: 1900,
    image: 'https://picsum.photos/seed/cafe19/300/200',
    category: 'bebidas',
    stock: 12,
    description: 'Café americano caliente en vaso térmico de 200ml, para mantenerte alerta.',
    isPopular: true
  },
  {
    id: 20,
    name: 'Frutos secos mixtos 50g',
    price: 2200,
    image: 'https://picsum.photos/seed/frutos20/300/200',
    category: 'snacks',
    stock: 20,
    description: 'Mezcla de frutos secos seleccionados, un snack saludable y energético.',
    isPopular: false
  },
  // Agregar más productos para completar al menos 30
  {
    id: 21,
    name: 'Nachos con queso 80g',
    price: 2600,
    image: 'https://picsum.photos/seed/nachos21/300/200',
    category: 'snacks',
    stock: 14,
    description: 'Nachos crujientes con salsa de queso, snack delicioso para compartir.',
    isPopular: false
  },
  {
    id: 22,
    name: 'Caramelos de frutas 100g',
    price: 1400,
    image: 'https://picsum.photos/seed/caramelo22/300/200',
    category: 'snacks',
    stock: 25,
    description: 'Caramelos surtidos con sabores de frutas, dulces y refrescantes.',
    isPopular: false
  },
  {
    id: 23,
    name: 'Palomitas de maíz 35g',
    price: 1100,
    image: 'https://picsum.photos/seed/palomitas23/300/200',
    category: 'snacks',
    stock: 22,
    description: 'Palomitas de maíz listas para comer, ligeras y crujientes.',
    isPopular: false
  },
  {
    id: 24,
    name: 'Jugo de manzana 300ml',
    price: 2100,
    image: 'https://picsum.photos/seed/manzana24/300/200',
    category: 'bebidas',
    stock: 11,
    description: 'Jugo natural de manzana en botella de 300ml, refrescante y dulce.',
    isPopular: false
  },
  {
    id: 25,
    name: 'Barra de granola 40g',
    price: 1500,
    image: 'https://picsum.photos/seed/granola25/300/200',
    category: 'snacks',
    stock: 17,
    description: 'Barra de granola con miel, nutritiva y energética para cualquier momento.',
    isPopular: false
  },
  {
    id: 26,
    name: 'Muffin de arándanos',
    price: 2300,
    image: 'https://picsum.photos/seed/muffin26/300/200',
    category: 'comidas',
    stock: 8,
    description: 'Muffin de arándanos recién horneado, suave y delicioso.',
    isPopular: false
  },
  {
    id: 27,
    name: 'Sopa instantánea de pollo',
    price: 2700,
    image: 'https://picsum.photos/seed/sopa27/300/200',
    category: 'comidas',
    stock: 9,
    description: 'Sopa instantánea de pollo, fácil de preparar añadiendo agua caliente.',
    isPopular: false
  },
  {
    id: 28,
    name: 'Cereal individual 30g',
    price: 1900,
    image: 'https://picsum.photos/seed/cereal28/300/200',
    category: 'comidas',
    stock: 13,
    description: 'Cereal en paquete individual, ideal para un desayuno rápido.',
    isPopular: false
  },
  {
    id: 29,
    name: 'Pastillas de menta',
    price: 900,
    image: 'https://picsum.photos/seed/menta29/300/200',
    category: 'snacks',
    stock: 28,
    description: 'Pastillas de menta refrescantes en lata pequeña.',
    isPopular: false
  },
  {
    id: 30,
    name: 'Galletas de chocolate 4und',
    price: 1800,
    image: 'https://picsum.photos/seed/galleta30/300/200',
    category: 'snacks',
    stock: 19,
    description: 'Paquete de 4 galletas con trozos de chocolate, dulces y deliciosas.',
    isPopular: false
  },
  // Continuamos con más productos
  {
    id: 31,
    name: 'Té helado de durazno 500ml',
    price: 2000,
    image: 'https://picsum.photos/seed/tehelado31/300/200',
    category: 'bebidas',
    stock: 14,
    description: 'Té helado con sabor a durazno, refrescante y dulce.',
    isPopular: false
  },
  {
    id: 32,
    name: 'Barra de proteína',
    price: 2900,
    image: 'https://picsum.photos/seed/proteina32/300/200',
    category: 'snacks',
    stock: 15,
    description: 'Barra de proteína para deportistas, alto contenido proteico y bajo en azúcares.',
    isPopular: false
  },
  {
    id: 33,
    name: 'Mini donas 3und',
    price: 2200,
    image: 'https://picsum.photos/seed/donas33/300/200',
    category: 'snacks',
    stock: 11,
    description: 'Paquete de 3 mini donas glaseadas, delicioso snack dulce.',
    isPopular: false
  },
  {
    id: 34,
    name: 'Gomitas de frutas 50g',
    price: 1600,
    image: 'https://picsum.photos/seed/gomitas34/300/200',
    category: 'snacks',
    stock: 21,
    description: 'Gomitas con forma y sabor de frutas, dulces y masticables.',
    isPopular: false
  },
  {
    id: 35,
    name: 'Empanada de queso',
    price: 2500,
    image: 'https://picsum.photos/seed/empanada35/300/200',
    category: 'comidas',
    stock: 7,
    description: 'Empanada de queso horneada, snack salado y delicioso.',
    isPopular: false
  },
  {
    id: 36,
    name: 'Leche chocolate 200ml',
    price: 1700,
    image: 'https://picsum.photos/seed/leche36/300/200',
    category: 'bebidas',
    stock: 13,
    description: 'Leche con chocolate en caja, deliciosa para cualquier momento.',
    isPopular: false
  },
  {
    id: 37,
    name: 'Chips de plátano 40g',
    price: 1500,
    image: 'https://picsum.photos/seed/platano37/300/200',
    category: 'snacks',
    stock: 16,
    description: 'Chips de plátano crujientes, alternativa saludable a las papas fritas.',
    isPopular: false
  },
  {
    id: 38,
    name: 'Refresco de manzana 350ml',
    price: 1900,
    image: 'https://picsum.photos/seed/manzana38/300/200',
    category: 'bebidas',
    stock: 14,
    description: 'Refresco con sabor a manzana verde en lata de 350ml.',
    isPopular: false
  },
  {
    id: 39,
    name: 'Nueces mixtas 30g',
    price: 2400,
    image: 'https://picsum.photos/seed/nueces39/300/200',
    category: 'snacks',
    stock: 12,
    description: 'Mezcla de nueces seleccionadas, snack nutritivo y energético.',
    isPopular: false
  },
  {
    id: 40,
    name: 'Panini de jamón y queso',
    price: 3600,
    image: 'https://picsum.photos/seed/panini40/300/200',
    category: 'comidas',
    stock: 5,
    description: 'Panini caliente de jamón y queso, satisfactorio para el almuerzo.',
    isPopular: false
  },
  {
    id: 41,
    name: 'Agua saborizada de limón 500ml',
    price: 1700,
    image: 'https://picsum.photos/seed/agua41/300/200',
    category: 'bebidas',
    stock: 15,
    description: 'Agua saborizada con limón, refrescante y baja en calorías.',
    isPopular: false
  },
  {
    id: 42,
    name: 'Mini brownies 2und',
    price: 2000,
    image: 'https://picsum.photos/seed/brownie42/300/200',
    category: 'snacks',
    stock: 9,
    description: 'Paquete de 2 mini brownies de chocolate, deliciosos para la merienda.',
    isPopular: false
  },
  {
    id: 43,
    name: 'Palitos de queso 40g',
    price: 1800,
    image: 'https://picsum.photos/seed/palitos43/300/200',
    category: 'snacks',
    stock: 17,
    description: 'Palitos de queso crujientes, snack salado para picar.',
    isPopular: false
  },
  {
    id: 44,
    name: 'Smoothie de fresa 300ml',
    price: 2600,
    image: 'https://picsum.photos/seed/smoothie44/300/200',
    category: 'bebidas',
    stock: 8,
    description: 'Smoothie de fresa natural, bebida refrescante y saludable.',
    isPopular: false
  },
  {
    id: 45,
    name: 'Alfajor de dulce de leche',
    price: 1900,
    image: 'https://picsum.photos/seed/alfajor45/300/200',
    category: 'snacks',
    stock: 11,
    description: 'Alfajor tradicional con dulce de leche, delicioso dulce tradicional.',
    isPopular: false
  }
];

export default products; 
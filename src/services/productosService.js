import productosData from '../data/productos.json';

/**
 * Servicio para manejo de productos (simulación de API)
 */

const PRODUCTOS_POR_PAGINA = 15;

class ProductosService {
  constructor() {
    this.productos = productosData;
  }

  // Obtener todos los productos
  obtenerTodos() {
    return Promise.resolve([...this.productos]);
  }

  // Obtener productos con paginación
  obtenerConPaginacion(pagina = 1, limite = PRODUCTOS_POR_PAGINA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const inicio = (pagina - 1) * limite;
        const fin = inicio + limite;
        const productosPagina = this.productos.slice(inicio, fin);
        
        resolve({
          productos: productosPagina,
          paginaActual: pagina,
          totalPaginas: Math.ceil(this.productos.length / limite),
          total: this.productos.length,
          hayMas: fin < this.productos.length
        });
      }, 500); // Simular delay de red
    });
  }

  // Obtener producto por ID
  obtenerPorId(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const producto = this.productos.find(p => p.id === parseInt(id));
        if (producto) {
          resolve(producto);
        } else {
          reject(new Error('Producto no encontrado'));
        }
      }, 200);
    });
  }

  // Filtrar productos
  filtrar(filtros, pagina = 1, limite = PRODUCTOS_POR_PAGINA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let productosFiltrados = [...this.productos];

        // Aplicar filtros
        if (filtros.categoria && filtros.categoria !== '') {
          productosFiltrados = productosFiltrados.filter(p => 
            p.categoria.toLowerCase().includes(filtros.categoria.toLowerCase())
          );
        }

        if (filtros.busqueda && filtros.busqueda !== '') {
          const termino = filtros.busqueda.toLowerCase();
          productosFiltrados = productosFiltrados.filter(p => 
            p.nombre.toLowerCase().includes(termino) ||
            p.descripcion.toLowerCase().includes(termino) ||
            p.marca.toLowerCase().includes(termino)
          );
        }

        if (filtros.precioMin) {
          productosFiltrados = productosFiltrados.filter(p => 
            p.precio >= filtros.precioMin
          );
        }

        if (filtros.precioMax) {
          productosFiltrados = productosFiltrados.filter(p => 
            p.precio <= filtros.precioMax
          );
        }

        if (filtros.marca && filtros.marca !== '') {
          productosFiltrados = productosFiltrados.filter(p => 
            p.marca.toLowerCase().includes(filtros.marca.toLowerCase())
          );
        }

        // Aplicar paginación
        const inicio = (pagina - 1) * limite;
        const fin = inicio + limite;
        const productosPagina = productosFiltrados.slice(inicio, fin);

        resolve({
          productos: productosPagina,
          paginaActual: pagina,
          totalPaginas: Math.ceil(productosFiltrados.length / limite),
          total: productosFiltrados.length,
          hayMas: fin < productosFiltrados.length,
          filtrosAplicados: filtros
        });
      }, 300);
    });
  }

  // Obtener categorías únicas
  obtenerCategorias() {
    return Promise.resolve([...new Set(this.productos.map(p => p.categoria))]);
  }

  // Obtener marcas únicas
  obtenerMarcas() {
    return Promise.resolve([...new Set(this.productos.map(p => p.marca))]);
  }

  // Buscar productos
  buscar(termino) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!termino || termino.trim() === '') {
          resolve([]);
          return;
        }

        const terminoLower = termino.toLowerCase();
        const resultados = this.productos.filter(p => 
          p.nombre.toLowerCase().includes(terminoLower) ||
          p.descripcion.toLowerCase().includes(terminoLower) ||
          p.marca.toLowerCase().includes(terminoLower) ||
          p.categoria.toLowerCase().includes(terminoLower)
        );

        resolve(resultados);
      }, 200);
    });
  }

  // Obtener productos recomendados (aleatorios)
  obtenerRecomendados(cantidad = 4) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const productosAleatorios = [...this.productos]
          .sort(() => 0.5 - Math.random())
          .slice(0, cantidad);
        resolve(productosAleatorios);
      }, 100);
    });
  }

  // Verificar disponibilidad de stock
  verificarStock(productoId, cantidad = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const producto = this.productos.find(p => p.id === parseInt(productoId));
        if (!producto) {
          reject(new Error('Producto no encontrado'));
          return;
        }

        if (producto.stock >= cantidad) {
          resolve({
            disponible: true,
            stockActual: producto.stock,
            cantidadSolicitada: cantidad
          });
        } else {
          resolve({
            disponible: false,
            stockActual: producto.stock,
            cantidadSolicitada: cantidad
          });
        }
      }, 100);
    });
  }
}

// Exportar instancia única del servicio
export default new ProductosService(); 
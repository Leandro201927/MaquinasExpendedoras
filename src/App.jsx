import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { RequerimientosProvider } from './context/RequerimientosContext';
import { CarritoProvider } from './context/CarritoContext';
import RequerimientosCompra from './pages/RequerimientosCompra';
import VistaProductos from './pages/VistaProductos';
import CarritoCompras from './pages/CarritoCompras';
import './styles/globals.css';

function App() {
  return (
    <RequerimientosProvider>
      <CarritoProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Routes>
              {/* Ruta principal - Requerimientos de compra */}
              <Route path="/" element={<RequerimientosCompra />} />
              
              {/* Vista de productos */}
              <Route path="/productos" element={<VistaProductos />} />
              
              {/* Carrito de compras */}
              <Route path="/carrito" element={<CarritoCompras />} />
              
              {/* Redirección para rutas no encontradas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
              },
            }}
          />
        </Router>
      </CarritoProvider>
    </RequerimientosProvider>
  );
}

export default App; 
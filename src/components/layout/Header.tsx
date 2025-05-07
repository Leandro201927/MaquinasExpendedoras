'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const Header = () => {
  const { user, isAdmin, isOperator, isCustomer, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="logo">
            VendingMach
          </Link>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Navegación para escritorio */}
          <nav className="md:flex hidden">
            <Link href="/machines" className="nav-link">
              Máquinas
            </Link>
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <>
                    <Link href="/admin/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                    <Link href="/admin/products" className="nav-link">
                      Productos
                    </Link>
                    <Link href="/admin/users" className="nav-link">
                      Usuarios
                    </Link>
                  </>
                )}
                
                {isOperator && (
                  <>
                    <Link href="/operator/machines" className="nav-link">
                      Mis Máquinas
                    </Link>
                    <Link href="/operator/inventory" className="nav-link">
                      Inventario
                    </Link>
                  </>
                )}

                {isCustomer && (
                  <Link href="/orders" className="nav-link">
                    Mis Pedidos
                  </Link>
                )}

                <div className="user-profile">
                  <Link href="/profile" className="nav-link">
                    <span>{user?.name}</span>
                    {user?.avatar && (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="avatar"
                      />
                    )}
                  </Link>
                  
                  <button 
                    onClick={logout}
                    className="btn btn-danger"
                  >
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">
                  Iniciar sesión
                </Link>
                <Link 
                  href="/register" 
                  className="nav-btn"
                >
                  Registrarse
                </Link>
              </>
            )}

            {isCustomer && (
              <Link href="/cart" className="cart-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="cart-count">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
          </nav>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden">
            <Link href="/machines" className="nav-link">
              Máquinas
            </Link>
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <>
                    <Link href="/admin/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                    <Link href="/admin/products" className="nav-link">
                      Productos
                    </Link>
                    <Link href="/admin/users" className="nav-link">
                      Usuarios
                    </Link>
                  </>
                )}
                
                {isOperator && (
                  <>
                    <Link href="/operator/machines" className="nav-link">
                      Mis Máquinas
                    </Link>
                    <Link href="/operator/inventory" className="nav-link">
                      Inventario
                    </Link>
                  </>
                )}

                {isCustomer && (
                  <>
                    <Link href="/orders" className="nav-link">
                      Mis Pedidos
                    </Link>
                    <Link href="/cart" className="nav-link">
                      Carrito
                      {totalItems > 0 && (
                        <span className="cart-count inline">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </>
                )}

                <Link href="/profile" className="nav-link">
                  <span>Mi Perfil</span>
                </Link>
                
                <button 
                  onClick={logout}
                  className="btn btn-danger"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">
                  Iniciar sesión
                </Link>
                <Link 
                  href="/register" 
                  className="nav-btn"
                >
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 
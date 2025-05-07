'use client';

import { mockMachines, mockProducts } from '@/data/mockData';
import Link from 'next/link';
import MachineCard from '@/components/machines/MachineCard';
import ProductCard from '@/components/products/ProductCard';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="hero">
        <div className="container text-center">
          <h1>Sistema Inteligente de Máquinas Expendedoras</h1>
          <p>
            Gestiona tus máquinas expendedoras, realiza compras y optimiza tu inventario
            con nuestra plataforma completa.
          </p>
          <div className="cta-buttons">
            <Link href="/machines" className="btn btn-primary">
              Ver Máquinas
            </Link>
            <Link href="/login" className="btn btn-outline">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Máquinas Recientes */}
      <section className="section">
        <div className="section-header">
          <h2>Máquinas Disponibles</h2>
          <Link href="/machines">
            Ver todas
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3">
          <Suspense fallback={<div>Cargando máquinas...</div>}>
            {mockMachines
              .filter(machine => machine.status === 'active')
              .slice(0, 3)
              .map((machine) => (
                <MachineCard key={machine.id} machine={machine} />
              ))}
          </Suspense>
        </div>
      </section>

      {/* Productos Populares */}
      <section className="section">
        <div className="section-header">
          <h2>Productos Populares</h2>
          <Link href="/products">
            Ver todos
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-3 lg:grid-cols-6">
          <Suspense fallback={<div>Cargando productos...</div>}>
            {mockProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Suspense>
        </div>
      </section>

      {/* Características */}
      <section className="features">
        <h2>Características del Sistema</h2>
        
        <div className="grid md:grid-cols-3">
          <div className="feature-card">
            <div className="icon">👨‍💼</div>
            <h3>Administradores</h3>
            <p>
              Gestiona usuarios, máquinas y productos desde un panel centralizado.
              Obtén informes detallados y monitorea todas las operaciones.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="icon">🔧</div>
            <h3>Operadores</h3>
            <p>
              Supervisa el estado de las máquinas asignadas, reabastece productos
              y resuelve incidencias rápidamente.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="icon">👥</div>
            <h3>Clientes</h3>
            <p>
              Encuentra máquinas cercanas, explora productos disponibles
              y realiza compras rápidamente con múltiples métodos de pago.
            </p>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="text-center features">
        <h2>¿Quieres saber más?</h2>
        <p className="mb-6">
          Contáctanos para obtener más información sobre cómo implementar nuestro sistema en tu negocio.
        </p>
        <Link href="/contact" className="btn btn-primary">
          Contactar
        </Link>
      </section>
    </div>
  );
}

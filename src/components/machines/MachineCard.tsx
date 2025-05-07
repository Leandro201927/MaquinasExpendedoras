'use client';

import { Machine } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface MachineCardProps {
  machine: Machine;
}

const MachineCard = ({ machine }: MachineCardProps) => {
  const { id, name, location, status, products } = machine;

  // Usar imagenes de placeholder mientras no tengamos las reales
  const placeholderImage = '/next.svg'; // Imagen disponible en public

  const statusClasses = {
    active: 'status-active',
    maintenance: 'status-maintenance',
    offline: 'status-offline'
  };

  const statusText = {
    active: 'Activa',
    maintenance: 'En mantenimiento',
    offline: 'Fuera de servicio'
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="image-placeholder">
          <span>Imagen no disponible</span>
        </div>
        {/* Usamos una imagen de placeholder conocida */}
        <Image 
          src={placeholderImage}
          alt={name}
          fill
          style={{ objectFit: 'contain', padding: '1rem' }}
        />
        <div className="badge-container">
          <span className={`badge ${statusClasses[status]}`}>
            {statusText[status]}
          </span>
        </div>
      </div>
      
      <div className="card-body">
        <h3>{name}</h3>
        <p className="location">
          <svg 
            className="location-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          {location}
        </p>
        
        <div className="meta">
          <span>{products.length} productos disponibles</span>
        </div>
        
        <div className="card-footer">
          <Link 
            href={`/machines/${id}`}
            className="btn btn-primary"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MachineCard; 
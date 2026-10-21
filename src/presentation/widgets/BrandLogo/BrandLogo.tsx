import React from 'react';
import './BrandLogo.css';

interface BrandLogoProps {
  variant?: 'on-dark' | 'on-light';
  size?: 'sm' | 'md' | 'lg';
  symbolOnly?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'on-dark',
  size = 'lg',
  symbolOnly = false,
  className = '',
}) => {
  return (
    <div className={`edusync-brand-logo edusync-brand-logo--${variant} edusync-brand-logo--${size} ${className}`}>
      <div className="edusync-brand-logo__symbol-wrapper">
        <svg
          className="edusync-brand-logo__svg"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 6.36364L21 0L28 8.90909L35 0L56 6.36364V53.4545L35 47.0909L28 56L21 47.0909L0 53.4545V6.36364ZM7 14V42L21 38.1818L24 42V16.5455L20 10.1818L7 14ZM32 16.5455V42L35 38.1818L49 42V14L36 10.1818L32 16.5455Z"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      </div>
      {!symbolOnly && <span className="edusync-brand-logo__wordmark">EduSync</span>}
    </div>
  );
};

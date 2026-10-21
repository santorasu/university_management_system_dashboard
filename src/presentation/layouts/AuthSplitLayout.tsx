import React from 'react';
import { BrandLogo } from '../widgets/BrandLogo/BrandLogo';
import { SchoolContextCard } from '../widgets/Card/Card';
import { Badge } from '../widgets/Badge/Badge';
import './AuthSplitLayout.css';

export interface AuthSplitLayoutProps {
  children: React.ReactNode;
  schoolName?: string;
}

export const AuthSplitLayout: React.FC<AuthSplitLayoutProps> = ({
  children,
  schoolName = 'Maple Grove School',
}) => {
  return (
    <div className="edusync-auth-page">
      {/* LEFT BRAND PANEL */}
      <aside className="edusync-brand-panel">
        {/* Decorative Brand Orbits */}
        <div className="edusync-brand-orbit edusync-brand-orbit--outer" aria-hidden="true" />
        <div className="edusync-brand-orbit edusync-brand-orbit--inner" aria-hidden="true" />

        {/* Top: Brand Logo */}
        <div className="edusync-brand-panel__top">
          <BrandLogo variant="on-dark" size="lg" />
        </div>

        {/* Middle: Brand Promise */}
        <div className="edusync-brand-panel__middle">
          <div className="edusync-brand-promise__accent" />
          <h1 className="edusync-brand-promise__headline">
            One School.<br />
            One Connected<br />
            System.
          </h1>
          <p className="edusync-brand-promise__sub">
            A secure space for the people who keep school moving.
          </p>
        </div>

        {/* Bottom: School Identity & Copyright */}
        <div className="edusync-brand-panel__bottom">
          <SchoolContextCard
            schoolName={schoolName}
            description={'School administration, connected.\nUse your school-issued admin account to access EduSync securely.'}
            portalNote="Admin web portal · Authorized access only"
          />
          <div className="edusync-brand-panel__copyright">
            © 2026 EduSync. All rights reserved.
          </div>
        </div>
      </aside>

      {/* RIGHT AUTHENTICATION WORKSPACE */}
      <main className="edusync-auth-workspace">
        {/* Header */}
        <header className="edusync-auth-workspace__header">
          <div className="edusync-school-context">
            <img src="/icons/school.svg" alt="School" width={20} height={20} />
            <span className="edusync-school-context__name">{schoolName}</span>
          </div>
          <Badge
            variant="info"
            icon={<img src="/icons/info.svg" alt="Info" width={14} height={14} />}
          >
            Admin-only access
          </Badge>
        </header>

        {/* Content Box */}
        <div className="edusync-auth-workspace__content">
          {children}
        </div>

        {/* Footer */}
        <footer className="edusync-auth-workspace__footer">
          <div className="edusync-auth-workspace__security">
            <img src="/icons/lock-keyhole.svg" alt="Security" width={16} height={16} />
            <span>Encrypted admin portal · 256-bit SSL</span>
          </div>
          <div className="edusync-auth-workspace__help">
            Need help? Contact system administrator
          </div>
        </footer>
      </main>
    </div>
  );
};

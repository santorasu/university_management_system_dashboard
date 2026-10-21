import React, { useState } from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { AUTH_SCREENS_CATALOG } from '../../core/entities/auth.types';
import './FloatingFlowInspector.css';

interface FloatingFlowInspectorProps {
  viewMode: 'auth' | 'specimen';
  setViewMode: (mode: 'auth' | 'specimen') => void;
}

export const FloatingFlowInspector: React.FC<FloatingFlowInspectorProps> = ({
  viewMode,
  setViewMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentScreen, quickNavigateToFigmaScreen } = useAuthFlow();

  const currentMeta = AUTH_SCREENS_CATALOG.find((s) => s.id === currentScreen);

  return (
    <aside className="edusync-inspector-root" aria-label="Figma Flow Inspector">
      {/* MINIMIZED FLOATING TRIGGER */}
      {!isOpen ? (
        <button
          type="button"
          className="edusync-inspector-pill"
          onClick={() => setIsOpen(true)}
          title="Open Flow & Figma Screen Navigator"
        >
          <span className="edusync-inspector-pill__dot" />
          <span className="edusync-inspector-pill__label">
            {viewMode === 'specimen'
              ? 'Specimen: Custom Widgets'
              : currentScreen === 'DASHBOARD'
              ? 'Authenticated Dashboard'
              : currentMeta?.figmaName || 'Figma Screen'}
          </span>
          <span className="edusync-inspector-pill__btn-text">⚙ Flow Navigator</span>
        </button>
      ) : (
        /* EXPANDED PANEL */
        <div className="edusync-inspector-panel">
          <div className="edusync-inspector-panel__header">
            <div>
              <div className="edusync-inspector-panel__title">Figma Flow & Architecture Navigator</div>
              <div className="edusync-inspector-panel__subtitle">
                Natural flow is active. Use UI buttons to navigate, or jump to any screen below.
              </div>
            </div>
            <button
              type="button"
              className="edusync-inspector-panel__close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigator"
            >
              ✕
            </button>
          </div>

          <div className="edusync-inspector-panel__body">
            {/* VIEW MODE TABS */}
            <div className="edusync-inspector-panel__modes">
              <button
                type="button"
                className={`edusync-inspector-panel__mode-tab ${
                  viewMode === 'auth' ? 'edusync-inspector-panel__mode-tab--active' : ''
                }`}
                onClick={() => setViewMode('auth')}
              >
                🔐 Live Auth Flow
              </button>
              <button
                type="button"
                className={`edusync-inspector-panel__mode-tab ${
                  viewMode === 'specimen' ? 'edusync-inspector-panel__mode-tab--active' : ''
                }`}
                onClick={() => setViewMode('specimen')}
              >
                🎨 Custom Widgets Specimen
              </button>
            </div>

            {/* DEMO CREDS */}
            <div className="edusync-inspector-panel__creds">
              <div><strong>Demo Admin:</strong> <code>office@maplegrove.edu</code></div>
              <div><strong>Demo Pass:</strong> <code>MapleDemo24!</code></div>
              <div><strong>Demo OTP:</strong> <code>248160</code></div>
            </div>

            {/* SCREENS LIST */}
            {viewMode === 'auth' && (
              <div className="edusync-inspector-panel__screens-list">
                <div className="edusync-inspector-panel__screens-header">
                  Direct Jump to Figma Screens (Node 4:425):
                </div>

                <div className="edusync-inspector-panel__grid">
                  {AUTH_SCREENS_CATALOG.map((screen) => {
                    const isActive = currentScreen === screen.id;
                    return (
                      <button
                        key={screen.id}
                        type="button"
                        className={`edusync-inspector-screen-btn ${
                          isActive ? 'edusync-inspector-screen-btn--active' : ''
                        }`}
                        onClick={() => {
                          quickNavigateToFigmaScreen(screen.id);
                        }}
                      >
                        <span className="edusync-inspector-screen-btn__num">{screen.stepNumber}</span>
                        <span className="edusync-inspector-screen-btn__name">{screen.figmaName}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    className={`edusync-inspector-screen-btn ${
                      currentScreen === 'DASHBOARD' ? 'edusync-inspector-screen-btn--active' : ''
                    }`}
                    onClick={() => {
                      quickNavigateToFigmaScreen('DASHBOARD');
                    }}
                  >
                    <span className="edusync-inspector-screen-btn__num">★</span>
                    <span className="edusync-inspector-screen-btn__name">Authenticated Dashboard</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="edusync-inspector-panel__footer">
            <button
              type="button"
              className="edusync-inspector-panel__reset-btn"
              onClick={() => {
                quickNavigateToFigmaScreen('01_ADMIN_LOGIN');
                setViewMode('auth');
              }}
            >
              ↺ Reset Flow to Screen 01 (Admin Login)
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

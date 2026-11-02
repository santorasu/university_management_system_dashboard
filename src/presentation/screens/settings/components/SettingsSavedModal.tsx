import React from 'react';
import { useSettingsFlow } from '../../../../application/state/settings-flow.context';

export const SettingsSavedModal: React.FC = () => {
  const { savedModalOpen, closeSavedModal } = useSettingsFlow();

  if (!savedModalOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={closeSavedModal}>
      <div className="settings-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="settings-modal-check">✓</div>

        <h3 className="settings-modal-title">Settings saved successfully</h3>
        <p className="settings-modal-desc">
          Your school profile, academic defaults, or security preferences have been saved in the current design state.
        </p>

        <button
          type="button"
          className="settings-btn-primary"
          onClick={closeSavedModal}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Back to settings
        </button>
      </div>
    </div>
  );
};

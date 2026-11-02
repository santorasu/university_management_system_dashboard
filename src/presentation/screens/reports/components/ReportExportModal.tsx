import React from 'react';
import { useReportsFlow } from '../../../../application/state/reports-flow.context';
import { Icon } from '../../../widgets/Icon/Icon';

export const ReportExportModal: React.FC = () => {
  const {
    exportModalOpen,
    closeExportModal,
    exportConfig,
    setExportFormat,
    setIncludeCharts,
    isExporting,
    exportSuccess,
    triggerExport,
  } = useReportsFlow();

  if (!exportModalOpen) return null;

  return (
    <div className="reports-modal-overlay" onClick={closeExportModal}>
      <div className="reports-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="reports-modal-header">
          <div>
            <h3 className="reports-modal-title">
              {exportSuccess ? 'Report Ready for Download' : 'Export Report'}
            </h3>
            <p className="reports-modal-sub">
              {exportSuccess
                ? 'Your requested report has been compiled and is ready.'
                : 'Configure format and options to download or print this report.'}
            </p>
          </div>
          <button type="button" className="reports-modal-close" onClick={closeExportModal}>
            ✕
          </button>
        </div>

        {exportSuccess ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px',
                background: 'var(--edusync-status-success-subtle, #F0FDF4)',
                border: '1px solid var(--edusync-status-success, #15803D)',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#15803D',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="check" size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#15803D' }}>
                  {exportConfig.reportName}.{exportConfig.format.toLowerCase()}
                </div>
                <div style={{ fontSize: '12px', color: '#667085' }}>
                  Period: {exportConfig.period} • Ready
                </div>
              </div>
            </div>

            <div className="reports-modal-actions">
              <button
                type="button"
                className="reports-btn-secondary"
                onClick={closeExportModal}
              >
                Close
              </button>
              <button
                type="button"
                className="reports-primary-btn"
                onClick={() => {
                  // Simulate file download trigger
                  const blob = new Blob(
                    [`${exportConfig.reportName} export for period: ${exportConfig.period}`],
                    { type: 'text/plain' }
                  );
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${exportConfig.reportName.replace(/\s+/g, '_')}.${exportConfig.format.toLowerCase()}`;
                  a.click();
                  URL.revokeObjectURL(url);
                  closeExportModal();
                }}
              >
                <Icon name="circle-check" size={16} />
                Download File
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="reports-modal-body">
              <div className="reports-modal-group">
                <label>Report</label>
                <input
                  type="text"
                  className="reports-filter-input"
                  value={exportConfig.reportName}
                  disabled
                  style={{ background: '#F8FAFC' }}
                />
              </div>

              <div className="reports-modal-group">
                <label>Select Format</label>
                <div className="reports-format-pills">
                  {(['PDF', 'EXCEL', 'CSV'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      className={`reports-format-pill ${
                        exportConfig.format === fmt ? 'reports-format-pill--active' : ''
                      }`}
                      onClick={() => setExportFormat(fmt)}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="reports-modal-group">
                <label className="reports-checkbox-row">
                  <input
                    type="checkbox"
                    checked={exportConfig.includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                  />
                  <span>Include visual trend charts and graphical metrics</span>
                </label>
              </div>

              {isExporting && (
                <div className="reports-progress-wrap">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#667085',
                      marginBottom: '6px',
                    }}
                  >
                    <span>Generating report package...</span>
                    <span>100%</span>
                  </div>
                  <div className="reports-progress-bar">
                    <div className="reports-progress-fill" />
                  </div>
                </div>
              )}
            </div>

            <div className="reports-modal-actions">
              <button
                type="button"
                className="reports-btn-secondary"
                onClick={closeExportModal}
                disabled={isExporting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="reports-primary-btn"
                onClick={triggerExport}
                disabled={isExporting}
              >
                <Icon name="clipboard-check" size={16} />
                {isExporting ? 'Exporting...' : 'Generate & Export'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

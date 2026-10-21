import React from 'react';
import { useNoticesFlow } from '../../../../application/state/notices-flow.context';

export const NoticePreviewModal: React.FC = () => {
  const { previewModalOpen, previewNoticeData, closePreviewModal, saveNotice, goToOverview } =
    useNoticesFlow();

  if (!previewModalOpen) return null;

  const title = previewNoticeData?.title || 'Midterm examination timetable';
  const category = previewNoticeData?.category || 'Academic';
  const content =
    previewNoticeData?.content ||
    'Please review the midterm examination timetable for all classes. Verify your assigned room and reporting time before the exam date. Contact the Academic Office if any details appear incorrect.';
  const audience =
    previewNoticeData?.audience || 'Teachers · Students · Parents of enrolled students';
  const date = previewNoticeData?.publishDate || '21 October 2026';
  const author = previewNoticeData?.author || 'Academic Office';

  const handlePublish = async () => {
    await saveNotice({
      ...previewNoticeData,
      status: 'Published',
    });
    closePreviewModal();
    goToOverview();
  };

  return (
    <div className="notices-modal-overlay" onClick={closePreviewModal}>
      <div className="notices-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="notices-modal-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--edusync-brand-primary, #3659D9)', letterSpacing: '0.08em', marginBottom: 4 }}>
              NOTICE PREVIEW
            </div>
            <h3 className="notices-modal-title">Review before publishing</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--edusync-text-secondary, #667085)' }}>
              Check the announcement details and recipient audience before publication.
            </p>
          </div>
          <button
            type="button"
            onClick={closePreviewModal}
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#98A2B3' }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Preview Card Specimen */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E4E7EC',
            borderRadius: 10,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#3659D9',
                background: '#EEF2FF',
                padding: '3px 8px',
                borderRadius: 4,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {category} NOTICE
            </span>
            <span style={{ fontSize: 12, color: '#667085' }}>{date}</span>
          </div>

          <h4 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#14213D' }}>{title}</h4>
          <p style={{ margin: 0, fontSize: 12, color: '#667085' }}>Published by {author}</p>

          <p style={{ margin: '8px 0', fontSize: 13, color: '#172033', lineHeight: 1.5 }}>
            {content}
          </p>

          <div style={{ borderTop: '1px solid #E4E7EC', paddingTop: 10, marginTop: 4 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#667085', letterSpacing: '0.05em' }}>
              RECIPIENTS
            </div>
            <div style={{ fontSize: 13, color: '#14213D', marginTop: 2, fontWeight: 500 }}>
              {audience}
            </div>
          </div>
        </div>

        <div className="notices-modal-actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={closePreviewModal}
          >
            Back to edit
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={handlePublish}
          >
            Publish now
          </button>
        </div>
      </div>
    </div>
  );
};

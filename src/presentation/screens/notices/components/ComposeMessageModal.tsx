import React, { useState } from 'react';
import { useNoticesFlow } from '../../../../application/state/notices-flow.context';

export const ComposeMessageModal: React.FC = () => {
  const { composeModalOpen, closeComposeModal, sendNewMessage, showToast } = useNoticesFlow();
  const [recipient, setRecipient] = useState('Teachers · Class 8-A');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  if (!composeModalOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      showToast('error', 'Please enter a subject and message content');
      return;
    }
    await sendNewMessage(recipient, subject, message);
    setSubject('');
    setMessage('');
  };

  const handleSaveDraft = () => {
    closeComposeModal();
    showToast('info', 'Message saved as draft in messages inbox');
  };

  return (
    <div className="notices-modal-overlay" onClick={closeComposeModal}>
      <div className="notices-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="notices-modal-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--edusync-brand-primary, #3659D9)', letterSpacing: '0.08em', marginBottom: 4 }}>
              NEW MESSAGE
            </div>
            <h3 className="notices-modal-title">Compose message</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--edusync-text-secondary, #667085)' }}>
              Write a message to a selected class, parent group, or staff audience.
            </p>
          </div>
          <button
            type="button"
            onClick={closeComposeModal}
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#98A2B3' }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="notices-form-group" style={{ marginBottom: 0 }}>
            <label className="notices-form-label">Recipients</label>
            <select
              className="notices-form-select"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            >
              <option value="Teachers · Class 8-A">Teachers · Class 8-A</option>
              <option value="Parents · Class 8-A">Parents · Class 8-A</option>
              <option value="All Teachers (Faculty)">All Teachers (Faculty)</option>
              <option value="Class 8 Students">Class 8 Students</option>
              <option value="All Parents">All Parents</option>
            </select>
          </div>

          <div className="notices-form-group" style={{ marginBottom: 0 }}>
            <label className="notices-form-label">Subject</label>
            <input
              type="text"
              className="notices-form-input"
              placeholder="Enter message subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="notices-form-group" style={{ marginBottom: 0 }}>
            <label className="notices-form-label">Message</label>
            <textarea
              className="notices-form-textarea"
              placeholder="Write a clear message with any relevant dates or requested actions…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ minHeight: 110 }}
              required
            />
            <span style={{ fontSize: 12, color: 'var(--edusync-text-muted, #98A2B3)', marginTop: 4 }}>
              Avoid including sensitive student information unless required for the recipient.
            </span>
          </div>

          <div className="notices-modal-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={closeComposeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={handleSaveDraft}
            >
              Save draft
            </button>
            <button type="submit" className="edusync-btn edusync-btn--primary">
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

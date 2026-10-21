import React, { useState } from 'react';
import { useAssignmentFlow } from '../../../application/state/assignment-flow.context';
import type { MaterialType } from '../../../core/entities/assignment.types';

export const AddMaterialModal: React.FC = () => {
  const { isAddMaterialModalOpen, setAddMaterialModalOpen, addMaterial } =
    useAssignmentFlow();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<MaterialType>('PDF');
  const [className, setClassName] = useState('Class 8-A');
  const [subject, setSubject] = useState('Mathematics');
  const [url, setUrl] = useState('');

  if (!isAddMaterialModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addMaterial({
      title,
      type,
      className,
      subject,
      size: type === 'Link' ? undefined : '1.5 MB',
      url: type === 'Link' ? url : undefined,
    });
    setTitle('');
    setUrl('');
  };

  return (
    <div className="edusync-modal-overlay" role="dialog" aria-modal="true">
      <div className="edusync-modal-container">
        <div className="edusync-modal-header">
          <h2 className="edusync-modal-title">Add Class Learning Material</h2>
          <button
            type="button"
            className="edusync-modal-close"
            onClick={() => setAddMaterialModalOpen(false)}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edusync-modal-form">
          <div className="assignments-form-field">
            <label className="assignments-form-label">Material / Resource Title *</label>
            <input
              type="text"
              className="assignments-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unit 5 — Quadratic Equations Notes"
              required
            />
          </div>

          <div className="assignments-form-row assignments-form-row--3col">
            <div className="assignments-form-field">
              <label className="assignments-form-label">Resource Type</label>
              <select
                className="assignments-select"
                value={type}
                onChange={(e) => setType(e.target.value as MaterialType)}
              >
                <option value="PDF">PDF Document</option>
                <option value="Link">Web / Video Link</option>
                <option value="DOCX">Word Document (.docx)</option>
                <option value="PPTX">PowerPoint (.pptx)</option>
              </select>
            </div>

            <div className="assignments-form-field">
              <label className="assignments-form-label">Class</label>
              <select
                className="assignments-select"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              >
                <option value="Class 8-A">Class 8-A</option>
                <option value="Class 7-B">Class 7-B</option>
                <option value="Class 9-A">Class 9-A</option>
              </select>
            </div>

            <div className="assignments-form-field">
              <label className="assignments-form-label">Subject</label>
              <select
                className="assignments-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
              </select>
            </div>
          </div>

          {type === 'Link' ? (
            <div className="assignments-form-field">
              <label className="assignments-form-label">URL / Link *</label>
              <input
                type="url"
                className="assignments-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://video.edusync.internal/lesson..."
                required
              />
            </div>
          ) : (
            <div className="assignments-form-field">
              <label className="assignments-form-label">Select File</label>
              <div className="assignments-upload-zone" style={{ padding: '16px' }}>
                <span className="assignments-upload-zone__icon">＋ Upload file</span>
                <span className="assignments-upload-zone__hint">
                  PDF, DOCX up to 20 MB
                </span>
              </div>
            </div>
          )}

          <div className="edusync-modal-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => setAddMaterialModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="edusync-btn edusync-btn--primary">
              Upload Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ReviewSubmissionModal: React.FC = () => {
  const { reviewingSubmission, setReviewingSubmission, gradeSubmission } =
    useAssignmentFlow();

  const [marks, setMarks] = useState<number>(reviewingSubmission?.marks ?? 18);
  const [feedback, setFeedback] = useState<string>(
    reviewingSubmission?.feedback ?? ''
  );

  if (!reviewingSubmission) return null;

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    await gradeSubmission(reviewingSubmission.id, marks, feedback);
  };

  return (
    <div className="edusync-modal-overlay" role="dialog" aria-modal="true">
      <div className="edusync-modal-container">
        <div className="edusync-modal-header">
          <div>
            <h2 className="edusync-modal-title">Grade Submission</h2>
            <p className="assignments-detail-label" style={{ marginTop: '4px' }}>
              {reviewingSubmission.studentName} · {reviewingSubmission.assignmentTitle}
            </p>
          </div>
          <button
            type="button"
            className="edusync-modal-close"
            onClick={() => setReviewingSubmission(null)}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSaveGrade} className="edusync-modal-form">
          <div className="assignments-submission-meta-box">
            <div className="assignments-submission-meta-row">
              <span className="assignments-detail-label">Submitted file:</span>
              <span className="assignments-file-link">
                📎 {reviewingSubmission.fileName} ({reviewingSubmission.fileSize || '1.9 MB'})
              </span>
            </div>
            <div className="assignments-submission-meta-row">
              <span className="assignments-detail-label">Submitted at:</span>
              <span>{reviewingSubmission.submittedAt}</span>
            </div>
          </div>

          <div className="assignments-form-field">
            <label className="assignments-form-label">Score (out of 20) *</label>
            <input
              type="number"
              min={0}
              max={20}
              className="assignments-input"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              required
            />
          </div>

          <div className="assignments-form-field">
            <label className="assignments-form-label">Teacher Feedback / Remarks</label>
            <textarea
              className="assignments-textarea"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Add constructive feedback for the student..."
            />
          </div>

          <div className="edusync-modal-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => setReviewingSubmission(null)}
            >
              Cancel
            </button>
            <button type="submit" className="edusync-btn edusync-btn--primary">
              Save Grade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AssignmentToastNotice: React.FC = () => {
  const { feedbackToast, clearFeedbackToast } = useAssignmentFlow();

  if (!feedbackToast) return null;

  return (
    <div
      className={`edusync-toast-banner edusync-toast-banner--${feedbackToast.type}`}
      role="alert"
    >
      <span className="edusync-toast-banner__msg">{feedbackToast.message}</span>
      <button
        type="button"
        className="edusync-toast-banner__close"
        onClick={clearFeedbackToast}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

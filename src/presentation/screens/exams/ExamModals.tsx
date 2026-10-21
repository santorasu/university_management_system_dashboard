import React, { useState } from 'react';
import { useExamFlow } from '../../../application/state/exam-flow.context';
import type { GradingBand } from '../../../core/entities/exam.types';

export const StudentReportCardModal: React.FC = () => {
  const { selectedResultForModal, setSelectedResultForModal } = useExamFlow();

  if (!selectedResultForModal) return null;

  const res = selectedResultForModal;

  return (
    <div className="edusync-modal-overlay" role="dialog" aria-modal="true">
      <div className="edusync-modal-container" style={{ maxWidth: '640px' }}>
        <div className="edusync-modal-header">
          <div>
            <h2 className="edusync-modal-title">Official Student Report Card</h2>
            <p className="exams-card__subtitle" style={{ marginTop: '4px' }}>
              Maple Grove School · {res.examName} ({res.term})
            </p>
          </div>
          <button
            type="button"
            className="edusync-modal-close"
            onClick={() => setSelectedResultForModal(null)}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Student Header Summary */}
          <div className="exams-report-card__student-info">
            <div>
              <span style={{ color: 'var(--edusync-text-secondary, #667085)', display: 'block' }}>Student Name</span>
              <strong style={{ color: 'var(--edusync-text-navy, #14213D)', fontSize: '14px' }}>{res.studentName}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--edusync-text-secondary, #667085)', display: 'block' }}>Class &amp; Roll</span>
              <strong style={{ color: 'var(--edusync-text-navy, #14213D)', fontSize: '14px' }}>{res.className} · Roll #{res.rollNo}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--edusync-text-secondary, #667085)', display: 'block' }}>Overall GPA / Rank</span>
              <span className="exams-report-card__gpa-pill">
                GPA {res.gpa} · Rank #{res.classRank || '—'}
              </span>
            </div>
          </div>

          {/* Subject Marks Table */}
          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th>SUBJECT</th>
                  <th>MARKS</th>
                  <th>GRADE</th>
                  <th>GRADE POINT</th>
                </tr>
              </thead>
              <tbody>
                {res.subjectBreakdown.map((sub) => (
                  <tr key={sub.subject}>
                    <td><strong>{sub.subject}</strong></td>
                    <td>{sub.obtainedMarks} / {sub.maxMarks}</td>
                    <td>
                      <span className="edusync-badge-custom edusync-badge-custom--valid">
                        {sub.grade}
                      </span>
                    </td>
                    <td>{sub.gradePoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Performance Summary Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '13px',
            }}
          >
            <span>
              <strong>Total Score:</strong> {res.totalMarks ?? '—'} / {res.maxTotalMarks} ({res.totalMarks ? ((res.totalMarks / res.maxTotalMarks) * 100).toFixed(1) : 0}%)
            </span>
            <span>
              <strong>Overall Grade:</strong> <strong style={{ color: 'var(--edusync-brand-primary, #3659D9)', fontSize: '15px' }}>{res.grade}</strong>
            </span>
          </div>

          {/* Remarks */}
          {res.remarks && (
            <div style={{ fontSize: '12px', color: 'var(--edusync-text-secondary, #667085)', fontStyle: 'italic' }}>
              &ldquo;{res.remarks}&rdquo;
            </div>
          )}

          <div className="edusync-modal-actions" style={{ justifyContent: 'space-between' }}>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => alert(`Downloading official PDF report card for ${res.studentName}...`)}
            >
              📥 Download PDF
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={() => setSelectedResultForModal(null)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PublishConfirmationModal: React.FC = () => {
  const {
    isPublishModalOpen,
    setIsPublishModalOpen,
    publishResults,
    resultsFilterExam,
    resultsFilterClass,
  } = useExamFlow();

  if (!isPublishModalOpen) return null;

  return (
    <div className="edusync-modal-overlay" role="dialog" aria-modal="true">
      <div className="edusync-modal-container" style={{ maxWidth: '480px' }}>
        <div className="edusync-modal-header">
          <h2 className="edusync-modal-title">Confirm Result Publication</h2>
          <button
            type="button"
            className="edusync-modal-close"
            onClick={() => setIsPublishModalOpen(false)}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#EFF8FF',
                color: 'var(--edusync-brand-primary, #3659D9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              📢
            </div>
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: 'var(--edusync-text-navy, #14213D)' }}>
                Publish results for {resultsFilterClass}?
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--edusync-text-secondary, #667085)', lineHeight: 1.4 }}>
                This action makes report cards visible to students and guardians for {resultsFilterExam}.
                Valid student records will be marked as Published.
              </p>
            </div>
          </div>

          <div
            style={{
              padding: '10px 14px',
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#92400E',
            }}
          >
            ⚠️ Note: 1 record with missing marks will remain blocked until resolved.
          </div>

          <div className="edusync-modal-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => setIsPublishModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="edusync-btn edusync-btn--primary"
              onClick={() => publishResults('ex-01', resultsFilterClass)}
            >
              Confirm &amp; Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GradingConfigModal: React.FC = () => {
  const {
    isGradingConfigModalOpen,
    setIsGradingConfigModalOpen,
    gradingBands,
    updateGradingBands,
  } = useExamFlow();

  const [localBands, setLocalBands] = useState<GradingBand[]>(gradingBands);

  if (!isGradingConfigModalOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateGradingBands(localBands);
  };

  return (
    <div className="edusync-modal-overlay" role="dialog" aria-modal="true">
      <div className="edusync-modal-container" style={{ maxWidth: '580px' }}>
        <div className="edusync-modal-header">
          <div>
            <h2 className="edusync-modal-title">Grading Scale Configuration</h2>
            <p className="exams-card__subtitle" style={{ marginTop: '4px' }}>
              Configure score bands, grade letters, and corresponding grade points.
            </p>
          </div>
          <button
            type="button"
            className="edusync-modal-close"
            onClick={() => setIsGradingConfigModalOpen(false)}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="edusync-table-container">
            <table className="edusync-table">
              <thead>
                <tr>
                  <th>GRADE</th>
                  <th>MARKS RANGE</th>
                  <th>GRADE POINT</th>
                  <th>CLASSIFICATION</th>
                </tr>
              </thead>
              <tbody>
                {localBands.map((band, idx) => (
                  <tr key={band.grade}>
                    <td>
                      <strong>{band.grade}</strong>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="exams-input"
                        style={{ height: '32px', width: '100px' }}
                        value={band.range}
                        onChange={(e) => {
                          const updated = [...localBands];
                          updated[idx] = { ...band, range: e.target.value };
                          setLocalBands(updated);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="exams-input"
                        style={{ height: '32px', width: '70px' }}
                        value={band.gradePoint}
                        onChange={(e) => {
                          const updated = [...localBands];
                          updated[idx] = { ...band, gradePoint: e.target.value };
                          setLocalBands(updated);
                        }}
                      />
                    </td>
                    <td>{band.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="edusync-modal-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => setIsGradingConfigModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="edusync-btn edusync-btn--primary">
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const EditMarkModal: React.FC = () => {
  const { editingMark, setEditingMark, updateStudentMark } = useExamFlow();

  const [marksValue, setMarksValue] = useState<number>(
    editingMark?.marks ?? 80
  );

  if (!editingMark) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStudentMark(editingMark.id, Number(marksValue));
  };

  return (
    <div className="edusync-modal-overlay" role="dialog" aria-modal="true">
      <div className="edusync-modal-container" style={{ maxWidth: '440px' }}>
        <div className="edusync-modal-header">
          <div>
            <h2 className="edusync-modal-title">Enter / Fix Student Marks</h2>
            <p className="exams-card__subtitle" style={{ marginTop: '4px' }}>
              {editingMark.studentName} · Roll #{editingMark.rollNo}
            </p>
          </div>
          <button
            type="button"
            className="edusync-modal-close"
            onClick={() => setEditingMark(null)}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="exams-form-field">
            <label className="exams-filter-label">Marks Obtained (out of 100) *</label>
            <input
              type="number"
              min={0}
              max={100}
              className="exams-input"
              value={marksValue}
              onChange={(e) => setMarksValue(Number(e.target.value))}
              required
            />
            <span style={{ fontSize: '11px', color: 'var(--edusync-text-secondary, #667085)' }}>
              Valid range: 0 to 100. Marks above 100 are flagged as out of range.
            </span>
          </div>

          <div className="edusync-modal-actions">
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              onClick={() => setEditingMark(null)}
            >
              Cancel
            </button>
            <button type="submit" className="edusync-btn edusync-btn--primary">
              Save Marks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

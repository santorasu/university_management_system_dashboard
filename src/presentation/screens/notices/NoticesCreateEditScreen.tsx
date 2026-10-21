import React, { useState, useEffect } from 'react';
import { useNoticesFlow } from '../../../application/state/notices-flow.context';
import { NoticesNavTabs } from './components/NoticesNavTabs';
import { NoticesKpiCards } from './components/NoticesKpiCards';
import type { Notice } from '../../../core/entities/notice.types';

interface NoticesCreateEditScreenProps {
  onNavigateToDashboard: () => void;
}

export const NoticesCreateEditScreen: React.FC<NoticesCreateEditScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    kpis,
    selectedNotice,
    saveNotice,
    goToOverview,
    openPreviewModal,
  } = useNoticesFlow();

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Academic' | 'Event' | 'Fee' | 'General'>('Academic');
  const [attachment, setAttachment] = useState('');
  const [audienceTeachers, setAudienceTeachers] = useState(true);
  const [audienceStudents, setAudienceStudents] = useState(true);
  const [audienceParents, setAudienceParents] = useState(true);
  const [targetClass, setTargetClass] = useState('All classes');
  const [targetSection, setTargetSection] = useState('All sections');
  const [targetGroup, setTargetGroup] = useState('None');

  const [status, setStatus] = useState<'Draft' | 'Published' | 'Scheduled'>('Draft');
  const [publishDate, setPublishDate] = useState('20 Oct 2026');
  const [publishTime, setPublishTime] = useState('09:00 AM');
  const [expiryDate, setExpiryDate] = useState('31 Oct 2026');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize if editing an existing notice
  useEffect(() => {
    if (selectedNotice) {
      setTitle(selectedNotice.title);
      setContent(selectedNotice.content);
      setCategory(selectedNotice.category);
      setStatus(selectedNotice.status);
      setPublishDate(selectedNotice.publishDate);
      if (selectedNotice.expiryDate) setExpiryDate(selectedNotice.expiryDate);
      if (selectedNotice.attachments && selectedNotice.attachments.length > 0) {
        setAttachment(selectedNotice.attachments[0]);
      }
    } else {
      setTitle('');
      setContent('');
      setCategory('Academic');
      setStatus('Draft');
      setPublishDate('20 Oct 2026');
      setPublishTime('09:00 AM');
      setExpiryDate('31 Oct 2026');
      setAttachment('');
    }
  }, [selectedNotice]);

  const assembleAudienceString = (): string => {
    const roles: string[] = [];
    if (audienceTeachers) roles.push('Teachers');
    if (audienceStudents) roles.push('Students');
    if (audienceParents) roles.push('Parents');
    let aud = roles.length > 0 ? roles.join(' · ') : 'All community';
    if (targetClass !== 'All classes') {
      aud += ` (${targetClass}${targetSection !== 'All sections' ? `-${targetSection}` : ''})`;
    }
    return aud;
  };

  const buildNoticePayload = (forcedStatus?: 'Draft' | 'Published' | 'Scheduled'): Partial<Notice> => ({
    id: selectedNotice?.id,
    title: title.trim() || 'Untitled Announcement',
    content: content.trim() || 'No message content provided.',
    category,
    status: forcedStatus || status,
    audience: assembleAudienceString(),
    publishDate,
    publishTime,
    expiryDate: expiryDate || undefined,
    author: selectedNotice?.author || 'Academic Office',
    attachments: attachment.trim() ? [attachment.trim()] : undefined,
  });

  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    const payload = buildNoticePayload('Draft');
    const ok = await saveNotice(payload);
    setIsSubmitting(false);
    if (ok) {
      goToOverview();
    }
  };

  const handlePublishNow = async () => {
    if (!title.trim()) {
      alert('Please enter a notice title before publishing.');
      return;
    }
    setIsSubmitting(true);
    const payload = buildNoticePayload('Published');
    const ok = await saveNotice(payload);
    setIsSubmitting(false);
    if (ok) {
      goToOverview();
    }
  };

  const handlePreview = () => {
    const payload = buildNoticePayload();
    openPreviewModal(payload);
  };

  return (
    <div className="notices-container">
      {/* 1. HERO / HEADER & BREADCRUMBS */}
      <div className="notices-hero">
        <div className="notices-hero__left">
          <nav className="notices-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="notices-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="notices-hero__crumb-sep">/</span>
            <button
              type="button"
              className="notices-hero__crumb--link"
              onClick={goToOverview}
            >
              Notices & Messages
            </button>
            <span className="notices-hero__crumb-sep">/</span>
            <span className="notices-hero__crumb--current">
              {selectedNotice ? 'Edit Notice' : 'Create / Edit Notice'}
            </span>
          </nav>

          <div className="notices-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Notices Overview"
              aria-label="Back to Notices"
            >
              ←
            </button>
            <div>
              <h1 className="notices-hero__title">
                {selectedNotice ? 'Edit Notice' : 'Create / Edit Notice'}
              </h1>
              <p className="notices-hero__subtitle">
                Prepare an announcement, choose its audience, and publish now or schedule it
              </p>
            </div>
          </div>
        </div>

        <div className="notices-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
          >
            Save draft
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={handlePublishNow}
            disabled={isSubmitting}
          >
            Publish now
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <NoticesNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <NoticesKpiCards stats={kpis} />

      {/* 4. MAIN FORM GRID: 65% NOTICE EDITOR + 35% PUBLICATION SETTINGS */}
      <div className="notices-form-grid">
        {/* LEFT COLUMN: NOTICE CONTENT */}
        <div className="notices-card">
          <div className="notices-card__header">
            <div>
              <h2 className="notices-card__title">Notice content</h2>
              <p className="notices-card__subtitle">
                Add clear information before choosing the audience and publication settings
              </p>
            </div>
          </div>

          <div style={{ padding: '20px 24px' }}>
            {/* Title */}
            <div className="notices-form-group">
              <label htmlFor="notice-title" className="notices-form-label">
                Notice title <span style={{ color: '#BF2E33' }}>*</span>
              </label>
              <input
                id="notice-title"
                type="text"
                className="notices-form-input"
                placeholder="e.g. Term 1 Exam Schedule"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Message Body */}
            <div className="notices-form-group">
              <label htmlFor="notice-message" className="notices-form-label">
                Message / announcement <span style={{ color: '#BF2E33' }}>*</span>
              </label>
              <textarea
                id="notice-message"
                className="notices-form-textarea"
                placeholder="Write the announcement details here. Include dates, instructions, and any action required from recipients."
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Category & Attachments */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="notices-form-group">
                <label htmlFor="notice-cat" className="notices-form-label">
                  Category
                </label>
                <select
                  id="notice-cat"
                  className="notices-form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                >
                  <option value="Academic">Academic</option>
                  <option value="Event">Event</option>
                  <option value="Fee">Fee</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="notices-form-group">
                <label htmlFor="notice-attachment" className="notices-form-label">
                  Attachments (optional)
                </label>
                <input
                  id="notice-attachment"
                  type="text"
                  className="notices-form-input"
                  placeholder="Add PDF or supporting file name"
                  value={attachment}
                  onChange={(e) => setAttachment(e.target.value)}
                />
              </div>
            </div>

            {/* Target Audience */}
            <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid #F2F4F7' }}>
              <label className="notices-form-label" style={{ display: 'block', marginBottom: 2 }}>
                Target audience
              </label>
              <p className="notices-form-label-hint" style={{ marginBottom: 12 }}>
                Choose one or more audiences; refine by class or section when relevant.
              </p>

              <div className="notices-audience-checkboxes">
                <label className="notices-checkbox-label">
                  <input
                    type="checkbox"
                    checked={audienceTeachers}
                    onChange={(e) => setAudienceTeachers(e.target.checked)}
                    style={{ accentColor: '#3659D9', width: 16, height: 16 }}
                  />
                  <span>Teacher (Role: Teacher)</span>
                </label>

                <label className="notices-checkbox-label">
                  <input
                    type="checkbox"
                    checked={audienceStudents}
                    onChange={(e) => setAudienceStudents(e.target.checked)}
                    style={{ accentColor: '#3659D9', width: 16, height: 16 }}
                  />
                  <span>Student (Role: Student)</span>
                </label>

                <label className="notices-checkbox-label">
                  <input
                    type="checkbox"
                    checked={audienceParents}
                    onChange={(e) => setAudienceParents(e.target.checked)}
                    style={{ accentColor: '#3659D9', width: 16, height: 16 }}
                  />
                  <span>Parent (Role: Parent)</span>
                </label>
              </div>
            </div>

            {/* Targeted Class, Section & Group */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }}>
              <div className="notices-form-group" style={{ margin: 0 }}>
                <label htmlFor="target-class" className="notices-form-label">
                  Class (optional)
                </label>
                <select
                  id="target-class"
                  className="notices-form-select"
                  value={targetClass}
                  onChange={(e) => setTargetClass(e.target.value)}
                >
                  <option value="All classes">All classes</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                </select>
              </div>

              <div className="notices-form-group" style={{ margin: 0 }}>
                <label htmlFor="target-section" className="notices-form-label">
                  Section (optional)
                </label>
                <select
                  id="target-section"
                  className="notices-form-select"
                  value={targetSection}
                  onChange={(e) => setTargetSection(e.target.value)}
                >
                  <option value="All sections">All sections</option>
                  <option value="Section A">Section A</option>
                  <option value="Section B">Section B</option>
                  <option value="Section C">Section C</option>
                </select>
              </div>

              <div className="notices-form-group" style={{ margin: 0 }}>
                <label htmlFor="target-group" className="notices-form-label">
                  Additional group (optional)
                </label>
                <select
                  id="target-group"
                  className="notices-form-select"
                  value={targetGroup}
                  onChange={(e) => setTargetGroup(e.target.value)}
                >
                  <option value="None">Choose group</option>
                  <option value="Exam candidates">Exam candidates</option>
                  <option value="Prefects">Prefects</option>
                  <option value="Hostel students">Hostel students</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PUBLICATION SETTINGS & SPECIMEN PREVIEW */}
        <div className="notices-side-col">
          <div className="notices-card">
            <div className="notices-card__header">
              <div>
                <h2 className="notices-card__title">Publication settings</h2>
                <p className="notices-card__subtitle">Control when the notice becomes visible</p>
              </div>
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Publication Status */}
              <div className="notices-form-group" style={{ margin: 0 }}>
                <label htmlFor="pub-status" className="notices-form-label">
                  Status
                </label>
                <select
                  id="pub-status"
                  className="notices-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>

              {/* Publish Date & Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="notices-form-group" style={{ margin: 0 }}>
                  <label htmlFor="pub-date" className="notices-form-label">
                    Publish date
                  </label>
                  <input
                    id="pub-date"
                    type="text"
                    className="notices-form-input"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                </div>

                <div className="notices-form-group" style={{ margin: 0 }}>
                  <label htmlFor="pub-time" className="notices-form-label">
                    Publish time
                  </label>
                  <input
                    id="pub-time"
                    type="text"
                    className="notices-form-input"
                    value={publishTime}
                    onChange={(e) => setPublishTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Expiry Date */}
              <div className="notices-form-group" style={{ margin: 0 }}>
                <label htmlFor="exp-date" className="notices-form-label">
                  Expiry date (optional)
                </label>
                <input
                  id="exp-date"
                  type="text"
                  className="notices-form-input"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>

              {/* Specimen Box */}
              <div className="notices-specimen-box" style={{ marginTop: 8 }}>
                <h4 className="notices-specimen-box__title">Ready to publish?</h4>
                <p className="notices-specimen-box__text">
                  Publishing sends this notice to the selected audience. Review recipients and dates before confirming.
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button
                    type="button"
                    className="edusync-btn edusync-btn--secondary"
                    style={{ flex: 1, padding: '7px 10px', fontSize: 12 }}
                    onClick={handlePreview}
                  >
                    Preview notice
                  </button>
                  <button
                    type="button"
                    className="edusync-btn edusync-btn--primary"
                    style={{ flex: 1, padding: '7px 10px', fontSize: 12 }}
                    onClick={handlePublishNow}
                    disabled={isSubmitting}
                  >
                    Publish notice
                  </button>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 16,
                  borderTop: '1px solid #F2F4F7',
                  marginTop: 4,
                }}
              >
                <button
                  type="button"
                  className="edusync-btn edusync-btn--secondary"
                  onClick={goToOverview}
                >
                  Cancel
                </button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="edusync-btn edusync-btn--secondary"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    className="edusync-btn edusync-btn--primary"
                    onClick={handlePublishNow}
                    disabled={isSubmitting}
                  >
                    Publish now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

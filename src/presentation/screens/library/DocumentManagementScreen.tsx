import React, { useState } from 'react';
import { useLibraryFlow } from '../../../application/state/library-flow.context';
import { LibraryNavTabs } from './components/LibraryNavTabs';
import { LibraryKpiCards } from './components/LibraryKpiCards';
import type { DocumentRecord, DocumentStatus } from '../../../core/entities/library.types';

interface DocumentManagementScreenProps {
  onNavigateToDashboard: () => void;
}

export const DocumentManagementScreen: React.FC<DocumentManagementScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    documents,
    documentFilters,
    setDocumentSearchQuery,
    setDocumentRecordType,
    setDocumentCategory,
    setDocumentStatus,
    resetDocumentFilters,
    openUploadProgressModal,
    goToLibraryInventory,
    showToast,
  } = useLibraryFlow();

  const [selectedOwner, setSelectedOwner] = useState('Ayesha Rahman (STU-0184)');
  const [selectedDocCategory, setSelectedDocCategory] = useState('Student identity');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getDocStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'Verified':
        return <span className="library-status-pill library-status-pill--available">Verified</span>;
      case 'Pending review':
        return <span className="library-status-pill library-status-pill--low">Pending review</span>;
      case 'Missing':
        return <span className="library-status-pill library-status-pill--out">Missing</span>;
      default:
        return <span className="library-status-pill">{status}</span>;
    }
  };

  const handleQuickUpload = (e: React.FormEvent) => {
    e.preventDefault();
    openUploadProgressModal();
  };

  return (
    <div className="library-container">
      {/* 1. HERO / HEADER & BREADCRUMBS */}
      <div className="library-hero">
        <div className="library-hero__left">
          <nav className="library-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="library-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="library-hero__crumb-sep">/</span>
            <button
              type="button"
              className="library-hero__crumb--link"
              onClick={goToLibraryInventory}
            >
              Library & Documents
            </button>
            <span className="library-hero__crumb-sep">/</span>
            <span className="library-hero__crumb--current">Document Management</span>
          </nav>

          <div className="library-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToLibraryInventory}
              title="Return to Library Inventory"
              aria-label="Back to Library Inventory"
            >
              ←
            </button>
            <div>
              <h1 className="library-hero__title">Document Management</h1>
              <p className="library-hero__subtitle">
                Manage student and teacher records, attachments, and document status
              </p>
            </div>
          </div>
        </div>

        <div className="library-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToLibraryInventory}
          >
            ← Library
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={openUploadProgressModal}
          >
            + Upload document
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <LibraryNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <LibraryKpiCards />

      {/* 4. MAIN 65% / 35% SPLIT: DOCUMENT RECORDS TABLE + UPLOAD & WORKFLOW */}
      <div className="library-split-grid">
        {/* LEFT COLUMN: DOCUMENT RECORDS TABLE */}
        <div className="library-card">
          <div className="library-card__header">
            <div>
              <h2 className="library-card__title">Document records</h2>
              <p className="library-card__subtitle">
                Search records, review attachments, and track verification status
              </p>
            </div>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ fontSize: 13, padding: '6px 14px' }}
              onClick={() => showToast('info', 'Document audit export generated')}
            >
              Audit report
            </button>
          </div>

          {/* Filter Bar */}
          <div className="library-filter-bar">
            <input
              type="text"
              className="library-filter-input"
              placeholder="Search by name, ID, filename, or category..."
              value={documentFilters.searchQuery}
              onChange={(e) => setDocumentSearchQuery(e.target.value)}
            />

            <select
              className="library-filter-select"
              value={documentFilters.recordType}
              onChange={(e) => setDocumentRecordType(e.target.value)}
            >
              <option value="Students and teachers">Students and teachers</option>
              <option value="Students only">Students only</option>
              <option value="Teachers only">Teachers only</option>
            </select>

            <select
              className="library-filter-select"
              value={documentFilters.category}
              onChange={(e) => setDocumentCategory(e.target.value)}
            >
              <option value="All categories">All categories</option>
              <option value="Student identity">Student identity</option>
              <option value="Academic record">Academic record</option>
              <option value="Guardian details">Guardian details</option>
              <option value="Employment">Employment</option>
              <option value="Qualification">Qualification</option>
            </select>

            <select
              className="library-filter-select"
              value={documentFilters.status}
              onChange={(e) => setDocumentStatus(e.target.value)}
            >
              <option value="All statuses">All statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending review">Pending review</option>
              <option value="Missing">Missing</option>
            </select>

            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '7px 12px', fontSize: 13 }}
              onClick={resetDocumentFilters}
            >
              Reset
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="library-table">
              <thead>
                <tr>
                  <th>PERSON / ID</th>
                  <th>DOCUMENT</th>
                  <th>CATEGORY</th>
                  <th>UPLOADED</th>
                  <th>STATUS</th>
                  <th>ATTACHMENT</th>
                </tr>
              </thead>
              <tbody>
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: '#667085' }}>
                      No document records found matching filter criteria.
                    </td>
                  </tr>
                ) : (
                  documents.map((doc: DocumentRecord) => (
                    <tr key={doc.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#14213D' }}>
                          {doc.personName}
                        </div>
                        <div style={{ fontSize: 11, color: '#667085' }}>
                          {doc.personId} · {doc.personType}
                        </div>
                      </td>
                      <td style={{ fontWeight: 500, color: '#14213D' }}>
                        {doc.documentTitle}
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: 12,
                            padding: '3px 8px',
                            background: '#F2F4F7',
                            borderRadius: 4,
                            color: '#344054',
                            fontWeight: 500,
                          }}
                        >
                          {doc.category}
                        </span>
                      </td>
                      <td style={{ color: '#475467', whiteSpace: 'nowrap' }}>
                        {doc.uploadDate}
                      </td>
                      <td>{getDocStatusBadge(doc.status)}</td>
                      <td>
                        {doc.status !== 'Missing' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 12, color: '#3659D9', fontWeight: 500 }}>
                              {doc.attachmentSize || 'PDF · 1.2 MB'}
                            </span>
                            <button
                              type="button"
                              className="edusync-btn edusync-btn--secondary"
                              style={{ padding: '2px 8px', fontSize: 11 }}
                              onClick={() => showToast('info', `Downloading ${doc.documentTitle}`)}
                            >
                              Download
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, color: '#BF2E33', fontWeight: 500 }}>
                            No attachment
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: UPLOAD QUICK PANEL + WORKFLOW NOTES */}
        <div className="library-side-col">
          {/* Upload Document Panel */}
          <div className="library-card">
            <div className="library-card__header">
              <div>
                <h2 className="library-card__title">Upload document</h2>
                <p className="library-card__subtitle">Attach a file to a student or teacher record</p>
              </div>
            </div>

            <form onSubmit={handleQuickUpload} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="library-form-group" style={{ margin: 0 }}>
                <label className="library-form-label">Record owner</label>
                <select
                  className="library-form-select"
                  value={selectedOwner}
                  onChange={(e) => setSelectedOwner(e.target.value)}
                >
                  <option value="Ayesha Rahman (STU-0184)">Ayesha Rahman (STU-0184)</option>
                  <option value="Tanvir Hasan (STU-0201)">Tanvir Hasan (STU-0201)</option>
                  <option value="Nusrat Jahan (STU-0142)">Nusrat Jahan (STU-0142)</option>
                  <option value="Md. Taufiqur Rahman (TCH-0031)">Md. Taufiqur Rahman (TCH-0031)</option>
                  <option value="Rafat Meraz (TCH-0024)">Rafat Meraz (TCH-0024)</option>
                </select>
              </div>

              <div className="library-form-group" style={{ margin: 0 }}>
                <label className="library-form-label">Document category</label>
                <select
                  className="library-form-select"
                  value={selectedDocCategory}
                  onChange={(e) => setSelectedDocCategory(e.target.value)}
                >
                  <option value="Student identity">Student identity</option>
                  <option value="Academic record">Academic record</option>
                  <option value="Guardian details">Guardian details</option>
                  <option value="Employment">Employment</option>
                  <option value="Qualification">Qualification</option>
                </select>
              </div>

              {/* Document Dropzone */}
              <div
                style={{
                  border: '2px dashed #D0D5DD',
                  borderRadius: 8,
                  padding: '24px 16px',
                  textAlign: 'center',
                  background: '#F8FAFC',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
                onClick={() => {
                  const input = document.getElementById('doc-file-input');
                  if (input) input.click();
                }}
              >
                <input
                  id="doc-file-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
                <span style={{ fontSize: 24 }}>📄</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#14213D' }}>
                  {selectedFile ? selectedFile.name : 'Choose file or drag attachment here'}
                </span>
                <span style={{ fontSize: 11, color: '#667085' }}>
                  Supports PDF, JPG, PNG up to 15 MB
                </span>
              </div>

              <button
                type="submit"
                className="edusync-btn edusync-btn--primary"
                style={{ width: '100%', marginTop: 4 }}
              >
                Upload
              </button>
            </form>
          </div>

          {/* Document Workflow Guidance Card */}
          <div className="library-card">
            <div className="library-card__header">
              <div>
                <h3 className="library-card__title" style={{ fontSize: 15 }}>Document workflow</h3>
                <p className="library-card__subtitle" style={{ fontSize: 12 }}>
                  Clear status and follow-up for office administration
                </p>
              </div>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span className="library-status-pill library-status-pill--available">
                  Verified
                </span>
                <span style={{ fontSize: 12, color: '#475467', lineHeight: 1.4 }}>
                  Approved by administration and accessible for compliance audits.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span className="library-status-pill library-status-pill--low">
                  Pending review
                </span>
                <span style={{ fontSize: 12, color: '#475467', lineHeight: 1.4 }}>
                  Uploaded file is awaiting administrator check and seal verification.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span className="library-status-pill library-status-pill--out">
                  Missing
                </span>
                <span style={{ fontSize: 12, color: '#475467', lineHeight: 1.4 }}>
                  No attachment recorded; automated reminder queued for recipient.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

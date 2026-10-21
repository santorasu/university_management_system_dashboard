import React, { useState } from 'react';
import { useAcademicStructureFlow } from '../../../application/state/academic-structure-flow.context';
import { AcademicNavTabs } from './components/AcademicNavTabs';

interface SectionsSubjectsAssignmentsScreenProps {
  onNavigateToDashboard: () => void;
}

export const SectionsSubjectsAssignmentsScreen: React.FC<SectionsSubjectsAssignmentsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    sections,
    subjects,
    assignments,
    goToOverview,
    openAddClassModal,
    showToast,
  } = useAcademicStructureFlow();

  const [searchAssignment, setSearchAssignment] = useState('');
  const [selectedYear, setSelectedYear] = useState('2026–27');
  const [selectedClass, setSelectedClass] = useState('Grade 8');
  const [selectedSection, setSelectedSection] = useState('All sections');

  const filteredAssignments = assignments.filter((asg) => {
    const matchesSearch =
      asg.teacherName.toLowerCase().includes(searchAssignment.toLowerCase()) ||
      asg.subject.toLowerCase().includes(searchAssignment.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="academic-structure-container">
      {/* 1. HERO & BREADCRUMBS */}
      <div className="academic-hero">
        <div>
          <div className="academic-hero__crumbs">
            <button
              type="button"
              className="academic-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="academic-hero__crumb-sep">/</span>
            <button
              type="button"
              className="academic-hero__crumb--link"
              onClick={goToOverview}
            >
              Classes & Subjects
            </button>
            <span className="academic-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Sections & subjects</span>
          </div>

          <div className="academic-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Classes Overview"
              aria-label="Back to Classes"
            >
              ←
            </button>
            <div>
              <h1 className="academic-hero__title">Sections, subjects & assignments</h1>
              <p className="academic-hero__subtitle">
                Manage section capacity, subject catalog, and teacher-to-subject relationships.
              </p>
            </div>
          </div>
        </div>

        <div className="academic-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToOverview}
          >
            ← Back to classes
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={openAddClassModal}
          >
            + Add subject
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS */}
      <AcademicNavTabs />

      {/* 3. 2-COLUMN SPLIT: SECTIONS & SUBJECT CATALOG */}
      <div className="academic-two-col-grid">
        {/* LEFT: SECTIONS */}
        <div className="academic-card">
          <div className="academic-card__header">
            <div>
              <h3 className="academic-card__title">Sections</h3>
              <p className="academic-card__subtitle">42 sections · 2026–27</p>
            </div>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '6px 12px', fontSize: 13 }}
              onClick={() => showToast('success', 'Opening section manager')}
            >
              Manage sections
            </button>
          </div>

          <div className="academic-table-wrap">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Class</th>
                  <th>Students</th>
                  <th>Capacity</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((sec) => (
                  <tr key={sec.id}>
                    <td style={{ fontWeight: 600 }}>{sec.sectionName}</td>
                    <td>{sec.className}</td>
                    <td style={{ fontWeight: 600 }}>{sec.studentsCount}</td>
                    <td>{sec.capacity}</td>
                    <td>{sec.classTeacher.split(' ')[0] || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: SUBJECT CATALOG */}
        <div className="academic-card">
          <div className="academic-card__header">
            <div>
              <h3 className="academic-card__title">Subject catalog</h3>
              <p className="academic-card__subtitle">24 subjects · 6 departments</p>
            </div>
          </div>

          <div className="academic-table-wrap">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Department</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: 600 }}>{sub.name}</td>
                    <td style={{ fontFamily: 'monospace', color: 'var(--edusync-text-secondary, #667085)' }}>
                      {sub.code}
                    </td>
                    <td>
                      <span className="academic-pill" style={{ background: '#F2F4F7', color: '#344054' }}>
                        {sub.department}
                      </span>
                    </td>
                    <td>{sub.teacherName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM CARD: TEACHER AND SUBJECT ASSIGNMENTS MATRIX */}
      <div className="academic-card">
        <div className="academic-card__header">
          <div>
            <h3 className="academic-card__title">Teacher and subject assignments</h3>
            <p className="academic-card__subtitle">
              Assignments are scoped to academic year, class, and section.
            </p>
          </div>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            style={{ padding: '7px 14px' }}
            onClick={() => showToast('success', 'Assignment modal ready')}
          >
            + Assign teacher
          </button>
        </div>

        {/* FILTER BAR */}
        <div className="academic-filter-bar" style={{ marginBottom: 16, border: 'none', padding: 0 }}>
          <div className="academic-filter-bar__left">
            <div className="academic-search-input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="academic-search-input"
                placeholder="Search teacher or subject…"
                value={searchAssignment}
                onChange={(e) => setSearchAssignment(e.target.value)}
              />
            </div>

            <select
              className="academic-select-filter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2026–27">Academic year: 2026–27</option>
              <option value="2025–26">Academic year: 2025–26</option>
            </select>

            <select
              className="academic-select-filter"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="Grade 8">Class: Grade 8</option>
              <option value="Grade 7">Class: Grade 7</option>
              <option value="Grade 6">Class: Grade 6</option>
            </select>

            <select
              className="academic-select-filter"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="All sections">Section: All sections</option>
              <option value="8A">8A</option>
              <option value="8B">8B</option>
              <option value="8C">8C</option>
              <option value="8D">8D</option>
            </select>
          </div>
        </div>

        {/* ASSIGNMENTS TABLE */}
        <div className="academic-table-wrap">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Subject</th>
                <th>Class / Section</th>
                <th>Weekly periods</th>
                <th>Assignment status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((asg) => (
                <tr key={asg.id}>
                  <td style={{ fontWeight: 600 }}>{asg.teacherName}</td>
                  <td>{asg.subject}</td>
                  <td>
                    <span className="academic-pill" style={{ background: '#EEF2FF', color: '#3659D9' }}>
                      {asg.assignedClasses}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{asg.weeklyPeriods}</td>
                  <td>
                    <span
                      className={`academic-pill ${
                        asg.status === 'Assigned'
                          ? 'academic-pill--active'
                          : 'academic-pill--warning'
                      }`}
                    >
                      {asg.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

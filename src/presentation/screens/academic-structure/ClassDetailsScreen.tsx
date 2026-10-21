import React, { useState } from 'react';
import { useAcademicStructureFlow } from '../../../application/state/academic-structure-flow.context';

interface ClassDetailsScreenProps {
  onNavigateToDashboard: () => void;
}

export const ClassDetailsScreen: React.FC<ClassDetailsScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    selectedClass,
    sections,
    subjects,
    enrolledStudents,
    goToOverview,
    goToSectionsSubjects,
    openAddClassModal,
    openEnrollModal,
  } = useAcademicStructureFlow();

  const [studentSearch, setStudentSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState('All sections');

  const className = selectedClass?.name || 'Grade 8';
  const classLevel = selectedClass?.level || 'Middle school';
  const academicYear = selectedClass?.academicYear || '2026–27';

  // Sections for this class (or fallback to A, B, C, D)
  const classSections = sections.filter((s) => s.className === className || s.classId.includes('8'));

  // Filter students
  const filteredStudents = enrolledStudents.filter((stu) => {
    const matchesSearch =
      stu.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      stu.studentId.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesSection = sectionFilter === 'All sections' || stu.section === sectionFilter;
    return matchesSearch && matchesSection;
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
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Class details</span>
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
              <h1 className="academic-hero__title">{className} · Class details</h1>
              <p className="academic-hero__subtitle">
                Review sections, enrollment, capacity, class teacher, and subject assignments.
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
            Edit class
          </button>
        </div>
      </div>

      {/* 2. CLASS HERO METRIC CARD */}
      <div className="academic-class-hero-card">
        <div className="academic-class-hero__info">
          <div className="academic-class-hero__title-row">
            <h2 className="academic-class-hero__name">{className}</h2>
            <span className="academic-pill academic-pill--active">Active</span>
          </div>
          <p className="academic-class-hero__sub">
            Academic year {academicYear} · {classLevel}
          </p>
        </div>

        <div className="academic-class-hero__metrics">
          <div className="academic-class-hero__metric-item">
            <span className="academic-class-hero__metric-label">Students</span>
            <span className="academic-class-hero__metric-val">126 / 140</span>
          </div>

          <div className="academic-class-hero__metric-item">
            <span className="academic-class-hero__metric-label">Sections</span>
            <span className="academic-class-hero__metric-val">{classSections.length || 4}</span>
          </div>

          <div className="academic-class-hero__metric-item">
            <span className="academic-class-hero__metric-label">Subjects</span>
            <span className="academic-class-hero__metric-val">9</span>
          </div>
        </div>
      </div>

      {/* 3. 2-COLUMN SPLIT: SECTIONS & CAPACITY + SUBJECT ASSIGNMENTS */}
      <div className="academic-two-col-grid">
        {/* LEFT: SECTIONS AND CAPACITY */}
        <div className="academic-card">
          <div className="academic-card__header">
            <div>
              <h3 className="academic-card__title">Sections and capacity</h3>
              <p className="academic-card__subtitle">Class sections and enrollment</p>
            </div>
          </div>

          <div className="academic-table-wrap">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Class teacher</th>
                  <th>Students</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {classSections.map((sec) => (
                  <tr key={sec.id}>
                    <td style={{ fontWeight: 600 }}>{sec.sectionName}</td>
                    <td>{sec.classTeacher}</td>
                    <td style={{ fontWeight: 600 }}>{sec.studentsCount}</td>
                    <td>{sec.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: SUBJECT-TO-TEACHER ASSIGNMENTS */}
        <div className="academic-card">
          <div className="academic-card__header">
            <div>
              <h3 className="academic-card__title">Subject-to-teacher assignments</h3>
              <p className="academic-card__subtitle">Subjects taught in {className}</p>
            </div>
            <button
              type="button"
              className="edusync-btn edusync-btn--secondary"
              style={{ padding: '6px 12px', fontSize: 13 }}
              onClick={goToSectionsSubjects}
            >
              Manage assignments
            </button>
          </div>

          <div className="academic-subject-list">
            {subjects.map((sub) => (
              <div key={sub.id} className="academic-subject-row">
                <span className="academic-subject-row__name">{sub.name}</span>
                <span className="academic-subject-row__teacher">{sub.teacherName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. STUDENT ENROLLMENT CARD */}
      <div className="academic-card">
        <div className="academic-card__header">
          <div>
            <h3 className="academic-card__title">Student enrollment</h3>
            <p className="academic-card__subtitle">126 students enrolled · 14 seats available</p>
          </div>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            style={{ padding: '7px 14px' }}
            onClick={openEnrollModal}
          >
            + Enroll students
          </button>
        </div>

        {/* SEARCH & SECTION FILTER */}
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
                placeholder="Search student name or ID…"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
              />
            </div>

            <select
              className="academic-select-filter"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
            >
              <option value="All sections">Section: All sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>
          </div>
        </div>

        {/* ENROLLMENT TABLE */}
        <div className="academic-table-wrap">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Section</th>
                <th>Enrollment date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((stu) => (
                <tr key={stu.id}>
                  <td style={{ fontWeight: 600 }}>{stu.name}</td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--edusync-text-secondary, #667085)' }}>
                    {stu.studentId}
                  </td>
                  <td>
                    <span className="academic-pill" style={{ background: '#EEF2FF', color: '#3659D9' }}>
                      Section {stu.section}
                    </span>
                  </td>
                  <td>{stu.enrollmentDate}</td>
                  <td>
                    <span className="academic-pill academic-pill--active">
                      {stu.status}
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

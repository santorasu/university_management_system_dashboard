import React from 'react';
import { useAcademicStructureFlow } from '../../../application/state/academic-structure-flow.context';
import { AcademicStructureKpis } from './components/AcademicStructureKpis';
import { AcademicNavTabs } from './components/AcademicNavTabs';

interface AcademicStructureOverviewScreenProps {
  onNavigateToDashboard: () => void;
}

export const AcademicStructureOverviewScreen: React.FC<AcademicStructureOverviewScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    classes,
    searchQuery,
    setSearchQuery,
    selectedYearFilter,
    setSelectedYearFilter,
    selectedStatusFilter,
    setSelectedStatusFilter,
    goToClassDetails,
    openAddClassModal,
  } = useAcademicStructureFlow();

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.classTeacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatusFilter === 'All statuses' || cls.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
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
            <span style={{ fontWeight: 500 }}>Classes & Subjects</span>
            <span className="academic-hero__crumb-sep">/</span>
            <span style={{ color: 'var(--edusync-text-navy, #14213D)', fontWeight: 600 }}>Overview</span>
          </div>

          <div className="academic-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={onNavigateToDashboard}
              title="Return to Dashboard Overview"
              aria-label="Back to Dashboard"
            >
              ←
            </button>
            <div>
              <h1 className="academic-hero__title">Academic structure</h1>
              <p className="academic-hero__subtitle">
                Manage academic years, classes, sections, subjects, and teacher assignments.
              </p>
            </div>
          </div>
        </div>

        <div className="academic-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={onNavigateToDashboard}
          >
            ← Dashboard
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={openAddClassModal}
          >
            + Add class
          </button>
        </div>
      </div>

      {/* 2. 4 KPI STAT CARDS */}
      <AcademicStructureKpis />

      {/* 3. SUB-NAVIGATION TABS */}
      <AcademicNavTabs />

      {/* 4. FILTER TOOLBAR */}
      <div className="academic-filter-bar">
        <div className="academic-filter-bar__left">
          <div className="academic-search-input-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="academic-search-input"
              placeholder="Search class or class teacher…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="academic-select-filter"
            value={selectedYearFilter}
            onChange={(e) => setSelectedYearFilter(e.target.value)}
          >
            <option value="2026–27">Academic year: 2026–27</option>
            <option value="2025–26">Academic year: 2025–26</option>
            <option value="2027–28">Academic year: 2027–28</option>
          </select>

          <select
            className="academic-select-filter"
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
          >
            <option value="All statuses">Status: All statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        <div className="academic-filter-bar__right">
          <button type="button" className="edusync-btn edusync-btn--secondary" style={{ padding: '7px 12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filters
          </button>
        </div>
      </div>

      {/* 5. MAIN CLASSES DIRECTORY TABLE */}
      <div className="academic-card">
        <div className="academic-card__header">
          <div>
            <h2 className="academic-card__title">Classes</h2>
            <p className="academic-card__subtitle">18 classes · Academic year 2026–27</p>
          </div>
        </div>

        <div className="academic-table-wrap">
          <table className="academic-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Class teacher</th>
                <th>Sections</th>
                <th>Students</th>
                <th>Capacity</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => (
                <tr key={cls.id}>
                  <td>
                    <button
                      type="button"
                      className="academic-table__class-link"
                      onClick={() => goToClassDetails(cls.id)}
                    >
                      {cls.name}
                    </button>
                  </td>
                  <td>{cls.classTeacher}</td>
                  <td>{cls.sectionsCount} sections</td>
                  <td style={{ fontWeight: 600 }}>{cls.studentsCount}</td>
                  <td>{cls.capacity}</td>
                  <td>
                    <span className={`academic-pill ${cls.status === 'Active' ? 'academic-pill--active' : 'academic-pill--draft'}`}>
                      {cls.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="edusync-btn edusync-btn--secondary"
                      style={{ padding: '5px 10px', fontSize: 13 }}
                      onClick={() => goToClassDetails(cls.id)}
                    >
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="edusync-table-footer" style={{ marginTop: 16 }}>
          <span className="edusync-table-footer__count">
            Showing 1–{filteredClasses.length} of 18 classes
          </span>
          <div className="edusync-table-footer__actions">
            <button type="button" className="edusync-btn edusync-btn--secondary" disabled style={{ padding: '6px 12px', fontSize: 13 }}>
              Previous
            </button>
            <button type="button" className="edusync-btn edusync-btn--primary" style={{ padding: '6px 12px', fontSize: 13 }}>
              1
            </button>
            <button type="button" className="edusync-btn edusync-btn--secondary" style={{ padding: '6px 12px', fontSize: 13 }}>
              2
            </button>
            <button type="button" className="edusync-btn edusync-btn--secondary" style={{ padding: '6px 12px', fontSize: 13 }}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

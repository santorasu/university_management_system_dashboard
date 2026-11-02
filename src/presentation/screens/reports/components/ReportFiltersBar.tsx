import React from 'react';
import { useReportsFlow } from '../../../../application/state/reports-flow.context';
import { Icon } from '../../../widgets/Icon/Icon';

export const ReportFiltersBar: React.FC = () => {
  const { filters, setFilter, applyFilters, resetFilters, openExportModal } = useReportsFlow();

  return (
    <div className="reports-filter-bar">
      <div className="reports-filter-field">
        <label htmlFor="report-date-range">Date range</label>
        <input
          id="report-date-range"
          type="text"
          className="reports-filter-input"
          value={filters.dateRange}
          onChange={(e) => setFilter('dateRange', e.target.value)}
          placeholder="01 Oct – 18 Oct 2026"
        />
      </div>

      <div className="reports-filter-field">
        <label htmlFor="report-academic-year">Academic year</label>
        <select
          id="report-academic-year"
          className="reports-filter-select"
          value={filters.academicYear}
          onChange={(e) => setFilter('academicYear', e.target.value)}
        >
          <option value="2026–27">2026–27</option>
          <option value="2025–26">2025–26</option>
          <option value="2024–25">2024–25</option>
        </select>
      </div>

      <div className="reports-filter-field">
        <label htmlFor="report-class">Class</label>
        <select
          id="report-class"
          className="reports-filter-select"
          value={filters.classGrade}
          onChange={(e) => setFilter('classGrade', e.target.value)}
        >
          <option value="All classes">All classes</option>
          <option value="Class 6">Class 6</option>
          <option value="Class 7">Class 7</option>
          <option value="Class 8">Class 8</option>
          <option value="Class 9">Class 9</option>
          <option value="Class 10">Class 10</option>
          <option value="Class 11">Class 11</option>
          <option value="Class 12">Class 12</option>
        </select>
      </div>

      <div className="reports-filter-field">
        <label htmlFor="report-section">Section</label>
        <select
          id="report-section"
          className="reports-filter-select"
          value={filters.section}
          onChange={(e) => setFilter('section', e.target.value)}
        >
          <option value="All sections">All sections</option>
          <option value="Section A">Section A</option>
          <option value="Section B">Section B</option>
          <option value="Section C">Section C</option>
        </select>
      </div>

      <div className="reports-filter-actions">
        <button type="button" className="reports-btn-apply" onClick={applyFilters}>
          Apply filters
        </button>
        <button type="button" className="reports-btn-secondary" onClick={resetFilters}>
          Reset
        </button>
        <button
          type="button"
          className="reports-btn-secondary"
          onClick={() => openExportModal(undefined, 'CSV')}
        >
          <Icon name="folder-open" size={14} />
          Export CSV
        </button>
      </div>
    </div>
  );
};

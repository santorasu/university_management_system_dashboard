import React from 'react';
import { useSettingsFlow } from '../../../../application/state/settings-flow.context';

export const SchoolProfileAcademicsScreen: React.FC = () => {
  const {
    schoolProfile,
    academicConfig,
    classDefaults,
    updateProfileField,
    updateAcademicField,
    updateClassDefaultField,
    saveChanges,
    isLoading,
  } = useSettingsFlow();

  if (isLoading || !schoolProfile || !academicConfig || !classDefaults) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#667085' }}>Loading settings...</div>;
  }

  return (
    <div>
      {/* Top Split Row: School Profile (60%) & Academic Config (40%) */}
      <div className="settings-split-row">
        {/* Left: School Profile */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">School profile</h3>
            <p className="settings-card-subtitle">
              Manage the identity and contact information used across the platform
            </p>
          </div>

          {/* Logo Upload Box */}
          <div className="settings-logo-row">
            <div className="settings-logo-box">LOGO</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--edusync-text-navy, #14213D)' }}>
                School emblem
              </div>
              <div style={{ fontSize: '12px', color: 'var(--edusync-text-secondary, #667085)' }}>
                PNG / SVG · square image (min. 400x400)
              </div>
            </div>
            <button
              type="button"
              className="settings-btn-primary"
              style={{ background: '#FFFFFF', color: '#172033', border: '1px solid #D0D5DD' }}
              onClick={() => alert('Emblem file picker opened')}
            >
              Upload logo
            </button>
          </div>

          <div className="settings-grid-2">
            <div className="settings-field">
              <label htmlFor="school-name">School name</label>
              <input
                id="school-name"
                type="text"
                className="settings-input"
                value={schoolProfile.name}
                onChange={(e) => updateProfileField('name', e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="school-email">Official email</label>
              <input
                id="school-email"
                type="email"
                className="settings-input"
                value={schoolProfile.email}
                onChange={(e) => updateProfileField('email', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-field">
              <label htmlFor="school-phone">Phone number</label>
              <input
                id="school-phone"
                type="text"
                className="settings-input"
                value={schoolProfile.phone}
                onChange={(e) => updateProfileField('phone', e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="school-address">Address</label>
              <input
                id="school-address"
                type="text"
                className="settings-input"
                value={schoolProfile.address}
                onChange={(e) => updateProfileField('address', e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="settings-btn-primary"
              onClick={() => saveChanges('School Profile')}
            >
              Save profile
            </button>
          </div>
        </div>

        {/* Right: Academic Configuration */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3 className="settings-card-title">Academic configuration</h3>
            <p className="settings-card-subtitle">Set the current year, term, and grading rules</p>
          </div>

          <div className="settings-grid-2">
            <div className="settings-field">
              <label htmlFor="academic-year">Academic year</label>
              <input
                id="academic-year"
                type="text"
                className="settings-input"
                value={academicConfig.currentYear}
                onChange={(e) => updateAcademicField('currentYear', e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="term-structure">Term structure</label>
              <select
                id="term-structure"
                className="settings-select"
                value={academicConfig.termStructure}
                onChange={(e) => updateAcademicField('termStructure', e.target.value)}
              >
                <option value="3 terms">3 terms</option>
                <option value="2 semesters">2 semesters</option>
                <option value="4 quarters">4 quarters</option>
              </select>
            </div>
          </div>

          <div className="settings-grid-2">
            <div className="settings-field">
              <label htmlFor="academic-start">Start date</label>
              <input
                id="academic-start"
                type="text"
                className="settings-input"
                value={academicConfig.startDate}
                onChange={(e) => updateAcademicField('startDate', e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="academic-end">End date</label>
              <input
                id="academic-end"
                type="text"
                className="settings-input"
                value={academicConfig.endDate}
                onChange={(e) => updateAcademicField('endDate', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-grid-3">
            <div className="settings-field">
              <label htmlFor="grading-scale">Grading scale</label>
              <input
                id="grading-scale"
                type="text"
                className="settings-input"
                value={academicConfig.gradingScale}
                onChange={(e) => updateAcademicField('gradingScale', e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="passing-threshold">Passing grade</label>
              <input
                id="passing-threshold"
                type="text"
                className="settings-input"
                value={academicConfig.passingThreshold}
                onChange={(e) => updateAcademicField('passingThreshold', e.target.value)}
              />
            </div>

            <div className="settings-field">
              <label htmlFor="max-marks">Maximum marks</label>
              <input
                id="max-marks"
                type="number"
                className="settings-input"
                value={academicConfig.maximumMarks}
                onChange={(e) => updateAcademicField('maximumMarks', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="settings-notice">
            Changes apply to future academic records unless otherwise specified.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="settings-btn-primary"
              onClick={() => saveChanges('Academic Configuration')}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Card: Class and Grading Defaults */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">Class & grading configuration</h3>
          <p className="settings-card-subtitle">Default values for class structure and assessment</p>
        </div>

        <div className="settings-grid-2">
          <div className="settings-field">
            <label htmlFor="class-structure">Class structure</label>
            <input
              id="class-structure"
              type="text"
              className="settings-input"
              value={classDefaults.classStructure}
              onChange={(e) => updateClassDefaultField('classStructure', e.target.value)}
            />
          </div>

          <div className="settings-field">
            <label htmlFor="section-labels">Section labels</label>
            <input
              id="section-labels"
              type="text"
              className="settings-input"
              value={classDefaults.sectionLabels}
              onChange={(e) => updateClassDefaultField('sectionLabels', e.target.value)}
            />
          </div>
        </div>

        <div className="settings-grid-2">
          <div className="settings-field">
            <label htmlFor="grading-method">Grading method</label>
            <input
              id="grading-method"
              type="text"
              className="settings-input"
              value={classDefaults.gradingMethod}
              onChange={(e) => updateClassDefaultField('gradingMethod', e.target.value)}
            />
          </div>

          <div className="settings-field">
            <label htmlFor="grade-point-scheme">Grade point scheme</label>
            <input
              id="grade-point-scheme"
              type="text"
              className="settings-input"
              value={classDefaults.gradePointScheme}
              onChange={(e) => updateClassDefaultField('gradePointScheme', e.target.value)}
            />
          </div>
        </div>

        <div className="settings-notice">
          Class, section, and subject records are managed in the existing Classes & Subjects module. These settings define school-wide defaults only.
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="settings-btn-primary"
            onClick={() => saveChanges('Class Defaults')}
          >
            Save defaults
          </button>
        </div>
      </div>
    </div>
  );
};

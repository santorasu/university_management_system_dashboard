import { useAcademicStructureFlow } from '../../../../application/state/academic-structure-flow.context';

export const AcademicNavTabs: React.FC = () => {
  const { subScreen, goToOverview, goToSectionsSubjects, goToAcademicYears } = useAcademicStructureFlow();

  const isClassesActive = subScreen === 'ACADEMIC_OVERVIEW' || subScreen === 'CLASS_DETAILS';
  const isSectionsSubjectsActive = subScreen === 'SECTIONS_SUBJECTS';
  const isAcademicYearsActive = subScreen === 'ACADEMIC_YEARS';

  return (
    <nav className="academic-nav-tabs" aria-label="Academic structure navigation tabs">
      <button
        type="button"
        className={`academic-nav-tab ${isClassesActive ? 'academic-nav-tab--active' : ''}`}
        onClick={goToOverview}
      >
        Classes
      </button>

      <button
        type="button"
        className={`academic-nav-tab ${isSectionsSubjectsActive ? 'academic-nav-tab--active' : ''}`}
        onClick={goToSectionsSubjects}
      >
        Sections & Subjects
      </button>

      <button
        type="button"
        className={`academic-nav-tab ${isAcademicYearsActive ? 'academic-nav-tab--active' : ''}`}
        onClick={goToAcademicYears}
      >
        Academic Years
      </button>
    </nav>
  );
};

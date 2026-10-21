import { useAcademicStructureFlow } from '../../../../application/state/academic-structure-flow.context';

export const AcademicStructureKpis: React.FC = () => {
  const { stats } = useAcademicStructureFlow();

  const yearsCount = stats?.academicYearsCount ?? 2;
  const activeYears = stats?.activeAcademicYearsCount ?? 1;
  const classesCount = stats?.classesCount ?? 18;
  const gradeSpan = stats?.classesGradeSpan ?? 'Grades 1–12';
  const sectionsCount = stats?.sectionsCount ?? 42;
  const reviewCount = stats?.sectionsAwaitingReview ?? 3;
  const subjectsCount = stats?.subjectsCount ?? 24;
  const deptCount = stats?.departmentsCount ?? 6;

  return (
    <div className="academic-kpis-grid">
      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Academic years</span>
        <span className="academic-kpi-card__value">{yearsCount}</span>
        <span className="academic-kpi-card__subtext">
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#15803D' }}></span>
          {activeYears} active
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Classes</span>
        <span className="academic-kpi-card__value">{classesCount}</span>
        <span className="academic-kpi-card__subtext academic-kpi-card__subtext--neutral">
          {gradeSpan}
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Sections</span>
        <span className="academic-kpi-card__value">{sectionsCount}</span>
        <span className="academic-kpi-card__subtext academic-kpi-card__subtext--review">
          {reviewCount} awaiting review
        </span>
      </div>

      <div className="academic-kpi-card">
        <span className="academic-kpi-card__label">Subjects</span>
        <span className="academic-kpi-card__value">{subjectsCount}</span>
        <span className="academic-kpi-card__subtext academic-kpi-card__subtext--neutral">
          {deptCount} departments
        </span>
      </div>
    </div>
  );
};

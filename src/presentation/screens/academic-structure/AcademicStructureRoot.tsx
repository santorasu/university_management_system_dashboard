import React from 'react';
import {
  AcademicStructureFlowProvider,
  useAcademicStructureFlow,
} from '../../../application/state/academic-structure-flow.context';
import { AcademicStructureOverviewScreen } from './AcademicStructureOverviewScreen';
import { ClassDetailsScreen } from './ClassDetailsScreen';
import { SectionsSubjectsAssignmentsScreen } from './SectionsSubjectsAssignmentsScreen';
import { AcademicYearsFormsScreen } from './AcademicYearsFormsScreen';
import { AcademicModals } from './AcademicModals';
import './AcademicStructure.css';

interface AcademicStructureScreenProps {
  onNavigateToDashboard: () => void;
}

const AcademicStructureContent: React.FC<AcademicStructureScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const { subScreen, isLoading } = useAcademicStructureFlow();

  if (isLoading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--edusync-text-secondary, #667085)' }}>
        Loading academic structure...
      </div>
    );
  }

  const renderCurrentScreen = () => {
    switch (subScreen) {
      case 'ACADEMIC_OVERVIEW':
        return <AcademicStructureOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'CLASS_DETAILS':
        return <ClassDetailsScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'SECTIONS_SUBJECTS':
        return <SectionsSubjectsAssignmentsScreen onNavigateToDashboard={onNavigateToDashboard} />;
      case 'ACADEMIC_YEARS':
        return <AcademicYearsFormsScreen onNavigateToDashboard={onNavigateToDashboard} />;
      default:
        return <AcademicStructureOverviewScreen onNavigateToDashboard={onNavigateToDashboard} />;
    }
  };

  return (
    <>
      {renderCurrentScreen()}
      <AcademicModals />
    </>
  );
};

export const AcademicStructureScreen: React.FC<AcademicStructureScreenProps> = (props) => {
  return (
    <AcademicStructureFlowProvider>
      <AcademicStructureContent {...props} />
    </AcademicStructureFlowProvider>
  );
};

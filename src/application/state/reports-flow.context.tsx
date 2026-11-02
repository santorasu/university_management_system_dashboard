import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  ReportSubScreen,
  ReportFilterOptions,
  ReportExportConfig,
} from '../../core/entities/reports.types';
import type {
  OverviewReportData,
  AcademicPerformanceReportData,
  FeesPaymentsReportData,
  AttendanceLibraryReportData,
} from '../../core/repositories/reports.repository.interface';
import { mockReportsRepository } from '../../infrastructure/repositories/mock-reports.repository';

interface ReportsFlowContextValue {
  currentSubScreen: ReportSubScreen;
  setSubScreen: (screen: ReportSubScreen) => void;
  filters: ReportFilterOptions;
  setFilter: (field: keyof ReportFilterOptions, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;

  overviewData: OverviewReportData | null;
  academicData: AcademicPerformanceReportData | null;
  feesData: FeesPaymentsReportData | null;
  attendanceData: AttendanceLibraryReportData | null;
  isLoading: boolean;

  exportModalOpen: boolean;
  exportConfig: ReportExportConfig;
  isExporting: boolean;
  exportSuccess: boolean;
  openExportModal: (reportName?: string, defaultFormat?: 'PDF' | 'EXCEL' | 'CSV') => void;
  closeExportModal: () => void;
  setExportFormat: (format: 'PDF' | 'EXCEL' | 'CSV') => void;
  setIncludeCharts: (val: boolean) => void;
  triggerExport: () => Promise<void>;

  toastMessage: string | null;
}

const defaultFilters: ReportFilterOptions = {
  dateRange: '01 Oct – 18 Oct 2026',
  academicYear: '2026–27',
  classGrade: 'All classes',
  section: 'All sections',
};

const ReportsFlowContext = createContext<ReportsFlowContextValue | undefined>(undefined);

export const ReportsFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSubScreen, setCurrentSubScreen] = useState<ReportSubScreen>('OVERVIEW');
  const [filters, setFilters] = useState<ReportFilterOptions>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<ReportFilterOptions>(defaultFilters);

  const [overviewData, setOverviewData] = useState<OverviewReportData | null>(null);
  const [academicData, setAcademicData] = useState<AcademicPerformanceReportData | null>(null);
  const [feesData, setFeesData] = useState<FeesPaymentsReportData | null>(null);
  const [attendanceData, setAttendanceData] = useState<AttendanceLibraryReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Export Modal state
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportConfig, setExportConfig] = useState<ReportExportConfig>({
    reportName: 'School Performance Overview',
    format: 'PDF',
    period: '01 Oct – 18 Oct 2026',
    includeCharts: true,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [ov, ac, fe, at] = await Promise.all([
        mockReportsRepository.getOverviewData(appliedFilters),
        mockReportsRepository.getAcademicPerformanceData(appliedFilters),
        mockReportsRepository.getFeesPaymentsData(appliedFilters),
        mockReportsRepository.getAttendanceLibraryData(appliedFilters),
      ]);
      setOverviewData(ov);
      setAcademicData(ac);
      setFeesData(fe);
      setAttendanceData(at);
    } catch {
      showToast('Failed to load reports data.');
    } finally {
      setIsLoading(false);
    }
  }, [appliedFilters, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const setFilter = (field: keyof ReportFilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    showToast(`Filters applied for ${filters.classGrade} (${filters.academicYear})`);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    showToast('Filters reset to default');
  };

  const openExportModal = (reportName?: string, defaultFormat?: 'PDF' | 'EXCEL' | 'CSV') => {
    let name = reportName;
    if (!name) {
      switch (currentSubScreen) {
        case 'OVERVIEW':
          name = 'School Performance Overview';
          break;
        case 'ACADEMIC_PERFORMANCE':
          name = 'Academic Performance Report';
          break;
        case 'FEES_PAYMENTS':
          name = 'Fees and Payment Summary';
          break;
        case 'ATTENDANCE_LIBRARY':
          name = 'Attendance & Library Activity';
          break;
      }
    }
    setExportConfig({
      reportName: name,
      format: defaultFormat || 'PDF',
      period: filters.dateRange,
      includeCharts: true,
    });
    setExportSuccess(false);
    setIsExporting(false);
    setExportModalOpen(true);
  };

  const closeExportModal = () => {
    setExportModalOpen(false);
    setIsExporting(false);
    setExportSuccess(false);
  };

  const setExportFormat = (format: 'PDF' | 'EXCEL' | 'CSV') => {
    setExportConfig((prev) => ({ ...prev, format }));
  };

  const setIncludeCharts = (includeCharts: boolean) => {
    setExportConfig((prev) => ({ ...prev, includeCharts }));
  };

  const triggerExport = async () => {
    setIsExporting(true);
    await mockReportsRepository.exportReport(exportConfig);
    setIsExporting(false);
    setExportSuccess(true);
    showToast(`${exportConfig.reportName} (${exportConfig.format}) exported successfully!`);
  };

  return (
    <ReportsFlowContext.Provider
      value={{
        currentSubScreen,
        setSubScreen: setCurrentSubScreen,
        filters,
        setFilter,
        applyFilters,
        resetFilters,
        overviewData,
        academicData,
        feesData,
        attendanceData,
        isLoading,
        exportModalOpen,
        exportConfig,
        isExporting,
        exportSuccess,
        openExportModal,
        closeExportModal,
        setExportFormat,
        setIncludeCharts,
        triggerExport,
        toastMessage,
      }}
    >
      {children}
    </ReportsFlowContext.Provider>
  );
};

export const useReportsFlow = (): ReportsFlowContextValue => {
  const context = useContext(ReportsFlowContext);
  if (!context) {
    throw new Error('useReportsFlow must be used within a ReportsFlowProvider');
  }
  return context;
};

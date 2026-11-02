import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  SettingsTab,
  SchoolProfile,
  AcademicConfiguration,
  ClassDefaults,
  AttendanceSettings,
  NotificationPreferences,
  SecuritySettings,
} from '../../core/entities/settings.types';
import { mockSettingsRepository } from '../../infrastructure/repositories/mock-settings.repository';

interface SettingsFlowContextValue {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;

  schoolProfile: SchoolProfile | null;
  academicConfig: AcademicConfiguration | null;
  classDefaults: ClassDefaults | null;
  attendanceSettings: AttendanceSettings | null;
  notificationPreferences: NotificationPreferences | null;
  securitySettings: SecuritySettings | null;
  isLoading: boolean;
  savedModalOpen: boolean;
  toastMessage: string | null;

  updateProfileField: (field: keyof SchoolProfile, val: string) => void;
  updateAcademicField: (field: keyof AcademicConfiguration, val: string | number) => void;
  updateClassDefaultField: (field: keyof ClassDefaults, val: string) => void;
  toggleAttendanceSetting: (field: keyof AttendanceSettings) => void;
  updateAttendanceField: (field: keyof AttendanceSettings, val: string) => void;
  toggleNotificationPreference: (field: keyof NotificationPreferences) => void;
  toggleSecuritySetting: (field: keyof SecuritySettings) => void;
  updateSecurityField: (field: keyof SecuritySettings, val: string) => void;

  saveChanges: (sectionTitle: string) => Promise<void>;
  closeSavedModal: () => void;
}

const SettingsFlowContext = createContext<SettingsFlowContextValue | undefined>(undefined);

export const SettingsFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('PROFILE_ACADEMICS');
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);
  const [academicConfig, setAcademicConfig] = useState<AcademicConfiguration | null>(null);
  const [classDefaults, setClassDefaults] = useState<ClassDefaults | null>(null);
  const [attendanceSettings, setAttendanceSettings] = useState<AttendanceSettings | null>(null);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences | null>(null);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedModalOpen, setSavedModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const [sp, ac, cd, as, np, ss] = await Promise.all([
        mockSettingsRepository.getSchoolProfile(),
        mockSettingsRepository.getAcademicConfig(),
        mockSettingsRepository.getClassDefaults(),
        mockSettingsRepository.getAttendanceSettings(),
        mockSettingsRepository.getNotificationPreferences(),
        mockSettingsRepository.getSecuritySettings(),
      ]);
      setSchoolProfile(sp);
      setAcademicConfig(ac);
      setClassDefaults(cd);
      setAttendanceSettings(as);
      setNotificationPreferences(np);
      setSecuritySettings(ss);
    } catch {
      showToast('Failed to load school settings.');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateProfileField = (field: keyof SchoolProfile, val: string) => {
    setSchoolProfile((prev) => (prev ? { ...prev, [field]: val } : null));
  };

  const updateAcademicField = (field: keyof AcademicConfiguration, val: string | number) => {
    setAcademicConfig((prev) => (prev ? { ...prev, [field]: val } : null));
  };

  const updateClassDefaultField = (field: keyof ClassDefaults, val: string) => {
    setClassDefaults((prev) => (prev ? { ...prev, [field]: val } : null));
  };

  const toggleAttendanceSetting = (field: keyof AttendanceSettings) => {
    setAttendanceSettings((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: !prev[field] };
    });
  };

  const updateAttendanceField = (field: keyof AttendanceSettings, val: string) => {
    setAttendanceSettings((prev) => (prev ? { ...prev, [field]: val } : null));
  };

  const toggleNotificationPreference = (field: keyof NotificationPreferences) => {
    setNotificationPreferences((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: !prev[field] };
    });
  };

  const toggleSecuritySetting = (field: keyof SecuritySettings) => {
    setSecuritySettings((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: !prev[field] };
    });
  };

  const updateSecurityField = (field: keyof SecuritySettings, val: string) => {
    setSecuritySettings((prev) => (prev ? { ...prev, [field]: val } : null));
  };

  const saveChanges = async (sectionTitle: string) => {
    if (schoolProfile) await mockSettingsRepository.updateSchoolProfile(schoolProfile);
    if (academicConfig) await mockSettingsRepository.updateAcademicConfig(academicConfig);
    if (classDefaults) await mockSettingsRepository.updateClassDefaults(classDefaults);
    if (attendanceSettings) await mockSettingsRepository.updateAttendanceSettings(attendanceSettings);
    if (notificationPreferences) await mockSettingsRepository.updateNotificationPreferences(notificationPreferences);
    if (securitySettings) await mockSettingsRepository.updateSecuritySettings(securitySettings);

    setSavedModalOpen(true);
    showToast(`${sectionTitle} updated successfully!`);
  };

  const closeSavedModal = () => {
    setSavedModalOpen(false);
  };

  return (
    <SettingsFlowContext.Provider
      value={{
        activeTab,
        setActiveTab,
        schoolProfile,
        academicConfig,
        classDefaults,
        attendanceSettings,
        notificationPreferences,
        securitySettings,
        isLoading,
        savedModalOpen,
        toastMessage,
        updateProfileField,
        updateAcademicField,
        updateClassDefaultField,
        toggleAttendanceSetting,
        updateAttendanceField,
        toggleNotificationPreference,
        toggleSecuritySetting,
        updateSecurityField,
        saveChanges,
        closeSavedModal,
      }}
    >
      {children}
    </SettingsFlowContext.Provider>
  );
};

export const useSettingsFlow = (): SettingsFlowContextValue => {
  const context = useContext(SettingsFlowContext);
  if (!context) {
    throw new Error('useSettingsFlow must be used within a SettingsFlowProvider');
  }
  return context;
};

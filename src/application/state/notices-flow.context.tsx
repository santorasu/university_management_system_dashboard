import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  Notice,
  NoticeKpiStats,
  NoticeFilterOptions,
  Conversation,
  NotificationRecord,
  NotificationSummary,
  NotificationFilterOptions,
  NoticesSubScreen,
} from '../../core/entities/notice.types';
import { MockNoticeRepository } from '../../infrastructure/repositories/mock-notice.repository';

interface NoticesFlowContextValue {
  subScreen: NoticesSubScreen;
  notices: Notice[];
  kpis: NoticeKpiStats | null;
  selectedNotice: Notice | null;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  notifications: NotificationRecord[];
  notificationSummary: NotificationSummary | null;
  isLoading: boolean;
  toast: { type: 'success' | 'error' | 'info'; message: string } | null;

  // Filters
  noticeFilters: NoticeFilterOptions;
  setNoticeSearchQuery: (q: string) => void;
  setNoticeStatus: (s: string) => void;
  setNoticeAudience: (a: string) => void;

  messageRoleFilter: string;
  setMessageRoleFilter: (role: string) => void;
  messageSearchQuery: string;
  setMessageSearchQuery: (q: string) => void;

  notificationFilters: NotificationFilterOptions;
  setNotificationSearchQuery: (q: string) => void;
  setNotificationChannel: (ch: string) => void;
  setNotificationReadStatus: (st: string) => void;
  setNotificationAudience: (aud: string) => void;
  resetNotificationFilters: () => void;

  // Navigation
  goToOverview: () => void;
  goToCreateNotice: () => void;
  goToEditNotice: (notice: Notice) => void;
  goToMessagesInbox: () => void;
  goToNotificationHistory: () => void;
  selectConversation: (conv: Conversation) => void;

  // Modals
  previewModalOpen: boolean;
  previewNoticeData: Partial<Notice> | null;
  openPreviewModal: (data: Partial<Notice>) => void;
  closePreviewModal: () => void;

  composeModalOpen: boolean;
  openComposeModal: () => void;
  closeComposeModal: () => void;

  messageSentModalOpen: boolean;
  openMessageSentModal: () => void;
  closeMessageSentModal: () => void;

  exportModalOpen: boolean;
  openExportModal: () => void;
  closeExportModal: () => void;

  // Operations
  saveNotice: (data: Partial<Notice>) => Promise<boolean>;
  sendReply: (text: string) => Promise<boolean>;
  markActiveConversationRead: () => Promise<boolean>;
  sendNewMessage: (recipient: string, subject: string, message: string) => Promise<boolean>;
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
  clearToast: () => void;
}

const NoticesFlowContext = createContext<NoticesFlowContextValue | undefined>(undefined);

const repository = new MockNoticeRepository();

export const NoticesFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subScreen, setSubScreen] = useState<NoticesSubScreen>('NOTICES_OVERVIEW');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [kpis, setKpis] = useState<NoticeKpiStats | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [notificationSummary, setNotificationSummary] = useState<NotificationSummary | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Modals state
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewNoticeData, setPreviewNoticeData] = useState<Partial<Notice> | null>(null);
  const [composeModalOpen, setComposeModalOpen] = useState(false);
  const [messageSentModalOpen, setMessageSentModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Filter states
  const [noticeFilters, setNoticeFilters] = useState<NoticeFilterOptions>({
    searchQuery: '',
    status: 'All statuses',
    audience: 'All audiences',
  });

  const [messageRoleFilter, setMessageRoleFilter] = useState('All');
  const [messageSearchQuery, setMessageSearchQuery] = useState('');

  const [notificationFilters, setNotificationFilters] = useState<NotificationFilterOptions>({
    searchQuery: '',
    channel: 'All channels',
    readStatus: 'All statuses',
    audience: 'All roles',
  });

  const showToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedNotices, fetchedKpis, fetchedConvs, fetchedNotifs, fetchedSum] =
        await Promise.all([
          repository.getNotices(noticeFilters),
          repository.getNoticeKpiStats(),
          repository.getConversations(messageRoleFilter, messageSearchQuery),
          repository.getNotificationHistory(notificationFilters),
          repository.getNotificationSummary(),
        ]);
      setNotices(fetchedNotices);
      setKpis(fetchedKpis);
      setConversations(fetchedConvs);
      if (!activeConversation && fetchedConvs.length > 0) {
        setActiveConversation(fetchedConvs[0]);
      } else if (activeConversation) {
        const updated = fetchedConvs.find((c) => c.id === activeConversation.id);
        if (updated) setActiveConversation(updated);
      }
      setNotifications(fetchedNotifs);
      setNotificationSummary(fetchedSum);
    } finally {
      setIsLoading(false);
    }
  }, [noticeFilters, messageRoleFilter, messageSearchQuery, notificationFilters, activeConversation]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Notice filter setters
  const setNoticeSearchQuery = (q: string) =>
    setNoticeFilters((prev) => ({ ...prev, searchQuery: q }));
  const setNoticeStatus = (s: string) => setNoticeFilters((prev) => ({ ...prev, status: s }));
  const setNoticeAudience = (a: string) => setNoticeFilters((prev) => ({ ...prev, audience: a }));

  // Notification filter setters
  const setNotificationSearchQuery = (q: string) =>
    setNotificationFilters((prev) => ({ ...prev, searchQuery: q }));
  const setNotificationChannel = (ch: string) =>
    setNotificationFilters((prev) => ({ ...prev, channel: ch }));
  const setNotificationReadStatus = (st: string) =>
    setNotificationFilters((prev) => ({ ...prev, readStatus: st }));
  const setNotificationAudience = (aud: string) =>
    setNotificationFilters((prev) => ({ ...prev, audience: aud }));
  const resetNotificationFilters = () =>
    setNotificationFilters({
      searchQuery: '',
      channel: 'All channels',
      readStatus: 'All statuses',
      audience: 'All roles',
    });

  // Navigation handlers
  const goToOverview = () => {
    setSubScreen('NOTICES_OVERVIEW');
  };
  const goToCreateNotice = () => {
    setSelectedNotice(null);
    setSubScreen('NOTICES_CREATE_EDIT');
  };
  const goToEditNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setSubScreen('NOTICES_CREATE_EDIT');
  };
  const goToMessagesInbox = () => {
    setSubScreen('MESSAGES_INBOX');
  };
  const goToNotificationHistory = () => {
    setSubScreen('NOTIFICATIONS_HISTORY');
  };
  const selectConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    repository.markConversationAsRead(conv.id);
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unread: false } : c))
    );
  };

  // Modals
  const openPreviewModal = (data: Partial<Notice>) => {
    setPreviewNoticeData(data);
    setPreviewModalOpen(true);
  };
  const closePreviewModal = () => {
    setPreviewModalOpen(false);
  };

  const openComposeModal = () => setComposeModalOpen(true);
  const closeComposeModal = () => setComposeModalOpen(false);

  const openMessageSentModal = () => setMessageSentModalOpen(true);
  const closeMessageSentModal = () => setMessageSentModalOpen(false);

  const openExportModal = () => setExportModalOpen(true);
  const closeExportModal = () => setExportModalOpen(false);

  // Operations
  const saveNotice = async (data: Partial<Notice>): Promise<boolean> => {
    try {
      const saved = await repository.saveNotice(data);
      showToast('success', `Notice "${saved.title}" saved successfully`);
      await loadData();
      return true;
    } catch {
      showToast('error', 'Failed to save notice. Please check inputs.');
      return false;
    }
  };

  const sendReply = async (text: string): Promise<boolean> => {
    if (!activeConversation || !text.trim()) return false;
    try {
      const updated = await repository.sendMessage(activeConversation.id, text);
      setActiveConversation(updated);
      setConversations((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      showToast('success', 'Reply sent successfully');
      return true;
    } catch {
      showToast('error', 'Failed to send reply');
      return false;
    }
  };

  const markActiveConversationRead = async (): Promise<boolean> => {
    if (!activeConversation) return false;
    await repository.markConversationAsRead(activeConversation.id);
    setActiveConversation((prev) => (prev ? { ...prev, unread: false } : null));
    setConversations((prev) =>
      prev.map((c) => (c.id === activeConversation.id ? { ...c, unread: false } : c))
    );
    showToast('info', 'Conversation marked as read');
    return true;
  };

  const sendNewMessage = async (
    recipient: string,
    subject: string,
    message: string
  ): Promise<boolean> => {
    if (!recipient || !subject || !message) return false;
    closeComposeModal();
    openMessageSentModal();
    showToast('success', `Message queued for ${recipient}`);
    return true;
  };

  return (
    <NoticesFlowContext.Provider
      value={{
        subScreen,
        notices,
        kpis,
        selectedNotice,
        conversations,
        activeConversation,
        notifications,
        notificationSummary,
        isLoading,
        toast,

        noticeFilters,
        setNoticeSearchQuery,
        setNoticeStatus,
        setNoticeAudience,

        messageRoleFilter,
        setMessageRoleFilter,
        messageSearchQuery,
        setMessageSearchQuery,

        notificationFilters,
        setNotificationSearchQuery,
        setNotificationChannel,
        setNotificationReadStatus,
        setNotificationAudience,
        resetNotificationFilters,

        goToOverview,
        goToCreateNotice,
        goToEditNotice,
        goToMessagesInbox,
        goToNotificationHistory,
        selectConversation,

        previewModalOpen,
        previewNoticeData,
        openPreviewModal,
        closePreviewModal,

        composeModalOpen,
        openComposeModal,
        closeComposeModal,

        messageSentModalOpen,
        openMessageSentModal,
        closeMessageSentModal,

        exportModalOpen,
        openExportModal,
        closeExportModal,

        saveNotice,
        sendReply,
        markActiveConversationRead,
        sendNewMessage,
        showToast,
        clearToast,
      }}
    >
      {children}
    </NoticesFlowContext.Provider>
  );
};

export const useNoticesFlow = (): NoticesFlowContextValue => {
  const context = useContext(NoticesFlowContext);
  if (!context) {
    throw new Error('useNoticesFlow must be used within a NoticesFlowProvider');
  }
  return context;
};

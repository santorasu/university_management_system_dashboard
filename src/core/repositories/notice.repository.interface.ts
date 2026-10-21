import type {
  Notice,
  NoticeKpiStats,
  NoticeFilterOptions,
  Conversation,
  NotificationRecord,
  NotificationSummary,
  NotificationFilterOptions,
} from '../entities/notice.types';

export interface INoticeRepository {
  getNotices(filters?: NoticeFilterOptions): Promise<Notice[]>;
  getNoticeById(id: string): Promise<Notice | null>;
  getNoticeKpiStats(): Promise<NoticeKpiStats>;
  saveNotice(notice: Partial<Notice>): Promise<Notice>;
  deleteNotice(id: string): Promise<boolean>;

  getConversations(filterRole?: string, search?: string): Promise<Conversation[]>;
  getConversationById(id: string): Promise<Conversation | null>;
  sendMessage(conversationId: string, text: string): Promise<Conversation>;
  markConversationAsRead(conversationId: string): Promise<boolean>;

  getNotificationHistory(filters?: NotificationFilterOptions): Promise<NotificationRecord[]>;
  getNotificationSummary(): Promise<NotificationSummary>;
}

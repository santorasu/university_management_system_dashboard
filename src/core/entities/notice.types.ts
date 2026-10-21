export type NoticeCategory = 'Academic' | 'Event' | 'Fee' | 'General';

export type NoticeStatus = 'Published' | 'Draft' | 'Scheduled';

export type NoticeAudienceRole = 'Teacher' | 'Student' | 'Parent' | 'All school community';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  publishDate: string;
  publishTime: string;
  expiryDate?: string;
  status: NoticeStatus;
  audience: string; // e.g. "Students · Parents", "Parents · Class 6–8", "Teachers", "All school community"
  targetRoles: NoticeAudienceRole[];
  targetClass?: string;
  targetSection?: string;
  additionalGroup?: string;
  author: string;
  attachments?: string[];
  recipientCount?: number;
  readCount?: number;
}

export interface NoticeKpiStats {
  publishedNotices: number;
  publishedNoticesSubtext: string;
  drafts: number;
  draftsSubtext: string;
  scheduled: number;
  scheduledSubtext: string;
  unreadMessages: number;
  unreadMessagesSubtext: string;
}

export interface NoticeFilterOptions {
  searchQuery: string;
  status: string;
  audience: string;
}

export interface ConversationMessage {
  id: string;
  senderName: string;
  senderRole: string; // "Admin", "Teacher", "Parent", "Student"
  text: string;
  timestamp: string;
  isOutgoing: boolean;
  avatarColor?: string;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: string; // "Parent · Class 8-A", "Teacher", "Student · Class 8-A", etc.
  participantDetail?: string; // e.g. "Parent · Class 8-A · Student: Ayesha Rahman"
  subject: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatarColor: string;
  initials: string;
  messages: ConversationMessage[];
}

export type NotificationChannel = 'In-app + Email' | 'In-app' | 'SMS';

export type NotificationDeliveryStatus = 'Delivered' | 'Failed';

export type NotificationReadStatus = 'Read' | 'Unread';

export interface NotificationRecord {
  id: string;
  date: string;
  title: string;
  recipient: string;
  channel: NotificationChannel;
  deliveryStatus: NotificationDeliveryStatus;
  readStatus: NotificationReadStatus;
}

export interface NotificationSummary {
  deliveredPct: number;
  readPct: number;
  unreadPct: number;
  failedCount: number;
}

export interface NotificationFilterOptions {
  searchQuery: string;
  channel: string;
  readStatus: string;
  audience: string;
}

export type NoticesSubScreen =
  | 'NOTICES_OVERVIEW'
  | 'NOTICES_CREATE_EDIT'
  | 'MESSAGES_INBOX'
  | 'NOTIFICATIONS_HISTORY';

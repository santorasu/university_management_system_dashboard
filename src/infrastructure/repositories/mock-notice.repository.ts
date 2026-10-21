import type {
  Notice,
  NoticeKpiStats,
  NoticeFilterOptions,
  Conversation,
  NotificationRecord,
  NotificationSummary,
  NotificationFilterOptions,
} from '../../core/entities/notice.types';
import type { INoticeRepository } from '../../core/repositories/notice.repository.interface';

export class MockNoticeRepository implements INoticeRepository {
  private notices: Notice[] = [
    {
      id: 'not-001',
      title: 'Term 1 Exam Schedule',
      content:
        'Please review the midterm examination timetable for all classes. Verify your assigned room and reporting time before the exam date. Contact the Academic Office if any details appear incorrect.',
      category: 'Academic',
      publishDate: '18 Oct 2026',
      publishTime: '09:00 AM',
      expiryDate: '15 Nov 2026',
      status: 'Published',
      audience: 'Students · Parents',
      targetRoles: ['Student', 'Parent'],
      targetClass: 'Class 8',
      targetSection: 'A',
      author: 'Academic Office',
      attachments: ['Term_1_Exam_Schedule_2026.pdf'],
      recipientCount: 420,
      readCount: 388,
    },
    {
      id: 'not-002',
      title: 'Parent–Teacher Meeting',
      content:
        'The upcoming Parent-Teacher Conference will take place on October 20th from 14:00 to 17:00 in the main auditorium and designated homerooms. Parents of Grades 6–8 are invited to attend.',
      category: 'Event',
      publishDate: '20 Oct 2026',
      publishTime: '10:00 AM',
      expiryDate: '21 Oct 2026',
      status: 'Scheduled',
      audience: 'Parents · Class 6–8',
      targetRoles: ['Parent'],
      targetClass: 'Grades 6–8',
      author: 'Principal Administration',
      attachments: ['PTM_Agenda_Oct2026.pdf'],
      recipientCount: 310,
      readCount: 0,
    },
    {
      id: 'not-003',
      title: 'Teacher Training Update',
      content:
        'All faculty members are requested to attend the interactive digital pedagogical workshop this Saturday at 09:30 AM in Multimedia Lab 2. CPD points will be awarded upon completion.',
      category: 'General',
      publishDate: '16 Oct 2026',
      publishTime: '08:30 AM',
      status: 'Published',
      audience: 'Teachers',
      targetRoles: ['Teacher'],
      author: 'Faculty Development Cell',
      recipientCount: 86,
      readCount: 82,
    },
    {
      id: 'not-004',
      title: 'Library Timing Change',
      content:
        'Starting next Monday, the school library will remain open until 17:30 on weekdays to facilitate study groups, homework completion, and book loans.',
      category: 'General',
      publishDate: '12 Oct 2026',
      publishTime: '11:00 AM',
      status: 'Draft',
      audience: 'All school community',
      targetRoles: ['Teacher', 'Student', 'Parent'],
      author: 'Head Librarian',
      recipientCount: 1350,
      readCount: 0,
    },
    {
      id: 'not-005',
      title: 'Fee Payment Reminder',
      content:
        'Notice to Class 8 guardians: Term 1 fee installments are due by October 25th, 2026. Please settle pending dues via the online school payment portal to avoid late processing charges.',
      category: 'Fee',
      publishDate: '10 Oct 2026',
      publishTime: '09:00 AM',
      status: 'Published',
      audience: 'Parents · Class 8',
      targetRoles: ['Parent'],
      targetClass: 'Class 8',
      author: 'Finance & Accounts',
      attachments: ['Fee_Structure_Term1.pdf'],
      recipientCount: 140,
      readCount: 115,
    },
  ];

  private conversations: Conversation[] = [
    {
      id: 'conv-001',
      participantName: 'Ayesha Rahman',
      participantRole: 'Parent · Class 8-A',
      participantDetail: 'Parent · Class 8-A · Student: Ayesha Rahman',
      subject: 'Exam schedule clarification',
      lastMessage: 'Thank you for confirming. I will check the notice.',
      timestamp: '10:42 AM',
      unread: true,
      avatarColor: '#EEF2FF',
      initials: 'AR',
      messages: [
        {
          id: 'msg-101',
          senderName: 'Ayesha Rahman',
          senderRole: 'Parent',
          text: 'Hello, could you please confirm whether the Term 1 exam schedule is final for Class 8-A?',
          timestamp: '10:12 AM',
          isOutgoing: false,
        },
        {
          id: 'msg-102',
          senderName: 'Alex Morgan',
          senderRole: 'Admin',
          text: 'Hello Ayesha, the schedule is confirmed. The latest notice includes the final dates and subject-wise timetable.',
          timestamp: '10:25 AM',
          isOutgoing: true,
        },
        {
          id: 'msg-103',
          senderName: 'Ayesha Rahman',
          senderRole: 'Parent',
          text: 'Thank you for confirming. I will check the notice.',
          timestamp: '10:42 AM',
          isOutgoing: false,
        },
      ],
    },
    {
      id: 'conv-002',
      participantName: 'Md. Taufiqur Rahman',
      participantRole: 'Teacher',
      participantDetail: 'Mathematics Department · Head Teacher',
      subject: 'Term results are ready for review',
      lastMessage: 'Term results are ready for review',
      timestamp: '10:18 AM',
      unread: true,
      avatarColor: '#E0F7EB',
      initials: 'MT',
      messages: [
        {
          id: 'msg-201',
          senderName: 'Md. Taufiqur Rahman',
          senderRole: 'Teacher',
          text: 'Term results for Grade 8 Mathematics are uploaded and ready for administrative moderation.',
          timestamp: '10:18 AM',
          isOutgoing: false,
        },
      ],
    },
    {
      id: 'conv-003',
      participantName: 'Tanvir Hasan',
      participantRole: 'Student · Class 8-A',
      participantDetail: 'Student ID: STU-2026-042 · Roll 08',
      subject: 'Thank you for the update',
      lastMessage: 'Thank you for the update',
      timestamp: 'Yesterday',
      unread: false,
      avatarColor: '#FFF5DB',
      initials: 'TH',
      messages: [
        {
          id: 'msg-301',
          senderName: 'Tanvir Hasan',
          senderRole: 'Student',
          text: 'Thank you for the update regarding the Science Fair registration deadline.',
          timestamp: 'Yesterday 16:30',
          isOutgoing: false,
        },
      ],
    },
    {
      id: 'conv-004',
      participantName: 'Nusrat Jahan',
      participantRole: 'Parent · Class 7-B',
      participantDetail: 'Parent · Class 7-B · Student: Farhan Jahan',
      subject: 'Request for a meeting',
      lastMessage: 'Request for a meeting with homeroom teacher',
      timestamp: 'Yesterday',
      unread: true,
      avatarColor: '#FEE4E2',
      initials: 'NJ',
      messages: [
        {
          id: 'msg-401',
          senderName: 'Nusrat Jahan',
          senderRole: 'Parent',
          text: 'Could I request a 15-minute slot during the Parent-Teacher Meeting to discuss Farhan’s science progress?',
          timestamp: 'Yesterday 14:15',
          isOutgoing: false,
        },
      ],
    },
    {
      id: 'conv-005',
      participantName: 'Rafat Meraz',
      participantRole: 'Teacher',
      participantDetail: 'Physics Department · Senior Faculty',
      subject: 'Please confirm the new timetable',
      lastMessage: 'Please confirm the new timetable',
      timestamp: '16 Oct',
      unread: false,
      avatarColor: '#F3E8FF',
      initials: 'RM',
      messages: [
        {
          id: 'msg-501',
          senderName: 'Rafat Meraz',
          senderRole: 'Teacher',
          text: 'Please confirm the new lab schedule allocation for Thursday period 4.',
          timestamp: '16 Oct 11:20',
          isOutgoing: false,
        },
      ],
    },
    {
      id: 'conv-006',
      participantName: 'Samiul Islam',
      participantRole: 'Parent · Class 6-A',
      participantDetail: 'Parent · Class 6-A · Student: Fahim Islam',
      subject: 'Transport fee payment query',
      lastMessage: 'Transport fee payment query',
      timestamp: '15 Oct',
      unread: false,
      avatarColor: '#E0F2FE',
      initials: 'SI',
      messages: [
        {
          id: 'msg-601',
          senderName: 'Samiul Islam',
          senderRole: 'Parent',
          text: 'The payment slip for Route 4 school bus has been submitted online. Kindly confirm receipt.',
          timestamp: '15 Oct 09:40',
          isOutgoing: false,
        },
      ],
    },
  ];

  private notifications: NotificationRecord[] = [
    {
      id: 'notif-001',
      date: '18 Oct 2026',
      title: 'Term 1 Exam Schedule',
      recipient: 'Students · Class 8-A',
      channel: 'In-app + Email',
      deliveryStatus: 'Delivered',
      readStatus: 'Read',
    },
    {
      id: 'notif-002',
      date: '18 Oct 2026',
      title: 'Term 1 Exam Schedule',
      recipient: 'Parents · Class 8-A',
      channel: 'In-app + Email',
      deliveryStatus: 'Delivered',
      readStatus: 'Read',
    },
    {
      id: 'notif-003',
      date: '17 Oct 2026',
      title: 'Parent–Teacher Meeting',
      recipient: 'Parents · Class 6–8',
      channel: 'In-app',
      deliveryStatus: 'Delivered',
      readStatus: 'Unread',
    },
    {
      id: 'notif-004',
      date: '16 Oct 2026',
      title: 'Teacher Training Update',
      recipient: 'Teachers',
      channel: 'In-app + Email',
      deliveryStatus: 'Delivered',
      readStatus: 'Read',
    },
    {
      id: 'notif-005',
      date: '15 Oct 2026',
      title: 'Fee Payment Reminder',
      recipient: 'Parents · Class 8',
      channel: 'In-app',
      deliveryStatus: 'Delivered',
      readStatus: 'Unread',
    },
    {
      id: 'notif-006',
      date: '14 Oct 2026',
      title: 'Library Timing Change',
      recipient: 'Students · Class 6–10',
      channel: 'In-app',
      deliveryStatus: 'Failed',
      readStatus: 'Unread',
    },
  ];

  async getNotices(filters?: NoticeFilterOptions): Promise<Notice[]> {
    let result = [...this.notices];
    if (!filters) return result;

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.author.toLowerCase().includes(q)
      );
    }
    if (filters.status && filters.status !== 'All statuses') {
      result = result.filter((n) => n.status === filters.status);
    }
    if (filters.audience && filters.audience !== 'All audiences') {
      result = result.filter((n) => n.audience.includes(filters.audience));
    }
    return result;
  }

  async getNoticeById(id: string): Promise<Notice | null> {
    return this.notices.find((n) => n.id === id) || null;
  }

  async getNoticeKpiStats(): Promise<NoticeKpiStats> {
    const published = this.notices.filter((n) => n.status === 'Published').length;
    const drafts = this.notices.filter((n) => n.status === 'Draft').length;
    const scheduled = this.notices.filter((n) => n.status === 'Scheduled').length;
    const unreadMsgs = this.conversations.filter((c) => c.unread).length;

    return {
      publishedNotices: Math.max(24, published),
      publishedNoticesSubtext: '↑ 4 this term',
      drafts: Math.max(6, drafts),
      draftsSubtext: 'Needs review',
      scheduled: Math.max(3, scheduled),
      scheduledSubtext: 'Upcoming',
      unreadMessages: unreadMsgs > 0 ? unreadMsgs : 18,
      unreadMessagesSubtext: 'Across inboxes',
    };
  }

  async saveNotice(noticeData: Partial<Notice>): Promise<Notice> {
    if (noticeData.id) {
      const idx = this.notices.findIndex((n) => n.id === noticeData.id);
      if (idx !== -1) {
        this.notices[idx] = { ...this.notices[idx], ...noticeData } as Notice;
        return this.notices[idx];
      }
    }
    const newNotice: Notice = {
      id: `not-${Date.now().toString().slice(-4)}`,
      title: noticeData.title || 'Untitled Notice',
      content: noticeData.content || '',
      category: noticeData.category || 'General',
      publishDate: noticeData.publishDate || '21 Oct 2026',
      publishTime: noticeData.publishTime || '09:00 AM',
      expiryDate: noticeData.expiryDate,
      status: noticeData.status || 'Draft',
      audience: noticeData.audience || 'All school community',
      targetRoles: noticeData.targetRoles || ['Teacher', 'Student', 'Parent'],
      targetClass: noticeData.targetClass,
      targetSection: noticeData.targetSection,
      additionalGroup: noticeData.additionalGroup,
      author: noticeData.author || 'School Administrator',
      attachments: noticeData.attachments || [],
      recipientCount: noticeData.recipientCount || 250,
      readCount: 0,
    };
    this.notices.unshift(newNotice);
    return newNotice;
  }

  async deleteNotice(id: string): Promise<boolean> {
    const initLen = this.notices.length;
    this.notices = this.notices.filter((n) => n.id !== id);
    return this.notices.length < initLen;
  }

  async getConversations(filterRole?: string, search?: string): Promise<Conversation[]> {
    let result = [...this.conversations];
    if (filterRole && filterRole !== 'All') {
      if (filterRole === 'Unread') {
        result = result.filter((c) => c.unread);
      } else if (filterRole === 'Teachers') {
        result = result.filter((c) => c.participantRole.includes('Teacher'));
      } else if (filterRole === 'Students') {
        result = result.filter((c) => c.participantRole.includes('Student'));
      }
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.participantName.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    return this.conversations.find((c) => c.id === id) || null;
  }

  async sendMessage(conversationId: string, text: string): Promise<Conversation> {
    const conv = this.conversations.find((c) => c.id === conversationId);
    if (!conv) throw new Error('Conversation not found');

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: 'Alex Morgan',
      senderRole: 'Admin',
      text,
      timestamp: 'Just now',
      isOutgoing: true,
    };
    conv.messages.push(newMsg);
    conv.lastMessage = text;
    conv.timestamp = 'Just now';
    return { ...conv };
  }

  async markConversationAsRead(conversationId: string): Promise<boolean> {
    const conv = this.conversations.find((c) => c.id === conversationId);
    if (conv) {
      conv.unread = false;
      return true;
    }
    return false;
  }

  async getNotificationHistory(filters?: NotificationFilterOptions): Promise<NotificationRecord[]> {
    let result = [...this.notifications];
    if (!filters) return result;

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (n) => n.title.toLowerCase().includes(q) || n.recipient.toLowerCase().includes(q)
      );
    }
    if (filters.channel && filters.channel !== 'All channels') {
      result = result.filter((n) => n.channel === filters.channel);
    }
    if (filters.readStatus && filters.readStatus !== 'All statuses') {
      result = result.filter((n) => n.readStatus === filters.readStatus);
    }
    if (filters.audience && filters.audience !== 'All roles') {
      result = result.filter((n) => n.recipient.includes(filters.audience));
    }
    return result;
  }

  async getNotificationSummary(): Promise<NotificationSummary> {
    return {
      deliveredPct: 98.4,
      readPct: 76.2,
      unreadPct: 23.8,
      failedCount: 12,
    };
  }
}

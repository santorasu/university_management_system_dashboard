import React, { useState } from 'react';
import { useNoticesFlow } from '../../../application/state/notices-flow.context';
import { NoticesNavTabs } from './components/NoticesNavTabs';
import { NoticesKpiCards } from './components/NoticesKpiCards';
import type { Conversation } from '../../../core/entities/notice.types';

interface MessagesInboxScreenProps {
  onNavigateToDashboard: () => void;
}

export const MessagesInboxScreen: React.FC<MessagesInboxScreenProps> = ({
  onNavigateToDashboard,
}) => {
  const {
    kpis,
    conversations,
    activeConversation,
    selectConversation,
    messageRoleFilter,
    setMessageRoleFilter,
    messageSearchQuery,
    setMessageSearchQuery,
    openComposeModal,
    sendReply,
    markActiveConversationRead,
    goToOverview,
  } = useNoticesFlow();

  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendReply = async () => {
    if (!replyText.trim() || isSending) return;
    setIsSending(true);
    const ok = await sendReply(replyText);
    setIsSending(false);
    if (ok) {
      setReplyText('');
    }
  };

  const getAvatarBg = (id: string) => {
    const colors = ['#EEF4FF', '#ECFDF3', '#FEF3F2', '#FFFAEB', '#F4F3FF', '#EFF8FF'];
    const idx = Math.abs(id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
    return colors[idx];
  };

  return (
    <div className="notices-container">
      {/* 1. HERO / HEADER & BREADCRUMBS */}
      <div className="notices-hero">
        <div className="notices-hero__left">
          <nav className="notices-hero__crumbs" aria-label="Breadcrumb">
            <button
              type="button"
              className="notices-hero__crumb--link"
              onClick={onNavigateToDashboard}
            >
              Dashboard
            </button>
            <span className="notices-hero__crumb-sep">/</span>
            <button
              type="button"
              className="notices-hero__crumb--link"
              onClick={goToOverview}
            >
              Notices & Messages
            </button>
            <span className="notices-hero__crumb-sep">/</span>
            <span className="notices-hero__crumb--current">Messages & Conversations</span>
          </nav>

          <div className="notices-hero__title-row">
            <button
              type="button"
              className="edusync-btn-back-circle"
              onClick={goToOverview}
              title="Return to Notices Overview"
              aria-label="Back to Notices"
            >
              ←
            </button>
            <div>
              <h1 className="notices-hero__title">Messages & Conversations</h1>
              <p className="notices-hero__subtitle">
                Review incoming messages and respond to Teachers, Students, and Parents
              </p>
            </div>
          </div>
        </div>

        <div className="notices-hero__actions">
          <button
            type="button"
            className="edusync-btn edusync-btn--secondary"
            onClick={goToOverview}
          >
            ← Notices
          </button>
          <button
            type="button"
            className="edusync-btn edusync-btn--primary"
            onClick={openComposeModal}
          >
            + Compose message
          </button>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (DIRECTLY UNDER HERO) */}
      <NoticesNavTabs />

      {/* 3. 4 KPI STAT METRIC CARDS (DIRECTLY UNDER TABS) */}
      <NoticesKpiCards stats={kpis} />

      {/* 4. MESSAGES SPLIT VIEW: 380px INBOX LIST + CHAT THREAD */}
      <div className="messages-split-view">
        {/* LEFT PANEL: INBOX */}
        <div className="notices-card messages-inbox-panel">
          <div className="notices-card__header" style={{ padding: '16px 20px', borderBottom: '1px solid #E4E7EC' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <h2 className="notices-card__title" style={{ fontSize: 16 }}>Inbox</h2>
                <p className="notices-card__subtitle" style={{ fontSize: 12 }}>
                  {kpis ? `${kpis.unreadMessages} unread · All roles` : '18 unread · All roles'}
                </p>
              </div>
              <button
                type="button"
                className="edusync-btn edusync-btn--secondary"
                style={{ padding: '6px 12px', fontSize: 12 }}
                onClick={openComposeModal}
              >
                + Compose
              </button>
            </div>
          </div>

          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            {/* Search */}
            <div style={{ marginBottom: 12 }}>
              <input
                type="text"
                className="notices-form-input"
                style={{ padding: '8px 12px', fontSize: 13 }}
                placeholder="Search messages by name or topic..."
                value={messageSearchQuery}
                onChange={(e) => setMessageSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            <div className="messages-inbox-tabs">
              {(['All', 'Unread', 'Teachers', 'Students'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`messages-inbox-tab ${
                    messageRoleFilter === tab ? 'messages-inbox-tab--active' : ''
                  }`}
                  onClick={() => setMessageRoleFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Conversation List */}
            <div className="messages-conv-list">
              {conversations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: '#667085', fontSize: 13 }}>
                  No conversations match the selected filter.
                </div>
              ) : (
                conversations.map((conv: Conversation) => {
                  const isSelected = activeConversation?.id === conv.id;
                  return (
                    <div
                      key={conv.id}
                      className={`messages-conv-item ${
                        isSelected ? 'messages-conv-item--active' : ''
                      }`}
                      onClick={() => selectConversation(conv)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') selectConversation(conv);
                      }}
                    >
                      <div
                        className="messages-avatar"
                        style={{ background: getAvatarBg(conv.id) }}
                      >
                        {conv.initials}
                      </div>

                      <div className="messages-conv-info">
                        <div className="messages-conv-name-row">
                          <span className="messages-conv-name">{conv.participantName}</span>
                          <span className="messages-conv-time">{conv.timestamp}</span>
                        </div>
                        <span className="messages-conv-role">
                          {conv.participantRole}
                        </span>
                        <span className="messages-conv-subject">{conv.subject}</span>
                      </div>

                      {conv.unread && <span className="messages-unread-dot" title="Unread" />}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: CHAT THREAD & REPLY */}
        <div className="notices-card messages-thread-panel">
          {activeConversation ? (
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
              {/* Header */}
              <div className="messages-thread-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#14213D' }}>
                    {activeConversation.participantName}
                  </h3>
                  <p style={{ margin: '3px 0 0', fontSize: 12, color: '#667085' }}>
                    {activeConversation.participantDetail || activeConversation.participantRole}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {activeConversation.unread && (
                    <button
                      type="button"
                      className="edusync-btn edusync-btn--secondary"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                      onClick={markActiveConversationRead}
                    >
                      Mark as read
                    </button>
                  )}
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '4px 8px',
                      borderRadius: 4,
                      background: '#F2F4F7',
                      color: '#344054',
                    }}
                  >
                    Active Thread
                  </span>
                </div>
              </div>

              {/* Context Chip */}
              <div className="messages-thread-chip">
                <span>📌 Context:</span>
                <span style={{ fontWeight: 600 }}>{activeConversation.subject}</span>
              </div>

              {/* Chat Bubble Stream */}
              <div className="messages-bubble-stream">
                {activeConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`messages-bubble ${
                      msg.isOutgoing
                        ? 'messages-bubble--outgoing'
                        : 'messages-bubble--incoming'
                    }`}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, marginBottom: 2 }}>
                      {msg.senderName} · {msg.timestamp}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                ))}
              </div>

              {/* Reply Composer */}
              <div className="messages-composer">
                <textarea
                  className="messages-composer-textarea"
                  placeholder="Write a reply…"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                />

                <div className="messages-composer-actions">
                  <button
                    type="button"
                    className="edusync-btn edusync-btn--secondary"
                    style={{ padding: '6px 12px', fontSize: 12 }}
                    onClick={() => alert('Attachments can be added in supported browser formats.')}
                  >
                    📎 Attach file
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, color: '#98A2B3' }}>Press Enter to send</span>
                    <button
                      type="button"
                      className="edusync-btn edusync-btn--primary"
                      style={{ padding: '6px 16px', fontSize: 13 }}
                      onClick={handleSendReply}
                      disabled={!replyText.trim() || isSending}
                    >
                      {isSending ? 'Sending…' : 'Send reply'}
                    </button>
                  </div>
                </div>

                <p style={{ margin: '4px 0 0', fontSize: 11, color: '#98A2B3', lineHeight: 1.4 }}>
                  Messages are shown in chronological order. Use role and class context to confirm the intended recipient.
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#667085',
                fontSize: 14,
              }}
            >
              Select a conversation from the left to start viewing messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

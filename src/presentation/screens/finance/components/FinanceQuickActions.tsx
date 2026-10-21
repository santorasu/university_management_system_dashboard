import React from 'react';
import { useFinance } from '../../../../application/state/finance-flow.context';

export const FinanceQuickActions: React.FC = () => {
  const { setCurrentScreen } = useFinance();

  const actions = [
    {
      title: 'Fee Categories',
      desc: 'Setup tuition, transport, lab and term fees with default amounts.',
      actionText: 'Open →',
      onClick: () => setCurrentScreen('CATEGORIES_ASSIGNMENT'),
    },
    {
      title: 'Student Fee Assignment',
      desc: 'Assign fee heads to classes, sections or individual student batches.',
      actionText: 'Open →',
      onClick: () => setCurrentScreen('CATEGORIES_ASSIGNMENT'),
    },
    {
      title: 'Invoices & Payments',
      desc: 'Track invoices, verify online bKash transactions and record cash.',
      actionText: 'Open →',
      onClick: () => setCurrentScreen('INVOICES_PAYMENTS'),
    },
    {
      title: 'Dues & Receipts',
      desc: 'Manage outstanding balances, print payment slips and export reports.',
      actionText: 'Open →',
      onClick: () => setCurrentScreen('DUES_REPORTS'),
    },
  ];

  return (
    <div className="finance-quick-actions-grid">
      {actions.map((act) => (
        <div
          key={act.title}
          className="finance-action-card"
          onClick={act.onClick}
        >
          <div>
            <div className="finance-action-card__title">{act.title}</div>
            <div className="finance-action-card__desc">{act.desc}</div>
          </div>
          <span className="finance-action-card__link">{act.actionText}</span>
        </div>
      ))}
    </div>
  );
};

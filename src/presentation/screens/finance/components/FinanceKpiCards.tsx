import React from 'react';
import type { FinanceKpiStats } from '../../../../core/entities/finance.types';

interface FinanceKpiCardsProps {
  stats: FinanceKpiStats | null;
  variant?: 'overview' | 'dues';
  onCardClick?: (index: number) => void;
}

export const FinanceKpiCards: React.FC<FinanceKpiCardsProps> = ({
  stats,
  variant = 'overview',
  onCardClick,
}) => {
  if (!stats) return null;

  if (variant === 'dues') {
    const duesCards = [
      {
        label: 'Outstanding invoices',
        value: stats.duesKpis.outstandingInvoices.toLocaleString(),
        hint: 'Due across all classes',
        color: '#B86E0F', // Amber
      },
      {
        label: 'Overdue invoices',
        value: stats.duesKpis.overdueInvoices.toLocaleString(),
        hint: 'Immediate follow-up required',
        color: '#C23838', // Red
      },
      {
        label: 'Discounts applied',
        value: `৳ ${stats.duesKpis.discountsApplied.toLocaleString()}`,
        hint: 'Waivers & scholarships',
        color: '#6B4AB8', // Purple
      },
      {
        label: 'Receipts issued',
        value: stats.duesKpis.receiptsIssued.toLocaleString(),
        hint: 'Official payment slips',
        color: '#148C57', // Green
      },
    ];

    return (
      <div className="finance-kpis-grid">
        {duesCards.map((card, idx) => (
          <div
            key={card.label}
            className="finance-kpi-card"
            onClick={() => onCardClick?.(idx)}
          >
            <div
              className="finance-kpi-card__bar"
              style={{ backgroundColor: card.color }}
            />
            <div className="finance-kpi-card__content">
              <span className="finance-kpi-card__label">{card.label}</span>
              <span className="finance-kpi-card__val">{card.value}</span>
              <span className="finance-kpi-card__hint">{card.hint}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Overview Variant (Blue -> Green -> Amber -> Red)
  const overviewCards = [
    {
      label: 'Total fees assigned',
      value: `৳ ${stats.totalAssigned.toLocaleString()}`,
      hint: 'Current academic year',
      color: '#3659D9', // Blue
    },
    {
      label: 'Collected so far',
      value: `৳ ${stats.collectedSoFar.toLocaleString()}`,
      hint: `${stats.collectionRate}% collection rate`,
      color: '#148C57', // Green
    },
    {
      label: 'Outstanding dues',
      value: `৳ ${stats.outstandingDues.toLocaleString()}`,
      hint: `${stats.studentsWithDues} students with dues`,
      color: '#B86E0F', // Amber
    },
    {
      label: 'Overdue balance',
      value: `৳ ${stats.overdueBalance.toLocaleString()}`,
      hint: `${stats.overdueCount} payments overdue`,
      color: '#C23838', // Red
    },
  ];

  return (
    <div className="finance-kpis-grid">
      {overviewCards.map((card, idx) => (
        <div
          key={card.label}
          className="finance-kpi-card"
          onClick={() => onCardClick?.(idx)}
        >
          <div
            className="finance-kpi-card__bar"
            style={{ backgroundColor: card.color }}
          />
          <div className="finance-kpi-card__content">
            <span className="finance-kpi-card__label">{card.label}</span>
            <span className="finance-kpi-card__val">{card.value}</span>
            <span className="finance-kpi-card__hint">{card.hint}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

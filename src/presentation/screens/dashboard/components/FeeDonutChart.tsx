import React from 'react';

export const FeeDonutChart: React.FC = () => {
  // SVG donut metrics: radius 52, circumference ~326.7
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // 314.159
  const collectedPct = 0.85;
  const collectedDash = circumference * collectedPct; // ~267

  return (
    <div className="edusync-fee-chart">
      <div className="edusync-fee-chart__body">
        {/* SVG Donut */}
        <div className="edusync-fee-chart__donut-wrap">
          <svg className="edusync-fee-chart__svg" viewBox="0 0 120 120">
            {/* Background / Outstanding track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="14"
            />
            {/* Collected track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#3659D9"
              strokeWidth="14"
              strokeDasharray={`${collectedDash} ${circumference}`}
              strokeDashoffset="0"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="edusync-fee-chart__donut-center">
            <span className="edusync-fee-chart__pct-text">85%</span>
            <span className="edusync-fee-chart__pct-label">collected</span>
          </div>
        </div>

        {/* Legend */}
        <div className="edusync-fee-chart__legend">
          <div className="edusync-fee-chart__legend-row">
            <div className="edusync-fee-chart__legend-left">
              <span className="edusync-fee-chart__dot edusync-fee-chart__dot--billed" />
              <span className="edusync-fee-chart__item-name">Billed</span>
            </div>
            <strong className="edusync-fee-chart__item-value">$480,000</strong>
          </div>

          <div className="edusync-fee-chart__legend-row">
            <div className="edusync-fee-chart__legend-left">
              <span className="edusync-fee-chart__dot edusync-fee-chart__dot--collected" />
              <span className="edusync-fee-chart__item-name">Collected · 85%</span>
            </div>
            <strong className="edusync-fee-chart__item-value">$408,000</strong>
          </div>

          <div className="edusync-fee-chart__legend-row">
            <div className="edusync-fee-chart__legend-left">
              <span className="edusync-fee-chart__dot edusync-fee-chart__dot--outstanding" />
              <span className="edusync-fee-chart__item-name">Outstanding · 15%</span>
            </div>
            <strong className="edusync-fee-chart__item-value">$72,000</strong>
          </div>
        </div>
      </div>

      <div className="edusync-fee-chart__footer">
        Term 1 billing only · No future-term fees included
      </div>
    </div>
  );
};

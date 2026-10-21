import React from 'react';

interface DayAttendance {
  day: string;
  percentage: number;
  isActive?: boolean;
}

const attendanceData: DayAttendance[] = [
  { day: 'Mon 12', percentage: 96.6 },
  { day: 'Tue 13', percentage: 97.0 },
  { day: 'Wed 14', percentage: 95.8 },
  { day: 'Thu 15', percentage: 96.2 },
  { day: 'Fri 16', percentage: 96.0, isActive: true },
];

export const AttendanceChart: React.FC = () => {
  return (
    <div className="edusync-attendance-chart">
      <div className="edusync-attendance-chart__plot-area">
        {/* Y Axis Guide */}
        <div className="edusync-attendance-chart__y-axis">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>

        {/* Bars Container */}
        <div className="edusync-attendance-chart__bars">
          {attendanceData.map((item) => (
            <div key={item.day} className="edusync-attendance-chart__col">
              <div className="edusync-attendance-chart__bar-track">
                <div
                  className={`edusync-attendance-chart__bar ${
                    item.isActive ? 'edusync-attendance-chart__bar--active' : ''
                  }`}
                  style={{ height: `${(item.percentage / 100) * 100}%` }}
                >
                  <span className="edusync-attendance-chart__bar-pct">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <span
                className={`edusync-attendance-chart__day-label ${
                  item.isActive ? 'edusync-attendance-chart__day-label--active' : ''
                }`}
              >
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="edusync-attendance-chart__footer">
        <span className="edusync-attendance-chart__present-text">
          16 Oct: 1,198 present
        </span>
        <span className="edusync-attendance-chart__absent-text">
          50 absent / 1,248 expected
        </span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { StudentProfile, TargetRole } from '../../types';
import { TARGET_ROLES } from '../../data/mockData';
import { analyzeSkillGaps } from '../../lib/skillIntelligence';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Compass,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

interface SkillRadarViewProps {
  student: StudentProfile;
  onNavigateToRoadmap: () => void;
  onSelectRole: (roleId: string) => void;
}

export const SkillRadarView: React.FC<SkillRadarViewProps> = ({
  student,
  onNavigateToRoadmap,
  onSelectRole
}) => {
  const currentRole = TARGET_ROLES.find(r => r.id === student.targetRoleId) || TARGET_ROLES[0];
  const gaps = analyzeSkillGaps(student, currentRole);

  const matched = gaps.filter(g => g.status === 'matched');
  const developing = gaps.filter(g => g.status === 'developing');
  const missing = gaps.filter(g => g.status === 'missing');

  // Overall Readiness Percentage for this Target Role
  const totalGaps = gaps.length;
  const matchRatio = totalGaps > 0 
    ? Math.round(((matched.length + developing.length * 0.5) / totalGaps) * 100) 
    : 0;

  // Render SVG Radar Chart
  const renderRadarChart = () => {
    const size = 320;
    const center = size / 2;
    const radius = 110;
    const count = gaps.length;
    if (count === 0) return null;

    const angleStep = (Math.PI * 2) / count;

    // Concentric grid circles
    const levels = [0.25, 0.5, 0.75, 1.0];

    // Calculate polygon points
    const benchmarkPoints = gaps.map((_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    const studentPoints = gaps.map((gap, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const ratio = Math.min(1, gap.currentProficiency / gap.requiredProficiency);
      const dist = radius * ratio;
      const x = center + dist * Math.cos(angle);
      const y = center + dist * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
        {/* Background Grid Rings */}
        {levels.map((lvl, idx) => (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius * lvl}
            fill="none"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeDasharray={idx === levels.length - 1 ? 'none' : '4 4'}
          />
        ))}

        {/* Axis Lines */}
        {gaps.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(148, 163, 184, 0.2)"
            />
          );
        })}

        {/* Target Benchmark Polygon */}
        <polygon
          points={benchmarkPoints}
          fill="rgba(51, 65, 85, 0.06)"
          stroke="#334155"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Student Skill Polygon */}
        <polygon
          points={studentPoints}
          fill="rgba(220, 38, 38, 0.2)"
          stroke="#dc2626"
          strokeWidth="2.5"
        />

        {/* Data point dots & text labels */}
        {gaps.map((gap, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const ratio = Math.min(1, gap.currentProficiency / gap.requiredProficiency);
          const dist = radius * ratio;
          const dotX = center + dist * Math.cos(angle);
          const dotY = center + dist * Math.sin(angle);

          // Outer label
          const labelDist = radius + 22;
          const labelX = center + labelDist * Math.cos(angle);
          const labelY = center + labelDist * Math.sin(angle);

          const dotColor = 
            gap.status === 'matched' ? '#059669' : 
            gap.status === 'developing' ? '#d97706' : '#dc2626';

          return (
            <g key={i}>
              <circle
                cx={dotX}
                cy={dotY}
                r="4.5"
                fill={dotColor}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x={labelX}
                y={labelY}
                fill="#334155"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {gap.skillName}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Target Role Selector Header */}
      <div className="glass-panel" style={{ padding: '1.75rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Target size={20} color="var(--primary-red)" />
              <h2 style={{ fontSize: '1.4rem', color: '#0f172a' }}>Competency Gap Diagnostic & Analysis</h2>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Benchmarking Rohan Sharma's verified skills against target industry requirements.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Career Role:</span>
            <select
              id="select-target-role"
              value={student.targetRoleId}
              onChange={(e) => onSelectRole(e.target.value)}
              style={{
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 1rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {TARGET_ROLES.map(r => (
                <option key={r.id} value={r.id}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Role Meta */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem', color: '#0f172a' }}>
              {currentRole.title}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '650px' }}>
              {currentRole.description}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Market Avg: </span>
              <span style={{ color: '#059669', fontWeight: '700' }}>{currentRole.averageSalary}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Demand: </span>
              <span className="badge badge-amber">{currentRole.industryDemandLevel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Radar & Diagnostic Summary */}
      <div className="grid-2">
        {/* Radar Graphic */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Multi-Axis Competency Radar</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary-red)', fontWeight: '600' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#dc2626' }} /> Student
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#334155', fontWeight: '600' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#334155' }} /> Target Benchmark
              </span>
            </div>
          </div>

          <div style={{ margin: '1rem 0' }}>
            {renderRadarChart()}
          </div>

          <div style={{
            width: '100%',
            background: '#f8fafc',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Overall Role Fit Readiness:</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: matchRatio >= 70 ? '#059669' : '#d97706' }}>
              {matchRatio}%
            </span>
          </div>
        </div>

        {/* Granular Gaps Breakdown */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Skill Status Breakdown</h3>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
              <span className="badge badge-emerald">{matched.length} Matched</span>
              <span className="badge badge-amber">{developing.length} Developing</span>
              <span className="badge badge-rose">{missing.length} Missing</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflowY: 'auto', maxHeight: '420px', paddingRight: '0.25rem' }}>
            {gaps.map((gap, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8fafc',
                  border: `1px solid ${
                    gap.status === 'matched' ? 'rgba(16, 185, 129, 0.25)' :
                    gap.status === 'developing' ? 'rgba(245, 158, 11, 0.25)' :
                    'rgba(220, 38, 38, 0.2)'
                  }`,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {gap.status === 'matched' && <CheckCircle2 size={16} color="#10b981" />}
                    {gap.status === 'developing' && <AlertTriangle size={16} color="#f59e0b" />}
                    {gap.status === 'missing' && <XCircle size={16} color="#f43f5e" />}
                    <span style={{ fontWeight: '700', fontSize: '0.92rem' }}>{gap.skillName}</span>
                    {gap.mustHave && (
                      <span style={{ fontSize: '0.65rem', color: '#fb7185', background: 'rgba(244, 63, 94, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        Must-Have
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>
                    <span style={{ color: gap.status === 'matched' ? '#10b981' : '#f59e0b' }}>
                      {gap.currentProficiency}%
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}> / {gap.requiredProficiency}% req</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {gap.recommendation}
                </p>
              </div>
            ))}
          </div>

          <button
            id="btn-goto-roadmap"
            className="btn btn-primary btn-lg"
            onClick={onNavigateToRoadmap}
            style={{ marginTop: '1.25rem', width: '100%' }}
          >
            <Zap size={18} /> View Personalized Learning Roadmap ({missing.length} Gaps)
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

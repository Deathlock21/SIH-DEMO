import React, { useState } from 'react';
import { CollegeBatchAnalytics, IndustryEvaluation } from '../../types';
import { 
  School, 
  Users, 
  TrendingUp, 
  Briefcase, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface CollegeAnalyticsViewProps {
  analytics: CollegeBatchAnalytics;
  evaluations: IndustryEvaluation[];
  onActionTaken: (gapId: string) => void;
}

export const CollegeAnalyticsView: React.FC<CollegeAnalyticsViewProps> = ({
  analytics,
  evaluations,
  onActionTaken
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'feedback'>('overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* College Banner */}
      <div className="glass-panel" style={{ 
        padding: '2rem',
        background: '#ffffff',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        position: 'relative',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <School size={22} color="var(--primary-red)" />
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a' }}>College Dashboard & Curriculum Intelligence</h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Apex Institute of Technology • Batch Analytics & Continuous Curriculum Alignment 2025-2026
            </p>
          </div>

          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', background: '#f8fafc', padding: '0.35rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <button
              id="tab-college-overview"
              className={`role-pill ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
              style={{ fontSize: '0.78rem' }}
            >
              <TrendingUp size={15} /> Overview & Supply-Demand
            </button>
            <button
              id="tab-college-curriculum"
              className={`role-pill ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
              style={{ fontSize: '0.78rem' }}
            >
              <AlertTriangle size={15} /> Curriculum Gap Advisor
            </button>
            <button
              id="tab-college-feedback"
              className={`role-pill ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => setActiveTab('feedback')}
              style={{ fontSize: '0.78rem' }}
            >
              <MessageSquare size={15} /> Industry Mentors' Feedback ({evaluations.length})
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-4">
        <div className="glass-panel" style={{ padding: '1.4rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Enrolled Students</span>
            <Users size={18} color="var(--primary-red)" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0f172a' }}>
            {analytics.totalStudents}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Across 4 Academic Departments
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Placement Readiness</span>
            <TrendingUp size={18} color="var(--primary-red)" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: '900', color: 'var(--primary-red)' }}>
            {analytics.placementReadyPercentage}%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.25rem', fontWeight: '600' }}>
            +14% since INTERNPARK Inscription
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Active Internships</span>
            <Briefcase size={18} color="var(--primary-red)" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: '900', color: '#0f172a' }}>
            {analytics.activeInternships}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            92% Pre-Placement Offer Rate
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>Industry Partners</span>
            <Building2 size={18} color="var(--primary-red)" />
          </div>
          <div style={{ fontSize: '2.1rem', fontWeight: '900', color: 'var(--primary-red)' }}>
            {analytics.industryPartners}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Direct Enterprise API integrated
          </div>
        </div>
      </div>

      {/* Main Content Area Based on Tab */}
      {activeTab === 'overview' && (
        <div className="grid-2">
          {/* Industry Demand vs Student Supply Gap Chart */}
          <div className="glass-panel" style={{ padding: '1.75rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Industry Demand vs. Student Capability</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Highlighting market deficits to calibrate institutional curriculum.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#334155', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600' }}>
                  <span style={{ width: '8px', height: '8px', background: '#334155', borderRadius: '2px' }} /> Industry Demand
                </span>
                <span style={{ color: 'var(--primary-red)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600' }}>
                  <span style={{ width: '8px', height: '8px', background: 'var(--primary-red)', borderRadius: '2px' }} /> Student Supply
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {analytics.topDemandedSkills.map(item => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.name}</span>
                    <span style={{ color: item.gap > 35 ? '#dc2626' : '#059669', fontWeight: '700', fontSize: '0.8rem' }}>
                      {item.gap > 35 ? `⚠️ Critical Gap (${item.gap}%)` : 'Balanced'}
                    </span>
                  </div>

                  {/* Dual comparative bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {/* Demand Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', width: '45px', color: 'var(--text-muted)' }}>Demand</span>
                      <div className="progress-bar-track" style={{ height: '7px', flex: 1, background: '#f1f5f9' }}>
                        <div className="progress-bar-fill" style={{ width: `${item.demandIndex}%`, background: '#334155' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#334155', width: '30px', textAlign: 'right', fontWeight: '700' }}>{item.demandIndex}%</span>
                    </div>

                    {/* Supply Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', width: '45px', color: 'var(--text-muted)' }}>Supply</span>
                      <div className="progress-bar-track" style={{ height: '7px', flex: 1, background: '#f1f5f9' }}>
                        <div className="progress-bar-fill" style={{ width: `${item.studentReadinessIndex}%`, background: '#dc2626' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#dc2626', width: '30px', textAlign: 'right', fontWeight: '700' }}>{item.studentReadinessIndex}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branch-wise Readiness Distribution */}
          <div className="glass-panel" style={{ padding: '1.75rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Branch Readiness Distribution</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Aggregate placement readiness score across departments.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {analytics.branchReadiness.map(branch => (
                <div key={branch.branch} style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#0f172a' }}>{branch.branch}</span>
                    <span style={{ color: branch.readinessScore >= 75 ? '#059669' : '#b45309', fontWeight: '800' }}>
                      {branch.readinessScore}% Ready
                    </span>
                  </div>
                  <div className="progress-bar-track" style={{ height: '8px', marginBottom: '0.5rem', background: '#e2e8f0' }}>
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${branch.readinessScore}%`,
                        background: branch.readinessScore >= 75 
                          ? 'linear-gradient(90deg, #f87171, #dc2626)' 
                          : 'linear-gradient(90deg, #f59e0b, #d97706)'
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Cohort Size: {branch.studentCount} Students
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Curriculum Gap Advisor Tab */}
      {activeTab === 'curriculum' && (
        <div className="glass-panel" style={{ padding: '2rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={20} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a' }}>Automated AI Curriculum Gap Advisor</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
            INTERNPARK automatically correlates outgoing industry internship job descriptions with college syllabus keywords, issuing actionable intervention alerts.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {analytics.curriculumGaps.map(gap => (
              <div 
                key={gap.id}
                style={{
                  background: '#f8fafc',
                  border: `1px solid ${gap.gapSeverity === 'Critical' ? 'rgba(220, 38, 38, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className={`badge ${gap.gapSeverity === 'Critical' ? 'badge-rose' : 'badge-amber'}`}>
                      {gap.gapSeverity} Gap
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>{gap.topic}</h4>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    <strong>Industry Requirement:</strong> {gap.industryRequirement}
                  </p>
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(220, 38, 38, 0.05)',
                    borderLeft: '3px solid var(--primary-red)',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '0.85rem',
                    color: 'var(--text-main)'
                  }}>
                    <strong>AI Recommendation:</strong> {gap.proposedAction}
                  </div>
                </div>

                <div style={{ alignSelf: 'center' }}>
                  {gap.actionTaken ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: '700', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={18} />
                      <span>Bootcamp Approved</span>
                    </div>
                  ) : (
                    <button
                      id={`btn-act-gap-${gap.id}`}
                      className="btn btn-primary btn-sm"
                      onClick={() => onActionTaken(gap.id)}
                    >
                      <span>Approve Workshop / Action</span>
                      <ArrowUpRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Feed Tab */}
      {activeTab === 'feedback' && (
        <div className="glass-panel" style={{ padding: '2rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <MessageSquare size={20} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.3rem', color: '#0f172a' }}>Live Corporate Feedback Stream (The Feedback Loop)</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
            Authentic evaluations submitted by partner employers upon completion of student internships.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {evaluations.map(ev => (
              <div 
                key={ev.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>
                      {ev.studentName} — {ev.role}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {ev.companyName} • Evaluated by {ev.mentorName} • {ev.submittedAt}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-emerald">Rating: {ev.technicalCompetenceScore} / 5.0</span>
                    {ev.readyForPPO && <span className="badge badge-rose">PPO Recommended</span>}
                  </div>
                </div>

                <blockquote style={{
                  padding: '0.85rem 1rem',
                  background: 'rgba(220, 38, 38, 0.05)',
                  borderLeft: '3px solid var(--primary-red)',
                  borderRadius: '0 6px 6px 0',
                  fontSize: '0.88rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  marginBottom: '1rem'
                }}>
                  "{ev.curriculumFeedback}"
                </blockquote>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Demonstrated Competencies: </span>
                    {ev.endorsedSkills.map(s => (
                      <span key={s} style={{ color: '#059669', fontWeight: '600', marginRight: '0.5rem' }}>
                        ✓ {s}
                      </span>
                    ))}
                  </div>

                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Identified Deficits: </span>
                    {ev.skillsLacking.map(s => (
                      <span key={s} style={{ color: '#dc2626', fontWeight: '600', marginRight: '0.5rem' }}>
                        ✗ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

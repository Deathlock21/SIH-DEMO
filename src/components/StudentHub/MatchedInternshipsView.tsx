import React, { useState } from 'react';
import { StudentProfile, JobOpportunity } from '../../types';
import { JOB_OPPORTUNITIES } from '../../data/mockData';
import { calculateExplainableMatch } from '../../lib/skillIntelligence';
import { TiltCard } from '../TiltCard';
import { 
  Building2, 
  MapPin, 
  Banknote, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Send,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MatchedInternshipsViewProps {
  student: StudentProfile;
  onApplySuccess: (jobTitle: string, company: string) => void;
}

export const MatchedInternshipsView: React.FC<MatchedInternshipsViewProps> = ({
  student,
  onApplySuccess
}) => {
  const [expandedJobId, setExpandedJobId] = useState<string | null>('job-101');
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

  const handleApply = (job: JobOpportunity) => {
    setAppliedJobIds(prev => new Set(prev).add(job.id));
    onApplySuccess(job.title, job.company);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ 
        padding: '2rem', 
        position: 'relative', 
        overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <span className="radar-pulse-dot" />
          <Building2 size={20} color="var(--primary-red)" />
          <h2 style={{ fontSize: '1.6rem', color: '#0f172a' }}>Matched Internship Opportunities</h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Ranked dynamically by verified skill proficiencies and transparent explainable match scores. Discover the <strong style={{ color: 'var(--primary-red)' }}>82% Match</strong> on NexaCloud with verified credentials!
        </p>
      </div>

      {/* Opportunities List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {JOB_OPPORTUNITIES.map(job => {
          const matchResult = calculateExplainableMatch(student.skills, job.requiredSkills);
          const isExpanded = expandedJobId === job.id;
          const isApplied = appliedJobIds.has(job.id);
          const isHighMatch = matchResult.overallScore >= 80;

          return (
            <TiltCard 
              key={job.id}
              maxTilt={4}
              glowColor={isHighMatch ? 'red' : 'white'}
              style={{
                padding: '1.75rem',
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderLeft: `4px solid ${
                  isHighMatch ? '#dc2626' :
                  matchResult.overallScore >= 60 ? '#f59e0b' : '#cbd5e1'
                }`,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Main Card Row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: '#f8fafc',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}>
                    {job.logo}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>{job.title}</h3>
                      <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>{job.type}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <span style={{ color: 'var(--primary-red)', fontWeight: '700' }}>{job.company}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={13} color="var(--primary-red)" /> {job.location}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#0f172a', fontWeight: '700' }}>
                        <Banknote size={13} color="var(--primary-red)" /> {job.stipend}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score & Apply CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(220, 38, 38, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.6rem 1.25rem',
                    textAlign: 'right',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
                      Match Score
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      color: matchResult.overallScore >= 80 ? 'var(--primary-red)' : 'var(--accent-amber)'
                    }}>
                      {matchResult.overallScore}%
                    </div>
                  </div>

                  <button
                    id={`btn-apply-${job.id}`}
                    className={`btn ${isApplied ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => !isApplied && handleApply(job)}
                    disabled={isApplied}
                    style={{ minWidth: '135px' }}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 size={16} color="#059669" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>1-Click Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Description Snippet */}
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '1rem 0', lineHeight: 1.5 }}>
                {job.description}
              </p>

              {/* Explainable AI Match Breakdown Toggle */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                <button
                  id={`btn-toggle-explain-${job.id}`}
                  onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--primary-red)',
                    fontSize: '0.825rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0'
                  }}
                >
                  <Sparkles size={14} />
                  <span>{isExpanded ? 'Hide' : 'View'} Explainable Match Diagnostic Breakdown</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {isExpanded && (
                  <div style={{
                    marginTop: '0.75rem',
                    background: '#f8fafc',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    animation: 'fadeIn 200ms ease-out'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0f172a' }}>
                      Algorithm Breakdown ({matchResult.verdict}):
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic' }}>
                      "{matchResult.summary}"
                    </div>

                    <div className="grid-3" style={{ gap: '0.75rem' }}>
                      {/* Fully Matched */}
                      <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={13} /> Matched Skills ({matchResult.matchedSkills.length})
                        </div>
                        {matchResult.matchedSkills.map(s => (
                          <div key={s.name} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>✓ {s.name}</span>
                            <span style={{ color: '#059669', fontWeight: '600' }}>+{s.contribution}%</span>
                          </div>
                        ))}
                      </div>

                      {/* Developing */}
                      <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#b45309', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <AlertTriangle size={13} /> Developing / Partial ({matchResult.developingSkills.length})
                        </div>
                        {matchResult.developingSkills.map(s => (
                          <div key={s.name} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>⚠️ {s.name}</span>
                            <span style={{ color: '#b45309', fontWeight: '600' }}>{s.current}% / {s.required}%</span>
                          </div>
                        ))}
                      </div>

                      {/* Missing */}
                      <div style={{ background: 'rgba(220, 38, 38, 0.06)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#dc2626', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <XCircle size={13} /> Missing Skills ({matchResult.missingSkills.length})
                        </div>
                        {matchResult.missingSkills.map(s => (
                          <div key={s.name} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>✗ {s.name}</span>
                            <span style={{ color: '#dc2626', fontWeight: '600' }}>0%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
};

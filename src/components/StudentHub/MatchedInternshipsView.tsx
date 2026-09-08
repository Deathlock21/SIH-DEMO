import React, { useState } from 'react';
import { StudentProfile, JobOpportunity } from '../../types';
import { JOB_OPPORTUNITIES } from '../../data/mockData';
import { calculateExplainableMatch } from '../../lib/skillIntelligence';
import { 
  Building2, 
  MapPin, 
  Banknote, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Clock, 
  Send,
  HelpCircle,
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
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Building2 size={20} color="#06b6d4" />
          <h2 style={{ fontSize: '1.4rem' }}>AI-Matched Industry Opportunities</h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Ranked dynamically by your verified skills & transparent match score. Notice the <strong>82% Match</strong> on NexaCloud!
        </p>
      </div>

      {/* Opportunities List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {JOB_OPPORTUNITIES.map(job => {
          const matchResult = calculateExplainableMatch(student.skills, job.requiredSkills);
          const isExpanded = expandedJobId === job.id;
          const isApplied = appliedJobIds.has(job.id);

          return (
            <div 
              key={job.id}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                borderLeft: `4px solid ${
                  matchResult.overallScore >= 80 ? '#10b981' :
                  matchResult.overallScore >= 60 ? '#f59e0b' : 'var(--border-subtle)'
                }`
              }}
            >
              {/* Main Card Row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem'
                  }}>
                    {job.logo}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{job.title}</h3>
                      <span className="badge badge-purple">{job.type}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{job.company}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={13} /> {job.location}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#34d399', fontWeight: '600' }}>
                        <Banknote size={13} /> {job.stipend}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score & Apply CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.5rem 1rem',
                    textAlign: 'right'
                  }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Explainable Match
                    </div>
                    <div style={{
                      fontSize: '1.4rem',
                      fontWeight: '800',
                      color: matchResult.overallScore >= 80 ? '#10b981' : '#f59e0b'
                    }}>
                      {matchResult.overallScore}%
                    </div>
                  </div>

                  <button
                    id={`btn-apply-${job.id}`}
                    className={`btn ${isApplied ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => !isApplied && handleApply(job)}
                    disabled={isApplied}
                    style={{ minWidth: '120px' }}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 size={16} color="#10b981" />
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
                    color: '#22d3ee',
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
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    animation: 'fadeIn 200ms ease-out'
                  }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: '#ffffff' }}>
                      Algorithm Breakdown ({matchResult.verdict}):
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontStyle: 'italic' }}>
                      "{matchResult.summary}"
                    </div>

                    <div className="grid-3" style={{ gap: '0.75rem' }}>
                      {/* Fully Matched */}
                      <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#34d399', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={13} /> Matched Skills ({matchResult.matchedSkills.length})
                        </div>
                        {matchResult.matchedSkills.map(s => (
                          <div key={s.name} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>✓ {s.name}</span>
                            <span style={{ color: '#34d399' }}>+{s.contribution}%</span>
                          </div>
                        ))}
                      </div>

                      {/* Developing */}
                      <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#fbbf24', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <AlertTriangle size={13} /> Developing / Partial ({matchResult.developingSkills.length})
                        </div>
                        {matchResult.developingSkills.map(s => (
                          <div key={s.name} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>⚠️ {s.name}</span>
                            <span style={{ color: '#fbbf24' }}>{s.current}% / {s.required}%</span>
                          </div>
                        ))}
                      </div>

                      {/* Missing */}
                      <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#fb7185', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <XCircle size={13} /> Missing Skills ({matchResult.missingSkills.length})
                        </div>
                        {matchResult.missingSkills.map(s => (
                          <div key={s.name} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>✗ {s.name}</span>
                            <span style={{ color: '#fb7185' }}>0%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

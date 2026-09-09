import React, { useState } from 'react';
import { CandidateItem, StudentProfile } from '../../types';
import { SAMPLE_CANDIDATES } from '../../data/mockData';
import { 
  Building2, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Calendar, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface CandidateMatcherProps {
  onOpenEvaluationModal: (candidate: CandidateItem) => void;
  onSelectCandidateProfile?: (candidateId: string) => void;
}

export const CandidateMatcher: React.FC<CandidateMatcherProps> = ({
  onOpenEvaluationModal
}) => {
  const [candidates, setCandidates] = useState<CandidateItem[]>(SAMPLE_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateItem>(SAMPLE_CANDIDATES[0]); // Rohan Sharma by default
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.college.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const updateStatus = (id: string, newStatus: CandidateItem['status']) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
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
              <Building2 size={20} color="var(--primary-red)" />
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a' }}>Industry Recruiter Portal & Candidate Matcher</h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Internship Role: <strong style={{ color: 'var(--primary-red)' }}>Backend & Cloud Engineering Intern</strong> @ NexaCloud Technologies
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-rose">
              Explainable AI Match Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 1.8fr' }}>
        {/* Left Column: Candidates List */}
        <div className="glass-panel" style={{ 
          padding: '1.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <Search size={16} color="var(--primary-red)" />
            <input
              type="text"
              placeholder="Search candidate by name or college..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#0f172a', outline: 'none', width: '100%', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '560px', overflowY: 'auto' }}>
            {filteredCandidates.map(candidate => {
              const isSelected = selectedCandidate.id === candidate.id;
              return (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedCandidate(candidate)}
                  style={{
                    background: isSelected ? 'rgba(220, 38, 38, 0.06)' : '#ffffff',
                    border: `1px solid ${isSelected ? 'var(--primary-red)' : 'rgba(0, 0, 0, 0.08)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 150ms ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(220, 38, 38, 0.3)' }}
                      />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.98rem', color: '#0f172a' }}>{candidate.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{candidate.college}</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '1.35rem',
                        fontWeight: '800',
                        color: candidate.matchScore >= 80 ? 'var(--primary-red)' : 'var(--accent-amber)'
                      }}>
                        {candidate.matchScore}%
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                        Match
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                    <span className="badge badge-rose" style={{ fontSize: '0.68rem' }}>
                      CGPA {candidate.cgpa}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Status: <strong style={{ color: '#0f172a' }}>{candidate.status}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Explainable Deep-Dive & Action Console */}
        <div className="glass-panel" style={{ 
          padding: '2rem',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', border: '2px solid var(--primary-red)', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.15)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>{selectedCandidate.name}</h3>
                  <span className="badge badge-emerald">Verified Candidate</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {selectedCandidate.college} • CGPA {selectedCandidate.cgpa}
                </div>
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(220, 38, 38, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.5rem',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--primary-red)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Match Score
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--primary-red)' }}>
                {selectedCandidate.matchScore}%
              </div>
            </div>
          </div>

          {/* Explainable AI Match Section (SIH Problem Statement Focus) */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={16} color="var(--primary-red)" />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>
                Explainable Match Breakdown for {selectedCandidate.name}
              </h4>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Transparent breakdown showing verified competencies, partial matches, and curriculum deficits:
            </p>

            {/* Exactly reproduces the 82% example from user's SIH prompt! */}
            {selectedCandidate.id === 'stu-2026-001' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.85rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.88rem' }}>Python (88% verified proficiency)</span>
                  <span style={{ color: '#059669', fontWeight: '700', fontSize: '0.85rem' }}>+25% Contribution</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.85rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.88rem' }}>SQL (82% verified proficiency)</span>
                  <span style={{ color: '#059669', fontWeight: '700', fontSize: '0.85rem' }}>+25% Contribution</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.85rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.88rem' }}>Problem Solving (85% verified proficiency)</span>
                  <span style={{ color: '#059669', fontWeight: '700', fontSize: '0.85rem' }}>+20% Contribution</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.85rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.88rem' }}>REST API (55% self-reported)</span>
                  <span style={{ color: '#b45309', fontWeight: '700', fontSize: '0.85rem' }}>+12% Partial</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0.85rem', background: '#ffffff', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(220, 38, 38, 0.25)' }}>
                  <span style={{ color: '#0f172a', fontWeight: '600', fontSize: '0.88rem' }}>Cloud Basics (No verified AWS/GCP signals)</span>
                  <span style={{ color: '#dc2626', fontWeight: '700', fontSize: '0.85rem' }}>0% (Deficit)</span>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Candidate matches required core skills with high proficiency.
              </div>
            )}
          </div>

          {/* Recruiter Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                id="btn-shortlist"
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => updateStatus(selectedCandidate.id, 'Shortlisted')}
              >
                <CheckCircle2 size={16} /> Shortlist Candidate
              </button>
              <button
                id="btn-schedule-interview"
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => updateStatus(selectedCandidate.id, 'Interview Scheduled')}
              >
                <Calendar size={16} /> Schedule Interview
              </button>
            </div>

            {/* The Feedback Loop Trigger */}
            <button
              id="btn-evaluate-intern"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={() => onOpenEvaluationModal(selectedCandidate)}
            >
              <Award size={18} /> Submit Post-Internship Evaluation (Closes Feedback Loop)
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Submitting evaluation updates student's verified profile & sends curriculum feedback to their college.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CandidateItem, IndustryEvaluation } from '../../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Star, 
  Award, 
  ShieldCheck, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Building,
  School
} from 'lucide-react';

interface EvaluationFeedbackModalProps {
  candidate: CandidateItem;
  onClose: () => void;
  onSubmitEvaluation: (evaluation: IndustryEvaluation) => void;
}

export const EvaluationFeedbackModal: React.FC<EvaluationFeedbackModalProps> = ({
  candidate,
  onClose,
  onSubmitEvaluation
}) => {
  const [rating, setRating] = useState(5);
  const [selectedEndorsements, setSelectedEndorsements] = useState<string[]>(['Python', 'SQL', 'REST API']);
  const [selectedLacking, setSelectedLacking] = useState<string[]>(['Docker', 'Cloud Basics']);
  const [curriculumFeedback, setCurriculumFeedback] = useState(
    'Rohan showed exceptional core coding logic and fast Python turnarounds. However, our team spent 10 days onboarding him onto production Docker and AWS container setups. We strongly urge the college syllabus committee to introduce containerization earlier in 5th/6th semester.'
  );
  const [readyForPPO, setReadyForPPO] = useState(true);

  const toggleEndorsement = (skill: string) => {
    setSelectedEndorsements(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleLacking = (skill: string) => {
    setSelectedLacking(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const evaluation: IndustryEvaluation = {
      id: `eval-${Date.now()}`,
      internshipId: 'int-1',
      studentId: candidate.id,
      studentName: candidate.name,
      companyName: 'NexaCloud Technologies',
      mentorName: 'Vikramaditya Sengupta (VP Engineering)',
      role: 'Backend & Cloud Engineering Intern',
      submittedAt: 'Just now (SIH Live)',
      technicalCompetenceScore: rating,
      endorsedSkills: selectedEndorsements,
      skillsLacking: selectedLacking,
      curriculumFeedback,
      readyForPPO
    };

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onSubmitEvaluation(evaluation);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <RefreshCw size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Industry Evaluation & Feedback Loop</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Authorized Mentor Review for {candidate.name} ({candidate.college})
              </p>
            </div>
          </div>

          <button 
            id="btn-close-eval-modal"
            onClick={onClose} 
            className="btn btn-ghost" 
            style={{ padding: '0.4rem' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Rating */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Overall Technical Deliverable Score:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.2rem',
                    color: star <= rating ? '#eab308' : '#cbd5e1'
                  }}
                >
                  <Star size={28} fill={star <= rating ? '#eab308' : 'none'} />
                </button>
              ))}
              <span style={{ fontSize: '0.9rem', fontWeight: '700', marginLeft: '0.5rem', color: '#b45309' }}>
                {rating} / 5.0 Rating
              </span>
            </div>
          </div>

          {/* Endorsed Skills */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
              Skills Officially Endorsed (Upgrades student's verified profile):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Python', 'SQL', 'REST API', 'Problem Solving', 'Git', 'FastAPI'].map(skill => {
                const isSelected = selectedEndorsements.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleEndorsement(skill)}
                    style={{
                      background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-surface)',
                      border: `1px solid ${isSelected ? '#10b981' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-full)',
                      padding: '0.4rem 0.85rem',
                      color: isSelected ? '#34d399' : 'var(--text-secondary)',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <CheckCircle2 size={13} /> {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lacking Skills */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
              Skills Found Lacking During Project Sprints (Informs College Curriculum):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Docker', 'Cloud Basics', 'CI/CD Pipelines', 'System Design', 'Kubernetes'].map(skill => {
                const isSelected = selectedLacking.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleLacking(skill)}
                    style={{
                      background: isSelected ? 'rgba(244, 63, 94, 0.2)' : 'var(--bg-surface)',
                      border: `1px solid ${isSelected ? '#f43f5e' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-full)',
                      padding: '0.4rem 0.85rem',
                      color: isSelected ? '#fb7185' : 'var(--text-secondary)',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <AlertCircle size={13} /> {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Curriculum Feedback */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
              Actionable Feedback for College Syllabus Committee:
            </label>
            <textarea
              id="input-curriculum-feedback"
              rows={4}
              value={curriculumFeedback}
              onChange={(e) => setCurriculumFeedback(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* PPO Recommendation Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Recommend Pre-Placement Offer (PPO)?</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Candidate fast-tracked for full-time conversion</div>
            </div>
            <button
              type="button"
              onClick={() => setReadyForPPO(!readyForPPO)}
              className={`btn btn-sm ${readyForPPO ? 'btn-primary' : 'btn-secondary'}`}
            >
              {readyForPPO ? '✓ Yes, Recommend PPO' : 'No PPO at this time'}
            </button>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose} 
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button 
              id="btn-submit-feedback-loop"
              type="submit" 
              className="btn btn-primary btn-lg" 
              style={{ flex: 2 }}
            >
              <RefreshCw size={18} /> Submit Evaluation & Close Loop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

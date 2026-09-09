import React, { useState } from 'react';
import { RoadmapMilestone } from '../types';
import confetti from 'canvas-confetti';
import { X, Award, CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

interface AssessmentModalProps {
  milestone: RoadmapMilestone;
  onClose: () => void;
  onPassAssessment: (skillName: string) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  milestone,
  onClose,
  onPassAssessment
}) => {
  const quiz = milestone.quiz || [
    {
      question: `Which fundamental principle is key to mastering ${milestone.skillTarget}?`,
      options: [
        'Component isolation, immutable data flow, and predictable state lifecycle',
        'Direct global DOM manipulation inside loops',
        'Omitting error catching in async promises',
        'Hardcoding endpoint URLs across components'
      ],
      correctIdx: 0
    },
    {
      question: 'What is the recommended approach for handling asynchronous data states in modern web applications?',
      options: [
        'Synchronous blocking while waiting for database response',
        'Stateful transitions: loading, success, error, and cached fallback',
        'Restarting the browser tab',
        'Ignoring network timeouts'
      ],
      correctIdx: 1
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectOption = (optIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentIdx] = optIdx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIdx < quiz.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Calculate score
      let correct = 0;
      quiz.forEach((q, i) => {
        if (selectedAnswers[i] === q.correctIdx) correct++;
      });

      const passed = correct >= Math.ceil(quiz.length * 0.7);
      if (passed) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        onPassAssessment(milestone.skillTarget);
      }
      setIsFinished(true);
    }
  };

  const currentQ = quiz[currentIdx];
  const answeredCount = selectedAnswers.filter(a => a !== undefined).length;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)'
            }}>
              <Award size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
                Skill Verification Assessment: {milestone.skillTarget}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Proctored INTERNPARK Diagnostic Assessment
              </p>
            </div>
          </div>

          <button id="btn-close-quiz-modal" onClick={onClose} className="btn btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span>Question {currentIdx + 1} of {quiz.length}</span>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>Passing score: 70%</span>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: 1.5, color: 'var(--text-main)' }}>
              {currentQ.question}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    style={{
                      background: isSelected ? 'rgba(220, 38, 38, 0.08)' : '#ffffff',
                      border: isSelected ? '2px solid #dc2626' : '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      textAlign: 'left',
                      color: isSelected ? '#991b1b' : 'var(--text-main)',
                      fontWeight: isSelected ? '600' : '400',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 150ms ease'
                    }}
                  >
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: isSelected ? '#dc2626' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                id="btn-quiz-next"
                className="btn btn-primary"
                onClick={handleNext}
                disabled={selectedAnswers[currentIdx] === undefined}
                style={{ opacity: selectedAnswers[currentIdx] === undefined ? 0.4 : 1 }}
              >
                <span>{currentIdx === quiz.length - 1 ? 'Submit Assessment' : 'Next Question'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Assessment Passed! Skill Verified
            </h3>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.5 }}>
              Congratulations! Your verified competency for <strong>{milestone.skillTarget}</strong> has been updated on your Skill Profile and reflected across industry recruiter pipelines.
            </p>

            <button id="btn-finish-quiz" className="btn btn-primary btn-lg" onClick={onClose} style={{ marginTop: '0.5rem' }}>
              Return to Skill Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

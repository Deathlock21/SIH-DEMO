import React, { useState } from 'react';
import { StudentProfile, RoadmapMilestone, TargetRole } from '../../types';
import { TARGET_ROLES } from '../../data/mockData';
import { analyzeSkillGaps, generatePersonalizedRoadmap } from '../../lib/skillIntelligence';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  ExternalLink, 
  Award, 
  Sparkles, 
  PlayCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface RoadmapViewProps {
  student: StudentProfile;
  onLaunchAssessment: (milestone: RoadmapMilestone) => void;
  onNavigateToInternships: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  student,
  onLaunchAssessment,
  onNavigateToInternships
}) => {
  const currentRole = TARGET_ROLES.find(r => r.id === student.targetRoleId) || TARGET_ROLES[0];
  const gaps = analyzeSkillGaps(student, currentRole);
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>(() => generatePersonalizedRoadmap(gaps));

  const toggleTask = (milestoneId: string, taskId: string) => {
    setMilestones(prev => prev.map(m => {
      if (m.id !== milestoneId) return m;
      const updatedTasks = m.tasks.map(t => {
        if (t.id !== taskId) return t;
        const newCompleted = !t.completed;
        if (newCompleted) {
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.7 }
          });
        }
        return { ...t, completed: newCompleted };
      });
      return { ...m, tasks: updatedTasks };
    }));
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
              <Sparkles size={20} color="var(--primary-red)" />
              <h2 style={{ fontSize: '1.6rem', color: '#0f172a' }}>Personalized Learning Roadmap</h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Tailored curriculum to bridge identified skill gaps for <strong style={{ color: 'var(--primary-red)' }}>{currentRole.title}</strong>.
            </p>
          </div>

          <button 
            id="btn-goto-internships"
            className="btn btn-primary"
            onClick={onNavigateToInternships}
          >
            <span>View Matched Internships</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 4-Tier Stepper Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {milestones.map((milestone) => {
          const allCompleted = milestone.tasks.every(t => t.completed);
          const completedCount = milestone.tasks.filter(t => t.completed).length;

          return (
            <div 
              key={milestone.id}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                background: '#ffffff',
                borderLeft: `4px solid ${
                  milestone.status === 'locked' ? '#cbd5e1' :
                  allCompleted ? '#059669' : '#dc2626'
                }`,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                opacity: milestone.status === 'locked' ? 0.7 : 1,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: milestone.status === 'locked' 
                      ? '#f1f5f9' 
                      : 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    border: `1px solid ${milestone.status === 'locked' ? '#cbd5e1' : '#b91c1c'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: milestone.status === 'locked' ? 'var(--text-muted)' : '#ffffff',
                    fontWeight: '800',
                    fontSize: '1rem'
                  }}>
                    {milestone.status === 'locked' ? <Lock size={18} /> : `P${milestone.level}`}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>{milestone.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {milestone.duration}
                      </span>
                      <span>•</span>
                      <span style={{ color: 'var(--primary-red)', fontWeight: '600' }}>Skill Target: {milestone.skillTarget}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`badge ${allCompleted ? 'badge-emerald' : milestone.status === 'locked' ? 'badge-amber' : 'badge-rose'}`}>
                    {allCompleted ? 'Milestone Completed' : `${completedCount}/${milestone.tasks.length} Tasks Completed`}
                  </span>

                  {milestone.quiz && (
                    <button
                      id={`btn-assessment-${milestone.id}`}
                      className="btn btn-primary btn-sm"
                      onClick={() => onLaunchAssessment(milestone)}
                    >
                      <Award size={14} /> Take Skill Verification Quiz
                    </button>
                  )}
                </div>
              </div>

              {/* Task Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {milestone.tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => milestone.status !== 'locked' && toggleTask(milestone.id, task.id)}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: milestone.status === 'locked' ? 'default' : 'pointer',
                      transition: 'background 150ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {task.completed ? (
                        <CheckCircle2 size={18} color="#059669" />
                      ) : (
                        <Circle size={18} color="var(--text-muted)" />
                      )}
                      <span style={{
                        fontSize: '0.88rem',
                        color: task.completed ? 'var(--text-muted)' : 'var(--text-main)',
                        textDecoration: task.completed ? 'line-through' : 'none'
                      }}>
                        {task.text}
                      </span>
                    </div>

                    {task.link && (
                      <a
                        href={task.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: 'var(--primary-red)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600' }}
                      >
                        <span>Resource Docs</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

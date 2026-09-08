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
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Sparkles size={20} color="#06b6d4" />
              <h2 style={{ fontSize: '1.4rem' }}>Personalized Learning Roadmap</h2>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Tailored specifically to bridge identified gaps for <strong>{currentRole.title}</strong>.
            </p>
          </div>

          <button 
            id="btn-goto-internships"
            className="btn btn-secondary"
            onClick={onNavigateToInternships}
          >
            <span>View Unlocked Internships</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 4-Tier Stepper Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {milestones.map((milestone, idx) => {
          const allCompleted = milestone.tasks.every(t => t.completed);
          const completedCount = milestone.tasks.filter(t => t.completed).length;

          return (
            <div 
              key={milestone.id}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                borderLeft: `4px solid ${
                  milestone.status === 'locked' ? 'var(--border-subtle)' :
                  allCompleted ? '#10b981' : '#06b6d4'
                }`,
                opacity: milestone.status === 'locked' ? 0.65 : 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: milestone.status === 'locked' 
                      ? 'rgba(255,255,255,0.05)' 
                      : 'rgba(6, 182, 212, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: milestone.status === 'locked' ? 'var(--text-muted)' : '#22d3ee',
                    fontWeight: '800',
                    fontSize: '1rem'
                  }}>
                    {milestone.status === 'locked' ? <Lock size={18} /> : milestone.level}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>{milestone.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {milestone.duration}
                      </span>
                      <span>•</span>
                      <span style={{ color: '#22d3ee' }}>Focus Skill: {milestone.skillTarget}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`badge ${allCompleted ? 'badge-emerald' : milestone.status === 'locked' ? 'badge-amber' : 'badge-cyan'}`}>
                    {allCompleted ? 'Phase Complete' : `${completedCount}/${milestone.tasks.length} Done`}
                  </span>

                  {milestone.quiz && (
                    <button
                      id={`btn-assessment-${milestone.id}`}
                      className="btn btn-primary btn-sm"
                      onClick={() => onLaunchAssessment(milestone)}
                      style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}
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
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
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
                        <CheckCircle2 size={18} color="#10b981" />
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
                        style={{ color: '#06b6d4', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
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

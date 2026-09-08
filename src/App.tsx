import React, { useState } from 'react';
import './App.css';
import { 
  ActivePersona, 
  StudentProfile, 
  SkillItem, 
  RoadmapMilestone, 
  IndustryEvaluation, 
  CandidateItem,
  CollegeBatchAnalytics
} from './types';
import { 
  INITIAL_STUDENT, 
  COLLEGE_BATCH_DATA, 
  INITIAL_EVALUATIONS, 
  SAMPLE_CANDIDATES 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { StudentProfileView } from './components/StudentHub/StudentProfileView';
import { SkillRadarView } from './components/StudentHub/SkillRadarView';
import { RoadmapView } from './components/StudentHub/RoadmapView';
import { MatchedInternshipsView } from './components/StudentHub/MatchedInternshipsView';
import { CandidateMatcher } from './components/IndustryPortal/CandidateMatcher';
import { EvaluationFeedbackModal } from './components/IndustryPortal/EvaluationFeedbackModal';
import { CollegeAnalyticsView } from './components/CollegeDashboard/CollegeAnalyticsView';
import { SlideDeck } from './components/PresentationMode/SlideDeck';
import { AssessmentModal } from './components/AssessmentModal';
import { NotificationToast, ToastMessage } from './components/NotificationToast';

import { 
  UserCheck, 
  Compass, 
  Target, 
  Zap, 
  Briefcase, 
  Sparkles, 
  RefreshCw,
  Award,
  Layers
} from 'lucide-react';

export function App() {
  const [activePersona, setActivePersona] = useState<ActivePersona>('student');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);
  const [studentTab, setStudentTab] = useState<'gap' | 'roadmap' | 'profile' | 'jobs'>('gap');
  
  const [evaluations, setEvaluations] = useState<IndustryEvaluation[]>(INITIAL_EVALUATIONS);
  const [collegeAnalytics, setCollegeAnalytics] = useState<CollegeBatchAnalytics>(COLLEGE_BATCH_DATA);
  
  const [evalModalCandidate, setEvalModalCandidate] = useState<CandidateItem | null>(null);
  const [quizMilestone, setQuizMilestone] = useState<RoadmapMilestone | null>(null);
  
  const [toasts, setToasts] = useState<ToastMessage[]>([
    {
      id: 'toast-init',
      title: 'SkillBridge SIH26044 Demo Ready',
      message: 'Explore Student, Industry, and College personas or launch the 12-slide Pitch Deck.',
      type: 'info'
    }
  ]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add Skill handler
  const handleAddSkill = (skill: SkillItem) => {
    setStudent(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
    addToast('Skill Added to Profile', `Added ${skill.name} (${skill.proficiency}%) to Rohan's Skill Profile`, 'success');
  };

  // Target Role Selection
  const handleSelectRole = (roleId: string) => {
    setStudent(prev => ({
      ...prev,
      targetRoleId: roleId
    }));
    addToast('Target Role Updated', 'Skill Gap and learning roadmap recalculated.', 'info');
  };

  // Pass Assessment
  const handlePassAssessment = (skillTarget: string) => {
    setStudent(prev => {
      const existing = prev.skills.find(s => s.name.toLowerCase() === skillTarget.toLowerCase());
      let updatedSkills: SkillItem[];
      if (existing) {
        updatedSkills = prev.skills.map(s => s.id === existing.id ? {
          ...s,
          proficiency: Math.max(s.proficiency, 85),
          verified: true,
          verificationSource: 'assessment'
        } : s);
      } else {
        updatedSkills = [
          ...prev.skills,
          {
            id: `skill-ver-${Date.now()}`,
            name: skillTarget,
            category: 'backend',
            aliases: [],
            proficiency: 85,
            verified: true,
            verificationSource: 'assessment',
            endorsementsCount: 1
          }
        ];
      }
      return { ...prev, skills: updatedSkills };
    });

    addToast('Skill Verified!', `Passed proctored assessment for ${skillTarget}. Verified badge awarded!`, 'success');
    setQuizMilestone(null);
  };

  // Apply Internship
  const handleApplySuccess = (jobTitle: string, company: string) => {
    addToast('Application Submitted', `Applied to ${jobTitle} at ${company} with verified skill profile.`, 'success');
  };

  // Closed Feedback Loop: Submit Industry Evaluation
  const handleSubmitEvaluation = (evaluation: IndustryEvaluation) => {
    // 1. Add to evaluations stream
    setEvaluations(prev => [evaluation, ...prev]);

    // 2. Update Rohan Sharma's skills with official mentor endorsements!
    setStudent(prev => {
      let updatedSkills = [...prev.skills];
      evaluation.endorsedSkills.forEach(endorsedSkill => {
        const existingIdx = updatedSkills.findIndex(s => s.name.toLowerCase() === endorsedSkill.toLowerCase());
        if (existingIdx >= 0) {
          updatedSkills[existingIdx] = {
            ...updatedSkills[existingIdx],
            proficiency: Math.min(100, Math.max(updatedSkills[existingIdx].proficiency + 15, 88)),
            verified: true,
            verificationSource: 'industry_feedback',
            endorsementsCount: (updatedSkills[existingIdx].endorsementsCount || 0) + 1
          };
        } else {
          updatedSkills.push({
            id: `skill-endorse-${Date.now()}-${endorsedSkill}`,
            name: endorsedSkill,
            category: 'backend',
            aliases: [],
            proficiency: 85,
            verified: true,
            verificationSource: 'industry_feedback',
            endorsementsCount: 1
          });
        }
      });
      return { ...prev, skills: updatedSkills };
    });

    // 3. Update College Analytics Placement readiness index
    setCollegeAnalytics(prev => ({
      ...prev,
      placementReadyPercentage: Math.min(100, prev.placementReadyPercentage + 2),
      activeInternships: prev.activeInternships + 1
    }));

    // 4. Close modal and trigger Toast
    setEvalModalCandidate(null);
    addToast(
      '🔥 Feedback Loop Closed!',
      `Mentor feedback for ${evaluation.studentName} recorded. Student's skills upgraded & college curriculum notified.`,
      'loop'
    );
  };

  // College curriculum action
  const handleCurriculumAction = (gapId: string) => {
    setCollegeAnalytics(prev => ({
      ...prev,
      curriculumGaps: prev.curriculumGaps.map(g => g.id === gapId ? { ...g, actionTaken: true } : g)
    }));
    addToast('Curriculum Action Approved', 'Hands-on Bootcamp scheduled in college academic calendar.', 'success');
  };

  return (
    <div className="app-wrapper">
      {/* Navigation */}
      <Navbar
        activePersona={activePersona}
        onSelectPersona={setActivePersona}
        feedbackNotificationCount={evaluations.length}
        onOpenNotifications={() => {
          setActivePersona('college');
        }}
      />

      {/* Hero section visible unless in Presentation Mode */}
      {activePersona !== 'presentation' && (
        <LandingHero onSelectPersona={setActivePersona} />
      )}

      {/* Main Container */}
      <main className="main-content">
        <div className="container">
          {/* Persona 1: STUDENT HUB */}
          {activePersona === 'student' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Student Hub Secondary Navigation Pills */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-surface)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    id="subtab-student-gap"
                    className={`role-pill ${studentTab === 'gap' ? 'active' : ''}`}
                    onClick={() => setStudentTab('gap')}
                  >
                    <Target size={15} /> AI Skill Gap Analysis
                  </button>
                  <button
                    id="subtab-student-roadmap"
                    className={`role-pill ${studentTab === 'roadmap' ? 'active' : ''}`}
                    onClick={() => setStudentTab('roadmap')}
                  >
                    <Zap size={15} /> Personalized Roadmap
                  </button>
                  <button
                    id="subtab-student-profile"
                    className={`role-pill ${studentTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setStudentTab('profile')}
                  >
                    <UserCheck size={15} /> Skill Profile & Projects
                  </button>
                  <button
                    id="subtab-student-jobs"
                    className={`role-pill ${studentTab === 'jobs' ? 'active' : ''}`}
                    onClick={() => setStudentTab('jobs')}
                  >
                    <Briefcase size={15} /> Matched Opportunities
                  </button>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Viewing as: <strong style={{ color: '#22d3ee' }}>Rohan Sharma (Student)</strong>
                </div>
              </div>

              {/* Sub-tab view components */}
              {studentTab === 'gap' && (
                <SkillRadarView
                  student={student}
                  onNavigateToRoadmap={() => setStudentTab('roadmap')}
                  onSelectRole={handleSelectRole}
                />
              )}

              {studentTab === 'roadmap' && (
                <RoadmapView
                  student={student}
                  onLaunchAssessment={(milestone) => setQuizMilestone(milestone)}
                  onNavigateToInternships={() => setStudentTab('jobs')}
                />
              )}

              {studentTab === 'profile' && (
                <StudentProfileView
                  student={student}
                  onAddSkill={handleAddSkill}
                />
              )}

              {studentTab === 'jobs' && (
                <MatchedInternshipsView
                  student={student}
                  onApplySuccess={handleApplySuccess}
                />
              )}
            </div>
          )}

          {/* Persona 2: INDUSTRY PORTAL */}
          {activePersona === 'industry' && (
            <CandidateMatcher
              onOpenEvaluationModal={(candidate) => setEvalModalCandidate(candidate)}
            />
          )}

          {/* Persona 3: COLLEGE DASHBOARD */}
          {activePersona === 'college' && (
            <CollegeAnalyticsView
              analytics={collegeAnalytics}
              evaluations={evaluations}
              onActionTaken={handleCurriculumAction}
            />
          )}

          {/* Persona 4: SIH 2026 12-SLIDE PRESENTATION MODE */}
          {activePersona === 'presentation' && (
            <SlideDeck
              onJumpToDemo={(persona) => {
                setActivePersona(persona);
                addToast('Switched to Live Demo', `Navigated to ${persona.toUpperCase()} dashboard.`, 'info');
              }}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      {evalModalCandidate && (
        <EvaluationFeedbackModal
          candidate={evalModalCandidate}
          onClose={() => setEvalModalCandidate(null)}
          onSubmitEvaluation={handleSubmitEvaluation}
        />
      )}

      {quizMilestone && (
        <AssessmentModal
          milestone={quizMilestone}
          onClose={() => setQuizMilestone(null)}
          onPassAssessment={handlePassAssessment}
        />
      )}

      {/* Real-time Notifications */}
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: '800', color: '#ffffff' }}>SkillBridge</span>
              <span>— Smart India Hackathon 2026</span>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>SIH26044</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Portal for Academia–Industry Collaboration for Skill Mapping, Internships & Placement
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

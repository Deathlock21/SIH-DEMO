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
import { InteractiveCanvas } from './components/InteractiveCanvas';
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
  Home,
  ArrowLeft,
  ChevronRight,
  UserCheck, 
  Target, 
  Zap, 
  Briefcase, 
  Sparkles, 
  Layers
} from 'lucide-react';

export function App() {
  const [activePersona, setActivePersona] = useState<ActivePersona>('home');
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);
  const [studentTab, setStudentTab] = useState<'gap' | 'roadmap' | 'profile' | 'jobs'>('gap');

  const handleSelectPersona = (persona: ActivePersona) => {
    setActivePersona(persona);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const [evaluations, setEvaluations] = useState<IndustryEvaluation[]>(INITIAL_EVALUATIONS);
  const [collegeAnalytics, setCollegeAnalytics] = useState<CollegeBatchAnalytics>(COLLEGE_BATCH_DATA);
  
  const [evalModalCandidate, setEvalModalCandidate] = useState<CandidateItem | null>(null);
  const [quizMilestone, setQuizMilestone] = useState<RoadmapMilestone | null>(null);
  
  const [toasts, setToasts] = useState<ToastMessage[]>([
    {
      id: 'toast-init',
      title: 'INTERNPARK Platform Initialized',
      message: 'AI-driven talent intelligence, dynamic skill verification, and closed feedback loop live.',
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
      {/* Silent Interactive Ambient Spotlight Background */}
      <InteractiveCanvas />
      <div className="cyber-grid-overlay" />

      {/* Navigation */}
      <Navbar
        activePersona={activePersona}
        onSelectPersona={handleSelectPersona}
        feedbackNotificationCount={evaluations.length}
        onOpenNotifications={() => {
          handleSelectPersona('college');
        }}
      />

      {/* Overview Landing Page: Shows Hero, Cards & Architecture; lower data is removed */}
      {activePersona === 'home' && (
        <LandingHero onSelectPersona={handleSelectPersona} />
      )}

      {/* Dedicated Data Pages: Rendered full-screen when a persona view is selected */}
      {activePersona !== 'home' && (
        <main className="main-content page-transition-enter">
          <div className="container">
            {/* Dedicated Page Header Banner */}
            <div className="dedicated-page-header">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div className="breadcrumb-nav">
                  <span
                    className="breadcrumb-link"
                    onClick={() => handleSelectPersona('home')}
                    title="Return to Overview"
                  >
                    <Home size={14} /> Overview
                  </span>
                  <ChevronRight size={14} />
                  <span style={{ color: 'var(--primary-red)', fontWeight: '700' }}>
                    {activePersona === 'student' && 'Student Hub'}
                    {activePersona === 'industry' && 'Industry Portal'}
                    {activePersona === 'college' && 'College Dashboard'}
                    {activePersona === 'presentation' && 'Presentation Deck'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                    {activePersona === 'student' && 'Student Competency & Micro-Internship Hub'}
                    {activePersona === 'industry' && 'Industry Recruiter Candidate Matcher'}
                    {activePersona === 'college' && 'College Placement & Curriculum Analytics'}
                    {activePersona === 'presentation' && 'Smart India Hackathon 2026 Presentation'}
                  </h2>
                  <span className="badge badge-rose">
                    {activePersona === 'student' && 'Student Mode'}
                    {activePersona === 'industry' && 'Recruiter Mode'}
                    {activePersona === 'college' && 'College Admin Mode'}
                    {activePersona === 'presentation' && '12 Slides Deck'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <button
                  id="page-header-back-home"
                  className="back-to-overview-btn"
                  onClick={() => handleSelectPersona('home')}
                  title="Return to Overview Landing Page"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Overview</span>
                </button>
              </div>
            </div>

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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      id="subtab-student-gap"
                      className={`role-pill ${studentTab === 'gap' ? 'active' : ''}`}
                      onClick={() => setStudentTab('gap')}
                    >
                      <Target size={15} /> Competency Gap Diagnostic
                    </button>
                    <button
                      id="subtab-student-roadmap"
                      className={`role-pill ${studentTab === 'roadmap' ? 'active' : ''}`}
                      onClick={() => setStudentTab('roadmap')}
                    >
                      <Zap size={15} /> Personalized Learning Roadmap
                    </button>
                    <button
                      id="subtab-student-profile"
                      className={`role-pill ${studentTab === 'profile' ? 'active' : ''}`}
                      onClick={() => setStudentTab('profile')}
                    >
                      <UserCheck size={15} /> Student Skill Profile
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
                    Viewing as: <strong style={{ color: 'var(--primary-red)' }}>Rohan Sharma (Computer Science)</strong>
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
                  handleSelectPersona(persona);
                  addToast('Switched to Live Demo', `Navigated to ${persona.toUpperCase()} dashboard.`, 'info');
                }}
              />
            )}
          </div>
        </main>
      )}

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

      {/* Interactive Floating Quick-Switch HUD */}
      <nav className="floating-hud-bar" aria-label="Interactive Quick Persona Switcher">
        <div className="radar-pulse-container" style={{ marginRight: '0.2rem' }}>
          <span className="radar-pulse-dot" />
        </div>
        <button
          id="hud-tab-home"
          className={`hud-pill-button ${activePersona === 'home' ? 'active' : ''}`}
          onClick={() => handleSelectPersona('home')}
        >
          <Home size={13} />
          <span>Home</span>
        </button>
        <button
          id="hud-tab-student"
          className={`hud-pill-button ${activePersona === 'student' ? 'active' : ''}`}
          onClick={() => handleSelectPersona('student')}
        >
          <UserCheck size={13} />
          <span>Student</span>
        </button>
        <button
          id="hud-tab-industry"
          className={`hud-pill-button ${activePersona === 'industry' ? 'active' : ''}`}
          onClick={() => handleSelectPersona('industry')}
        >
          <Briefcase size={13} />
          <span>Industry</span>
        </button>
        <button
          id="hud-tab-college"
          className={`hud-pill-button ${activePersona === 'college' ? 'active' : ''}`}
          onClick={() => handleSelectPersona('college')}
        >
          <Layers size={13} />
          <span>College</span>
        </button>
        <button
          id="hud-tab-deck"
          className={`hud-pill-button ${activePersona === 'presentation' ? 'active' : ''}`}
          onClick={() => handleSelectPersona('presentation')}
        >
          <Sparkles size={13} />
          <span>Pitch Deck</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: '900', color: '#0f172a', letterSpacing: '0.04em' }}>INTERN<span className="gradient-text-red">PARK</span></span>
              <span style={{ color: 'var(--text-muted)' }}>— Smart India Hackathon 2026</span>
              <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>SIH26044</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Academia–Industry Skill Mapping & Continuous Placement Intelligence Engine
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

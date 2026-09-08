import React from 'react';
import { ActivePersona } from '../types';
import { 
  GraduationCap, 
  Building2, 
  School, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  RefreshCw,
  Compass,
  Briefcase
} from 'lucide-react';

interface LandingHeroProps {
  onSelectPersona: (persona: ActivePersona) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onSelectPersona }) => {
  return (
    <section style={{
      padding: '2.5rem 0 2rem 0',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Top Tagline */}
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(6, 182, 212, 0.1)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            color: '#22d3ee',
            fontSize: '0.82rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            <Sparkles size={14} />
            <span>Smart India Hackathon 2026 • Problem Statement: SIH26044</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: '800',
            lineHeight: 1.15,
            marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}>
            AI-Powered Academia–Industry <br />
            <span className="gradient-text-cyan">Skill Intelligence</span> & Placement Ecosystem
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.75rem'
          }}>
            Bridging the divide between <em>what students learn</em>, <em>what skills they truly possess</em>, and <em>what modern industries demand</em> — reinforced with an explainable AI match engine and post-internship feedback loop.
          </p>

          {/* Quick Flow Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            background: 'var(--bg-surface)',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.85rem'
          }}>
            <span style={{ color: '#22d3ee', fontWeight: '600' }}>Student Profile</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <span style={{ color: '#818cf8', fontWeight: '600' }}>AI Skill Mapping</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <span style={{ color: '#f59e0b', fontWeight: '600' }}>Skill Gap Analysis</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>Personalized Roadmap</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <span style={{ color: '#c084fc', fontWeight: '600' }}>Explainable Matching</span>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <span style={{ color: '#f43f5e', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <RefreshCw size={12} /> Closed Feedback Loop
            </span>
          </div>
        </div>

        {/* 3 Persona Fast-Entry Cards */}
        <div className="grid-3" style={{ marginTop: '2rem' }}>
          {/* Student Card */}
          <div 
            id="hero-card-student"
            className="glass-panel glass-panel-interactive"
            onClick={() => onSelectPersona('student')}
            style={{ padding: '1.5rem', cursor: 'pointer', borderColor: 'rgba(6, 182, 212, 0.25)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#22d3ee'
              }}>
                <GraduationCap size={22} />
              </div>
              <span className="badge badge-cyan">Student Side</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Student Skill Hub</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Explore your skill profile, evaluate readiness against target roles (e.g. Full Stack Developer), and follow a 4-tier personalized roadmap.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22d3ee', fontWeight: '600', fontSize: '0.9rem' }}>
              <span>Enter Student Dashboard</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Industry Card */}
          <div 
            id="hero-card-industry"
            className="glass-panel glass-panel-interactive"
            onClick={() => onSelectPersona('industry')}
            style={{ padding: '1.5rem', cursor: 'pointer', borderColor: 'rgba(139, 92, 246, 0.25)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c084fc'
              }}>
                <Building2 size={22} />
              </div>
              <span className="badge badge-purple">Industry Side</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Industry Recruitment & Match</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Post opportunities, view candidate profiles with <strong>Explainable Match Scores (e.g. 82%)</strong>, and complete post-internship evaluations.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', fontWeight: '600', fontSize: '0.9rem' }}>
              <span>Explore Candidate Matches</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* College Card */}
          <div 
            id="hero-card-college"
            className="glass-panel glass-panel-interactive"
            onClick={() => onSelectPersona('college')}
            style={{ padding: '1.5rem', cursor: 'pointer', borderColor: 'rgba(16, 185, 129, 0.25)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34d399'
              }}>
                <School size={22} />
              </div>
              <span className="badge badge-emerald">College Side</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>College Intelligence & Curriculum</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Monitor batch-wide skill readiness, spot market curriculum gaps (e.g. Docker vs VMs), and review corporate feedback.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: '600', fontSize: '0.9rem' }}>
              <span>View Institutional Analytics</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

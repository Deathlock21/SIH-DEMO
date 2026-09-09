import React from 'react';
import { ActivePersona } from '../types';
import { TiltCard } from './TiltCard';
import { 
  GraduationCap, 
  Building2, 
  School, 
  ArrowRight, 
  Sparkles, 
  RefreshCw
} from 'lucide-react';

interface LandingHeroProps {
  onSelectPersona: (persona: ActivePersona) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onSelectPersona }) => {
  return (
    <section style={{
      padding: '2.5rem 0 2.25rem 0',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="container">
        {/* Top Tagline */}
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 2.5rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 1.1rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(220, 38, 38, 0.08)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            color: '#b91c1c',
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '0.04em',
            marginBottom: '1.25rem',
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.1)'
          }}>
            <span className="radar-pulse-dot" />
            <Sparkles size={14} color="#dc2626" />
            <span>SMART INDIA HACKATHON 2026 (SIH26044)</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.8vw, 3.6rem)',
            fontWeight: '900',
            lineHeight: 1.15,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            color: '#0f172a'
          }}>
            INTERN<span className="gradient-text-red">PARK</span> <br />
            <span style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)', color: '#334155', fontWeight: '700' }}>
              Bridging Academia & Industry with Explainable AI
            </span>
          </h1>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '1.85rem'
          }}>
            AI-powered micro-internships, dynamic skill verification, explainable recruiter matching, and an automated continuous feedback loop connecting Students, Industry Recruiters, and Colleges.
          </p>

          {/* Quick Flow Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.65rem',
            background: '#ffffff',
            padding: '0.75rem 1.4rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            fontSize: '0.82rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <span style={{ color: '#0f172a', fontWeight: '600' }}>Student Profile</span>
            <span style={{ color: '#94a3b8' }}>→</span>
            <span style={{ color: '#0f172a', fontWeight: '600' }}>Taxonomy Mapping</span>
            <span style={{ color: '#94a3b8' }}>→</span>
            <span style={{ color: '#0f172a', fontWeight: '600' }}>Competency Gap</span>
            <span style={{ color: '#94a3b8' }}>→</span>
            <span style={{ color: '#0f172a', fontWeight: '600' }}>Personalized Roadmap</span>
            <span style={{ color: '#94a3b8' }}>→</span>
            <span style={{ color: '#0f172a', fontWeight: '600' }}>Explainable Match</span>
            <span style={{ color: '#94a3b8' }}>→</span>
            <span style={{ color: '#dc2626', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <RefreshCw size={13} className="spin-slow" /> Continuous Feedback Loop
            </span>
          </div>
        </div>

        {/* 3 Persona Fast-Entry 3D Tilt Cards */}
        <div className="grid-3" style={{ marginTop: '2.5rem' }}>
          {/* Student Card */}
          <TiltCard
            id="hero-card-student"
            glowColor="red"
            maxTilt={6}
            onClick={() => onSelectPersona('student')}
            style={{ padding: '1.6rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626'
              }}>
                <GraduationCap size={24} />
              </div>
              <span className="badge badge-rose">
                Student Hub
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0f172a' }}>Student Hub</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.55 }}>
              Build verified dynamic skill profiles, benchmark competencies against industry targets, and complete personalized 4-tier learning roadmaps.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontWeight: '700', fontSize: '0.85rem' }}>
                <span>Explore Student Hub</span>
                <ArrowRight size={16} />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Student Mode</span>
            </div>
          </TiltCard>

          {/* Industry Card */}
          <TiltCard
            id="hero-card-industry"
            glowColor="white"
            maxTilt={6}
            onClick={() => onSelectPersona('industry')}
            style={{ padding: '1.6rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626'
              }}>
                <Building2 size={24} />
              </div>
              <span className="badge badge-rose">
                Industry Portal
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0f172a' }}>Industry Portal</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.55 }}>
              Post micro-internships, match candidates with <strong>Explainable Match Scores (e.g. 82%)</strong>, and seal post-internship evaluations.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontWeight: '700', fontSize: '0.85rem' }}>
                <span>Inspect Candidates</span>
                <ArrowRight size={16} />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Recruiter Mode</span>
            </div>
          </TiltCard>

          {/* College Card */}
          <TiltCard
            id="hero-card-college"
            glowColor="red"
            maxTilt={6}
            onClick={() => onSelectPersona('college')}
            style={{ padding: '1.6rem', background: '#ffffff', border: '1px solid rgba(0, 0, 0, 0.08)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#dc2626'
              }}>
                <School size={24} />
              </div>
              <span className="badge badge-rose">
                College Dashboard
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0f172a' }}>College Dashboard</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.55 }}>
              Monitor institutional skill readiness, identify market syllabus deficits (e.g. Docker vs Legacy VMs), and ratify corporate feedback.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#dc2626', fontWeight: '700', fontSize: '0.85rem' }}>
                <span>Review Analytics</span>
                <ArrowRight size={16} />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>College Mode</span>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};


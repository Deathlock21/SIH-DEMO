import React from 'react';
import { ActivePersona } from '../types';
import { 
  GraduationCap, 
  Building2, 
  School, 
  Presentation, 
  Sparkles,
  Award,
  Bell
} from 'lucide-react';

interface NavbarProps {
  activePersona: ActivePersona;
  onSelectPersona: (persona: ActivePersona) => void;
  feedbackNotificationCount: number;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePersona,
  onSelectPersona,
  feedbackNotificationCount,
  onOpenNotifications
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
      padding: '0.75rem 1.5rem'
    }}>
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Brand & SIH Badge */}
        <div 
          onClick={() => onSelectPersona('student')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
          id="nav-brand-logo"
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            border: '1px solid #b91c1c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
            color: '#ffffff',
            fontWeight: '900',
            fontSize: '1rem',
            letterSpacing: '-0.02em'
          }}>
            IP
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.02em', color: '#0f172a' }}>
                INTERN<span className="gradient-text-red">PARK</span>
              </span>
              <span className="badge badge-rose" style={{ fontSize: '0.68rem', padding: '0.15rem 0.55rem' }}>
                SIH26044
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Skill Intelligence & Micro-Internship Platform
            </div>
          </div>
        </div>

        {/* Persona Switcher Bar */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: '#f8fafc',
          padding: '0.3rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <button
            id="nav-tab-student"
            className={`role-pill ${activePersona === 'student' ? 'active' : ''}`}
            onClick={() => onSelectPersona('student')}
          >
            <GraduationCap size={16} />
            <span>Student Hub</span>
          </button>

          <button
            id="nav-tab-industry"
            className={`role-pill ${activePersona === 'industry' ? 'active' : ''}`}
            onClick={() => onSelectPersona('industry')}
          >
            <Building2 size={16} />
            <span>Industry Portal</span>
          </button>

          <button
            id="nav-tab-college"
            className={`role-pill ${activePersona === 'college' ? 'active' : ''}`}
            onClick={() => onSelectPersona('college')}
          >
            <School size={16} />
            <span>College Dashboard</span>
          </button>

          <button
            id="nav-tab-presentation"
            className={`role-pill ${activePersona === 'presentation' ? 'active' : ''}`}
            onClick={() => onSelectPersona('presentation')}
          >
            <Presentation size={16} />
            <span>Presentation Deck (12 Slides)</span>
          </button>
        </nav>

        {/* Action Controls & Notifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            id="nav-notification-btn"
            className="btn btn-secondary btn-sm"
            onClick={onOpenNotifications}
            style={{ position: 'relative', padding: '0.45rem 0.75rem' }}
            title="Feedback Notifications"
          >
            <Bell size={16} />
            {feedbackNotificationCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--primary-red)',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(220, 38, 38, 0.4)'
              }}>
                {feedbackNotificationCount}
              </span>
            )}
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 0.9rem',
            background: '#ffffff',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.8rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
          }}>
            <span className="radar-pulse-dot" />
            <span style={{ color: 'var(--text-muted)' }}>AI Engine:</span>
            <span style={{ color: 'var(--primary-red)', fontWeight: '700' }}>Active (60 FPS)</span>
          </div>
        </div>
      </div>
    </header>
  );
};

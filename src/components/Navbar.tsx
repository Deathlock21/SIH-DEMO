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
      background: 'rgba(10, 13, 20, 0.82)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
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
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '1.2rem'
          }}>
            ⚡
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                Skill<span className="gradient-text-cyan">Bridge</span>
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                SIH26044
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              AI Academia–Industry Skill Platform
            </div>
          </div>
        </div>

        {/* Persona Switcher Bar */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'var(--bg-surface)',
          padding: '0.3rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            id="nav-tab-student"
            className={`role-pill ${activePersona === 'student' ? 'active' : ''}`}
            onClick={() => onSelectPersona('student')}
          >
            <GraduationCap size={16} color={activePersona === 'student' ? '#06b6d4' : 'currentColor'} />
            <span>Student Hub</span>
          </button>

          <button
            id="nav-tab-industry"
            className={`role-pill ${activePersona === 'industry' ? 'active' : ''}`}
            onClick={() => onSelectPersona('industry')}
          >
            <Building2 size={16} color={activePersona === 'industry' ? '#8b5cf6' : 'currentColor'} />
            <span>Industry Portal</span>
          </button>

          <button
            id="nav-tab-college"
            className={`role-pill ${activePersona === 'college' ? 'active' : ''}`}
            onClick={() => onSelectPersona('college')}
          >
            <School size={16} color={activePersona === 'college' ? '#10b981' : 'currentColor'} />
            <span>College Intelligence</span>
          </button>

          <button
            id="nav-tab-presentation"
            className={`role-pill ${activePersona === 'presentation' ? 'active' : ''}`}
            onClick={() => onSelectPersona('presentation')}
            style={{
              background: activePersona === 'presentation' 
                ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(244, 63, 94, 0.25))' 
                : undefined,
              borderColor: activePersona === 'presentation' ? '#f59e0b' : undefined,
              color: activePersona === 'presentation' ? '#fbbf24' : undefined
            }}
          >
            <Presentation size={16} color={activePersona === 'presentation' ? '#f59e0b' : 'currentColor'} />
            <span>SIH Pitch Deck (12 Slides)</span>
          </button>
        </nav>

        {/* Action Controls & Notifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            id="nav-notification-btn"
            className="btn btn-secondary btn-sm"
            onClick={onOpenNotifications}
            style={{ position: 'relative', padding: '0.45rem 0.75rem' }}
            title="Industry Feedback Activity Stream"
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
                background: 'var(--accent-rose)',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(244, 63, 94, 0.6)'
              }}>
                {feedbackNotificationCount}
              </span>
            )}
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.8rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem'
          }}>
            <Sparkles size={14} color="#06b6d4" />
            <span style={{ color: 'var(--text-secondary)' }}>AI Engine:</span>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};

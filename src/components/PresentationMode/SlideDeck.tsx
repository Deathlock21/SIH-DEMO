import React, { useState, useEffect } from 'react';
import { SIH_PRESENTATION_SLIDES } from '../../data/mockData';
import { ActivePersona, PresentationSlide } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Play, 
  Sparkles, 
  FileText, 
  GraduationCap, 
  Building2, 
  School,
  ExternalLink,
  Layers,
  Zap
} from 'lucide-react';

interface SlideDeckProps {
  onJumpToDemo: (targetPersona: ActivePersona) => void;
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ onJumpToDemo }) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const slide = SIH_PRESENTATION_SLIDES[currentSlideIdx];
  const totalSlides = SIH_PRESENTATION_SLIDES.length;

  const nextSlide = () => {
    if (currentSlideIdx < totalSlides - 1) {
      setCurrentSlideIdx(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIdx]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Deck Toolbar */}
      <div className="glass-panel" style={{ padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
            SIH 2026 Presentation Mode
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Slide <strong style={{ color: '#ffffff' }}>{slide.slideNumber}</strong> of {totalSlides}
          </span>
        </div>

        {/* Slide quick picker selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <select
            id="select-slide-number"
            value={currentSlideIdx}
            onChange={(e) => setCurrentSlideIdx(Number(e.target.value))}
            style={{
              background: 'var(--bg-surface)',
              color: '#ffffff',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '0.35rem 0.75rem',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {SIH_PRESENTATION_SLIDES.map((s, idx) => (
              <option key={s.slideNumber} value={idx}>
                Slide {s.slideNumber}: {s.title}
              </option>
            ))}
          </select>

          <button
            id="btn-toggle-notes"
            className={`btn btn-sm ${showNotes ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowNotes(!showNotes)}
          >
            <FileText size={14} /> Notes
          </button>

          <button
            id="btn-toggle-fullscreen"
            className="btn btn-secondary btn-sm"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div 
        className="glass-panel" 
        style={{
          minHeight: '520px',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.08) 0%, rgba(16, 21, 34, 0.95) 75%)',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.1)'
        }}
      >
        {/* Slide Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {slide.category}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              SIH26044 • SkillBridge Pitch
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            marginBottom: '0.5rem',
            color: '#ffffff',
            lineHeight: 1.2
          }}>
            {slide.title}
          </h2>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            fontWeight: '500',
            marginBottom: '2rem'
          }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Slide Content Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '1rem 0' }}>
          {slide.bullets.map((bullet, idx) => (
            <div 
              key={idx} 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#06b6d4',
                marginTop: '0.55rem',
                boxShadow: '0 0 10px #06b6d4'
              }} />
              <div style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#f8fafc' }}>
                <strong style={{ color: '#22d3ee', marginRight: '0.5rem' }}>{bullet.bold}</strong>
                {bullet.text}
              </div>
            </div>
          ))}

          {/* Metric Highlight Card if any */}
          {slide.highlightMetric && (
            <div style={{
              marginTop: '0.5rem',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#22d3ee', lineHeight: 1 }}>
                {slide.highlightMetric.value}
              </div>
              <div style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: '600' }}>
                {slide.highlightMetric.label}
              </div>
            </div>
          )}

          {/* Impact Quote if any */}
          {slide.quote && (
            <blockquote style={{
              margin: '0.75rem 0',
              padding: '1.25rem 1.5rem',
              background: 'rgba(139, 92, 246, 0.08)',
              borderLeft: '4px solid #8b5cf6',
              borderRadius: '0 8px 8px 0',
              fontSize: '1.15rem',
              fontWeight: '600',
              fontStyle: 'italic',
              color: '#e2e8f0',
              lineHeight: 1.5
            }}>
              {slide.quote}
            </blockquote>
          )}
        </div>

        {/* Slide Footer: Navigation & Demo Jump CTA */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Jump to live demo button */}
          <div>
            {slide.demoTargetPersona ? (
              <button
                id="btn-slide-jump-demo"
                className="btn btn-primary"
                onClick={() => onJumpToDemo(slide.demoTargetPersona!)}
                style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' }}
              >
                <Play size={15} fill="currentColor" />
                <span>Jump to Live Interactive Demo ({slide.demoTargetPersona.toUpperCase()} SIDE)</span>
                <ExternalLink size={14} />
              </button>
            ) : (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Use Left / Right Arrow keys or Space to advance
              </span>
            )}
          </div>

          {/* Stepper controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              id="btn-slide-prev"
              className="btn btn-secondary"
              onClick={prevSlide}
              disabled={currentSlideIdx === 0}
              style={{ opacity: currentSlideIdx === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={18} /> Previous
            </button>

            <button
              id="btn-slide-next"
              className="btn btn-primary"
              onClick={nextSlide}
              disabled={currentSlideIdx === totalSlides - 1}
              style={{ opacity: currentSlideIdx === totalSlides - 1 ? 0.4 : 1 }}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <div className="glass-panel" style={{ padding: '1.25rem 1.75rem', background: 'rgba(22, 29, 48, 0.9)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#fbbf24' }}>
            <FileText size={16} />
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Presenter Pitch Notes (For Judges)</h4>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {currentSlideIdx === 0 && 'Deliver with confidence: "Respected jury, we are Team SkillBridge presenting for SIH26044. Today, higher education produces thousands of graduates, yet employers complain they cannot find day-one ready engineers. We are solving this through continuous skill mapping and authorized industry feedback."'}
            {currentSlideIdx === 1 && 'Highlight the 3-party misalignment: Students are lost, colleges are slow to change, industries get inundated with fake resumes.'}
            {currentSlideIdx === 2 && 'Point out that existing portals are passive job listings. When a student is rejected on LinkedIn, they get 0 guidance. SkillBridge tells them exactly what to learn next.'}
            {currentSlideIdx === 3 && 'Introduce the 4-sided ecosystem loop: Student ↔ SkillBridge ↔ College ↔ Industry.'}
            {currentSlideIdx === 4 && 'Demonstrate our multi-modal profile ingestion: projects from GitHub, tests, certifications, and academic marks.'}
            {currentSlideIdx === 5 && 'Demonstrate the AI normalizer: how "ecmascript" maps to JavaScript, and how the visual radar compares student vs target role benchmark.'}
            {currentSlideIdx === 6 && 'Walk through the 4-phase roadmap: fundamentals, project sprint, assessment quiz, and unlocked internship.'}
            {currentSlideIdx === 7 && 'Show the 82% Explainable Match Score: explain why transparent breakdown builds trust with recruiters.'}
            {currentSlideIdx === 8 && 'Walk through the College Dashboard: how the Dean can see curriculum gaps (e.g. Docker vs VMs).'}
            {currentSlideIdx === 9 && 'Emphasize the Feedback Loop as the core differentiator: mentor signs off on real deliverables, updating student skills and college curriculum.'}
            {currentSlideIdx === 10 && 'Technical credibility: Explain our React frontend, FastAPI/Python NLP layer, and relational data model.'}
            {currentSlideIdx === 11 && 'Strong closing statement: "We don\'t just connect students with opportunities. We connect industry demand with student development."'}
          </p>
        </div>
      )}
    </div>
  );
};

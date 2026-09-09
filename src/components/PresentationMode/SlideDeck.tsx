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
      <div className="glass-panel" style={{ 
        padding: '0.85rem 1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        gap: '1rem',
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge badge-rose" style={{ fontSize: '0.75rem' }}>
            SIH 2026 Presentation
          </span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Slide <strong style={{ color: 'var(--primary-red)' }}>{slide.slideNumber}</strong> of {totalSlides}
          </span>
        </div>

        {/* Slide quick picker selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <select
            id="select-slide-number"
            value={currentSlideIdx}
            onChange={(e) => setCurrentSlideIdx(Number(e.target.value))}
            style={{
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid rgba(0, 0, 0, 0.15)',
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
            <FileText size={14} /> Speaker Notes
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
          padding: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          background: '#ffffff',
          border: '1px solid rgba(220, 38, 38, 0.2)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Slide Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {slide.category}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              SIH26044 • INTERNPARK
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            color: '#0f172a',
            lineHeight: 1.2
          }}>
            {slide.title}
          </h2>

          <p style={{
            fontSize: '1.25rem',
            color: '#475569',
            fontWeight: '500',
            marginBottom: '2rem'
          }}>
            "{slide.subtitle}"
          </p>
        </div>

        {/* Slide Content Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '1rem 0' }}>
          {slide.bullets.map((bullet, idx) => (
            <div 
              key={idx} 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                background: '#f8fafc',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--primary-red)',
                marginTop: '0.55rem'
              }} />
              <div style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#334155' }}>
                <strong style={{ color: '#0f172a', marginRight: '0.5rem' }}>{bullet.bold}</strong>
                {bullet.text}
              </div>
            </div>
          ))}

          {/* Metric Highlight Card if any */}
          {slide.highlightMetric && (
            <div style={{
              marginTop: '0.5rem',
              background: 'rgba(220, 38, 38, 0.06)',
              border: '1px solid rgba(220, 38, 38, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}>
              <div style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--primary-red)', lineHeight: 1 }}>
                {slide.highlightMetric.value}
              </div>
              <div style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: '600' }}>
                {slide.highlightMetric.label}
              </div>
            </div>
          )}

          {/* Impact Quote if any */}
          {slide.quote && (
            <blockquote style={{
              margin: '0.75rem 0',
              padding: '1.25rem 1.5rem',
              background: 'rgba(220, 38, 38, 0.05)',
              borderLeft: '4px solid var(--primary-red)',
              borderRadius: '0 8px 8px 0',
              fontSize: '1.18rem',
              fontWeight: '500',
              fontStyle: 'italic',
              color: '#334155',
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
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
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
              >
                <Play size={15} fill="currentColor" />
                <span>Explore Live Platform ({slide.demoTargetPersona.toUpperCase()} PORTAL)</span>
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
        <div className="glass-panel" style={{ padding: '1.25rem 1.75rem', background: '#f8fafc', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary-red)' }}>
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

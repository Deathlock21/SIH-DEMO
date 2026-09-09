import React, { useState } from 'react';
import { StudentProfile, SkillItem } from '../../types';
import { normalizeSkillName } from '../../lib/skillIntelligence';
import { 
  CheckCircle2, 
  Award, 
  ExternalLink, 
  Code2, 
  BookOpen, 
  Briefcase, 
  Plus,
  Sparkles,
  ShieldCheck,
  Building
} from 'lucide-react';

interface StudentProfileViewProps {
  student: StudentProfile;
  onAddSkill: (skill: SkillItem) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({ student, onAddSkill }) => {
  const [newSkillText, setNewSkillText] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState(75);
  const [extractionAlert, setExtractionAlert] = useState<string | null>(null);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;

    const canonicalName = normalizeSkillName(newSkillText);
    const existing = student.skills.find(s => s.name.toLowerCase() === canonicalName.toLowerCase());

    if (existing) {
      setExtractionAlert(`Skill "${canonicalName}" is already mapped to your profile!`);
      setTimeout(() => setExtractionAlert(null), 3000);
      return;
    }

    const wasAliased = canonicalName.toLowerCase() !== newSkillText.trim().toLowerCase();

    const created: SkillItem = {
      id: `skill-${Date.now()}`,
      name: canonicalName,
      category: 'frontend',
      aliases: [newSkillText.trim().toLowerCase()],
      proficiency: Number(newSkillProficiency),
      verified: false,
      verificationSource: 'self_reported'
    };

    onAddSkill(created);
    setExtractionAlert(
      wasAliased 
        ? `✨ AI Ontology Normalized: "${newSkillText}" ➔ canonical "${canonicalName}"` 
        : `Added "${canonicalName}" to your Skill Profile!`
    );
    setTimeout(() => setExtractionAlert(null), 4000);
    setNewSkillText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Student Banner Card */}
      <div className="glass-panel" style={{ 
        padding: '2.25rem', 
        position: 'relative', 
        overflow: 'hidden',
        background: '#ffffff',
        border: '1px solid rgba(220, 38, 38, 0.2)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={student.avatar} 
                alt={student.name}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '2px solid var(--primary-red)',
                  boxShadow: '0 4px 16px rgba(220, 38, 38, 0.2)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-6px',
                right: '-6px',
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}>
                <CheckCircle2 size={14} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h2 style={{ fontSize: '1.85rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#0f172a' }}>{student.name}</h2>
                <span className="badge badge-emerald" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.35rem'
                }}>
                  <ShieldCheck size={13} /> Verified Student Profile
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                {student.department} • {student.college} • Batch 2026
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span><strong>CGPA:</strong> <span style={{ color: '#0f172a', fontWeight: '700' }}>{student.cgpa} / 10.0</span></span>
                <span>•</span>
                <span><strong>Cohort:</strong> {student.batchYear}</span>
                <span>•</span>
                <span><strong>Email:</strong> {student.email}</span>
              </div>
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            padding: '1.2rem 1.75rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            textAlign: 'right',
            boxShadow: '0 4px 16px rgba(220, 38, 38, 0.08)'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>
              Readiness Score
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0f172a' }}>
              84<span style={{ fontSize: '1.1rem', color: 'var(--primary-red)', fontWeight: '600' }}>/100</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem', fontWeight: '600' }}>
              <CheckCircle2 size={13} /> 6 Verified Skills
            </div>
          </div>
        </div>
      </div>

      {/* Skills Matrix & Quick Extraction Simulator */}
      <div className="grid-2">
        {/* Extracted Skills List */}
        <div className="glass-panel" style={{ 
          padding: '1.75rem',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: '#0f172a' }}>Verified Skill Ledger</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Extracted & normalized from verified projects, peer assessments, and mentor evaluations.
              </p>
            </div>
            <span className="badge badge-rose">
              {student.skills.length} Skills
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {student.skills.map(skill => (
              <div 
                key={skill.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ minWidth: '130px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' }}>{skill.name}</span>
                    {skill.verified ? (
                      <span title="Verified Skill" style={{ color: 'var(--primary-red)' }}>
                        <ShieldCheck size={15} />
                      </span>
                    ) : (
                      <span title="Self-reported" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        (Self-reported)
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                    {skill.verificationSource ? skill.verificationSource.replace('_', ' ') : 'Academics'}
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ flex: 1, margin: '0 0.5rem' }}>
                  <div className="progress-bar-track">
                    <div 
                      className="progress-bar-fill"
                      style={{
                        width: `${skill.proficiency}%`,
                        background: skill.proficiency >= 80 
                          ? 'linear-gradient(90deg, #dc2626, #b91c1c)' 
                          : skill.proficiency >= 60 
                          ? 'linear-gradient(90deg, #f87171, #dc2626)' 
                          : '#cbd5e1'
                      }}
                    />
                  </div>
                </div>

                <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a', width: '45px', textAlign: 'right' }}>
                  {skill.proficiency}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Skill Extraction & Synonym Normalization Sandbox */}
        <div className="glass-panel" style={{ 
          padding: '1.75rem',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={18} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>AI Skill Normalizer & Keyword Mapping</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Input raw technical aliases (e.g. <code>"js"</code>, <code>"ecmascript"</code>, <code>"py"</code>, <code>"k8s"</code>, <code>"dsa"</code>) to map them into standardized skill taxonomy.
          </p>

          <form onSubmit={handleQuickAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '0.35rem', fontWeight: '600' }}>
                Skill Term or Alias:
              </label>
              <input 
                id="input-skill-text"
                type="text"
                placeholder="Try: 'ecmascript', 'k8s', 'py', 'restful apis', 'ts'..."
                value={newSkillText}
                onChange={(e) => setNewSkillText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  color: '#0f172a',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>Mastery Level:</span>
                <span style={{ color: 'var(--primary-red)', fontWeight: '700' }}>{newSkillProficiency}%</span>
              </div>
              <input 
                id="input-skill-proficiency"
                type="range"
                min="30"
                max="95"
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-red)' }}
              />
            </div>

            <button 
              id="btn-add-skill-normalized"
              type="submit" 
              className="btn btn-primary"
              style={{ marginTop: '0.5rem' }}
            >
              <Plus size={16} /> Normalize & Add to Profile
            </button>
          </form>

          {extractionAlert && (
            <div style={{
              marginTop: '1.25rem',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(220, 38, 38, 0.08)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: '#b91c1c',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'fadeIn 200ms ease-out'
            }}>
              <Sparkles size={16} color="#dc2626" />
              <span>{extractionAlert}</span>
            </div>
          )}

          {/* Quick Alias Chips */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: '600' }}>
              Quick Aliases (Click to test):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {['ecmascript', 'k8s', 'py', 'restful apis', 'docker-compose', 'dsa'].map(alias => (
                <button
                  key={alias}
                  type="button"
                  onClick={() => setNewSkillText(alias)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.25rem 0.6rem',
                    color: '#0f172a',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  +{alias}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects & Past Internships */}
      <div className="grid-2">
        {/* Projects */}
        <div className="glass-panel" style={{ 
          padding: '1.75rem',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Code2 size={18} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Verified Projects & Repositories</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {student.projects.map(proj => (
              <div 
                key={proj.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>{proj.title}</h4>
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--primary-red)' }}
                  >
                    <span>Repository</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {proj.tech.map(t => (
                    <span key={t} className="badge badge-rose" style={{ fontSize: '0.7rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prior Internships & Mentor Feedback (The Loop in Action) */}
        <div className="glass-panel" style={{ 
          padding: '1.75rem',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Briefcase size={18} color="var(--primary-red)" />
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Past Internships & Corporate Evaluations</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {student.internships.map(intern => (
              <div 
                key={intern.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>{intern.company}</h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {intern.role} • {intern.duration}
                    </div>
                  </div>
                  <span className="badge badge-emerald" style={{ alignSelf: 'flex-start' }}>
                    Verified by Mentor
                  </span>
                </div>

                {intern.mentorFeedback && (
                  <blockquote style={{
                    margin: '0.75rem 0',
                    padding: '0.75rem 1rem',
                    background: 'rgba(220, 38, 38, 0.05)',
                    borderLeft: '3px solid var(--primary-red)',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '0.9rem',
                    fontStyle: 'italic',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5
                  }}>
                    "{intern.mentorFeedback}"
                  </blockquote>
                )}

                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-red)', marginBottom: '0.35rem', fontWeight: '700' }}>
                    Mentor Endorsed Competencies:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {intern.verifiedSkills.map(s => (
                      <span key={s} className="badge badge-rose" style={{ fontSize: '0.7rem' }}>
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

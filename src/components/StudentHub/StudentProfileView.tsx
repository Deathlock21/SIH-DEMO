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
      <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img 
              src={student.avatar} 
              alt={student.name}
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '20px',
                objectFit: 'cover',
                border: '2px solid rgba(6, 182, 212, 0.4)',
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.65rem', fontWeight: '800' }}>{student.name}</h2>
                <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={13} /> Verified Student Profile
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                {student.department} • {student.college}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span><strong>CGPA:</strong> <span style={{ color: '#22d3ee' }}>{student.cgpa} / 10.0</span></span>
                <span>•</span>
                <span><strong>Batch:</strong> {student.batchYear}</span>
                <span>•</span>
                <span><strong>Email:</strong> {student.email}</span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              SkillBridge Readiness Score
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#22d3ee' }}>
              84<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.25rem' }}>
              <CheckCircle2 size={13} /> 6 Verified Skills
            </div>
          </div>
        </div>
      </div>

      {/* Skills Matrix & Quick Extraction Simulator */}
      <div className="grid-2">
        {/* Extracted Skills List */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Dynamic Skill Profile</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Extracted & normalized from projects, assessments, and verified internship logs.
              </p>
            </div>
            <span className="badge badge-purple">{student.skills.length} Mapped</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {student.skills.map(skill => (
              <div 
                key={skill.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
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
                    <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>{skill.name}</span>
                    {skill.verified ? (
                      <span title="Cryptographically or Mentor Verified" style={{ color: '#34d399' }}>
                        <ShieldCheck size={15} />
                      </span>
                    ) : (
                      <span title="Self-reported" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        (Self)
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
                          ? 'linear-gradient(90deg, #06b6d4, #10b981)' 
                          : skill.proficiency >= 60 
                          ? 'linear-gradient(90deg, #8b5cf6, #06b6d4)' 
                          : 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                      }}
                    />
                  </div>
                </div>

                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#22d3ee', width: '45px', textAlign: 'right' }}>
                  {skill.proficiency}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Skill Extraction & Synonym Normalization Sandbox */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Sparkles size={18} color="#8b5cf6" />
            <h3 style={{ fontSize: '1.2rem' }}>AI Skill Normalizer & Extraction</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Demonstrating our AI differentiator: Input raw jargon or aliases (e.g. <code>"js"</code>, <code>"ecmascript"</code>, <code>"py"</code>, <code>"k8s"</code>, <code>"dsa"</code>) to see how SkillBridge maps them into a standard taxonomy.
          </p>

          <form onSubmit={handleQuickAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Skill Name or Technical Alias:
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
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>Self-Assessed Proficiency:</span>
                <span style={{ color: '#22d3ee', fontWeight: '700' }}>{newSkillProficiency}%</span>
              </div>
              <input 
                id="input-skill-proficiency"
                type="range"
                min="30"
                max="95"
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#06b6d4' }}
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
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              color: '#c084fc',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'fadeIn 200ms ease-out'
            }}>
              <Sparkles size={16} />
              <span>{extractionAlert}</span>
            </div>
          )}

          {/* Quick Alias Chips */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
              Quick Test Aliases (Click to test):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {['ecmascript', 'k8s', 'py', 'restful apis', 'docker-compose', 'dsa'].map(alias => (
                <button
                  key={alias}
                  type="button"
                  onClick={() => setNewSkillText(alias)}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.25rem 0.6rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
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
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Code2 size={18} color="#06b6d4" />
            <h3 style={{ fontSize: '1.2rem' }}>Verified Technical Projects</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {student.projects.map(proj => (
              <div 
                key={proj.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{proj.title}</h4>
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: '#22d3ee' }}
                  >
                    <span>Repo</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {proj.tech.map(t => (
                    <span key={t} className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prior Internships & Mentor Feedback (The Loop in Action) */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Briefcase size={18} color="#10b981" />
            <h3 style={{ fontSize: '1.2rem' }}>Internships & Industry Evaluation</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {student.internships.map(intern => (
              <div 
                key={intern.id}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{intern.company}</h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {intern.role} • {intern.duration}
                    </div>
                  </div>
                  <span className="badge badge-emerald" style={{ alignSelf: 'flex-start' }}>
                    Evaluated
                  </span>
                </div>

                {intern.mentorFeedback && (
                  <blockquote style={{
                    margin: '0.75rem 0',
                    padding: '0.65rem 0.85rem',
                    background: 'rgba(16, 185, 129, 0.08)',
                    borderLeft: '3px solid #10b981',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '0.85rem',
                    fontStyle: 'italic',
                    color: 'var(--text-secondary)'
                  }}>
                    "{intern.mentorFeedback}"
                  </blockquote>
                )}

                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Mentor Endorsed Skills:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {intern.verifiedSkills.map(s => (
                      <span key={s} className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
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

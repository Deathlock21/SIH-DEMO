import { 
  SkillItem, 
  TargetRole, 
  SkillGapItem, 
  ExplainableMatchResult, 
  RoadmapMilestone,
  StudentProfile 
} from '../types';

/**
 * Skill Synonym & Taxonomy Knowledge Graph
 * Normalizes varied syntax, colloquialisms, and acronyms into canonical industry skills.
 */
export const SKILL_SYNONYMS: Record<string, string> = {
  // Web & Languages
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'ecmascript': 'JavaScript',
  'es6': 'JavaScript',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'py': 'Python',
  'python3': 'Python',
  'python': 'Python',
  'html5': 'HTML',
  'html': 'HTML',
  'css3': 'CSS',
  'css': 'CSS',

  // Frontend Frameworks
  'react': 'React',
  'reactjs': 'React',
  'react.js': 'React',
  'nextjs': 'Next.js',
  'next.js': 'Next.js',
  'vue': 'Vue.js',
  'vuejs': 'Vue.js',

  // Backend & APIs
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'node.js': 'Node.js',
  'express': 'Express.js',
  'expressjs': 'Express.js',
  'fastapi': 'FastAPI',
  'fast-api': 'FastAPI',
  'rest': 'REST API',
  'rest api': 'REST API',
  'restful': 'REST API',
  'restful apis': 'REST API',
  'graphql': 'GraphQL',

  // Database
  'sql': 'SQL',
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'pgsql': 'PostgreSQL',
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'nosql': 'MongoDB',
  'redis': 'Redis',

  // Cloud & DevOps
  'git': 'Git',
  'github': 'Git',
  'version control': 'Git',
  'docker': 'Docker',
  'containers': 'Docker',
  'containerization': 'Docker',
  'k8s': 'Kubernetes',
  'kubernetes': 'Kubernetes',
  'aws': 'Cloud Basics',
  'cloud': 'Cloud Basics',
  'cloud basics': 'Cloud Basics',
  'gcp': 'Cloud Basics',
  'azure': 'Cloud Basics',
  'ci/cd': 'CI/CD Pipelines',

  // Core CS & Problem Solving
  'dsa': 'Problem Solving',
  'data structures': 'Problem Solving',
  'algorithms': 'Problem Solving',
  'problem solving': 'Problem Solving',
  'oop': 'Object Oriented Programming',
  'system design': 'System Design',

  // AI & Data
  'ml': 'Machine Learning',
  'machine learning': 'Machine Learning',
  'deep learning': 'Deep Learning',
  'nlp': 'Natural Language Processing',
  'pandas': 'Data Analysis',
  'data analysis': 'Data Analysis'
};

/**
 * Canonical skill normalizer
 */
export function normalizeSkillName(rawName: string): string {
  const clean = rawName.trim().toLowerCase();
  return SKILL_SYNONYMS[clean] || rawName.trim();
}

/**
 * Explainable Match Engine
 * Calculates candidate match percentage and produces a human-readable explanation
 * exactly addressing SIH26044 problem statement.
 */
export function calculateExplainableMatch(
  studentSkills: SkillItem[],
  requiredSkills: { name: string; weight: number; mustHave?: boolean; minProficiency?: number }[]
): ExplainableMatchResult {
  let totalWeight = 0;
  let earnedScore = 0;

  const matchedSkills: { name: string; weight: number; contribution: number }[] = [];
  const developingSkills: { name: string; weight: number; current: number; required: number }[] = [];
  const missingSkills: { name: string; weight: number }[] = [];

  // Map student skills for fast normalized lookup
  const studentSkillMap = new Map<string, SkillItem>();
  studentSkills.forEach(s => {
    const canonical = normalizeSkillName(s.name);
    studentSkillMap.set(canonical.toLowerCase(), s);
  });

  requiredSkills.forEach(req => {
    const weight = req.weight || 10;
    totalWeight += weight;

    const canonicalReq = normalizeSkillName(req.name);
    const studentSkill = studentSkillMap.get(canonicalReq.toLowerCase());
    const requiredMin = req.minProficiency || 60;

    if (!studentSkill) {
      // Completely Missing
      missingSkills.push({ name: canonicalReq, weight });
    } else if (studentSkill.proficiency >= requiredMin) {
      // Fully Matched
      const contribution = weight;
      earnedScore += contribution;
      matchedSkills.push({ name: canonicalReq, weight, contribution });
    } else {
      // Partial / Developing
      const ratio = Math.max(0.3, studentSkill.proficiency / requiredMin);
      const contribution = Math.round(weight * ratio);
      earnedScore += contribution;
      developingSkills.push({
        name: canonicalReq,
        weight,
        current: studentSkill.proficiency,
        required: requiredMin
      });
    }
  });

  const overallScore = totalWeight > 0 ? Math.round((earnedScore / totalWeight) * 100) : 0;

  // Generate transparent natural language explanation
  const matchedNames = matchedSkills.map(m => m.name).join(', ');
  const devNames = developingSkills.map(d => d.name).join(', ');
  const missingNames = missingSkills.map(m => m.name).join(', ');

  let summaryParts: string[] = [];
  if (matchedSkills.length > 0) {
    summaryParts.push(`✅ Strong in ${matchedNames}`);
  }
  if (developingSkills.length > 0) {
    summaryParts.push(`⚠️ Developing in ${devNames}`);
  }
  if (missingSkills.length > 0) {
    summaryParts.push(`❌ Lacking ${missingNames}`);
  }

  const summary = summaryParts.join(' | ');
  const verdict = 
    overallScore >= 80 
      ? 'High Match — Ready for Immediate Interview' 
      : overallScore >= 60 
      ? 'Moderate Match — Minor Skill Gap Bridgeable in 2-3 Weeks' 
      : 'Low Match — Requires Foundational Development';

  return {
    overallScore,
    matchedSkills,
    developingSkills,
    missingSkills,
    verdict,
    summary
  };
}

/**
 * Skill Gap Analyzer
 * Analyzes student skills against a target role benchmark.
 */
export function analyzeSkillGaps(student: StudentProfile, role: TargetRole): SkillGapItem[] {
  const studentSkillMap = new Map<string, SkillItem>();
  student.skills.forEach(s => {
    studentSkillMap.set(normalizeSkillName(s.name).toLowerCase(), s);
  });

  return role.requiredSkills.map(req => {
    const canonical = normalizeSkillName(req.name);
    const existing = studentSkillMap.get(canonical.toLowerCase());
    const currentProficiency = existing ? existing.proficiency : 0;
    const requiredProficiency = req.minProficiency;

    let status: 'matched' | 'developing' | 'missing';
    let recommendation = '';

    if (currentProficiency >= requiredProficiency) {
      status = 'matched';
      recommendation = `Proficiency met (${currentProficiency}%). Ready for industry challenges.`;
    } else if (currentProficiency > 0) {
      status = 'developing';
      recommendation = `Upgrade from ${currentProficiency}% to ${requiredProficiency}% via hands-on project milestones.`;
    } else {
      status = 'missing';
      recommendation = `Critical gap! Recommended to start introductory module and interactive lab.`;
    }

    const gapPercentage = Math.max(0, requiredProficiency - currentProficiency);

    return {
      skillName: canonical,
      category: req.category,
      currentProficiency,
      requiredProficiency,
      weight: req.weight,
      status,
      mustHave: req.mustHave,
      gapPercentage,
      recommendation
    };
  });
}

/**
 * Personalized Roadmap Generator
 * Automatically creates a 4-tier milestone path based on missing & developing skills.
 */
export function generatePersonalizedRoadmap(gaps: SkillGapItem[]): RoadmapMilestone[] {
  const missing = gaps.filter(g => g.status === 'missing');
  const developing = gaps.filter(g => g.status === 'developing');

  const missingPrimary = missing[0]?.skillName || 'Cloud Basics';
  const developingPrimary = developing[0]?.skillName || 'React';

  return [
    {
      id: 'm-1',
      level: 1,
      title: `Phase 1: Bridge Missing Fundamentals (${missingPrimary})`,
      skillTarget: missingPrimary,
      duration: '1-2 Weeks',
      status: 'in_progress',
      tasks: [
        { id: 't-101', text: `Core Architecture & CLI Fundamentals for ${missingPrimary}`, completed: true, link: 'https://developer.mozilla.org' },
        { id: 't-102', text: `Hands-on Sandbox Setup & Environment Configuration`, completed: true },
        { id: 't-103', text: `Build Hello-World micro-service with automated testing`, completed: false }
      ],
      quiz: [
        {
          question: `In modern development, what is the primary benefit of ${missingPrimary}?`,
          options: [
            'Automated scalability, environment consistency & rapid deployment',
            'Replacing CSS styles',
            'Encrypting database passwords only',
            'Eliminating all need for writing tests'
          ],
          correctIdx: 0
        },
        {
          question: 'Which of the following describes a 12-factor application principle?',
          options: ['Store config in code', 'Strict separation of build, release, and run stages', 'Share state in global memory', 'Hardcode ports'],
          correctIdx: 1
        }
      ]
    },
    {
      id: 'm-2',
      level: 2,
      title: `Phase 2: Deep Dive & Framework Mastery (${developingPrimary})`,
      skillTarget: developingPrimary,
      duration: '2 Weeks',
      status: 'in_progress',
      tasks: [
        { id: 't-201', text: `State Management, Async Data Fetching & Error Boundaries`, completed: false },
        { id: 't-202', text: `Modular Architecture: Custom Hooks & Context Providers`, completed: false },
        { id: 't-203', text: `Optimize Web Vitals & Render Performance`, completed: false }
      ]
    },
    {
      id: 'm-3',
      level: 3,
      title: 'Phase 3: Real-World Capstone Project & Code Review',
      skillTarget: 'Full Stack Integration',
      duration: '2-3 Weeks',
      status: 'locked',
      tasks: [
        { id: 't-301', text: `Build end-to-end full-stack portal with auth, DB & CI/CD`, completed: false },
        { id: 't-302', text: `Write unit & integration test suite (>80% test coverage)`, completed: false },
        { id: 't-303', text: `Submit GitHub repository for automated SkillBridge AI verification`, completed: false }
      ]
    },
    {
      id: 'm-4',
      level: 4,
      title: 'Phase 4: Verified Skill Badge & Direct Industry Matching',
      skillTarget: 'Placement Readiness',
      duration: 'Immediate',
      status: 'locked',
      tasks: [
        { id: 't-401', text: `Score >= 80% on the SkillBridge Proctored Skill Assessment`, completed: false },
        { id: 't-402', text: `Unlock priority interview referrals for partner companies`, completed: false }
      ]
    }
  ];
}

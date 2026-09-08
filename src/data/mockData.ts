import { 
  StudentProfile, 
  TargetRole, 
  JobOpportunity, 
  CollegeBatchAnalytics, 
  IndustryEvaluation,
  CandidateItem,
  PresentationSlide 
} from '../types';

export const INITIAL_STUDENT: StudentProfile = {
  id: 'stu-2026-001',
  name: 'Rohan Sharma',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  email: 'rohan.sharma@apex.edu.in',
  college: 'Apex Institute of Technology & Engineering',
  department: 'Computer Science & Engineering',
  batchYear: 'Class of 2026 (6th Semester)',
  cgpa: 8.74,
  targetRoleId: 'role-fullstack',
  skills: [
    { id: 's-1', name: 'HTML', category: 'frontend', aliases: ['html5'], proficiency: 92, verified: true, verificationSource: 'assessment', endorsementsCount: 4 },
    { id: 's-2', name: 'CSS', category: 'frontend', aliases: ['css3'], proficiency: 88, verified: true, verificationSource: 'project', endorsementsCount: 3 },
    { id: 's-3', name: 'JavaScript', category: 'frontend', aliases: ['js', 'ecmascript', 'es6'], proficiency: 68, verified: true, verificationSource: 'assessment', endorsementsCount: 5 },
    { id: 's-4', name: 'Python', category: 'backend', aliases: ['py', 'python3'], proficiency: 88, verified: true, verificationSource: 'industry_feedback', endorsementsCount: 7 },
    { id: 's-5', name: 'SQL', category: 'database', aliases: ['postgres', 'mysql'], proficiency: 82, verified: true, verificationSource: 'project', endorsementsCount: 4 },
    { id: 's-6', name: 'Problem Solving', category: 'core_cs', aliases: ['dsa', 'algorithms'], proficiency: 85, verified: true, verificationSource: 'assessment', endorsementsCount: 6 },
    { id: 's-7', name: 'Git', category: 'devops', aliases: ['github', 'vcs'], proficiency: 58, verified: false, verificationSource: 'self_reported' },
    { id: 's-8', name: 'REST API', category: 'backend', aliases: ['rest', 'apis'], proficiency: 55, verified: false, verificationSource: 'self_reported' }
  ],
  academics: {
    degree: 'B.Tech in Computer Science & Engineering',
    sem: 6,
    gpa: 8.74,
    highlights: [
      'Ranked in top 5% of CSE department cohort',
      'Lead organizer for National Hackathon CodeForge 2025',
      'Published student paper on Graph Neural Networks in IEEE Student Conclave'
    ]
  },
  projects: [
    {
      id: 'p-1',
      title: 'DevPulse — Developer Productivity Analytics',
      tech: ['Python', 'FastAPI', 'SQL', 'Git'],
      description: 'Engineered a telemetry pipeline capturing git commit frequencies, automated PR reviews, and code complexity scores with interactive graphs.',
      githubUrl: 'https://github.com/rohan-sharma/devpulse-telemetry',
      verified: true
    },
    {
      id: 'p-2',
      title: 'Campus Food Delivery & Token Router',
      tech: ['JavaScript', 'HTML', 'CSS', 'REST API'],
      description: 'Created a real-time web portal for cafeteria token tracking, cutting lunchtime queue wait times by 40%.',
      githubUrl: 'https://github.com/rohan-sharma/campus-diner-token',
      verified: true
    }
  ],
  certifications: [
    {
      id: 'c-1',
      name: 'Algorithmic Problem Solving Intermediate',
      issuer: 'HackerRank Certified',
      date: 'Dec 2025',
      verified: true
    },
    {
      id: 'c-2',
      name: 'Modern Web Architecture Foundations',
      issuer: 'freeCodeCamp',
      date: 'Jan 2026',
      verified: true
    }
  ],
  internships: [
    {
      id: 'int-1',
      company: 'Zenith Labs India',
      role: 'Web & Automation Intern',
      duration: 'Summer 2025 (8 Weeks)',
      mentorFeedback: 'Rohan demonstrated exceptional logic and fast Python turnaround. Needs slightly more exposure to production Docker/Kubernetes environments.',
      verifiedSkills: ['Python', 'SQL', 'Problem Solving']
    }
  ],
  assessmentScores: [
    { topic: 'Data Structures & Algorithms', score: 86, date: 'Feb 2026' },
    { topic: 'Core JavaScript & DOM API', score: 72, date: 'Jan 2026' },
    { topic: 'SQL & Database Indexing', score: 84, date: 'Dec 2025' }
  ]
};

export const TARGET_ROLES: TargetRole[] = [
  {
    id: 'role-fullstack',
    title: 'Full Stack Developer',
    description: 'Builds responsive frontends and robust backends with modern frameworks, REST APIs, and database orchestration.',
    averageSalary: '₹8.5 - 14.0 LPA',
    industryDemandLevel: 'Very High',
    requiredSkills: [
      { name: 'HTML', category: 'frontend', weight: 10, minProficiency: 80, mustHave: true },
      { name: 'CSS', category: 'frontend', weight: 10, minProficiency: 75, mustHave: true },
      { name: 'JavaScript', category: 'frontend', weight: 20, minProficiency: 80, mustHave: true },
      { name: 'React', category: 'frontend', weight: 20, minProficiency: 75, mustHave: true },
      { name: 'Node.js', category: 'backend', weight: 15, minProficiency: 70, mustHave: true },
      { name: 'Git', category: 'devops', weight: 10, minProficiency: 70, mustHave: true },
      { name: 'SQL', category: 'database', weight: 15, minProficiency: 70, mustHave: false }
    ]
  },
  {
    id: 'role-backend-cloud',
    title: 'Backend & Cloud Systems Engineer',
    description: 'Designs scalable server architectures, robust APIs, database layers, and distributed cloud container services.',
    averageSalary: '₹9.0 - 16.0 LPA',
    industryDemandLevel: 'Very High',
    requiredSkills: [
      { name: 'Python', category: 'backend', weight: 25, minProficiency: 75, mustHave: true },
      { name: 'SQL', category: 'database', weight: 25, minProficiency: 70, mustHave: true },
      { name: 'Problem Solving', category: 'core_cs', weight: 20, minProficiency: 75, mustHave: true },
      { name: 'REST API', category: 'backend', weight: 15, minProficiency: 75, mustHave: true },
      { name: 'Cloud Basics', category: 'devops', weight: 15, minProficiency: 65, mustHave: true }
    ]
  },
  {
    id: 'role-ai-data',
    title: 'AI & Data Intelligence Specialist',
    description: 'Builds predictive machine learning models, ETL pipelines, semantic embeddings, and automated intelligence layers.',
    averageSalary: '₹10.0 - 18.0 LPA',
    industryDemandLevel: 'High',
    requiredSkills: [
      { name: 'Python', category: 'backend', weight: 30, minProficiency: 80, mustHave: true },
      { name: 'SQL', category: 'database', weight: 20, minProficiency: 75, mustHave: true },
      { name: 'Data Analysis', category: 'ai_data', weight: 20, minProficiency: 75, mustHave: true },
      { name: 'Machine Learning', category: 'ai_data', weight: 20, minProficiency: 70, mustHave: true },
      { name: 'Problem Solving', category: 'core_cs', weight: 10, minProficiency: 80, mustHave: true }
    ]
  }
];

export const JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: 'job-101',
    title: 'Backend & Cloud Engineering Intern',
    company: 'NexaCloud Technologies',
    logo: '☁️',
    location: 'Bangalore, India (Hybrid)',
    stipend: '₹35,000 / month',
    type: 'Internship',
    description: 'Work alongside senior cloud architects to build high-throughput microservices, optimize SQL queries, and containerize REST APIs on AWS.',
    requiredSkills: [
      { name: 'Python', weight: 25, mustHave: true },
      { name: 'SQL', weight: 25, mustHave: true },
      { name: 'Problem Solving', weight: 20, mustHave: true },
      { name: 'REST API', weight: 15, mustHave: true },
      { name: 'Cloud Basics', weight: 15, mustHave: true }
    ],
    applicantsCount: 42,
    deadline: 'In 5 days'
  },
  {
    id: 'job-102',
    title: 'Full Stack Developer Intern',
    company: 'FinTechPulse Solutions',
    logo: '⚡',
    location: 'Gurugram / Remote',
    stipend: '₹40,000 / month',
    type: 'Pre-Placement Offer',
    description: 'Build customer-facing financial dashboards with React, TypeScript, and Node.js microservices. Opportunity to convert to full-time PPO.',
    requiredSkills: [
      { name: 'JavaScript', weight: 25, mustHave: true },
      { name: 'React', weight: 25, mustHave: true },
      { name: 'Node.js', weight: 20, mustHave: true },
      { name: 'HTML', weight: 15, mustHave: false },
      { name: 'Git', weight: 15, mustHave: true }
    ],
    applicantsCount: 78,
    deadline: 'In 2 weeks'
  },
  {
    id: 'job-103',
    title: 'Data Science & Intelligence Trainee',
    company: 'QuantumData AI Labs',
    logo: '🧬',
    location: 'Hyderabad, India (Onsite)',
    stipend: '₹30,000 / month',
    type: 'Internship',
    description: 'Assist in cleaning and structuring telemetry datasets, training regression & classification models, and serving inference endpoints.',
    requiredSkills: [
      { name: 'Python', weight: 35, mustHave: true },
      { name: 'SQL', weight: 25, mustHave: true },
      { name: 'Data Analysis', weight: 25, mustHave: true },
      { name: 'Problem Solving', weight: 15, mustHave: false }
    ],
    applicantsCount: 63,
    deadline: 'In 9 days'
  }
];

export const COLLEGE_BATCH_DATA: CollegeBatchAnalytics = {
  totalStudents: 480,
  placementReadyPercentage: 68,
  activeInternships: 142,
  industryPartners: 54,
  topDemandedSkills: [
    { name: 'Docker & Containers', demandIndex: 88, studentReadinessIndex: 32, gap: 56 },
    { name: 'Cloud Basics (AWS/GCP)', demandIndex: 82, studentReadinessIndex: 38, gap: 44 },
    { name: 'REST API & Microservices', demandIndex: 86, studentReadinessIndex: 54, gap: 32 },
    { name: 'React & Modern Frontend', demandIndex: 84, studentReadinessIndex: 64, gap: 20 },
    { name: 'Python & Backend Automation', demandIndex: 79, studentReadinessIndex: 75, gap: 4 }
  ],
  branchReadiness: [
    { branch: 'Computer Science & Eng (CSE)', readinessScore: 81, studentCount: 180 },
    { branch: 'Information Technology (IT)', readinessScore: 78, studentCount: 120 },
    { branch: 'Electronics & Comm (ECE)', readinessScore: 62, studentCount: 110 },
    { branch: 'Electrical & Electronics (EEE)', readinessScore: 54, studentCount: 70 }
  ],
  curriculumGaps: [
    {
      id: 'gap-01',
      topic: 'Docker, Containerization & CI/CD Pipelines',
      industryRequirement: '78% of incoming industry internship postings demand container workflows.',
      gapSeverity: 'Critical',
      proposedAction: 'Schedule a mandatory 2-week hands-on Docker & GitHub Actions bootcamp for 6th Sem students.',
      actionTaken: false
    },
    {
      id: 'gap-02',
      topic: 'Cloud Infrastructure & Serverless Basics',
      industryRequirement: '68% of hiring partners prioritize students with hands-on AWS/GCP exposure over pure academic OS theory.',
      gapSeverity: 'Critical',
      proposedAction: 'Incorporate Cloud Sandbox Credits into the Cloud Computing Laboratory syllabus.',
      actionTaken: false
    },
    {
      id: 'gap-03',
      topic: 'Production REST API Design & Swagger Specs',
      industryRequirement: 'Industry evaluations highlight that students know basic syntax but struggle with API contract design and status code conventions.',
      gapSeverity: 'Medium',
      proposedAction: 'Add API documentation and testing with Postman/Swagger as part of Web Technologies lab assignments.',
      actionTaken: true
    }
  ]
};

export const INITIAL_EVALUATIONS: IndustryEvaluation[] = [
  {
    id: 'eval-501',
    internshipId: 'int-1',
    studentId: 'stu-2026-001',
    studentName: 'Rohan Sharma',
    companyName: 'Zenith Labs India',
    mentorName: 'Vikramaditya Sengupta (VP Engineering)',
    role: 'Web & Automation Intern',
    submittedAt: 'Jan 28, 2026',
    technicalCompetenceScore: 4.8,
    endorsedSkills: ['Python', 'SQL', 'Problem Solving'],
    skillsLacking: ['Docker', 'Cloud Basics'],
    curriculumFeedback: 'Student had superb fundamental logic and wrote great Python scripts. However, our team spent 10 days training him on Docker and AWS environments before he could deploy independently.',
    readyForPPO: true
  }
];

export const SAMPLE_CANDIDATES: CandidateItem[] = [
  {
    id: 'stu-2026-001',
    name: 'Rohan Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: 'Apex Institute of Tech (CSE, 6th Sem)',
    cgpa: 8.74,
    skills: [
      { name: 'Python', proficiency: 88 },
      { name: 'SQL', proficiency: 82 },
      { name: 'Problem Solving', proficiency: 85 },
      { name: 'REST API', proficiency: 55 },
      { name: 'Git', proficiency: 58 }
    ],
    matchScore: 82, // Matches the SIH user prompt 82% example!
    status: 'Shortlisted'
  },
  {
    id: 'stu-2026-002',
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    college: 'National Institute of Tech (IT, 6th Sem)',
    cgpa: 9.15,
    skills: [
      { name: 'Python', proficiency: 92 },
      { name: 'SQL', proficiency: 90 },
      { name: 'Problem Solving', proficiency: 94 },
      { name: 'REST API', proficiency: 88 },
      { name: 'Cloud Basics', proficiency: 80 }
    ],
    matchScore: 94,
    status: 'Interview Scheduled'
  },
  {
    id: 'stu-2026-003',
    name: 'Devansh Patel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    college: 'Apex Institute of Tech (ECE, 6th Sem)',
    cgpa: 8.1,
    skills: [
      { name: 'Python', proficiency: 70 },
      { name: 'SQL', proficiency: 65 },
      { name: 'Problem Solving', proficiency: 68 },
      { name: 'Git', proficiency: 60 }
    ],
    matchScore: 61,
    status: 'Pending'
  }
];

export const SIH_PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    slideNumber: 1,
    title: 'SkillBridge',
    subtitle: 'AI-Powered Academia–Industry Skill Intelligence Platform',
    category: 'SIH 2026 Problem Statement: SIH26044',
    bullets: [
      { bold: 'The Vision:', text: 'A dynamic intelligence ecosystem connecting Students, Colleges, and Industry through real-time competency mapping.' },
      { bold: 'The Core Shift:', text: 'Moving away from generic job boards to true Skill-Intelligence and continuous feedback loops.' },
      { bold: 'Aligned Impact:', text: 'Empowering India’s engineering talent with verifiable readiness for high-demand careers.' }
    ],
    quote: '“We don’t just connect students with opportunities. We connect industry demand with student development.”'
  },
  {
    slideNumber: 2,
    title: 'The Problem: The Tripartite Disconnect',
    subtitle: 'What students learn ≠ What skills they have ≠ What industries need',
    category: 'Systemic Gap Analysis',
    bullets: [
      { bold: 'Students in the Dark:', text: 'Unclear about real market expectations, lacking objective gap visibility, and guessing what to learn next.' },
      { bold: 'Colleges Out of Sync:', text: 'Curriculums change slowly (3-4 year cycles) while industry tech stacks evolve every 6-12 months.' },
      { bold: 'Industries Sifting blindly:', text: 'Overwhelmed by keyword-stuffed resumes with zero verified proficiency signals.' }
    ],
    highlightMetric: { value: '74%', label: 'Of graduates lack production-ready skills required by day-one tech employers' }
  },
  {
    slideNumber: 3,
    title: 'Why Existing Systems Fall Short',
    subtitle: 'Job-Centric (Broken) vs. Skill-Intelligence (SkillBridge)',
    category: 'Comparative Differentiation',
    bullets: [
      { bold: 'Traditional Portals:', text: 'Linear student → job pipeline. If rejected, student gets no diagnostic feedback.' },
      { bold: 'Naive Keyword Matching:', text: 'Looking for the string "React" rather than contextual competency and portfolio artifacts.' },
      { bold: 'Dead-End Process:', text: 'After hiring, zero feedback is routed back to the university to improve the next batch.' }
    ],
    quote: 'Existing portals are transactional job boards; SkillBridge is a continuous educational diagnostic engine.'
  },
  {
    slideNumber: 4,
    title: 'Our Solution: The SkillBridge Ecosystem',
    subtitle: 'A synchronized closed loop between Student, College & Industry',
    category: 'Ecosystem Architecture',
    bullets: [
      { bold: 'Student Hub:', text: 'Multi-source skill profiling, AI gap analysis, and adaptive learning roadmaps.' },
      { bold: 'Industry Portal:', text: 'Skill-weighted opportunities, candidate discovery, and transparent explainable match scores.' },
      { bold: 'College Intelligence:', text: 'Batch readiness analytics, branch heatmaps, and automated curriculum gap advisories.' },
      { bold: 'The Bridge Engine:', text: 'Ontology normalization + Vector embeddings + Closed-loop post-internship evaluation.' }
    ],
    demoTargetPersona: 'student'
  },
  {
    slideNumber: 5,
    title: 'Student Skill Profile Intelligence',
    subtitle: 'Deep aggregation across the entire student journey',
    category: 'Input Normalization',
    bullets: [
      { bold: 'Multi-Modal Ingestion:', text: 'Synthesizes GitHub project code, proctored assessments, certifications, and academic marks.' },
      { bold: 'Verified vs. Self-Reported:', text: 'Skills earn cryptographic and institutional verification badges through peer projects and mentor sign-offs.' },
      { bold: 'Dynamic Skill Cloud:', text: 'Continuous scoring updating in real-time as the student completes verified tasks.' }
    ],
    demoTargetPersona: 'student'
  },
  {
    slideNumber: 6,
    title: 'AI Skill Mapping & Gap Analysis',
    subtitle: 'Current Skills vs. Target Role Benchmark',
    category: 'Diagnostic Engine',
    bullets: [
      { bold: 'Role Benchmarking:', text: 'Student chooses target career (e.g. Full Stack Developer, AI Specialist, Cloud Engineer).' },
      { bold: '3-Tier Gap Classification:', text: 'Categorizes skills into Proficient (✅), Developing (⚠️), and Critical Missing (❌).' },
      { bold: 'Weighted Urgency:', text: 'Identifies which missing skill yields the highest jump in internship interview eligibility.' }
    ],
    highlightMetric: { value: 'Visual Radar', label: 'Multi-dimensional competence comparison against live market standards' },
    demoTargetPersona: 'student'
  },
  {
    slideNumber: 7,
    title: 'Personalized Adaptive Roadmap',
    subtitle: 'From diagnostic gap to production-grade competence',
    category: 'Personalized Learning',
    bullets: [
      { bold: 'Phase 1 - Fundamentals:', text: 'Curated interactive sandbox labs targeting foundational deficiencies.' },
      { bold: 'Phase 2 - Framework Deep-Dive:', text: 'Practical architectural patterns, async workflows, and state design.' },
      { bold: 'Phase 3 - Capstone Project:', text: 'Full-stack repository milestone with automated code review and lint checks.' },
      { bold: 'Phase 4 - Verification & Placement:', text: 'Proctored assessment unlocking 1-click industry internship referrals.' }
    ],
    demoTargetPersona: 'student'
  },
  {
    slideNumber: 8,
    title: 'Industry Matching & Explainable Match Score',
    subtitle: 'Saying goodbye to black-box candidate filters',
    category: 'Talent Discovery',
    bullets: [
      { bold: 'Weighted Skill Criteria:', text: 'Companies define must-have vs nice-to-have skills with custom weights.' },
      { bold: 'The 82% Explainable Breakdown:', text: 'System displays WHY candidate scored 82%: ✅ Python, ✅ SQL, ✅ Problem Solving, ⚠️ REST API, ❌ Cloud Basics.' },
      { bold: 'Transparent Justification:', text: 'Recruiters know immediately that 2 weeks of cloud onboarding will turn candidate into a 95% fit.' }
    ],
    highlightMetric: { value: '82% Match', label: 'Explainable score with transparent skill-by-skill contribution breakdown' },
    demoTargetPersona: 'industry'
  },
  {
    slideNumber: 9,
    title: 'College Intelligence Dashboard',
    subtitle: 'Empowering HODs, Deans & Placement Directors with data',
    category: 'Institutional Analytics',
    bullets: [
      { bold: 'Batch Readiness Metrics:', text: 'Live percentage of placement-ready students segmented by branch and semester.' },
      { bold: 'Market Demand vs. Student Supply:', text: 'Visual discrepancy curves between top required skills and student cohort strength.' },
      { bold: 'Curriculum Gap Alerts:', text: 'Automated warnings (e.g. "78% internships require Docker, but syllabus only covers VMs").' }
    ],
    demoTargetPersona: 'college'
  },
  {
    slideNumber: 10,
    title: 'The Closed Feedback Loop (Key Differentiator)',
    subtitle: 'Continuous institutional improvement post-internship',
    category: 'The Core Moat',
    bullets: [
      { bold: 'Authorized Industry Evaluation:', text: 'Mentor evaluates student on real production deliverables at the end of the internship.' },
      { bold: 'Student Profile Upgrade:', text: 'Demonstrated skills receive verified industry endorsements, boosting student readiness score.' },
      { bold: 'Curriculum Intelligence:', text: 'Anonymized corporate feedback feeds directly back into college syllabus committees.' }
    ],
    quote: '“Industry Demand → Skills → Students → Internship → Industry Feedback → Better Preparation”'
  },
  {
    slideNumber: 11,
    title: 'Technology & System Architecture',
    subtitle: 'Built for enterprise scale, explainability & security',
    category: 'System Design',
    bullets: [
      { bold: 'Presentation & UI:', text: 'React, TypeScript, CSS Custom Tokens, Glassmorphism, Recharts, Responsive Layout.' },
      { bold: 'API & Orchestration Layer:', text: 'Modular REST endpoints for Skill Extraction, Profiling & Evaluation submission.' },
      { bold: 'AI & Skill Intelligence:', text: 'Hierarchical Taxonomy Normalizer, Cosine Similarity, Weighted Match Scoring.' },
      { bold: 'Database & Storage:', text: 'Structured relational schema for Students, Companies, Roles, Rubrics & Feedback Logs.' }
    ],
    highlightMetric: { value: '<120ms', label: 'Sub-second explainable match inference across 10,000+ candidate profiles' }
  },
  {
    slideNumber: 12,
    title: 'Impact, Scalability & The SIH Winning Vision',
    subtitle: 'Transforming technical education across India',
    category: 'National Impact',
    bullets: [
      { bold: 'For Students:', text: 'Crystal-clear career clarity, personalized progression, and merit-based internship access.' },
      { bold: 'For Colleges:', text: 'Actionable curriculum intelligence, higher placement conversion, and NBA/NAAC accreditation metrics.' },
      { bold: 'For Industry:', text: 'Zero time wasted on unqualified resumes, 3x faster hiring cycles, and tailored talent pipelines.' }
    ],
    quote: 'SkillBridge is an AI-powered platform that maps student skills, identifies skill gaps, recommends personalized development paths, connects students with suitable industry opportunities, and uses industry feedback to continuously improve academia–industry alignment.'
  }
];

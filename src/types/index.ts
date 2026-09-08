export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'devops' 
  | 'ai_data' 
  | 'core_cs' 
  | 'soft_skills';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type SkillVerificationSource = 
  | 'assessment' 
  | 'project' 
  | 'course' 
  | 'industry_feedback' 
  | 'self_reported';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  aliases: string[];
  proficiency: number; // 0 to 100
  verified: boolean;
  verificationSource?: SkillVerificationSource;
  endorsementsCount?: number;
}

export interface StudentProject {
  id: string;
  title: string;
  tech: string[];
  description: string;
  githubUrl: string;
  verified: boolean;
}

export interface StudentCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verified: boolean;
}

export interface StudentInternship {
  id: string;
  company: string;
  role: string;
  duration: string;
  mentorFeedback?: string;
  verifiedSkills: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  college: string;
  department: string;
  batchYear: string;
  cgpa: number;
  targetRoleId: string;
  skills: SkillItem[];
  academics: {
    degree: string;
    sem: number;
    gpa: number;
    highlights: string[];
  };
  projects: StudentProject[];
  certifications: StudentCertification[];
  internships: StudentInternship[];
  assessmentScores: { topic: string; score: number; date: string }[];
}

export interface TargetRole {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  industryDemandLevel: 'Very High' | 'High' | 'Moderate';
  requiredSkills: {
    name: string;
    category: SkillCategory;
    weight: number;
    minProficiency: number;
    mustHave: boolean;
  }[];
}

export type SkillGapStatus = 'matched' | 'developing' | 'missing';

export interface SkillGapItem {
  skillName: string;
  category: SkillCategory;
  currentProficiency: number;
  requiredProficiency: number;
  weight: number;
  status: SkillGapStatus;
  mustHave: boolean;
  gapPercentage: number;
  recommendation: string;
}

export interface RoadmapMilestone {
  id: string;
  level: number;
  title: string;
  skillTarget: string;
  duration: string;
  status: 'completed' | 'in_progress' | 'locked';
  tasks: { id: string; text: string; completed: boolean; link?: string }[];
  quiz?: { question: string; options: string[]; correctIdx: number }[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  stipend: string;
  type: 'Internship' | 'Full-time' | 'Pre-Placement Offer';
  description: string;
  requiredSkills: { name: string; weight: number; mustHave: boolean }[];
  applicantsCount: number;
  deadline: string;
}

export interface ExplainableMatchResult {
  overallScore: number;
  matchedSkills: { name: string; weight: number; contribution: number }[];
  developingSkills: { name: string; weight: number; current: number; required: number }[];
  missingSkills: { name: string; weight: number }[];
  verdict: string;
  summary: string;
}

export interface CollegeBatchAnalytics {
  totalStudents: number;
  placementReadyPercentage: number;
  activeInternships: number;
  industryPartners: number;
  topDemandedSkills: {
    name: string;
    demandIndex: number;
    studentReadinessIndex: number;
    gap: number;
  }[];
  branchReadiness: {
    branch: string;
    readinessScore: number;
    studentCount: number;
  }[];
  curriculumGaps: {
    id: string;
    topic: string;
    industryRequirement: string;
    gapSeverity: 'Critical' | 'Medium' | 'Low';
    proposedAction: string;
    actionTaken?: boolean;
  }[];
}

export interface IndustryEvaluation {
  id: string;
  internshipId: string;
  studentId: string;
  studentName: string;
  companyName: string;
  mentorName: string;
  role: string;
  submittedAt: string;
  technicalCompetenceScore: number; // 1 to 5
  endorsedSkills: string[];
  skillsLacking: string[];
  curriculumFeedback: string;
  readyForPPO: boolean;
}

export type ActivePersona = 'student' | 'industry' | 'college' | 'presentation';

export interface CandidateItem {
  id: string;
  name: string;
  avatar: string;
  college: string;
  cgpa: number;
  skills: { name: string; proficiency: number }[];
  matchScore: number;
  status: 'Pending' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Sent';
}

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  subtitle: string;
  category: string;
  bullets: { bold: string; text: string }[];
  highlightMetric?: { value: string; label: string };
  quote?: string;
  demoTargetPersona?: 'student' | 'industry' | 'college';
}

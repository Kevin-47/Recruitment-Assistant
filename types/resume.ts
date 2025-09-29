export interface SkillScore {
  skill: string;
  score: number;
  reasoning: string;
  category?: 'technical' | 'soft' | 'domain';
}

export interface AnalysisResult {
  overall_score: number;
  skill_scores: Record<string, number>;
  skill_reasoning: Record<string, string>;
  selected: boolean;
  reasoning: string;
  strengths: string[];
  improvement_areas: string[];
  cutoff_score?: number;
  detailed_analysis?: {
    technical_skills: SkillScore[];
    soft_skills: SkillScore[];
    experience_level: number;
    education_match: number;
    project_relevance: number;
  };
  recommendations?: string[];
  confidence_level?: number;
}

export interface CandidateInfo {
  name: string;
  email: string;
  phone?: string;
  role: string;
}

export interface ResumeAnalysisRequest {
  candidate: CandidateInfo;
  resume_file: File;
  role_requirements?: string[];
  custom_jd?: string;
  cutoff_score?: number;
}

export interface EmailResult {
  success: boolean;
  message: string;
  email_sent_to?: string;
}

export type AnalysisStatus = 'idle' | 'analyzing' | 'completed' | 'error';

export interface ResumeAnalysisState {
  status: AnalysisStatus;
  result: AnalysisResult | null;
  error: string | null;
  candidate: CandidateInfo | null;
  emailResult: EmailResult | null;
}

export interface InterviewQA {
  question: string;
  answer: string;
  confidence: number;
  accuracy: 'correct' | 'partial' | 'incorrect';
}

export interface InterviewAnalysisResult {
  overallScore: number;
  confidence: number;
  communicationScore: number;
  technicalScore: number;
  bodyLanguage: number;
  transcript: string;
  sentimentAnalysis: {
    positive: number;
    neutral: number;
    negative: number;
  };
  qaPairs: InterviewQA[];
  keyInsights: string[];
  timeBreakdown: {
    introduction: number;
    technical: number;
    behavioral: number;
    questions: number;
    closing: number;
  };
  summary: string;
}
// Customer statuses
export type CustomerStatus = 'applied' | 'interviewing' | 'writing' | 'reviewing' | 'delivered';

// Interview statuses
export type InterviewStatus = 'scheduled' | 'completed' | 'failed';

// Manuscript statuses
export type ManuscriptStatus = 'draft' | 'checked' | 'approved';

// Customer
export interface Customer {
  id: string;
  name: string;
  age: number | null;
  email: string;
  phone: string;
  parentSituation: string | null;
  applicationReason: string | null;
  status: CustomerStatus;
  createdAt: string;
  interviews?: Interview[];
  manuscripts?: Manuscript[];
  deliverables?: Deliverable[];
  feedbacks?: Feedback[];
}

// Interview
export interface Interview {
  id: string;
  customerId: string;
  sessionNumber: number; // 1-6
  scheduledAt: string | null;
  completedAt: string | null;
  audioFileUrl: string | null;
  transcription: string | null;
  consentAudioUrl: string | null;
  status: InterviewStatus;
}

// Manuscript
export interface Manuscript {
  id: string;
  customerId: string;
  chapterNumber: number; // 1-5
  rawContent: string | null;
  riskCheckedContent: string | null;
  riskCheckLog: RiskCheckLogEntry[] | null;
  status: ManuscriptStatus;
}

// Risk check log entry
export interface RiskCheckLogEntry {
  category: 'third_party' | 'discrimination' | 'defamation';
  original: string;
  modified: string;
  reason: string;
}

// Deliverable
export interface Deliverable {
  id: string;
  customerId: string;
  pdfUrl: string | null;
  deliveredAt: string | null;
  disclaimerText: string;
}

// Feedback
export interface Feedback {
  id: string;
  customerId: string;
  overallSatisfaction: number | null;
  accuracy: number | null;
  readability: number | null;
  interviewExperience: number | null;
  nps: number | null;
  improvements: string | null;
  fairPrice: string | null;
  desiredFeatures: string | null;
  createdAt: string;
}

// Application form data
export interface ApplicationFormData {
  name: string;
  age: number;
  email: string;
  phone: string;
  parentSituation: string;
  applicationReason: string;
}

// Chapter template
export interface ChapterTemplate {
  number: number;
  title: string;
  description: string;
}

// Risk check result
export interface RiskCheckResult {
  correctedContent: string;
  log: RiskCheckLogEntry[];
}

// Generate request
export interface GenerateRequest {
  customerId: string;
  chapterNumber: number;
  transcriptions: string[];
}

// Risk check request
export interface RiskCheckRequest {
  manuscriptId: string;
  content: string;
}

// PDF generation request
export interface PdfGenerateRequest {
  customerId: string;
  authorName: string;
  title?: string;
}

// Transcribe request
export interface TranscribeRequest {
  customerId: string;
  sessionNumber: number;
  audioFile?: File;
  manualText?: string;
}

// API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

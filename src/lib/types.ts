export type UploadType = {
  id: number;
  user_id: number;
  url: string;
  processing_state: number;
  pdf_id: string;
  pages: number;
  pdf_name: string;
  created_at: string;
  deleted_at: string;
};

export type DashboardInfoType = {
  total_pdf: number;
  total_quiz: number;
  total_exam_participated: number;
  recent_pdfs: UploadType[];
  recent_quizzes: QuizType[];
};

export type QuestionType = {
  id: number;
  exam_id: number;
  text: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  created_at?: string;
  correct_answer: string;
  explanation: string;
};

export type QuizType = {
  id: number;
  name: string;
  retake: boolean;
  start_time: string;
  end_time: string;
  quiz_type: string;
  topic: string;
  start_page: number;
  end_page: number;
  participants_count: number;
  questions_count: number;
  processing_state: number;
  created_at: string;
  quiz_difficulty: string;
  uploads: UploadType[];
  questions: QuestionType[];
};

export type TakeExamType = {
  message: "Exam started";
  takes_id: number;
  exam_id: number;
  exam: Omit<QuizType, "questions" | "uploads">;
  questions: Omit<QuestionType, "correct_answer" | "explanation">[];
};

export type DashboardTakeType = {
  total_exams: number;
  avg_score: number;
  best_score: number;
  takes: {
    id: number;
    quiz_name: string;
    quiz_difficulty: string;
    quiz_type: string;
    correct_answers: number;
    quiz_created_at: string;
    ranking: number;
    total_participants: number;
    total_questions: number;
  }[];
};

export type ExamResultType = {
  take_id: number;
  exam: {
    id: number;
    name: string;
    quiz_difficulty: "easy" | "medium" | "hard";
    quiz_type: "topic" | "page_range" | string;
    topic: string | null;
    start_page: number | null;
    end_page: number | null;
    questions_count: number;
    created_at: string;
  };
  user_id: number;
  correct_answers: number;
  total_questions: number;
  score_percentage: number;
  ranking: number;
  total_participants: number;
  questions: {
    id: number;
    text: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    correct_answer: string;
    explanation: string;
    user_answer: string;
    is_correct: boolean;
  }[];
  created_at: string;
};

export interface ParticipantSummary {
  user_id: number;
  username: string;
  correct_answers: number;
  total_questions: number;
  score_percentage: number; // 0-100
  ranking: number; // 1-based rank
  time_taken: number | null; // seconds (or whatever unit you adopt)
  completed_at: string; // ISO-8601 timestamp
}

export interface QuestionAnalytics {
  question_id: number;
  question_text: string;
  total_attempts: number;
  correct_attempts: number;
  success_rate: number; // percentage, e.g. 33.33
  option_1_count: number;
  option_2_count: number;
  option_3_count: number;
  option_4_count: number;
  correct_option: "1" | "2" | "3" | "4";
}

export interface ScoreDistributionBucket {
  score_range: string; // e.g. "0-20"
  count: number;
  percentage: number; // 0-100
}

export interface DailyParticipantsCount {
  date: string; // YYYY-MM-DD
  count: number;
}

/* ─────────────────────────  Root Object  ─────────────────────── */

export interface QuizAnalyticsType {
  exam_id: number;
  exam_name: string;
  exam_creator: string;
  quiz_type: "topic" | "page_range" | string;
  quiz_difficulty: "easy" | "medium" | "hard";
  topic: string | null;
  start_page: number | null;
  end_page: number | null;
  questions_count: number;
  created_at: string; // ISO-8601
  start_time: string; // ISO-8601
  end_time: string; // ISO-8601

  /* Aggregate performance */
  total_participants: number;
  total_completed: number;
  completion_rate: number; // percentage
  average_score: number; // 0-100
  median_score: number; // 0-100
  highest_score: number; // 0-100
  lowest_score: number; // 0-100
  std_deviation: number;

  /* Detailed lists */
  participants: ParticipantSummary[];
  question_analytics: QuestionAnalytics[];
  score_distribution: ScoreDistributionBucket[];
  daily_participants: DailyParticipantsCount[];
}

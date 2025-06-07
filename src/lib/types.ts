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

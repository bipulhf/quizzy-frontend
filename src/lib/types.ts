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
};

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
  recent_quizzes: any[];
};

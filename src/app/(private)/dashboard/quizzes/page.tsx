import { QuizzesHeader } from "@/components/quizzes/quizzes-header";
import { QuizFilters } from "@/components/quizzes/quiz-filters";
import { QuizList } from "@/components/quizzes/quiz-list";
import { listUploadsAction } from "@/action/uploads.action";
import { getQuizzesAction } from "@/action/quiz.action";

export default async function QuizzesPage() {
  const pdfsPromise = listUploadsAction();
  const quizzesPromise = getQuizzesAction();

  const [pdfs, quizzes] = await Promise.all([pdfsPromise, quizzesPromise]);

  if (!pdfs.success || !quizzes.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
          <p className="text-red-500">{pdfs.error || quizzes.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <QuizzesHeader pdfs={pdfs.data} />

        {/* Filters */}
        <QuizFilters />

        {/* Quiz List */}
        <QuizList quizzes={quizzes.data} />
      </div>
    </div>
  );
}

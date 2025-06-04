import { QuizzesHeader } from "@/components/quizzes/quizzes-header";
import { QuizFilters } from "@/components/quizzes/quiz-filters";
import { QuizList } from "@/components/quizzes/quiz-list";
export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <QuizzesHeader />

        {/* Filters */}
        <QuizFilters />

        {/* Quiz List */}
        <QuizList />
      </div>
    </div>
  );
}

import { EditQuizHeader } from "@/components/quiz-edit/edit-quiz-header";
import { QuizSettings } from "@/components/quiz-edit/quiz-settings";
import { QuestionsList } from "@/components/quiz-edit/questions-list";
import { QuizPreview } from "@/components/quiz-edit/quiz-preview";

export default async function EditQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <EditQuizHeader quizId={p.id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quiz Settings */}
          <div className="lg:col-span-1">
            <QuizSettings />
          </div>

          {/* Middle Column - Questions List */}
          <div className="lg:col-span-2">
            <QuestionsList />
          </div>
        </div>
      </div>
    </div>
  );
}

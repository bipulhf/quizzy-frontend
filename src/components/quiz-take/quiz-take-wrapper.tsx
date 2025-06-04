"use client";

import { useState } from "react";
import { TakeExamHeader } from "@/components/quiz-take/take-exam-header";
import { QuestionNavigation } from "@/components/quiz-take/question-navigation";
import { QuestionsList as ExamQuestionsList } from "@/components/quiz-take/questions-list";
import { ExamResults } from "@/components/quiz-take/exam-results";
import { ExamRankings } from "@/components/quiz-take/exam-rankings";

export function QuizTakeWrapper({ quizId }: { quizId: string }) {
  const [currentView, setCurrentView] = useState<
    "exam" | "results" | "rankings"
  >("exam");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setCurrentView("results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <TakeExamHeader
          quizId={quizId}
          currentView={currentView}
          setCurrentView={setCurrentView}
          isSubmitted={isSubmitted}
        />

        {currentView === "exam" && !isSubmitted && (
          <>
            {/* Question Navigation */}
            <QuestionNavigation />

            {/* Questions List */}
            <ExamQuestionsList onSubmit={handleSubmitExam} />
          </>
        )}

        {currentView === "results" && isSubmitted && <ExamResults />}

        {currentView === "rankings" && isSubmitted && <ExamRankings />}
      </div>
    </div>
  );
}

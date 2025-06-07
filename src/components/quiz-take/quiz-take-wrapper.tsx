"use client";

import { useState } from "react";
import { TakeExamHeader } from "@/components/quiz-take/take-exam-header";
import { QuestionNavigation } from "@/components/quiz-take/question-navigation";
import { QuestionsList as ExamQuestionsList } from "@/components/quiz-take/questions-list";
import { ExamResults } from "@/components/quiz-take/exam-results";
import { ExamRankings } from "@/components/quiz-take/exam-rankings";
import { TakeExamType } from "@/lib/types";

export function QuizTakeWrapper({ examData }: { examData: TakeExamType }) {
  const [currentView, setCurrentView] = useState<
    "exam" | "results" | "rankings"
  >("exam");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    setCurrentView("results");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <TakeExamHeader
          examName={examData.exam.name}
          startTime={examData.exam.start_time}
          endTime={examData.exam.end_time}
          examQuestions={examData.questions.length}
          currentView={currentView}
          setCurrentView={setCurrentView}
          isSubmitted={isSubmitted}
        />

        {currentView === "exam" && !isSubmitted && (
          <>
            {/* Question Navigation */}
            <QuestionNavigation
              answeredCount={
                examData.questions.filter((question) => answers[question.id])
                  .length
              }
              remainingCount={
                examData.questions.length -
                examData.questions.filter((question) => answers[question.id])
                  .length
              }
            />

            {/* Questions List */}
            <ExamQuestionsList
              questions={examData.questions}
              answers={answers}
              setAnswers={setAnswers}
              onSubmit={handleSubmitExam}
            />
          </>
        )}

        {currentView === "results" && isSubmitted && <ExamResults />}

        {currentView === "rankings" && isSubmitted && <ExamRankings />}
      </div>
    </div>
  );
}

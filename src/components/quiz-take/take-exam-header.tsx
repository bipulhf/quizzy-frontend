"use client";

import { Button } from "@/components/ui/button";
import { Clock, FileQuestion } from "lucide-react";

interface TakeExamHeaderProps {
  quizId: string;
  currentView: "exam" | "results" | "rankings";
  setCurrentView: (view: "exam" | "results" | "rankings") => void;
  isSubmitted: boolean;
}

export function TakeExamHeader({
  quizId,
  currentView,
  setCurrentView,
  isSubmitted,
}: TakeExamHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <FileQuestion className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Machine Learning Fundamentals
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>15 Questions</span>
          <span>•</span>
          <span>45 minutes</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isSubmitted && (
          <div className="flex items-center gap-2">
            <Button
              variant={currentView === "results" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("results")}
            >
              Results
            </Button>
            <Button
              variant={currentView === "rankings" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView("rankings")}
            >
              Rankings
            </Button>
          </div>
        )}

        {!isSubmitted && (
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600 font-medium">42:15</span>
          </div>
        )}
      </div>
    </div>
  );
}

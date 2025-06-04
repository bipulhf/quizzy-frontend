"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Flag } from "lucide-react";

const examQuestions = [
  {
    id: 1,
    question:
      "What is the main difference between supervised and unsupervised learning?",
    options: [
      "Data labeling requirements",
      "Processing speed",
      "Hardware requirements",
      "Programming language used",
    ],
  },
  {
    id: 2,
    question: "Which algorithm is commonly used for classification tasks?",
    options: ["K-means clustering", "Random Forest", "PCA", "DBSCAN"],
  },
  {
    id: 3,
    question: "What does overfitting mean in machine learning?",
    options: [
      "Model performs well on training data but poorly on test data",
      "Model performs poorly on both training and test data",
      "Model takes too long to train",
      "Model uses too much memory",
    ],
  },
  // Add more questions as needed
];

interface QuestionsListProps {
  onSubmit: () => void;
}

export function QuestionsList({ onSubmit }: QuestionsListProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(
    new Set()
  );

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const toggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    const unanswered = examQuestions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      const confirm = window.confirm(
        `You have ${unanswered.length} unanswered questions. Are you sure you want to submit?`
      );
      if (!confirm) return;
    }
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {examQuestions.map((question, index) => (
        <Card key={question.id} className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Question {index + 1} of {examQuestions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-900 font-medium">{question.question}</p>

            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  onClick={() =>
                    handleAnswerChange(question.id, optionIndex.toString())
                  }
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer ${
                    answers[question.id] === optionIndex.toString()
                      ? "bg-blue-100/50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem
                    value={optionIndex.toString()}
                    id={`q${question.id}-option${optionIndex}`}
                  />
                  <Label
                    htmlFor={`q${question.id}-option${optionIndex}`}
                    className="flex-1 cursor-pointer"
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + optionIndex)}.
                    </span>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      {/* Submit Section */}
      <Card className="border-0 shadow-md bg-blue-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Ready to submit?</h3>
              <p className="text-sm text-gray-600">
                You have answered {Object.keys(answers).length} out of{" "}
                {examQuestions.length} questions
              </p>
            </div>
            <Button onClick={handleSubmit} size="lg">
              Submit Exam
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

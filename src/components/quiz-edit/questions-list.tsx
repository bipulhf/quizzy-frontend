"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, GripVertical, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const initialQuestions = [
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
    correctAnswer: 0,
    explanation:
      "Supervised learning requires labeled training data, while unsupervised learning works with unlabeled data to find hidden patterns.",
  },
  {
    id: 2,
    question: "Which algorithm is commonly used for classification tasks?",
    options: ["K-means clustering", "Random Forest", "PCA", "DBSCAN"],
    correctAnswer: 1,
    explanation:
      "Random Forest is a popular ensemble method used for both classification and regression tasks.",
  },
];

export function QuestionsList() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    };
    setQuestions([...questions, newQuestion]);
    setEditingQuestion(newQuestion.id);
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Questions ({questions.length})
        </CardTitle>
        <Button onClick={addQuestion} variant={"secondary"} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Question {index + 1}</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteQuestion(question.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <Label>Question</Label>
              <Textarea
                value={question.question}
                onChange={(e) =>
                  updateQuestion(question.id, "question", e.target.value)
                }
                placeholder="Enter your question here..."
                rows={2}
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label>Answer Options</Label>
              <RadioGroup
                value={question.correctAnswer.toString()}
                onValueChange={(value) =>
                  updateQuestion(
                    question.id,
                    "correctAnswer",
                    Number.parseInt(value)
                  )
                }
              >
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem
                      value={optionIndex.toString()}
                      id={`q${question.id}-option${optionIndex}`}
                    />
                    <div className="flex-1 relative">
                      <Input
                        value={option}
                        onChange={(e) =>
                          updateOption(question.id, optionIndex, e.target.value)
                        }
                        placeholder={`Option ${String.fromCharCode(
                          65 + optionIndex
                        )}`}
                        className={
                          question.correctAnswer === optionIndex
                            ? "border-green-500 bg-green-50"
                            : ""
                        }
                      />
                      {question.correctAnswer === optionIndex && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-xs text-gray-500">
                Select the radio button to mark the correct answer
              </p>
            </div>

            {/* Explanation */}
            <div className="space-y-2">
              <Label>Explanation</Label>
              <Textarea
                value={question.explanation}
                onChange={(e) =>
                  updateQuestion(question.id, "explanation", e.target.value)
                }
                placeholder="Explain why this is the correct answer..."
                rows={2}
              />
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No questions added yet. Click "Add Question" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

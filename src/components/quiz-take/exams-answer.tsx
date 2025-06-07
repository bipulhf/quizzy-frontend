import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, Trophy, Target } from "lucide-react";

const results = {
  score: 12,
  totalQuestions: 15,
  percentage: 80,
  timeSpent: "32:45",
  rank: 3,
  totalParticipants: 24,
};

const questionResults = [
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
    userAnswer: 0,
    correctAnswer: 0,
    explanation:
      "Supervised learning requires labeled training data, while unsupervised learning works with unlabeled data to find hidden patterns.",
    isCorrect: true,
  },
  {
    id: 2,
    question: "Which algorithm is commonly used for classification tasks?",
    options: ["K-means clustering", "Random Forest", "PCA", "DBSCAN"],
    userAnswer: 0,
    correctAnswer: 1,
    explanation:
      "Random Forest is a popular ensemble method used for both classification and regression tasks.",
    isCorrect: false,
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
    userAnswer: 0,
    correctAnswer: 0,
    explanation:
      "Overfitting occurs when a model learns the training data too well, including noise, making it perform poorly on new, unseen data.",
    isCorrect: true,
  },
];

export function ExamResults() {
  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-2">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {results.percentage}%
              </div>
              <div className="text-sm text-gray-600">Final Score</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-2">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {results.score}/{results.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-2">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {results.timeSpent}
              </div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-2">
                <Trophy className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                #{results.rank}
              </div>
              <div className="text-sm text-gray-600">Your Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question by Question Results */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Detailed Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questionResults.map((result, index) => (
            <div key={result.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Question {index + 1}</Badge>
                  {result.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <Badge
                  variant={result.isCorrect ? "default" : "destructive"}
                  className={
                    result.isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {result.isCorrect ? "Correct" : "Incorrect"}
                </Badge>
              </div>

              <p className="font-medium text-gray-900">{result.question}</p>

              <div className="space-y-2">
                {result.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-3 rounded-lg border ${
                      optionIndex === result.correctAnswer
                        ? "bg-green-50 border-green-300"
                        : optionIndex === result.userAnswer && !result.isCorrect
                        ? "bg-red-50 border-red-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      <span>{option}</span>
                      {optionIndex === result.correctAnswer && (
                        <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
                      )}
                      {optionIndex === result.userAnswer &&
                        !result.isCorrect && (
                          <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-1">Explanation:</h4>
                <p className="text-blue-800 text-sm">{result.explanation}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

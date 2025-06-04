import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileQuestion,
  Users,
  MoreHorizontal,
  Play,
  Share2,
  Edit,
  Copy,
  Trash2,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const quizzes = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    description: "Comprehensive quiz covering basic ML concepts and algorithms",
    type: "Topic-based",
    questions: 25,
    participants: 48,
    createdDate: "2024-01-15",
    status: "active",
    difficulty: "Intermediate",
    duration: "45 min",
  },
  {
    id: 2,
    title: "Data Structures Deep Dive",
    description: "Advanced quiz on data structures and their implementations",
    type: "Page Range",
    questions: 30,
    participants: 32,
    createdDate: "2024-01-14",
    status: "active",
    difficulty: "Advanced",
    duration: "60 min",
  },
  {
    id: 3,
    title: "Web Development Basics",
    description: "Introduction to HTML, CSS, and JavaScript fundamentals",
    type: "Multi-PDF",
    questions: 20,
    participants: 67,
    createdDate: "2024-01-13",
    status: "completed",
    difficulty: "Beginner",
    duration: "30 min",
  },
  {
    id: 4,
    title: "Database Design Principles",
    description:
      "Quiz covering normalization, relationships, and SQL optimization",
    type: "Topic-based",
    questions: 22,
    participants: 0,
    createdDate: "2024-01-12",
    status: "draft",
    difficulty: "Intermediate",
    duration: "40 min",
  },
  {
    id: 5,
    title: "Software Engineering Best Practices",
    description:
      "Comprehensive quiz on SOLID principles, design patterns, and testing",
    type: "Multi-PDF",
    questions: 35,
    participants: 89,
    createdDate: "2024-01-11",
    status: "active",
    difficulty: "Advanced",
    duration: "75 min",
  },
  {
    id: 6,
    title: "React Hooks and Context",
    description: "Modern React development with hooks and state management",
    type: "Page Range",
    questions: 18,
    participants: 24,
    createdDate: "2024-01-10",
    status: "active",
    difficulty: "Intermediate",
    duration: "35 min",
  },
];

export function QuizList() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          All Quizzes ({quizzes.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-4 rounded-lg border bg-white hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <FileQuestion className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {quiz.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            quiz.status === "active"
                              ? "default"
                              : quiz.status === "completed"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            quiz.status === "active"
                              ? "bg-green-100 text-green-700"
                              : quiz.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {quiz.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {quiz.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {quiz.questions} questions
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {quiz.participants} participants
                    </span>
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">{quiz.difficulty}</span> •{" "}
                    {quiz.duration}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Created {quiz.createdDate}
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Quiz
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

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
import { QuizType } from "@/lib/types";
import { formatDateTime } from "@/utils/date";

export function QuizList({ quizzes }: { quizzes: QuizType[] }) {
  function formatDuration(start: string, end: string): string {
    const duration =
      (new Date(end).getTime() - new Date(start).getTime()) / 1000;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

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
                        {quiz.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            quiz.processing_state === 1
                              ? "default"
                              : quiz.processing_state === 0
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            quiz.processing_state === 1
                              ? "bg-green-100 text-green-700"
                              : quiz.processing_state === 0
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {quiz.processing_state === 1
                            ? "Active"
                            : quiz.processing_state === 0
                            ? "Processing"
                            : "Draft"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {quiz.quiz_type}
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
                      {quiz.questions_count} questions
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {quiz.participants_count} participants
                    </span>
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">
                      {quiz.quiz_difficulty.toUpperCase()}
                    </span>{" "}
                    • {formatDuration(quiz.start_time, quiz.end_time)}
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Created {formatDateTime(quiz.created_at)}
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm">
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
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Quiz
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
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

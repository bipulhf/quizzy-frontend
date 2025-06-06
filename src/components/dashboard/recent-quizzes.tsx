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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const recentQuizzes = [
  {
    id: 1,
    title: "Machine Learning Basics",
    type: "Topic-based",
    questions: 15,
    participants: 24,
    createdDate: "2024-01-15",
    status: "active",
    avgScore: 78,
  },
  {
    id: 2,
    title: "Data Structures Quiz",
    type: "Page Range",
    questions: 20,
    participants: 18,
    createdDate: "2024-01-14",
    status: "active",
    avgScore: 82,
  },
  {
    id: 3,
    title: "Web Dev Fundamentals",
    type: "Multi-PDF",
    questions: 12,
    participants: 31,
    createdDate: "2024-01-13",
    status: "completed",
    avgScore: 75,
  },
  {
    id: 4,
    title: "Database Design Quiz",
    type: "Topic-based",
    questions: 18,
    participants: 15,
    createdDate: "2024-01-12",
    status: "draft",
    avgScore: null,
  },
  {
    id: 5,
    title: "Software Engineering",
    type: "Page Range",
    questions: 25,
    participants: 42,
    createdDate: "2024-01-11",
    status: "active",
    avgScore: 88,
  },
];

export function RecentQuizzes({ quizzes }: { quizzes: any[] }) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Quizzes</CardTitle>
        <Link href="/dashboard/quizzes">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {quizzes.length === 0 ? (
          <p className="text-center text-gray-500">
            No Quizzes found. Create a quiz to get started.
          </p>
        ) : (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileQuestion className="h-5 w-5 text-green-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-[300px]">
                    {quiz.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{quiz.questions} questions</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {quiz.participants}
                    </span>
                    {quiz.avgScore && (
                      <span className="text-green-600 font-medium">
                        {quiz.avgScore}% avg
                      </span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {quiz.type}
                  </Badge>
                </div>
              </div>

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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

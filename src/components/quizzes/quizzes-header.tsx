import { Button } from "@/components/ui/button";
import { FileQuestion, Plus } from "lucide-react";

export function QuizzesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <FileQuestion className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Quizzes
          </h1>
        </div>
        <p className="text-gray-600">
          Manage and create your AI-powered quizzes
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Quiz
        </Button>
      </div>
    </div>
  );
}

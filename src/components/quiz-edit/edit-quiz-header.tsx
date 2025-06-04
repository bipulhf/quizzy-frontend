import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface EditQuizHeaderProps {
  quizId: string;
}

export function EditQuizHeader({ quizId }: EditQuizHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Edit Quiz
          </h1>
        </div>
        <p className="text-gray-600">Machine Learning Fundamentals Quiz</p>
      </div>

      <div className="flex items-center gap-3">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

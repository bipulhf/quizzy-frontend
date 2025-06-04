import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

export function PDFsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My PDFs
          </h1>
        </div>
        <p className="text-gray-600">
          Manage your uploaded documents and create quizzes
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload PDF
        </Button>
      </div>
    </div>
  );
}

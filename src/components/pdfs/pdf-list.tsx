import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  FileQuestion,
  Share2,
  Edit,
  Upload,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const pdfs = [
  {
    id: 1,
    name: "Machine Learning Fundamentals.pdf",
    uploadDate: "2024-01-15",
    pages: 67,
    quizzes: 5,
    status: "processed",
  },
  {
    id: 2,
    name: "Data Structures and Algorithms.pdf",
    uploadDate: "2024-01-14",
    pages: 89,
    quizzes: 7,
    status: "processed",
  },
  {
    id: 3,
    name: "Web Development Complete Guide.pdf",
    uploadDate: "2024-01-13",
    pages: 45,
    quizzes: 3,
    status: "processing",
  },
  {
    id: 4,
    name: "Database Design Principles.pdf",
    uploadDate: "2024-01-12",
    pages: 34,
    quizzes: 2,
    status: "processed",
  },
  {
    id: 5,
    name: "Software Engineering Best Practices.pdf",
    uploadDate: "2024-01-11",
    pages: 123,
    quizzes: 9,
    status: "processed",
  },
];

export function PDFList() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          All PDFs ({pdfs.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="p-4 rounded-lg border bg-white hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-3">
                  {/* PDF Thumbnail */}
                  <div className="relative">
                    <div className="w-12 h-16 bg-gray-100 rounded border flex items-center justify-center">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    {pdf.status === "processing" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-lg truncate">
                        {pdf.name}
                      </h3>
                    </div>
                    <Badge
                      variant={
                        pdf.status === "processed"
                          ? "default"
                          : pdf.status === "processing"
                          ? "secondary"
                          : "destructive"
                      }
                      className={
                        pdf.status === "processed"
                          ? "bg-green-100 text-green-700"
                          : pdf.status === "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {pdf.status}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{pdf.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileQuestion className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{pdf.quizzes} quizzes</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  Uploaded {pdf.uploadDate}
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                {pdf.status === "processed" && (
                  <Button size="sm" variant={"outline"}>
                    <FileQuestion className="h-4 w-4 mr-2" />
                    Create Quiz
                  </Button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Rename
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, MoreHorizontal, Download, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const recentPDFs = [
  {
    id: 1,
    name: "Machine Learning Fundamentals.pdf",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    pages: 45,
    quizzes: 3,
    status: "processed",
  },
  {
    id: 2,
    name: "Data Structures and Algorithms.pdf",
    uploadDate: "2024-01-14",
    size: "3.1 MB",
    pages: 67,
    quizzes: 5,
    status: "processed",
  },
  {
    id: 3,
    name: "Web Development Guide.pdf",
    uploadDate: "2024-01-13",
    size: "1.8 MB",
    pages: 32,
    quizzes: 2,
    status: "processing",
  },
  {
    id: 4,
    name: "Database Design Principles.pdf",
    uploadDate: "2024-01-12",
    size: "2.9 MB",
    pages: 58,
    quizzes: 4,
    status: "processed",
  },
  {
    id: 5,
    name: "Software Engineering Best Practices.pdf",
    uploadDate: "2024-01-11",
    size: "4.2 MB",
    pages: 89,
    quizzes: 1,
    status: "processed",
  },
];

export function RecentPDFs() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent PDFs</CardTitle>
        <Link href="/dashboard/pdfs">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPDFs.map((pdf) => (
          <div
            key={pdf.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-[300px]">
                  {pdf.name}
                </h4>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{pdf.size}</span>
                  <span>{pdf.pages} pages</span>
                  <span>{pdf.quizzes} quizzes</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={pdf.status === "processed" ? "default" : "secondary"}
                className={
                  pdf.status === "processed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }
              >
                {pdf.status}
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

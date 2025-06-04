"use client";

import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { UploadPdfModal } from "./upload-pdf-modal";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function PDFsHeader() {
  const searchParams = useSearchParams();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(
    searchParams.get("modal") === "true"
  );

  const handleUploadSuccess = (files: any[]) => {
    console.log("Uploaded files:", files);
    // Here you would typically update your state or trigger a refetch
    // of the PDFs list to show the newly uploaded files

    // Close the modal after a short delay to show success state
    setTimeout(() => {
      setIsUploadModalOpen(false);
    }, 1000);
  };
  return (
    <>
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
          <Button onClick={() => setIsUploadModalOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload PDF
          </Button>
        </div>
      </div>
      <UploadPdfModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </>
  );
}

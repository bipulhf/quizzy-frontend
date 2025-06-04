import { PDFsHeader } from "@/components/pdfs/pdfs-header";
import { PDFFilters } from "@/components/pdfs/pdf-filters";
import { PDFList } from "@/components/pdfs/pdf-list";

export default function PDFsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <PDFsHeader />

        {/* Filters */}
        <PDFFilters />

        {/* PDF List */}
        <PDFList />
      </div>
    </div>
  );
}

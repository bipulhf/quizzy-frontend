import { ExamsHeader } from "@/components/exams/exams-header";
import { ExamsOverview } from "@/components/exams/exams-overview";
import { RecentExams } from "@/components/exams/recent-exams";
// import { PerformanceChart } from "@/components/exams/performance-chart";

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <ExamsHeader />

        {/* Overview Stats */}
        <ExamsOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Exams - 2/3 width */}
          <div className="lg:col-span-2">
            <RecentExams />
          </div>

          {/* Performance Chart - 1/3 width */}
          {/* <div className="lg:col-span-1">
            <PerformanceChart />
          </div> */}
        </div>
      </div>
    </div>
  );
}

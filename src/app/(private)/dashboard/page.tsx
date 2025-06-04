import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentPDFs } from "@/components/dashboard/recent-pdfs";
import { RecentQuizzes } from "@/components/dashboard/recent-quizzes";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { PerformanceChart } from "@/components/dashboard/performance-chart";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <DashboardHeader />

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent PDFs */}
            <RecentPDFs />

            {/* Recent Quizzes */}
            <RecentQuizzes />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Activity Feed */}
            <ActivityFeed />

            {/* Performance Chart */}
            <PerformanceChart />
          </div>
        </div>
      </div>
    </div>
  );
}

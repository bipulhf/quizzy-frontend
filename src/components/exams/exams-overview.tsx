import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trophy,
  FileQuestion,
  Clock,
  TrendingUp,
  Target,
  Award,
} from "lucide-react";

const stats = [
  {
    title: "Total Exams",
    value: "42",
    change: "+5 this month",
    icon: FileQuestion,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Average Score",
    value: "78%",
    change: "+3% this month",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Best Score",
    value: "95%",
    change: "Machine Learning Quiz",
    icon: Trophy,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Total Time",
    value: "28h",
    change: "+4h this month",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Completion Rate",
    value: "92%",
    change: "38 of 42 completed",
    icon: Award,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export function ExamsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-0 shadow-md hover:shadow-lg transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

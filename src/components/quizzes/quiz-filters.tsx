import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export function QuizFilters() {
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search quizzes..." className="pl-10 bg-white" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Select>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="will-start">Will Start</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="topic">Topic-based</SelectItem>
              <SelectItem value="page">Page Range</SelectItem>
              <SelectItem value="multi">Multi-PDF</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="participants">Most Participants</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

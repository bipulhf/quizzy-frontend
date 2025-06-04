import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, User } from "lucide-react";

const rankings = [
  {
    rank: 1,
    name: "Alice Johnson",
    score: 15,
    percentage: 100,
    timeSpent: "28:30",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 2,
    name: "Bob Smith",
    score: 14,
    percentage: 93,
    timeSpent: "35:15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 3,
    name: "You",
    score: 12,
    percentage: 80,
    timeSpent: "32:45",
    avatar: "/placeholder.svg?height=40&width=40",
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "Carol Davis",
    score: 12,
    percentage: 80,
    timeSpent: "40:20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    rank: 5,
    name: "David Wilson",
    score: 11,
    percentage: 73,
    timeSpent: "38:45",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export function ExamRankings() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-600" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-600" />;
      default:
        return <span className="text-gray-600 font-medium">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border-yellow-200";
      case 2:
        return "bg-gray-50 border-gray-200";
      case 3:
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">
            🏆 Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {rankings.slice(0, 3).map((participant, index) => (
              <div
                key={participant.rank}
                className={`${
                  index === 0 ? "col-span-2" : ""
                } text-center p-4 rounded-lg border-2 ${
                  participant.isCurrentUser
                    ? "bg-blue-50 border-blue-300"
                    : getRankColor(participant.rank)
                }`}
              >
                <div className="flex justify-center mb-2">
                  {getRankIcon(participant.rank)}
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {participant.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {participant.percentage}%
                </p>
                <p className="text-sm text-gray-600">
                  {participant.score}/15 correct
                </p>
                <p className="text-xs text-gray-500">{participant.timeSpent}</p>
                {participant.isCurrentUser && (
                  <Badge className="mt-2 bg-blue-100 text-blue-700">You</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Rankings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            All Participants (24)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rankings.map((participant) => (
              <div
                key={participant.rank}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  participant.isCurrentUser
                    ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8">
                    {participant.rank <= 3 ? (
                      getRankIcon(participant.rank)
                    ) : (
                      <span className="text-gray-600 font-medium">
                        #{participant.rank}
                      </span>
                    )}
                  </div>

                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">
                        {participant.name}
                      </h3>
                      {participant.isCurrentUser && (
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-700 border-blue-300"
                        >
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {participant.score}/15 correct • {participant.timeSpent}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">
                    {participant.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCard } from "@/components/User/UserCard";
import { useAuth } from "@/lib/auth";
import { generateMatches } from "@/data/mockData";
import { Match } from "@/types";

const DashboardPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (user) {
      // Generate matches based on current user
      const userMatches = generateMatches(user.id);
      setMatches(userMatches);
    }
  }, [user]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=random`}
                    alt={user?.username}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{user?.username}</h3>
                  <p className="text-sm text-gray-500">{user?.location || "No location set"}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-1">Skills you teach:</h4>
                  {user?.skillsToTeach && user.skillsToTeach.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {user.skillsToTeach.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No teaching skills added yet</p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Skills you want to learn:</h4>
                  {user?.skillsToLearn && user.skillsToLearn.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {user.skillsToLearn.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No learning skills added yet</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <a
                  href="/profile/edit"
                  className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  Edit Profile
                </a>
                <a
                  href="/matches"
                  className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  See All Matches
                </a>
                <a
                  href="/messages"
                  className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                >
                  Messages
                </a>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Matches Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Skill Matches</CardTitle>
              <CardDescription>
                People who can teach what you want to learn or learn what you can teach
              </CardDescription>
            </CardHeader>
            <CardContent>
              {matches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.slice(0, 4).map((match) => (
                    <UserCard
                      key={match.id}
                      user={match.user}
                      theyTeach={match.matchReason.theyTeach}
                      theyLearn={match.matchReason.theyLearn}
                      showMatchBadge
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No matches found. Try adding more skills to your profile!
                  </p>
                </div>
              )}
              
              {matches.length > 4 && (
                <div className="mt-4 text-center">
                  <a
                    href="/matches"
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    See all {matches.length} matches →
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Feed - For future implementation */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-gray-200 pl-4 py-2">
                  <p className="text-sm text-gray-600">
                    Welcome to SkillSwap! Add your skills to get started.
                  </p>
                  <span className="text-xs text-gray-400">Just now</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

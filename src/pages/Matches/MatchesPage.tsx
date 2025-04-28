
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserCard } from "@/components/User/UserCard";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { generateMatches } from "@/data/mockData";
import { Match } from "@/types";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MatchesPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "teach" | "learn">("all");

  useEffect(() => {
    if (user) {
      const userMatches = generateMatches(user.id);
      setMatches(userMatches);
      setFilteredMatches(userMatches);
    }
  }, [user]);

  useEffect(() => {
    if (matches.length > 0) {
      let filtered = matches;
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter((match) => {
          // Search in username
          if (match.user.username.toLowerCase().includes(term)) return true;
          
          // Search in skills they teach
          if (match.matchReason.theyTeach.some(skill => 
            skill.name.toLowerCase().includes(term)
          )) return true;
          
          // Search in skills they learn
          if (match.matchReason.theyLearn.some(skill => 
            skill.name.toLowerCase().includes(term)
          )) return true;
          
          return false;
        });
      }
      
      // Filter by match type
      if (filterType !== "all") {
        if (filterType === "teach") {
          filtered = filtered.filter(match => match.matchReason.theyLearn.length > 0);
        } else if (filterType === "learn") {
          filtered = filtered.filter(match => match.matchReason.theyTeach.length > 0);
        }
      }
      
      setFilteredMatches(filtered);
    }
  }, [searchTerm, filterType, matches]);

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
      <h1 className="text-3xl font-bold mb-6">Your Matches</h1>
      
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Filter Matches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <Input
                id="search"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div>
              <Label htmlFor="filter" className="mb-2 block">Filter by</Label>
              <Select 
                value={filterType}
                onValueChange={(value) => setFilterType(value as "all" | "teach" | "learn")}
              >
                <SelectTrigger id="filter" className="max-w-md">
                  <SelectValue placeholder="Filter by match type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All matches</SelectItem>
                    <SelectItem value="teach">People who want to learn your skills</SelectItem>
                    <SelectItem value="learn">People who can teach you</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
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
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No matches found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {matches.length > 0 
              ? "Try adjusting your filters or search terms."
              : "Add more skills to your profile to find matches!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;

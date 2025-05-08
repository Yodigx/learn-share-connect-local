import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { mockUsers } from "@/data/mockData";
import { User } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        // Add a delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundUser = mockUsers.find(u => u.id === userId);
        if (!foundUser) {
          setError("User not found");
        }
        setUser(foundUser || null);
      } catch (err) {
        setError("Failed to load user profile. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 text-center">
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-6">User Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the user you're looking for.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  // Calculate the matching skills (what they teach that the current user wants to learn)
  const matchingTeachSkills = user.skillsToTeach.filter(skill =>
    currentUser?.skillsToLearn.some(s => s.id === skill.id)
  );

  // Calculate the matching skills (what they want to learn that the current user can teach)
  const matchingLearnSkills = user.skillsToLearn.filter(skill =>
    currentUser?.skillsToTeach.some(s => s.id === skill.id)
  );

  // Handle contact button
  const handleContact = () => {
    if (!currentUser) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to contact users.",
      });
      return;
    }

    if (user.id === currentUser.id) {
      toast({
        variant: "destructive",
        title: "Invalid Action",
        description: "You cannot contact yourself.",
      });
      return;
    }

    if (user.username === "NABIN KUMAR MEHER") {
      toast({
        title: "Contact Information",
        description: (
          <div className="space-y-2">
            <p>Email: nabinmeher@iiitr.ac.in</p>
            <p className="text-sm text-gray-500">Direct messaging will be available soon.</p>
          </div>
        ),
      });
    } else if (user.username === "GYANESHWAR") {
      toast({
        title: "Contact Information",
        description: (
          <div className="space-y-2">
            <p>Email: dgyaneshwar@iiitr.ac.in</p>
            <p className="text-sm text-gray-500">Direct messaging will be available soon.</p>
          </div>
        ),
      });
    } else {
      toast({
        title: "Coming Soon",
        description: (
          <div className="space-y-2">
            <p>Direct messaging will be available in a future update.</p>
            <p className="text-sm text-gray-500">For now, please check back later.</p>
          </div>
        ),
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => window.history.back()}
        >
          ← Back
        </Button>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="relative h-40 bg-gradient-to-r from-primary to-blue-600">
            <div className="absolute -bottom-12 left-6">
              <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-6 px-6">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-gray-600">{user.location}</p>
                {user.rating && (
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm ml-1">{user.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button 
                  onClick={handleContact}
                  disabled={user.id === currentUser?.id}
                >
                  {user.id === currentUser?.id ? "This is you" : "Contact"}
                </Button>
              </div>
            </div>
            
            {user.bio && (
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-2">About</h2>
                <p className="text-gray-600">{user.bio}</p>
              </div>
            )}
            
            {/* Show skill matching summary */}
            {(matchingTeachSkills.length > 0 || matchingLearnSkills.length > 0) && (
              <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Why you match with {user.username}</h3>
                
                {matchingTeachSkills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-green-600 font-medium">Skills they can teach you:</span>
                      <Badge className="ml-2 bg-green-100 text-green-800">Perfect Match!</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchingTeachSkills.map(skill => (
                        <Badge 
                          key={skill.id} 
                          variant="outline" 
                          className="bg-white text-green-700 border-green-300 hover:bg-green-50 transition-colors"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {matchingLearnSkills.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-blue-600 font-medium">Skills you can teach them:</span>
                      <Badge className="ml-2 bg-blue-100 text-blue-800">Great Opportunity!</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchingLearnSkills.map(skill => (
                        <Badge 
                          key={skill.id} 
                          variant="outline" 
                          className="bg-white text-blue-700 border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="teaches" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-[400px] mb-6">
          <TabsTrigger value="teaches">Skills They Teach</TabsTrigger>
          <TabsTrigger value="learns">Skills They Learn</TabsTrigger>
        </TabsList>
        
        <TabsContent value="teaches">
          <Card>
            <CardContent className="pt-6">
              {user.skillsToTeach.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {user.skillsToTeach.map(skill => (
                    <div 
                      key={skill.id} 
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        matchingTeachSkills.some(s => s.id === skill.id)
                          ? "bg-green-50 border-green-200 shadow-sm hover:shadow-md"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900">{skill.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{skill.category}</div>
                      {matchingTeachSkills.some(s => s.id === skill.id) && (
                        <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                          You want to learn this!
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">{user.username} hasn't added any teaching skills yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Check back later for updates.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learns">
          <Card>
            <CardContent className="pt-6">
              {user.skillsToLearn.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {user.skillsToLearn.map(skill => (
                    <div 
                      key={skill.id} 
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        matchingLearnSkills.some(s => s.id === skill.id)
                          ? "bg-blue-50 border-blue-200 shadow-sm hover:shadow-md"
                          : "bg-white border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900">{skill.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{skill.category}</div>
                      {matchingLearnSkills.some(s => s.id === skill.id) && (
                        <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                          You can teach this!
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">{user.username} hasn't added any learning skills yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Check back later for updates.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;

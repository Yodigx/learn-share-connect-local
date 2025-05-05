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

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get user profile
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Add a delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundUser = mockUsers.find(u => u.id === userId);
        setUser(foundUser || null);
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
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
    if (user.username === "NABIN KUMAR MEHER") {
      toast({
        title: "Contact Information",
        description: `Email: nabinmeher@iiitr.ac.in`,
      });
    } else if (user.username === "GYANESHWAR") {
      toast({
        title: "Contact Information",
        description: `Email: dgyaneshwar@iiitr.ac.in`,
      });
    } else {
      toast({
        title: "Coming Soon",
        description: `Direct messaging will be available in a future update.`,
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
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Button onClick={handleContact}>Contact</Button>
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
              <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="text-base font-medium mb-3">Why you match with {user.username}</h3>
                
                {matchingTeachSkills.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-700 mb-1">Skills they can teach you:</p>
                    <div className="flex flex-wrap gap-1">
                      {matchingTeachSkills.map(skill => (
                        <Badge key={skill.id} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {matchingLearnSkills.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Skills you can teach them:</p>
                    <div className="flex flex-wrap gap-1">
                      {matchingLearnSkills.map(skill => (
                        <Badge key={skill.id} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
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

      <Tabs defaultValue="teaches">
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
                      className={`p-4 rounded-md border ${
                        matchingTeachSkills.some(s => s.id === skill.id)
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-gray-500">{skill.category}</div>
                      {matchingTeachSkills.some(s => s.id === skill.id) && (
                        <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                          Match!
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {user.username} hasn't added any teaching skills yet.
                </p>
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
                      className={`p-4 rounded-md border ${
                        matchingLearnSkills.some(s => s.id === skill.id)
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-gray-500">{skill.category}</div>
                      {matchingLearnSkills.some(s => s.id === skill.id) && (
                        <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                          You can teach this!
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {user.username} hasn't added any learning skills yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;

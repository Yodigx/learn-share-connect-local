
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SkillSelector } from "@/components/Skills/SkillSelector";
import { useAuth } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    location: user?.location || "",
    avatar: user?.avatar || "",
    skillsToTeach: user?.skillsToTeach || [],
    skillsToLearn: user?.skillsToLearn || [],
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the database
    const updatedUser = {
      ...user,
      username: formData.username,
      bio: formData.bio,
      location: formData.location,
      avatar: formData.avatar,
      skillsToTeach: formData.skillsToTeach,
      skillsToLearn: formData.skillsToLearn,
    };
    
    // Update local storage for our mock auth
    if (user && user.id) {
      localStorage.setItem("skillswap_user", JSON.stringify(updatedUser));
      
      // Force a page reload to update the auth context
      window.location.href = "/dashboard";
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="teaching">Teaching</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>

        <form onSubmit={handleFormSubmit}>
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <div className="flex items-center space-x-4">
                      <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-200">
                        {formData.avatar ? (
                          <img
                            src={formData.avatar}
                            alt={formData.username}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          id="avatar"
                          placeholder="Profile picture URL"
                          value={formData.avatar}
                          onChange={(e) =>
                            setFormData({ ...formData, avatar: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Your username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us a little about yourself..."
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teaching">
            <Card>
              <CardHeader>
                <CardTitle>Skills You Can Teach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select skills you can teach others</Label>
                    <SkillSelector
                      selectedSkills={formData.skillsToTeach}
                      onChange={(skills) =>
                        setFormData({ ...formData, skillsToTeach: skills })
                      }
                      placeholder="Add skills you can teach..."
                    />
                  </div>

                  <div>
                    <Label>Current teaching skills:</Label>
                    <div className="mt-2">
                      {formData.skillsToTeach.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formData.skillsToTeach.map((skill) => (
                            <Badge key={skill.id} variant="secondary">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No teaching skills selected</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning">
            <Card>
              <CardHeader>
                <CardTitle>Skills You Want to Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select skills you want to learn</Label>
                    <SkillSelector
                      selectedSkills={formData.skillsToLearn}
                      onChange={(skills) =>
                        setFormData({ ...formData, skillsToLearn: skills })
                      }
                      placeholder="Add skills to learn..."
                    />
                  </div>

                  <div>
                    <Label>Current learning skills:</Label>
                    <div className="mt-2">
                      {formData.skillsToLearn.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formData.skillsToLearn.map((skill) => (
                            <Badge key={skill.id} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No learning skills selected</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end mt-6 space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default ProfilePage;

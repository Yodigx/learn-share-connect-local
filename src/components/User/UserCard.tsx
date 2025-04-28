
import { User, Skill } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: User;
  theyTeach?: Skill[];
  theyLearn?: Skill[];
  showMatchBadge?: boolean;
}

export const UserCard = ({ 
  user, 
  theyTeach = [], 
  theyLearn = [],
  showMatchBadge = false
}: UserCardProps) => {
  return (
    <Card className="skill-card h-full flex flex-col">
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-medium">{user.username}</CardTitle>
          <div className="text-sm text-gray-500">{user.location}</div>
          {user.rating && (
            <div className="flex items-center mt-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm ml-1">{user.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        {showMatchBadge && (
          <Badge variant="secondary" className="self-start">Match</Badge>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col">
        {user.bio && (
          <p className="text-sm text-gray-600 mb-4">{user.bio}</p>
        )}
        
        {theyTeach.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Can teach you:</h4>
            <div className="flex flex-wrap gap-1">
              {theyTeach.map((skill) => (
                <Badge key={skill.id} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {theyLearn.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1">Wants to learn:</h4>
            <div className="flex flex-wrap gap-1">
              {theyLearn.map((skill) => (
                <Badge key={skill.id} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Only show in other contexts where all skills should be visible */}
        {theyTeach.length === 0 && theyLearn.length === 0 && (
          <>
            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Teaches:</h4>
              <div className="flex flex-wrap gap-1">
                {user.skillsToTeach.map((skill) => (
                  <Badge key={skill.id} variant="outline" className="bg-green-50 text-green-700 border-green-300">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Learns:</h4>
              <div className="flex flex-wrap gap-1">
                {user.skillsToLearn.map((skill) => (
                  <Badge key={skill.id} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
        
        <div className="mt-auto pt-4">
          <Link to={`/users/${user.id}`}>
            <Button variant="outline" className="w-full">View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

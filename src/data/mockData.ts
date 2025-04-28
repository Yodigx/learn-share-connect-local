
import { User, Skill, Match } from "../types";

export const skillCategories = [
  "Technology",
  "Languages",
  "Music",
  "Arts",
  "Sports",
  "Cooking",
  "Academic",
  "Professional",
  "Crafts",
  "Other"
];

export const sampleSkills: Skill[] = [
  { id: "1", name: "Python", category: "Technology" },
  { id: "2", name: "JavaScript", category: "Technology" },
  { id: "3", name: "Guitar", category: "Music" },
  { id: "4", name: "Spanish", category: "Languages" },
  { id: "5", name: "Photography", category: "Arts" },
  { id: "6", name: "Cooking", category: "Cooking" },
  { id: "7", name: "Painting", category: "Arts" },
  { id: "8", name: "Yoga", category: "Sports" },
  { id: "9", name: "French", category: "Languages" },
  { id: "10", name: "Gardening", category: "Crafts" },
  { id: "11", name: "Singing", category: "Music" },
  { id: "12", name: "Writing", category: "Professional" },
  { id: "13", name: "Marketing", category: "Professional" },
  { id: "14", name: "Math", category: "Academic" },
  { id: "15", name: "Japanese", category: "Languages" }
];

export const mockUsers: User[] = [
  {
    id: "1",
    username: "alice_smith",
    email: "alice@example.com",
    location: "New York, NY",
    bio: "Photography enthusiast and tech professional",
    rating: 4.8,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    skillsToTeach: [
      { id: "5", name: "Photography", category: "Arts" },
      { id: "9", name: "French", category: "Languages" }
    ],
    skillsToLearn: [
      { id: "1", name: "Python", category: "Technology" },
      { id: "3", name: "Guitar", category: "Music" }
    ]
  },
  {
    id: "2",
    username: "bob_johnson",
    email: "bob@example.com",
    location: "San Francisco, CA",
    bio: "Software engineer who loves music",
    rating: 4.5,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    skillsToTeach: [
      { id: "1", name: "Python", category: "Technology" },
      { id: "2", name: "JavaScript", category: "Technology" }
    ],
    skillsToLearn: [
      { id: "3", name: "Guitar", category: "Music" },
      { id: "6", name: "Cooking", category: "Cooking" }
    ]
  },
  {
    id: "3",
    username: "carol_white",
    email: "carol@example.com",
    location: "Austin, TX",
    bio: "Music teacher and language learner",
    rating: 4.9,
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    skillsToTeach: [
      { id: "3", name: "Guitar", category: "Music" },
      { id: "11", name: "Singing", category: "Music" }
    ],
    skillsToLearn: [
      { id: "4", name: "Spanish", category: "Languages" },
      { id: "15", name: "Japanese", category: "Languages" }
    ]
  },
  {
    id: "4",
    username: "dave_miller",
    email: "dave@example.com",
    location: "Chicago, IL",
    bio: "Passionate about languages and cooking",
    rating: 4.3,
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    skillsToTeach: [
      { id: "4", name: "Spanish", category: "Languages" },
      { id: "6", name: "Cooking", category: "Cooking" }
    ],
    skillsToLearn: [
      { id: "2", name: "JavaScript", category: "Technology" },
      { id: "10", name: "Gardening", category: "Crafts" }
    ]
  },
  {
    id: "5",
    username: "emma_taylor",
    email: "emma@example.com", 
    location: "Seattle, WA",
    bio: "Crafts enthusiast and budding photographer",
    rating: 4.7,
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    skillsToTeach: [
      { id: "10", name: "Gardening", category: "Crafts" },
      { id: "7", name: "Painting", category: "Arts" }
    ],
    skillsToLearn: [
      { id: "5", name: "Photography", category: "Arts" },
      { id: "9", name: "French", category: "Languages" }
    ]
  }
];

export const generateMatches = (currentUserId: string): Match[] => {
  // Find the current user
  const currentUser = mockUsers.find(user => user.id === currentUserId);
  
  if (!currentUser) return [];
  
  // Generate matches based on skill compatibility
  const matches: Match[] = mockUsers
    .filter(user => user.id !== currentUserId) // Exclude the current user
    .map(user => {
      // Find skills this user can teach that the current user wants to learn
      const theyTeach = user.skillsToTeach.filter(skill => 
        currentUser.skillsToLearn.some(s => s.id === skill.id)
      );
      
      // Find skills this user wants to learn that the current user can teach
      const theyLearn = user.skillsToLearn.filter(skill => 
        currentUser.skillsToTeach.some(s => s.id === skill.id)
      );
      
      // Only return as a match if there's at least one matching skill in either direction
      if (theyTeach.length > 0 || theyLearn.length > 0) {
        return {
          id: `match-${currentUserId}-${user.id}`,
          user,
          matchReason: {
            theyTeach,
            theyLearn
          }
        };
      }
      
      return null;
    })
    .filter((match): match is Match => match !== null);
  
  return matches;
};

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
  { id: "15", name: "Japanese", category: "Languages" },
  { id: "16", name: "React", category: "Technology" },
  { id: "17", name: "HTML", category: "Technology" },
  { id: "18", name: "CSS", category: "Technology" },
  { id: "19", name: "LINUX", category: "Technology" }
];

export const mockUsers: User[] = [
  {
    id: "faculty-001",
    username: "NABIN KUMAR MEHER",
    email: "nabin@iiitr.ac.in",
    location: "Raichur, India",
    bio: "Faculty at IIIT Raichur, passionate about teaching mathematics.",
    rating: 5.0,
    skillsToTeach: [
      { id: "14", name: "Math", category: "Academic" }
    ],
    skillsToLearn: []
  },
  {
    id: "6",
    username: "Dubacharla Gyaneshwar",
    email: "gyanu@example.com",
    location: "Hyderabad , India",
    bio: "Faculty at IIIT Raichur, passionate about teaching AI DS and Machine Learning.",
    rating: 4.5,
    skillsToTeach: [
      { id: "1", name: "Python", category: "Technology" },
      { id: "2", name: "JavaScript", category: "Technology" },
      { id: "5", name: "Photography", category: "Arts" }
    ],
    skillsToLearn: [
      { id: "3", name: "Guitar", category: "Music" },
      { id: "15", name: "Japanese", category: "Languages" },
      { id: "6", name: "Cooking", category: "Cooking" }
    ]
  },
  {
    id: "2",
    username: "Sagar Maheshwari",
    email: "sagar@example.com",
    location: "Jaipur, India",
    bio: "Crazy Guy who loves Cooking",
    rating: 4.6,
    skillsToTeach: [
      { id: "2", name: "JavaScript", category: "Technology" },
      { id: "17", name: "HTML", category: "Technology" },
      { id: "6", name: "Cooking", category: "Cooking" },
      { id: "18", name: "CSS", category: "Technology" }
    ],
    skillsToLearn: [
      { id: "8", name: "Yoga", category: "Sports" },
      { id: "1", name: "Python", category: "Technology" },
    ]
  },
  {
    id: "1",
    username: "Shreyas_Ingle",
    email: "shreyas@example.com",
    location: "Nagpur, India",
    bio: "Passionate about languages and Technology",
    rating: 4.5,
    skillsToTeach: [
      { id: "17", name: "HTML", category: "Technology" },
      { id: "18", name: "CSS", category: "Technology" }
    ],
    skillsToLearn: [
      { id: "1", name: "Python", category: "Technology" },
      { id: "19", name: "LINUX", category: "Technology" }
    ]
  },
  {
    id: "3",
    username: "Aditya",
    email: "aditya@example.com",
    location: "Mumbai, India",
    bio: "Music teacher and language learner",
    rating: 4.4,
    skillsToTeach: [
      { id: "8", name: "Yoga", category: "Sports" },
      { id: "11", name: "Singing", category: "Music" }
    ],
    skillsToLearn: [
      { id: "4", name: "Spanish", category: "Languages" },
      { id: "15", name: "Japanese", category: "Languages" }
    ]
  },
  {
    id: "5",
    username: "Ayushi",
    email: "ayushi@example.com", 
    location: "Delhi, India",
    bio: "Crafts enthusiast and budding photographer",
    rating: 4.7,
    skillsToTeach: [
      { id: "10", name: "Gardening", category: "Crafts" },
      { id: "7", name: "Painting", category: "Arts" },
      { id: "6", name: "Cooking", category: "Cooking" }
    ],
    skillsToLearn: [
      { id: "5", name: "Photography", category: "Arts" },
      { id: "12", name: "Writing", category: "Professional" }
    ]
  },
  {
    id: "user-1745822252491",
    username: "NIDAL",
    email: "cs24b1039@iiitr.ac.in",
    location: "Test City",
    bio: "Test user for matching verification",
    rating: 4.5,
    skillsToTeach: [
      { id: "1", name: "Python", category: "Technology" },
      { id: "6", name: "Cooking", category: "Cooking" },
      { id: "12", name: "Writing", category: "Professional" }
    ],
    skillsToLearn: [
      { id: "3", name: "Guitar", category: "Music" },
      { id: "5", name: "Photography", category: "Arts" },
      { id: "14", name: "Math", category: "Academic" }
    ]
  },
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


export type User = {
  id: string;
  username: string;
  email: string;
  location: string;
  bio: string;
  rating?: number;
  avatar?: string;
  skillsToTeach: Skill[];
  skillsToLearn: Skill[];
};

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type Match = {
  id: string;
  user: User;
  matchReason: {
    theyTeach: Skill[];
    theyLearn: Skill[];
  };
};

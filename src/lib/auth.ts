
// Authentication context for our app
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { mockUsers } from "../data/mockData";
import { toast } from "@/components/ui/use-toast";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("skillswap_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call here
    setLoading(true);
    
    // Fake login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("skillswap_user", JSON.stringify(foundUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.username}!`,
      });
      setLoading(false);
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Invalid email or password",
    });
    setLoading(false);
    return false;
  };

  const register = async (username: string, email: string, password: string) => {
    // In a real app, you would make an API call here
    setLoading(true);
    
    // Fake registration delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Email already in use",
      });
      setLoading(false);
      return false;
    }

    // Create a new mock user
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      location: "",
      bio: "",
      skillsToTeach: [],
      skillsToLearn: [],
      avatar: `https://ui-avatars.com/api/?name=${username}&background=random`
    };
    
    // In a real app, you would save this user to your database
    setUser(newUser);
    localStorage.setItem("skillswap_user", JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created!",
    });
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skillswap_user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

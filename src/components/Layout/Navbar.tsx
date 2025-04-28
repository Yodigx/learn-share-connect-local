import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 4a1 1 0 100 2 1 1 0 000-2zm0 10a1 1 0 100 2 1 1 0 000-2zm-3-5a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-900">SkillSwap</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/how-it-works">
              <Button variant="ghost">How It Works</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost">About Us</Button>
            </Link>
            <Link to="/faq">
              <Button variant="ghost">FAQ</Button>
            </Link>
          </div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/matches">
                <Button variant="ghost">Matches</Button>
              </Link>
              <Link to="/profile">
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium">{user?.username}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {user?.avatar && (
                      <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              </Link>
              <Button onClick={logout} variant="outline">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

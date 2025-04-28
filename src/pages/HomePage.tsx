
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Learn new skills by teaching what you know
              </h1>
              <p className="text-lg lg:text-xl opacity-90 max-w-xl">
                SkillSwap connects people who want to exchange knowledge and skills. Find your perfect learning partner today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                        Join SkillSwap
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Already a member? Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="People learning together" 
                className="rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How SkillSwap Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to connect with others based on complementary skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and add the skills you want to teach and the ones you want to learn.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Matched</h3>
              <p className="text-gray-600">
                Our algorithm finds people who can teach what you want to learn and learn what you can teach.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Connect & Learn</h3>
              <p className="text-gray-600">
                Connect with your matches, arrange skill exchange sessions, and start learning!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Skills Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Popular Skill Categories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore some of the most popular categories on SkillSwap.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Technology</h3>
              <p className="text-gray-600 mb-3">Programming, web development, data science, and more.</p>
              <Link to="/skills/technology" className="text-primary font-medium hover:text-blue-700 inline-flex items-center">
                Explore <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="bg-gradient-to-b from-green-50 to-green-100 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Languages</h3>
              <p className="text-gray-600 mb-3">Spanish, French, Japanese, and many other languages.</p>
              <Link to="/skills/languages" className="text-primary font-medium hover:text-blue-700 inline-flex items-center">
                Explore <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Music</h3>
              <p className="text-gray-600 mb-3">Guitar, piano, singing, music theory, and more.</p>
              <Link to="/skills/music" className="text-primary font-medium hover:text-blue-700 inline-flex items-center">
                Explore <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Arts & Crafts</h3>
              <p className="text-gray-600 mb-3">Painting, drawing, photography, and crafting.</p>
              <Link to="/skills/arts" className="text-primary font-medium hover:text-blue-700 inline-flex items-center">
                Explore <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="bg-gradient-to-b from-red-50 to-red-100 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Sports & Fitness</h3>
              <p className="text-gray-600 mb-3">Yoga, dance, martial arts, and personal training.</p>
              <Link to="/skills/sports" className="text-primary font-medium hover:text-blue-700 inline-flex items-center">
                Explore <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="bg-gradient-to-b from-orange-50 to-orange-100 p-6 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Professional Skills</h3>
              <p className="text-gray-600 mb-3">Marketing, design, writing, and business skills.</p>
              <Link to="/skills/professional" className="text-primary font-medium hover:text-blue-700 inline-flex items-center">
                Explore <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to start learning and teaching?</h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90">
            Join our community of skill-sharers and find your perfect learning match today.
          </p>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Go to Your Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Sign Up for Free
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

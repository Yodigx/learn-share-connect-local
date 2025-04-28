import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  title: string;
  description: string;
  icon: string;
}

const steps: Step[] = [
  {
    title: "Create Your Profile",
    description: "Sign up and create a detailed profile highlighting your skills and what you'd like to learn. Add photos and be specific about your expertise.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  },
  {
    title: "Browse Skills",
    description: "Explore the wide range of skills available in your area. Filter by category, location, or experience level to find the perfect match.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  },
  {
    title: "Connect with Others",
    description: "Send messages to potential skill exchange partners. Discuss your goals, availability, and preferred meeting locations.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  },
  {
    title: "Start Learning & Teaching",
    description: "Meet up with your skill exchange partner and begin your learning journey. Share your knowledge while gaining new skills in return.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Skill Swap Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow these simple steps to start sharing and learning skills in your community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={step.icon}
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{index + 1}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Join our community of learners and teachers today. Create your profile and start your skill-sharing journey!
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up Now
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks; 
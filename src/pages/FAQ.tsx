import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does Skill Swap work?",
    answer: "Skill Swap connects people who want to learn new skills with those who want to teach. You can create a profile, list your skills, and either offer to teach or request to learn. Our matching system helps you find the perfect skill exchange partner."
  },
  {
    question: "Is Skill Swap free to use?",
    answer: "Yes, Skill Swap is completely free to use. We believe in making skill-sharing accessible to everyone. You can create a profile, browse skills, and connect with others without any cost."
  },
  {
    question: "How do I ensure my safety when meeting with others?",
    answer: "We take safety seriously. We recommend meeting in public places for the first few sessions, bringing a friend if possible, and always letting someone know where you'll be. You can also use our in-app messaging system to communicate before meeting in person."
  },
  {
    question: "What kind of skills can I share or learn?",
    answer: "You can share or learn almost any skill! From languages and musical instruments to coding and cooking, if you have knowledge to share or something you want to learn, you can find it on Skill Swap."
  },
  {
    question: "How do I create a good profile?",
    answer: "A good profile includes clear information about your skills, experience level, and what you're looking to learn or teach. Add photos and be specific about your expertise. The more detailed your profile, the better matches you'll find."
  },
  {
    question: "Can I teach multiple skills?",
    answer: "Absolutely! You can list multiple skills you're willing to teach, and you can also request to learn multiple skills. This flexibility allows for rich and diverse skill exchanges within our community."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about Skill Swap
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ; 
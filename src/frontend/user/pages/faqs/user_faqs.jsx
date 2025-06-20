import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import './user_faqs.css';

// Replace this with your import if you have a faqs.js file
const faqs = [
  {
    question: "What types of issues can I report?",
    answer: "You can report IT issues, facility problems, and more. Please see the categories in the ticketing system."
  },
  {
    question: "How do I submit a ticket?",
    answer: "Go to the 'Submit Ticket' page, fill out the form, and click submit. You will receive a confirmation email."
  },
  {
    question: "How can I track the status of my ticket?",
    answer: "You can track your ticket status on the 'Active Tickets' or 'Ticket Records' page."
  },
  {
    question: "Can I update or add more information to an existing ticket?",
    answer: "Yes, open your ticket details and use the 'Add Comment' or 'Update' option."
  },
  {
    question: "How long does it take to resolve a ticket?",
    answer: "Resolution time depends on the issue. Most tickets are resolved within 1-3 business days."
  },
  {
    question: "I submitted a request, but I haven’t heard back. What should I do?",
    answer: "Check your ticket status online or contact support if you haven't received an update within 24 hours."
  },
  {
    question: "What if I need urgent support?",
    answer: "For urgent issues, please call the support hotline or mark your ticket as 'Urgent' when submitting."
  }
];

const FrequentlyAskedQuestions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => {
    const searchLower = searchTerm.toLowerCase();
    return (
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower)
    );
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setExpandedIndex(null); // Collapse all answers when searching
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1 className="faq-title">Frequently Asked Questions</h1>
      </div>

      <div className="faq-search-wrapper">
        <Search className="search-icon" />
        <input 
          className="faq-search" 
          type="text" 
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={handleSearchChange}
          autoFocus
        />
      </div>

      <ul className="faq-list">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <li key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleAnswer(index)}>
                <span>{faq.question}</span>
                {expandedIndex === index ? (
                  <ChevronDown className="faq-arrow" />
                ) : (
                  <ChevronRight className="faq-arrow" />
                )}
              </div>
              {expandedIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </li>
          ))
        ) : (
          <div className="faq-no-results">
            No results found for "{searchTerm}"
          </div>
        )}
      </ul>
    </div>
  );
};

export default FrequentlyAskedQuestions;

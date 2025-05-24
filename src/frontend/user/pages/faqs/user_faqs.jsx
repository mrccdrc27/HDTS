import React from 'react';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './user_faqs.css';

const questions = [
  'What types of issues can I report?',
  'How do I submit a ticket?',
  'How can I track the status of my ticket?',
  'Can I update or add more information to an existing ticket?',
  'How long does it take to resolve a ticket?',
  "I submitted a request, but I haven’t heard back. What should I do?",
  'What if I need urgent support?'
];

const routes = [
  '/faq/report-issues',
  '/faq/submit-ticket',
  '/faq/track-ticket',
  '/faq/update-ticket',
  '/faq/resolve-time',
  '/faq/no-response',
  '/faq/urgent-support'
];

const FrequentlyAskedQuestions = () => {
  const navigate = useNavigate();

  return (
    <div className="faq-container">
      <div className="faq-header">
        <ArrowLeft className="back-icon" onClick={() => window.history.back()} />
        <h1 className="faq-title">Frequently Asked Questions</h1>
      </div>

      <div className="faq-search-wrapper">
        <Search className="search-icon" />
        <input 
          className="faq-search" 
          type="text" 
          placeholder="Search"
        />
      </div>

      <ul className="faq-list">
        {questions.map((question, index) => (
          <li key={index} className="faq-item">
            <span>{question}</span>
            <ChevronRight 
              className="faq-arrow" 
              onClick={() => navigate(routes[index])}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FrequentlyAskedQuestions;

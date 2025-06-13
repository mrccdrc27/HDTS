import { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import faqs from '../../../../utilities/storage/faqs';
import './user_faqs.css';

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
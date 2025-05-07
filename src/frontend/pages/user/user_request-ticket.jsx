import React, { useState, useEffect } from 'react';
import { ticketCategories } from '../../../utilities/ticket/categoryAndSubCategory.js'; 
import '../../styles/pages/user/user_request-ticket.css';

const RequestTicket = () => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    subCategory: '',
    file: null,
    description: '',
    scheduleDate: ''
  });

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  // Update available categories on component mount
  useEffect(() => {
    // Extract categories from the ticketCategories structure
    const categories = Object.keys(ticketCategories).flatMap(department => {
      return Object.keys(ticketCategories[department]).map(categoryName => {
        return {
          name: categoryName,
          department: department,
          subcategories: ticketCategories[department][categoryName]
        };
      });
    });
    setAvailableCategories(categories);
  }, []);

  // Update subcategories when category changes
  useEffect(() => {
    const selectedCategory = availableCategories.find(cat => cat.name === formData.category);
    setAvailableSubCategories(selectedCategory ? selectedCategory.subcategories : []);
    setFormData(prev => ({ ...prev, subCategory: '' }));
  }, [formData.category, availableCategories]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save ticket or show modal
    console.log('Ticket submitted:', formData);
  };

  return (
    <div className="request-ticket-form">
      <div className="header">
        <h2>Request Ticket</h2>
        <hr />
      </div>

      <form onSubmit={handleSubmit}>
        {/* Subject */}
        <div className="form-group">
          <label htmlFor="subject">Subject <span className="required">*</span></label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category <span className="required">*</span></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {availableCategories.map((cat, index) => (
              <option key={index} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Sub-Category */}
        <div className="form-group">
          <label htmlFor="subCategory">Sub-Category <span className="required">*</span></label>
          <select
            id="subCategory"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Sub-Category</option>
            {availableSubCategories.map((sub, index) => (
              <option key={index} value={sub.name}>
                {sub.name} – {sub.priority}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label htmlFor="file">File Upload</label>
          <label className="file-upload-label">
            <span>📎</span>
            <span>{formData.file ? formData.file.name : 'Choose File'}</span>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              hidden
            />
          </label>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description <span className="required">*</span></label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>

        {/* Schedule Date */}
        <div className="form-group">
          <label htmlFor="scheduleDate">Schedule Request</label>
          <input
            type="date"
            id="scheduleDate"
            name="scheduleDate"
            value={formData.scheduleDate}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="submit-btn">
          SUBMIT TICKET
        </button>
      </form>
    </div>
  );
};

export default RequestTicket;

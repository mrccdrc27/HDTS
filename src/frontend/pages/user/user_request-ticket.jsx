import { useState, useEffect } from 'react';
import { Upload, X, ChevronDown } from 'lucide-react';
import { ticketCategories } from '../../../utilities/ticket/categoryAndSubCategory.js';
import TicketSuccessful from '../../components/modals/user/user_ticket-successful.jsx';
import FilePreviewModal from '../../components/modals/user/user_request-ticket-uploaded-files.jsx';

import '../../styles/pages/user/user_request-ticket.css';

import { addTicket } from '../../../utilities/ticket-data/ticketData.js';
import { generateTicketNumber } from '../../../utilities/ticket-data/generateTicketNumber.js';

const RequestTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [fileError, setFileError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);  // To track the clicked file

  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    subCategory: '',
    files: [],
    description: '',
    scheduleDate: ''
  });

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  useEffect(() => {
    const categories = Object.keys(ticketCategories).flatMap(department => {
      return Object.keys(ticketCategories[department]).map(categoryName => ({
        name: categoryName,
        department,
        subcategories: ticketCategories[department][categoryName]
      }));
    });
    setAvailableCategories(categories);
  }, []);

  useEffect(() => {
    const selectedCategory = availableCategories.find(cat => cat.name === formData.category);
    setAvailableSubCategories(selectedCategory ? selectedCategory.subcategories : []);
    setFormData(prev => ({ ...prev, subCategory: '' }));
  }, [formData.category, availableCategories]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      const validTypes = [
        'image/png', 'image/jpeg', 'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      const maxSize = 25 * 1024 * 1024;

      const selectedFiles = Array.from(files);
      const validFiles = [];
      const errorMessages = [];

      selectedFiles.forEach(file => {
        if (!validTypes.includes(file.type)) {
          errorMessages.push(`${file.name}: Invalid file type.`);
        } else if (file.size > maxSize) {
          errorMessages.push(`${file.name}: File too large (max 25MB).`);
        } else {
          validFiles.push(file);
        }
      });

      if (errorMessages.length > 0) {
        setFileError(errorMessages.join(' '));
        return;
      }

      setFileError('');
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...validFiles]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileRemove = (fileToRemove) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(file => file !== fileToRemove)
    }));
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketNumber = generateTicketNumber();

    const fullTicketData = {
      ...formData,
      ticketNumber
    };

    setSubmittedTicket(fullTicketData);
    setIsModalOpen(true);

    // Use addTicket to save the ticket data to localStorage
    addTicket(fullTicketData);

    setFormData({
      subject: '',
      category: '',
      subCategory: '',
      files: [],
      description: '',
      scheduleDate: ''
    });
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
          <label htmlFor="subject">Subject</label>
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

        {/* Category Dropdown */}
        <div className="register-ticket-form-group">
          <label htmlFor="category">Category</label>
          <div className="register-ticket-select-wrapper">
            <select
              id="category"
              name="category"
              required
              className="suffix-select"
              style={{ color: formData.category === '' ? '#7e7e7e' : '#0C0C0C' }}
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}>
              <option value="">Select Category</option>
              {availableCategories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <span className="register-ticket-select-separator" />
            <span className="register-ticket-select-chevron">
              <ChevronDown size={18} />
            </span>

            {formData.category && (
              <span
                className="register-ticket-clear-category"
                onClick={() => setFormData((prev) => ({ ...prev, category: '', subCategory: '' }))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setFormData((prev) => ({ ...prev, category: '', subCategory: '' }));
                  }
                }}
              >
                <X size={14} />
              </span>
            )}
          </div>
        </div>

        {/* Sub-Category Dropdown */}
        <div className="register-ticket-form-group">
          <label htmlFor="subCategory">Sub-Category</label>
          <div className="register-ticket-select-wrapper">
            <select
              id="subCategory"
              name="subCategory"
              required
              className="suffix-select"
              style={{ color: formData.subCategory === '' ? '#7e7e7e' : '#0C0C0C' }}
              value={formData.subCategory}
              onChange={(e) => setFormData((prev) => ({ ...prev, subCategory: e.target.value }))}>
              <option value="">Select Sub-Category</option>
              {availableSubCategories.map((sub, index) => (
                <option key={index} value={sub.name}>
                  {sub.name} – {sub.priority}
                </option>
              ))}
            </select>

            <span className="register-ticket-select-separator" />
            <span className="register-ticket-select-chevron">
              <ChevronDown size={18} />
            </span>

            {formData.subCategory && (
              <span
                className="register-ticket-clear-category"
                onClick={() => setFormData((prev) => ({ ...prev, subCategory: '' }))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setFormData((prev) => ({ ...prev, subCategory: '' }));
                  }
                }}
              >
                <X size={14} />
              </span>
            )}
          </div>
        </div>

        {/* File Upload */}
        <div className="register-ticket-form-group">
          <label htmlFor="file">File Upload</label>
          <div className="register-ticket-file-upload-container">
            <label htmlFor="file" className="upload-icon-wrapper">
              <Upload size={20} className="upload-icon" />
              <span className="register-ticket-upload-separator" />
              <span className="request-ticket-file-upload-display">
                {formData.files.length > 0 ? formData.files.map(file => file.name).join(', ') : 'Choose file(s)...'}
              </span>
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="request-ticket-file-upload-input"
              onChange={handleChange}
              multiple
            />
          </div>
          {fileError && <small className="error-message">{fileError}</small>}

          {/* Display uploaded files with clickable names */}
          {formData.files.length > 0 && (
            <div className="uploaded-files-list">
              {formData.files.map((file, index) => {
                let icon = '📄'; // default
                if (file.type.includes('pdf')) icon = '📕';
                else if (file.type.includes('image')) icon = '🖼️';
                else if (file.type.includes('sheet') || file.type.includes('excel')) icon = '📊';
                else if (file.type.includes('word')) icon = '📘';

                return (
                  <div key={index} className="file-item">
                    <div className="file-details" onClick={() => handleFileClick(file)}>
                      <span className="file-icon">{icon}</span>
                      <span className="file-name">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      className="file-remove-btn"
                      onClick={() => handleFileRemove(file)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
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

      <TicketSuccessful
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticketData={submittedTicket}
      />

      {/* File Preview Modal */}
      {selectedFile && (
        <FilePreviewModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default RequestTicket;

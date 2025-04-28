import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define the Modal component inline
const ModalTicketSuccessful = ({ isOpen, onClose, ticketData }) => {
  if (!isOpen) return null;
  
  // Format the date as "April 09, 2025"
  const formattedDate = ticketData?.date 
    ? ticketData.date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        width: '100%',
        maxWidth: '500px',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          padding: '20px'
        }}>
          <p style={{
            color: '#22c55e',
            fontSize: '18px',
            fontWeight: 600,
            margin: 0
          }}>Ticket successfully created!</p>
        </div>
        
        {/* Ticket Number */}
        <div style={{
          textAlign: 'center',
          padding: '10px 20px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '5px'
          }}>Ticket Number</p>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#e53e3e',
            margin: 0
          }}>{ticketData?.ticketNumber || "TX0405"}</h2>
        </div>
        
        {/* Date - right aligned */}
        <p style={{
          fontSize: '14px',
          color: '#666',
          textAlign: 'right',
          paddingRight: '20px',
          margin: '10px 0'
        }}>{formattedDate}</p>
        
        {/* Ticket Details */}
        <div style={{
          padding: '20px'
        }}>
          <div style={{
            display: 'flex',
            marginBottom: '12px'
          }}>
            <span style={{
              fontWeight: 600,
              width: '120px',
              flexShrink: 0
            }}>Subject:</span>
            <span style={{
              flexGrow: 1
            }}>{ticketData?.subject || "Request for personal app installation"}</span>
          </div>
          
          <div style={{
            display: 'flex',
            marginBottom: '12px'
          }}>
            <span style={{
              fontWeight: 600,
              width: '120px',
              flexShrink: 0
            }}>Category:</span>
            <span style={{
              flexGrow: 1
            }}>{ticketData?.category || "Software"}</span>
          </div>
          
          <div style={{
            display: 'flex',
            marginBottom: '12px'
          }}>
            <span style={{
              fontWeight: 600,
              width: '120px',
              flexShrink: 0
            }}>Sub Category:</span>
            <span style={{
              flexGrow: 1
            }}>{ticketData?.subCategory || "Unauthorized Apps"}</span>
          </div>
          
          <div style={{
            display: 'flex',
            marginBottom: '12px'
          }}>
            <span style={{
              fontWeight: 600,
              width: '120px',
              flexShrink: 0
            }}>Attached File:</span>
            <span style={{
              flexGrow: 1
            }}>{ticketData?.attachedFile || "Not Applicable"}</span>
          </div>
        </div>
        
        {/* Footer with buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderTop: '1px solid #eee'
        }}>
          <Link to="/user/home" style={{ textDecoration: 'none' }}>
            <button onClick={onClose} style={{
              padding: '10px 20px',
              backgroundColor: '#f1f1f1',
              border: '1px solid #ddd',
              borderRadius: '4px',
              color: '#333',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              CLOSE
            </button>
          </Link>
          
          <Link to={`/user/ticket-details/${ticketData?.ticketNumber || "TX0405"}`} style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '10px 20px',
              backgroundColor: '#004696',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              VIEW TICKET
            </button>
          </Link>
        </div>
        
        {/* Submit another link */}
        <div style={{
          textAlign: 'center',
          padding: '15px',
          fontSize: '14px',
          color: '#666'
        }}>
          Submit another request? 
          <Link to="/user/request-ticket" style={{
            color: '#004696',
            textDecoration: 'none',
            fontWeight: 500,
            marginLeft: '5px'
          }}>Click here</Link>
        </div>
      </div>
    </div>
  );
};

// Main RequestTicket component
const RequestTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    category: 'Software', // Default values from the image
    subCategory: 'Unauthorized App',
    file: null,
    description: '',
    scheduleDate: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally make an API call to create the ticket
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <Link to="/user/home" style={{
          display: 'flex',
          alignItems: 'center',
          color: '#333',
          textDecoration: 'none',
          fontWeight: 500,
          marginRight: '10px'
        }}>
          ← Request Ticket
        </Link>
        <span style={{
          fontSize: '12px',
          color: '#888',
          marginLeft: 'auto'
        }}>Auto-Save</span>
      </div>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        {/* Subject */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 500,
            color: '#333'
          }}>
            Subject <span style={{ color: '#e53e3e', marginLeft: '2px' }}>*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Request for personal app installation"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            required
          />
        </div>

        {/* Category and Sub-Category in one row */}
        <div style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ flex: 1 }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333'
            }}>
              Category <span style={{ color: '#e53e3e', marginLeft: '2px' }}>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23333\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '16px'
              }}
              required
            >
              <option value="">Select Category</option>
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
              <option value="Network">Network</option>
            </select>
          </div>
          
          <div style={{ flex: 1 }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 500,
              color: '#333'
            }}>
              Sub-Category <span style={{ color: '#e53e3e', marginLeft: '2px' }}>*</span>
            </label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23333\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '16px'
              }}
              required
            >
              <option value="">Select Sub-Category</option>
              <option value="Unauthorized App">Unauthorized App</option>
              <option value="Software Installation">Software Installation</option>
              <option value="Software Update">Software Update</option>
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 500,
            color: '#333'
          }}>
            File Upload
          </label>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer'
          }}>
            <span style={{ marginRight: '10px', color: '#666' }}>📎</span>
            <span style={{ color: '#666' }}>
              {formData.file ? formData.file.name : 'Attach File'}
            </span>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 500,
            color: '#333'
          }}>
            Description <span style={{ color: '#e53e3e', marginLeft: '2px' }}>*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              minHeight: '120px',
              resize: 'vertical'
            }}
            required
          />
        </div>

        {/* Schedule Request */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 500,
            color: '#333'
          }}>
            Schedule Request
          </label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
            cursor: 'pointer'
          }}>
            <span style={{ marginRight: '10px', color: '#666' }}>📅</span>
            <input
              type="date"
              name="scheduleDate"
              value={formData.scheduleDate}
              onChange={handleChange}
              style={{
                border: 'none',
                padding: 0,
                backgroundColor: 'transparent',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" style={{
          display: 'block',
          width: '100%',
          padding: '12px',
          backgroundColor: '#004696',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 500,
          cursor: 'pointer'
        }}>
          SUBMIT TICKET
        </button>
      </form>

      {/* Success Modal */}
      <ModalTicketSuccessful 
        isOpen={isModalOpen} 
        onClose={closeModal}
        ticketData={{
          ticketNumber: "TX0405",
          date: new Date(),
          subject: formData.subject || "Request for personal app installation",
          category: formData.category || "Software",
          subCategory: formData.subCategory || "Unauthorized App",
          attachedFile: formData.file ? formData.file.name : "Not Applicable"
        }}
      />
    </div>
  );
};

export default RequestTicket;
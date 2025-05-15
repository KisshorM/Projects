import { useState } from 'react';
import axios from 'axios';
import './StudentCRUD.css';

export default function Signup({ onSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    registerNumber: '',
    name: '',
    title: '',
    mobileNumber: '',
    section: '',
    obtainedInternship: 'No',
    period: '',
    startDate: '',
    endDate: '',
    companyName: '',
    placementSource: 'CDC',
    internshipType: 'India',
    stipend: ''
  });

  const [files, setFiles] = useState({
    offerLetter: null,
    signedPermissionLetter: null,
    completionCertificate: null,
    internshipReport: null,
    studentFeedback: null,
    employerFeedback: null
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFiles(prev => ({
      ...prev,
      [e.target.name]: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    
    // Append all form fields
    for (const key in formData) {
      if (formData[key] !== '') {
        formDataToSend.append(key, formData[key]);
      }
    }
    
    // Append all files that were uploaded
    for (const key in files) {
      if (files[key]) {
        formDataToSend.append(key, files[key]);
      }
    }

    try {
      await axios.post('/api/user/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onSuccess();
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-form">
      <h2>Student Registration</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-group">
          <label>Register Number*:</label>
          <input 
            type="text" 
            name="registerNumber" 
            value={formData.registerNumber}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Full Name*:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title}
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Mobile Number:</label>
          <input 
            type="text" 
            name="mobileNumber" 
            value={formData.mobileNumber}
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Section:</label>
          <input 
            type="text" 
            name="section" 
            value={formData.section}
            onChange={handleChange} 
          />
        </div>

        {/* Internship Information */}
        <div className="form-group">
          <label>Obtained Internship:</label>
          <select 
            name="obtainedInternship" 
            value={formData.obtainedInternship}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {formData.obtainedInternship === 'Yes' && (
          <>
            <div className="form-group">
              <label>Company Name:</label>
              <input 
                type="text" 
                name="companyName" 
                value={formData.companyName}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Internship Duration (months):</label>
              <input 
                type="number" 
                name="period" 
                value={formData.period}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Start Date:</label>
              <input 
                type="date" 
                name="startDate" 
                value={formData.startDate}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>End Date:</label>
              <input 
                type="date" 
                name="endDate" 
                value={formData.endDate}
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Placement Source:</label>
              <select 
                name="placementSource" 
                value={formData.placementSource}
                onChange={handleChange}
              >
                <option value="CDC">CDC</option>
                <option value="External">External</option>
              </select>
            </div>

            <div className="form-group">
              <label>Internship Type:</label>
              <select 
                name="internshipType" 
                value={formData.internshipType}
                onChange={handleChange}
              >
                <option value="India">India</option>
                <option value="Abroad">Abroad</option>
              </select>
            </div>

            <div className="form-group">
              <label>Stipend (₹):</label>
              <input 
                type="number" 
                name="stipend" 
                value={formData.stipend}
                onChange={handleChange} 
              />
            </div>
          </>
        )}

        {/* Document Uploads */}
        <h3>Documents (PDF only)</h3>
        
        <div className="form-group">
          <label>Offer Letter:</label>
          <input 
            type="file" 
            name="offerLetter" 
            onChange={handleFileChange} 
            accept=".pdf" 
          />
        </div>

        <div className="form-group">
          <label>Signed Permission Letter:</label>
          <input 
            type="file" 
            name="signedPermissionLetter" 
            onChange={handleFileChange} 
            accept=".pdf" 
          />
        </div>

        <div className="form-group">
          <label>Completion Certificate:</label>
          <input 
            type="file" 
            name="completionCertificate" 
            onChange={handleFileChange} 
            accept=".pdf" 
          />
        </div>

        <div className="form-group">
          <label>Internship Report:</label>
          <input 
            type="file" 
            name="internshipReport" 
            onChange={handleFileChange} 
            accept=".pdf" 
          />
        </div>

        <div className="form-group">
          <label>Student Feedback:</label>
          <input 
            type="file" 
            name="studentFeedback" 
            onChange={handleFileChange} 
            accept=".pdf" 
          />
        </div>

        <div className="form-group">
          <label>Employer Feedback:</label>
          <input 
            type="file" 
            name="employerFeedback" 
            onChange={handleFileChange} 
            accept=".pdf" 
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          Register
        </button>
    <br></br>
      </form>
      <button onClick={onSwitchToLogin} className="toggle-btn">
        Back to Login
      </button>
    </div>
  );
}
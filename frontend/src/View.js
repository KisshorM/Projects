import { useState } from 'react';
import axios from 'axios';
import './StudentView.css';


export default function View() {
  const [regNo, setRegNo] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStudent = async () => {
    if (!regNo.trim()) {
      setError('Please enter a registration number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/user/student/${regNo.trim()}`);
      setStudent(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Student not found');
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchStudent();
    }
  };

  return (
    <div className="view-container">
      <h2>View Student Record</h2>
      
      <div className="search-box">
        <label>Enter Register Number:</label>
        <input 
          type="text" 
          value={regNo} 
          onChange={(e) => setRegNo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., SSN2023001"
        />
        <button onClick={fetchStudent} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {student && (
        <div className="student-details">
          <div className="section basic-info">
            <h3>Basic Information</h3>
            <div className="detail-row">
              <span className="detail-label">Register Number:</span>
              <span className="detail-value">{student.registerNumber}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Full Name:</span>
              <span className="detail-value">{student.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Title:</span>
              <span className="detail-value">{student.title || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Mobile Number:</span>
              <span className="detail-value">{student.mobileNumber || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Section:</span>
              <span className="detail-value">{student.section || 'N/A'}</span>
            </div>
          </div>

          <div className="section internship-info">
            <h3>Internship Information</h3>
            <div className="detail-row">
              <span className="detail-label">Obtained Internship:</span>
              <span className="detail-value">{student.obtainedInternship}</span>
            </div>

            {student.obtainedInternship === 'Yes' && (
              <>
                <div className="detail-row">
                  <span className="detail-label">Company Name:</span>
                  <span className="detail-value">{student.companyName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">
                    {student.period ? `${student.period} months` : 'N/A'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Start Date:</span>
                  <span className="detail-value">
                    {student.startDate ? new Date(student.startDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">End Date:</span>
                  <span className="detail-value">
                    {student.endDate ? new Date(student.endDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Placement Source:</span>
                  <span className="detail-value">{student.placementSource}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Internship Type:</span>
                  <span className="detail-value">{student.internshipType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Stipend:</span>
                  <span className="detail-value">
                    {student.stipend ? `₹${student.stipend}` : 'N/A'}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="section documents">
            <h3>Documents</h3>
            <div className="document-grid">
              {student.offerLetter && (
                <div className="document-item">
                  <span className="document-label">Offer Letter:</span>
                  <a 
                    href={student.offerLetter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    View Document
                  </a>
                </div>
              )}
              
              {student.signedPermissionLetter && (
                <div className="document-item">
                  <span className="document-label">Permission Letter:</span>
                  <a 
                    href={student.signedPermissionLetter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    View Document
                  </a>
                </div>
              )}
              
              {student.completionCertificate && (
                <div className="document-item">
                  <span className="document-label">Completion Certificate:</span>
                  <a 
                    href={student.completionCertificate} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    View Document
                  </a>
                </div>
              )}
              
              {student.internshipReport && (
                <div className="document-item">
                  <span className="document-label">Internship Report:</span>
                  <a 
                    href={student.internshipReport} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    View Document
                  </a>
                </div>
              )}
              
              {student.studentFeedback && (
                <div className="document-item">
                  <span className="document-label">Student Feedback:</span>
                  <a 
                    href={student.studentFeedback} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    View Document
                  </a>
                </div>
              )}
              
              {student.employerFeedback && (
                <div className="document-item">
                  <span className="document-label">Employer Feedback:</span>
                  <a 
                    href={student.employerFeedback} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    View Document
                  </a>
                </div>
              )}
            </div>

            {!student.offerLetter && 
             !student.signedPermissionLetter && 
             !student.completionCertificate && 
             !student.internshipReport && 
             !student.studentFeedback && 
             !student.employerFeedback && (
              <div className="no-documents">No documents available for this student</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
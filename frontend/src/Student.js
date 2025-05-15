import { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentView.css';


export default function Student({ regNo }) {
  const [student, setStudent] = useState(null);
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
  const [documentUrls, setDocumentUrls] = useState({});

  const fetchStudent = async () => {
    if (!regNo.trim()) return;
    
    try {
      const response = await axios.get(`/api/user/student/${regNo.trim()}`);
      const studentData = response.data.data;
      setStudent(studentData);
      
      // Set form data
      setFormData({
        registerNumber: studentData.registerNumber,
        name: studentData.name || '',
        title: studentData.title || '',
        mobileNumber: studentData.mobileNumber || '',
        section: studentData.section || '',
        obtainedInternship: studentData.obtainedInternship || 'No',
        period: studentData.period || '',
        startDate: studentData.startDate ? studentData.startDate.split('T')[0] : '',
        endDate: studentData.endDate ? studentData.endDate.split('T')[0] : '',
        companyName: studentData.companyName || '',
        placementSource: studentData.placementSource || 'CDC',
        internshipType: studentData.internshipType || 'India',
        stipend: studentData.stipend || ''
      });

      // Save document URLs for display
      const urls = {};
      if (studentData.offerLetter) urls.offerLetter = studentData.offerLetter;
      if (studentData.signedPermissionLetter) urls.signedPermissionLetter = studentData.signedPermissionLetter;
      if (studentData.completionCertificate) urls.completionCertificate = studentData.completionCertificate;
      if (studentData.internshipReport) urls.internshipReport = studentData.internshipReport;
      if (studentData.studentFeedback) urls.studentFeedback = studentData.studentFeedback;
      if (studentData.employerFeedback) urls.employerFeedback = studentData.employerFeedback;
      setDocumentUrls(urls);

    } catch (error) {
      alert(`Error fetching student: ${error.response?.data?.error || error.message}`);
      setStudent(null);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [regNo]);

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
    if (!student) return;
    
    const formDataToSend = new FormData();
    
    // Append all form fields
    for (const key in formData) {
      if (formData[key] !== '') {
        formDataToSend.append(key, formData[key]);
      }
    }
    
    // Append only new files that were uploaded
    for (const key in files) {
      if (files[key]) {
        formDataToSend.append(key, files[key]);
      }
    }

    try {
      await axios.put(`/api/user/update/${regNo}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Student updated successfully!');
      // Refresh the student data
      fetchStudent();
      // Clear file inputs
      setFiles({
        offerLetter: null,
        signedPermissionLetter: null,
        completionCertificate: null,
        internshipReport: null,
        studentFeedback: null,
        employerFeedback: null
      });
      
    } catch (error) {
      alert(`Error updating student: ${error.response?.data?.error || error.message}`);
    }
  };

  if (!student) {
    return <div>Loading student data...</div>;
  }

  return (
    <div className="edit-form">
      <h2>Edit Student Record: {regNo}</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label>Register Number:</label>
            <input 
              type="text" 
              name="registerNumber" 
              value={formData.registerNumber}
              onChange={handleChange} 
              disabled
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
        </div>

        {/* Internship Information */}
        <div className="form-section">
          <h3>Internship Information</h3>
          
          <div className="form-group">
            <label>Obtained Internship*:</label>
            <select 
              name="obtainedInternship" 
              value={formData.obtainedInternship}
              onChange={handleChange}
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {formData.obtainedInternship === 'Yes' && (
            <>
              <div className="form-group">
                <label>Company Name*:</label>
                <input 
                  type="text" 
                  name="companyName" 
                  value={formData.companyName}
                  onChange={handleChange} 
                  required={formData.obtainedInternship === 'Yes'}
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
                <label>Placement Source*:</label>
                <select 
                  name="placementSource" 
                  value={formData.placementSource}
                  onChange={handleChange}
                  required={formData.obtainedInternship === 'Yes'}
                >
                  <option value="CDC">CDC</option>
                  <option value="External">External</option>
                </select>
              </div>

              <div className="form-group">
                <label>Internship Type*:</label>
                <select 
                  name="internshipType" 
                  value={formData.internshipType}
                  onChange={handleChange}
                  required={formData.obtainedInternship === 'Yes'}
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
        </div>

        {/* Document Uploads */}
        <div className="form-section">
          <h3>Documents</h3>
          <p className="document-note">Upload new versions to replace existing documents</p>
          
          <div className="document-grid">
            <div className="document-item">
              <label>Offer Letter:</label>
              {documentUrls.offerLetter && (
                <a href={documentUrls.offerLetter} target="_blank" rel="noopener noreferrer">
                  View Current
                </a>
              )}
              <input 
                type="file" 
                name="offerLetter" 
                onChange={handleFileChange} 
                accept=".pdf" 
              />
            </div>

            <div className="document-item">
              <label>Signed Permission Letter:</label>
              {documentUrls.signedPermissionLetter && (
                <a href={documentUrls.signedPermissionLetter} target="_blank" rel="noopener noreferrer">
                  View Current
                </a>
              )}
              <input 
                type="file" 
                name="signedPermissionLetter" 
                onChange={handleFileChange} 
                accept=".pdf" 
              />
            </div>

            <div className="document-item">
              <label>Completion Certificate:</label>
              {documentUrls.completionCertificate && (
                <a href={documentUrls.completionCertificate} target="_blank" rel="noopener noreferrer">
                  View Current
                </a>
              )}
              <input 
                type="file" 
                name="completionCertificate" 
                onChange={handleFileChange} 
                accept=".pdf" 
              />
            </div>

            <div className="document-item">
              <label>Internship Report:</label>
              {documentUrls.internshipReport && (
                <a href={documentUrls.internshipReport} target="_blank" rel="noopener noreferrer">
                  View Current
                </a>
              )}
              <input 
                type="file" 
                name="internshipReport" 
                onChange={handleFileChange} 
                accept=".pdf" 
              />
            </div>

            <div className="document-item">
              <label>Student Feedback:</label>
              {documentUrls.studentFeedback && (
                <a href={documentUrls.studentFeedback} target="_blank" rel="noopener noreferrer">
                  View Current
                </a>
              )}
              <input 
                type="file" 
                name="studentFeedback" 
                onChange={handleFileChange} 
                accept=".pdf" 
              />
            </div>

            <div className="document-item">
              <label>Employer Feedback:</label>
              {documentUrls.employerFeedback && (
                <a href={documentUrls.employerFeedback} target="_blank" rel="noopener noreferrer">
                  View Current
                </a>
              )}
              <input 
                type="file" 
                name="employerFeedback" 
                onChange={handleFileChange} 
                accept=".pdf" 
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">Update Student Record</button>
      </form>
    </div>
  );
}
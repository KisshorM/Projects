import { useState } from 'react';
import axios from 'axios';
import './StudentCRUD.css';


export default function DeleteS() {
  const [regNo, setRegNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });

  const handleDelete = async () => {
    if (!regNo.trim()) {
      setMessage({ text: 'Please enter registration number', isError: true });
      return;
    }

    if (!window.confirm(`Delete student ${regNo}? This cannot be undone.`)) return;

    setLoading(true);
    try {
      await axios.delete(`/api/user/delete/${regNo}`);
      setMessage({ text: 'Student deleted successfully', isError: false });
      setRegNo('');
    } catch (err) {
      setMessage({ text: err.response?.data?.error || 'Deletion failed', isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-container">
      <h2>Delete Student</h2>
      
      <div className="search-box">
        <input 
          type="text" 
          value={regNo} 
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="Enter registration number"
        />
        <button 
          onClick={handleDelete} 
          disabled={loading || !regNo.trim()}
          className="delete-btn"
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      {message.text && (
        <div className={message.isError ? 'error' : 'success'}>
          {message.text}
        </div>
      )}
    </div>
  );
}
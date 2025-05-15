import { useState } from 'react';
import axios from 'axios';
import './StudentCRUD.css';


export default function Filter() {
  const [filters, setFilters] = useState({
    company: '',
    internshipType: '',
    placementSource: '',
    title: '',
    domain: '',
    minDuration: '',
    maxDuration: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert empty strings to undefined to avoid sending empty params
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).map(([key, value]) => 
          [key, value === '' ? undefined : value]
        )
      );

      const response = await axios.post('/api/user/filter', cleanedFilters);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch results');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      company: '',
      internshipType: '',
      placementSource: '',
      title: '',
      domain: '',
      minDuration: '',
      maxDuration: ''
    });
    setResults([]);
    setError('');
  };

  return (
    <div className="filter-container">
      <h2>Filter Students</h2>
      
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="filter-grid">
          {/* Company Name */}
          <div className="filter-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="company"
              value={filters.company}
              onChange={handleFilterChange}
              placeholder="Any company"
            />
          </div>

          {/* Internship Type */}
          <div className="filter-group">
            <label>Internship Type:</label>
            <select
              name="internshipType"
              value={filters.internshipType}
              onChange={handleFilterChange}
            >
              <option value="">All Types</option>
              <option value="India">India</option>
              <option value="Abroad">Abroad</option>
            </select>
          </div>

          {/* Placement Source */}
          <div className="filter-group">
            <label>Placement Source:</label>
            <select
              name="placementSource"
              value={filters.placementSource}
              onChange={handleFilterChange}
            >
              <option value="">All Sources</option>
              <option value="CDC">CDC</option>
              <option value="External">External</option>
            </select>
          </div>

          {/* Title */}
          <div className="filter-group">
            <label>Internship Title:</label>
            <input
              type="text"
              name="title"
              value={filters.title}
              onChange={handleFilterChange}
              placeholder="Any title"
            />
          </div>

          {/* Domain */}
          <div className="filter-group">
            <label>Domain/Field:</label>
            <input
              type="text"
              name="domain"
              value={filters.domain}
              onChange={handleFilterChange}
              placeholder="Any domain"
            />
          </div>

          {/* Duration Range */}
          <div className="filter-group duration-range">
            <label>Duration (months):</label>
            <div className="duration-inputs">
              <input
                type="number"
                name="minDuration"
                value={filters.minDuration}
                onChange={handleFilterChange}
                placeholder="Min"
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                name="maxDuration"
                value={filters.maxDuration}
                onChange={handleFilterChange}
                placeholder="Max"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={resetFilters}
            className="reset-btn"
          >
            Reset Filters
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {results.length > 0 ? (
        <div className="results-section">
          <h3>Results ({results.length} found)</h3>
          <div className="results-grid">
            {results.map((regNo, index) => (
              <div key={index} className="result-item">
                {regNo}
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && results.length === 0 && (
          <div className="no-results">
            No students match the current filters
          </div>
        )
      )}
    </div>
  );
}
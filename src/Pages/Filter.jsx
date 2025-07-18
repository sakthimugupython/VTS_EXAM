import React, { useState, useEffect } from 'react';
import '../assets/CSS/Filter.css';

const FilterModal = ({ visible, filter, setFilter, onSubmit, onClose, courses, trainees = [] }) => {
  const [localFilter, setLocalFilter] = useState(filter);
  const [showResults, setShowResults] = useState(false);
  const [filteredTrainees, setFilteredTrainees] = useState([]);

  useEffect(() => {
    if (visible) {
      setLocalFilter(filter);
      setShowResults(false);
      setFilteredTrainees([]);
    }
    // eslint-disable-next-line
  }, [visible]);

  if (!visible) return null;

  const handleChange = (field, value) => {
    setLocalFilter(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(localFilter);
    if (onSubmit) onSubmit(e);
    // Apply filtering logic to trainees
    const filtered = trainees.filter(u =>
      (!localFilter.name || u.name.toLowerCase().includes(localFilter.name.toLowerCase())) &&
      (!localFilter.course || u.course.toLowerCase().includes(localFilter.course.toLowerCase())) &&
      (!localFilter.classMode || u.classMode === localFilter.classMode)
    );
    setFilteredTrainees(filtered);
    setShowResults(true);
  };

  return (
    <div className="designing-modal-bg">
      <div className="designing-modal" style={{maxWidth:500}}>
        <button className="designing-modal-close" onClick={onClose}>&times;</button>
        <div style={{fontWeight:600,fontSize:18,marginBottom:18}}>Filter By</div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Trainees Name</label>
            <input className="form-control" value={localFilter.name || ''} onChange={e=>handleChange('name', e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Course Name</label>
            <select className="form-control" value={localFilter.course || ''} onChange={e=>handleChange('course', e.target.value)}>
              <option value="">All</option>
              {courses && courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label>Class Mode</label>
            <div style={{display:'flex',gap:18,marginTop:6}}>
              <label><input type="radio" name="classMode" value="Online" checked={localFilter.classMode==='Online'} onChange={e=>handleChange('classMode',e.target.value)} /> Online</label>
              <label><input type="radio" name="classMode" value="Offline" checked={localFilter.classMode==='Offline'} onChange={e=>handleChange('classMode',e.target.value)} /> Offline</label>
            </div>
          </div>
          <div style={{textAlign:'center'}}>
            <button type="submit" className="designing-btn designing-btn-add">Submit</button>
          </div>
        </form>
        {showResults && (
          <div style={{marginTop:24}}>
            <div style={{fontWeight:600,fontSize:16,marginBottom:10}}>Filtered Trainees</div>
            {filteredTrainees.length === 0 ? (
              <div style={{color:'#888'}}>No trainees found.</div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                {filteredTrainees.map((u,i) => (
                  <div key={i} className="designing-trainee-card" style={{padding:'12px 16px',border:'1px solid #eee',borderRadius:8,background:'#f7f7fb'}}>
                    <div style={{fontWeight:600}}>{u.name}</div>
                    <div style={{fontSize:13,color:'#555'}}>Email: {u.email}</div>
                    <div style={{fontSize:13,color:'#555'}}>Course: {u.course}</div>
                    <div style={{fontSize:13,color:'#555'}}>Class Mode: {u.classMode}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterModal;

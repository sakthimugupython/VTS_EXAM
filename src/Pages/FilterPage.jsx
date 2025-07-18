import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/CSS/Filter.css';
import { CiMail, CiPhone } from "react-icons/ci";

const FilterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const filter = location.state?.filter || {};

  // Load users from localStorage
  const users = React.useMemo(() => JSON.parse(localStorage.getItem('users') || '[]'), []);

  // Support both Designing and Development context
  const context = location.state?.context || 'designing';
  const filteredTrainees = users.filter(u =>
    u.role === 'trainee' &&
    (
      context === 'development'
        ? (u.course === 'Python Full Stack' || u.course === 'Data Analytics')
        : u.course === 'UI/UX'
    ) &&
    (!filter.name || u.name.toLowerCase().includes(filter.name.toLowerCase())) &&
    (!filter.course || u.course.toLowerCase().includes(filter.course.toLowerCase())) &&
    (!filter.duration || (u.duration && u.duration.toString().includes(filter.duration))) &&
    (!filter.classMode || u.classMode === filter.classMode)
  );

  return (
    <div className="designing-main" style={{padding:32}}>
      <div style={{display:'flex',alignItems:'center',marginBottom:24}}>
        <button className="designing-btn designing-btn-add" onClick={()=>navigate(-1)}>&larr; Back</button>
        <span style={{fontWeight:600,fontSize:22,marginLeft:16}}>Filtered Trainees</span>
      </div>
      {filteredTrainees.length === 0 ? (
        <div style={{color:'#888',fontSize:16}}>No trainees found for the given filter.</div>
      ) : (
        <div style={{display:'flex',flexWrap:'wrap',gap:20}}>
          {filteredTrainees.map((u,i) => (
            <div
              key={i}
              style={{
                background: '#f3ffcc',
                borderRadius: 14,
                boxShadow: '0 2px 8px #eaeaea',
                padding: 18,
                minWidth: 230,
                maxWidth: 250,
                position: 'relative',
                fontFamily: 'inherit',
                margin: 4
              }}
            >
              {/* Edit icon */}
              <span style={{position:'absolute',top:12,right:14,fontSize:18,cursor:'pointer',color:'#444'}} title="Edit">✏️</span>
              {/* Profile avatar */}
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#c2e59c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#3a4d1b',
                  flexShrink: 0
                }}>{u.name && u.name[0] ? u.name[0].toUpperCase() : '?'}</div>
                <span style={{fontWeight:600,fontSize:20,color:'#222'}}>{u.name || '-'}</span>
              </div>
              <div style={{fontSize:15,margin:'8px 0 2px',color:'#222'}}>
                <b>Durations :</b> <span style={{fontWeight:400}}>{u.duration ? `${u.duration} Days` : '90 Days'}</span>
              </div>
              <div style={{fontSize:15,margin:'4px 0',color:'#222'}}>
                <b>Course Name :</b> <span style={{fontWeight:400}}>{u.course || 'UI/UX Design'}</span>
              </div>
              <div style={{fontSize:15,margin:'4px 0',color:'#222'}}>
                <b>Class Mode :</b> <span style={{fontWeight:400}}>{u.classMode || '-'}</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,margin:'8px 0 2px'}}>
                <span style={{fontSize:18}}><CiMail /></span>
                <span style={{fontSize:15}}>{u.email || '-'}</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,margin:'2px 0 10px'}}>
                <span style={{fontSize:18}}><CiPhone /></span>
                <span style={{fontSize:15}}>{u.phone || u.mobile || u.contact || 'xxxxxxxxxx'}</span>
              </div>
              <div style={{textAlign:'right'}}>
                <button
                  style={{
                    background:'#222',
                    color:'#fff',
                    border:'none',
                    borderRadius:6,
                    padding:'4px 14px',
                    fontSize:14,
                    cursor:'pointer',
                    fontWeight:500
                  }}
                >View More</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterPage;

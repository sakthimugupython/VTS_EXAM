import React, { useState, useEffect } from 'react';
import '../assets/CSS/Designing.css';
import { CiFilter } from "react-icons/ci";
import FilterModal from './Filter';
import { useNavigate } from 'react-router-dom';

const Development = () => {
  const navigate = useNavigate();
  // Modal and state management
  const [showAddExam, setShowAddExam] = useState(false);
  const [newExam, setNewExam] = useState({ title: '', date: '', time: '', duration: '', file: null, course: '' });
  const [examErrors, setExamErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [exams, setExams] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ name: '', course: '', classMode: '' });
  const [showAddTrainee, setShowAddTrainee] = useState(false);
  const [newTrainee, setNewTrainee] = useState({ name: '', email: '', password: '', course: '', classMode: '' });
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const usrs = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(usrs);
    setExams(JSON.parse(localStorage.getItem('exams') || '[]'));
    const loggedEmail = localStorage.getItem('loggedInEmail');
    if (loggedEmail) {
      const found = usrs.find(u => u.email === loggedEmail);
      setCurrentUser(found || null);
    } else {
      setCurrentUser(null);
    }
  }, [showAddTrainee]);

  // Only show Python Full Stack and Data Analytics
  const filteredTrainees = users.filter(u => u.role === 'trainee' &&
    (u.course === 'Python Full Stack' || u.course === 'Data Analytics') &&
    (!filter.name || u.name.toLowerCase().includes(filter.name.toLowerCase())) &&
    (!filter.course || u.course.toLowerCase().includes(filter.course.toLowerCase())) &&
    (!filter.classMode || u.classMode === filter.classMode)
  );
  const trainers = users.filter(u => u.role === 'trainer');
  const filteredExams = exams.filter(exam => exam.course === 'Python Full Stack' || exam.course === 'Data Analytics');

  // Add trainee logic
  const handleAddTrainee = (e) => {
    e.preventDefault();
    let errs = {};
    if (!newTrainee.name) errs.name = 'Name required';
    if (!newTrainee.email) errs.email = 'Email required';
    else if (!/^\S+@\S+\.\S+$/.test(newTrainee.email)) errs.email = 'Invalid email';
    if (!newTrainee.password) errs.password = 'Password required';
    else if (newTrainee.password.length < 6) errs.password = 'Password must be at least 6 chars';
    if (!newTrainee.course) errs.course = 'Course required';
    if (!newTrainee.classMode) errs.classMode = 'Class mode required';
    if (users.some(u => u.email === newTrainee.email)) errs.email = 'Email already exists!';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const updatedUsers = [...users, { ...newTrainee, role: 'trainee' }];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowAddTrainee(false);
    setNewTrainee({ name: '', email: '', password: '', course: '', classMode: '' });
    setUsers(updatedUsers);
  };

  // Add exam logic
  const handleAddExam = (e) => {
    e.preventDefault();
    let errs = {};
    if (!newExam.title) errs.title = 'Title required';
    if (!newExam.date) errs.date = 'Date required';
    if (!newExam.time) errs.time = 'Time required';
    if (!newExam.duration) errs.duration = 'Duration required';
    if (!newExam.file) errs.file = 'File required';
    if (!newExam.course) errs.course = 'Course required';
    setExamErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const fakeFileUrl = newExam.file ? newExam.file.name : '';
    // Save with course selection
    const examToSave = { ...newExam, fileUrl: fakeFileUrl };
    const examsArr = JSON.parse(localStorage.getItem('exams') || '[]');
    examsArr.push(examToSave);
    localStorage.setItem('exams', JSON.stringify(examsArr));
    setExams(examsArr);
    setShowAddExam(false);
    setNewExam({ title: '', date: '', time: '', duration: '', file: null, course: '' });
    setExamErrors({});
  };

  return (
    <div className="designing-main">
      {/* Header: Search, Filter, Add Trainees */}
      <div className="designing-header">
        <input type="text" placeholder="Search" className="designing-search form-control" disabled />
        {currentUser && (currentUser.role === 'trainer' || currentUser.role === 'manager') && (
          <>
            <button className="designing-btn designing-btn-filter" onClick={()=>setShowFilter(true)}><CiFilter /> Filter</button>
            <button className="designing-btn designing-btn-add" onClick={()=>setShowAddTrainee(true)}>+ Add Trainees</button>
          </>
        )}
      </div>
      <div style={{display:'flex',gap:32}}>
        {/* Trainers List (left) */}
        <section className="designing-trainers-section">
          <div style={{fontWeight:600,marginBottom:12}}>Active Trainers</div>
          <div className="designing-trainers-list">
            {trainers.length === 0 && <div>No trainers found.</div>}
            {trainers.map((t,i) => (
              <div className="designing-trainer-card" key={i}>
                <div className="designing-trainer-avatar">
                  {t.name ? t.name[0].toUpperCase() : '?'}
                </div>
                <div>
                  <div style={{fontWeight:600}}>{t.name}</div>
                  <div style={{fontSize:13,color:'#888'}}>{t.role?.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Upcoming Exams (center) */}
        <section className="designing-upcoming-section">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
            <div style={{fontWeight:600}}>Upcoming Exams</div>
            {currentUser && (currentUser.role === 'trainer' || currentUser.role === 'manager') && (
              <button className="designing-upload-btn" onClick={()=>setShowAddExam(true)} type="button">Upload New Exam</button>
            )}
          </div>
          <div className="designing-upcoming-list">
            {filteredExams.length === 0 && <div style={{color:'#888'}}>No exams scheduled.</div>}
            {filteredExams.map((exam,i)=>(
              <div className="designing-upcoming-card" key={i}>
                <div style={{fontWeight:600}}>{exam.title}</div>
                <div style={{fontSize:13}}>{exam.date} {exam.time}</div>
                <div style={{fontSize:13}}>Course: {exam.course}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Upload Question Paper Section */}
      <section className="designing-upload-section">
        <div className="designing-upload-label">Upload Question Paper</div>
        {currentUser && (currentUser.role === 'trainer' || currentUser.role === 'manager') && (
          <button className="designing-upload-btn" onClick={()=>setShowAddExam(true)} type="button">Upload New Exam</button>
        )}
        <div style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Supported formats: PDF, DOC, DOCX (Max: 10MB)</div>
      </section>
      {/* Add Exam Modal */}
      {showAddExam && currentUser && (currentUser.role === 'trainer' || currentUser.role === 'manager') && (
        <div className="designing-modal-bg">
          <div className="designing-modal">
            <button className="designing-modal-close" onClick={()=>setShowAddExam(false)}>&times;</button>
            <div style={{fontWeight:600,fontSize:18,marginBottom:18}}>Upload New Exam</div>
            <form onSubmit={handleAddExam}>
              <div className="mb-3">
                <label>Exam Title</label>
                <input className="form-control" value={newExam.title} onChange={e=>setNewExam({...newExam,title:e.target.value})} />
                {examErrors.title && <div style={{color:'red',fontSize:13}}>{examErrors.title}</div>}
              </div>
              <div className="mb-3">
                <label>Date</label>
                <input type="date" className="form-control" value={newExam.date} onChange={e=>setNewExam({...newExam,date:e.target.value})} />
                {examErrors.date && <div style={{color:'red',fontSize:13}}>{examErrors.date}</div>}
              </div>
              <div className="mb-3">
                <label>Time</label>
                <input type="time" className="form-control" value={newExam.time} onChange={e=>setNewExam({...newExam,time:e.target.value})} />
                {examErrors.time && <div style={{color:'red',fontSize:13}}>{examErrors.time}</div>}
              </div>
              <div className="mb-3">
                <label>Duration (mins)</label>
                <input type="number" className="form-control" value={newExam.duration} onChange={e=>setNewExam({...newExam,duration:e.target.value})} />
                {examErrors.duration && <div style={{color:'red',fontSize:13}}>{examErrors.duration}</div>}
              </div>
              <div className="mb-3">
                <label>Course</label>
                <select className="form-control" value={newExam.course} onChange={e=>setNewExam({...newExam,course:e.target.value})}>
                  <option value="">Select Course</option>
                  <option value="Python Full Stack">Python Full Stack</option>
                  <option value="Data Analytics">Data Analytics</option>
                </select>
                {examErrors.course && <div style={{color:'red',fontSize:13}}>{examErrors.course}</div>}
              </div>
              <div className="mb-3">
                <label>File</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={e=>setNewExam({...newExam,file:e.target.files[0]})} />
                {examErrors.file && <div style={{color:'red',fontSize:13}}>{examErrors.file}</div>}
              </div>
              <div style={{textAlign:'center'}}>
                <button type="submit" className="designing-btn designing-btn-add">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Add Trainee Modal */}
      {showAddTrainee && currentUser && (currentUser.role === 'trainer' || currentUser.role === 'manager') && (
        <div className="designing-modal-bg">
          <div className="designing-modal">
            <button className="designing-modal-close" onClick={()=>setShowAddTrainee(false)}>&times;</button>
            <div style={{fontWeight:600,fontSize:18,marginBottom:18}}>Add Trainee</div>
            <form onSubmit={handleAddTrainee}>
              <div className="mb-3">
                <label>Name</label>
                <input className="form-control" value={newTrainee.name} onChange={e=>setNewTrainee({...newTrainee,name:e.target.value})} />
                {errors.name && <div style={{color:'red',fontSize:13}}>{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input className="form-control" value={newTrainee.email} onChange={e=>setNewTrainee({...newTrainee,email:e.target.value})} />
                {errors.email && <div style={{color:'red',fontSize:13}}>{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input className="form-control" type="password" value={newTrainee.password} onChange={e=>setNewTrainee({...newTrainee,password:e.target.value})} />
                {errors.password && <div style={{color:'red',fontSize:13}}>{errors.password}</div>}
              </div>
              <div className="mb-3">
                <label>Course</label>
                <select className="form-control" value={newTrainee.course} onChange={e=>setNewTrainee({...newTrainee,course:e.target.value})}>
                  <option value="">Select Course</option>
                  <option value="Python Full Stack">Python Full Stack</option>
                  <option value="Data Analytics">Data Analytics</option>
                </select>
                {errors.course && <div style={{color:'red',fontSize:13}}>{errors.course}</div>}
              </div>
              <div className="mb-3">
                <label>Class Mode</label>
                <div style={{display:'flex',gap:18,marginTop:6}}>
                  <label><input type="radio" name="classMode" value="Online" checked={newTrainee.classMode==='Online'} onChange={e=>setNewTrainee({...newTrainee,classMode:e.target.value})}/> Online</label>
                  <label><input type="radio" name="classMode" value="Offline" checked={newTrainee.classMode==='Offline'} onChange={e=>setNewTrainee({...newTrainee,classMode:e.target.value})}/> Offline</label>
                </div>
                {errors.classMode && <div style={{color:'red',fontSize:13}}>{errors.classMode}</div>}
              </div>
              <div style={{textAlign:'center'}}>
                <button type="submit" className="designing-btn designing-btn-add">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Filter Modal */}
      {/* Filter Modal for Development page */}
      <FilterModal
        visible={showFilter && currentUser && (currentUser.role === 'trainer' || currentUser.role === 'manager')}
        filter={filter}
        setFilter={setFilter}
        onSubmit={e => {
          e.preventDefault();
          navigate('/filter', { state: { filter, context: 'development' } });
          setShowFilter(false);
        }}
        onClose={() => setShowFilter(false)}
        courses={['Python Full Stack', 'Data Analytics']}
        trainees={users.filter(u => u.role === 'trainee' && (u.course === 'Python Full Stack' || u.course === 'Data Analytics'))}
      />
    </div>
  );
};

export default Development;
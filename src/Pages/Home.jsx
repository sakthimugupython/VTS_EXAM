import React, { useState, useEffect } from 'react';
import '../assets/CSS/Home.css';



function Home() {
  const [totalTrainees, setTotalTrainees] = useState(0);
  const [trainers, setTrainers] = useState([]);
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [newTrainer, setNewTrainer] = useState({ name: '', email: '', password: '', course: '' });

  function handleAddTrainer(e) {
    e.preventDefault();
    // Simple validation for duplicate email
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === newTrainer.email)) {
      alert('Email already exists!');
      return;
    }
    const updatedUsers = [...users, { ...newTrainer, role: 'trainer' }];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setTrainers(updatedUsers.filter(u => u.role === 'trainer'));
    setShowAddTrainer(false);
    setNewTrainer({ name: '', email: '', password: '', course: '' });
  }

const [upcomingExams, setUpcomingExams] = useState(() => {
  const stored = localStorage.getItem('exams');
  if (stored) return JSON.parse(stored);
  return [];
});
const [showAddExam, setShowAddExam] = useState(false);
const [newExam, setNewExam] = useState({ title: '', date: '', time: '', duration: '', file: null, fileUrl: '' });
const [editExamIdx, setEditExamIdx] = useState(null);

function handleAddExam(e) {
  e.preventDefault();
  if (!newExam.title || !newExam.date || !newExam.time || !newExam.duration || !newExam.fileUrl) {
    alert('All fields are required and file must be PDF.');
    return;
  }
  if (editExamIdx !== null) {
    // Edit mode
    const updated = [...upcomingExams];
    updated[editExamIdx] = newExam;
    setUpcomingExams(updated);
    localStorage.setItem('exams', JSON.stringify(updated));
    setEditExamIdx(null);
  } else {
    // Add mode
    const updatedExams = [...upcomingExams, newExam];
    setUpcomingExams(updatedExams);
    localStorage.setItem('exams', JSON.stringify(updatedExams));
  }
  setShowAddExam(false);
  setNewExam({ title: '', date: '', time: '', duration: '', file: null, fileUrl: '' });
}

function handleEditExam(idx) {
  setEditExamIdx(idx);
  setNewExam(upcomingExams[idx]);
  setShowAddExam(true);
}


function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
}

function getFormattedDate() {
  const now = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  return `It's ${day} ${date} ${month} ${year}`;
}

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const traineeCount = users.filter(u => u.role === 'trainee').length;
    setTotalTrainees(traineeCount);
    setTrainers(users.filter(u => u.role === 'trainer'));
  }, []);

  return (
    <div>
      <div className="home-header d-flex justify-content-between align-items-center">
        <div>
        <h2 className='fs-3 fw-semibold'>{getGreeting()}</h2>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>{getFormattedDate()}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input type="text" placeholder="Search" className='form-control' style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #dadada',width: '400px'}} />
          </div>
          <div style={{display: 'flex', gap: 18, alignItems: 'center' }}>
            <span role="img" aria-label="bell" style={{ fontSize: 24 }}>🔔</span>
            <div
  onClick={() => {
    localStorage.removeItem('loggedInEmail');
    window.location.href = '/';
  }}
  style={{
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#d9f24b',
    color: '#222',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    cursor: 'pointer',
    boxShadow: '0 1px 4px #bbb',
    userSelect: 'none',
  }}
  title="Profile / Logout"
>
  {localStorage.getItem('loggedInEmail') ? localStorage.getItem('loggedInEmail')[0].toUpperCase() : 'U'}
</div>
          </div>
        </div>

      <div className="stats-row">
        <div className="stats-card" style={{ background: '#fef3c7' }}>
          <span className="stats-label">Total Trainees</span>
          <span className="stats-value">{totalTrainees}</span>
        </div>
        <div className="stats-card" style={{ background: '#aedab6' }}>
          <span className="stats-label">Active Courses</span>
          <span className="stats-value">3</span>
        </div>
        <div className="stats-card" style={{ background: '#e555c6' }}>
          <span className="stats-label">Upcoming Exams</span>
          <span className="stats-value">{upcomingExams.length}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
        <section className="trainers-section" style={{ flex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Active Trainers</h3>
            <a href="#" style={{ fontSize: 14, color: '#2b7a29' }}>View All</a>
          </div>
          <div className="trainers-list">
            {trainers.map((t, idx) => (
              <div className="trainer-card" key={t.email || idx}>
                <div
                  className="trainer-avatar"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#d9f24b',
                    color: '#222',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    marginRight: 12,
                    boxShadow: '0 1px 4px #bbb',
                    userSelect: 'none',
                  }}
                  title={t.name}
                >
                  {t.name && t.name[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{t.name}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>{t.role}</div>
                </div>
                {/* You can show course or other info here if needed */}
              </div>
            ))}
            {(() => {
              const users = JSON.parse(localStorage.getItem('users') || '[]');
              const loggedInEmail = localStorage.getItem('loggedInEmail');
              const currentUser = users.find(u => u.email === loggedInEmail);
              if (currentUser && currentUser.role === 'manager') {
                return (
                  <>
                    <button
                      className="upload-btn"
                      style={{ alignSelf: 'flex-end', marginTop: 8 }}
                      onClick={() => setShowAddTrainer(true)}
                    >
                      + Add New
                    </button>
                  </>
                );
              }
              return null;
            })()}

            {/* Add Trainer Modal */}
            {showAddTrainer && (
              <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
              }}>
                <div style={{ background: '#fff', padding: 24, borderRadius: 12, minWidth: 340, boxShadow: '0 2px 16px #bbb', position: 'relative' }}>
                  <h4>Add New Trainer</h4>
                  <form onSubmit={handleAddTrainer}>
                    <div className="mb-2">
                      <label>Name</label>
                      <input type="text" className="form-control" value={newTrainer.name} onChange={e => setNewTrainer({ ...newTrainer, name: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                      <label>Email</label>
                      <input type="email" className="form-control" value={newTrainer.email} onChange={e => setNewTrainer({ ...newTrainer, email: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                      <label>Password</label>
                      <input type="password" className="form-control" value={newTrainer.password} onChange={e => setNewTrainer({ ...newTrainer, password: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                      <label>Course</label>
                      <select className="form-control" value={newTrainer.course} onChange={e => setNewTrainer({ ...newTrainer, course: e.target.value })} required>
                        <option value="">Select Course</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Python Full Stack">Python Full Stack</option>
                        <option value="Data Analytics">Data Analytics</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddTrainer(false)}>Cancel</button>
                      <button type="submit" className="btn btn-success">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </section>
        <section className="upcoming-section" style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Upcoming Exams</h3>
            {(() => {
              const users = JSON.parse(localStorage.getItem('users') || '[]');
              const loggedInEmail = localStorage.getItem('loggedInEmail');
              const currentUser = users.find(u => u.email === loggedInEmail);
              if (currentUser && (currentUser.role === 'manager' || currentUser.role === 'trainer')) {
                return (
                  <button className="upload-btn" onClick={() => setShowAddExam(true)}>Upload New Exam</button>
                );
              }
              return null;
            })()}

          </div>
          <div className="upcoming-list">
            {upcomingExams.map((exam, idx) => {
              const users = JSON.parse(localStorage.getItem('users') || '[]');
              const loggedInEmail = localStorage.getItem('loggedInEmail');
              const currentUser = users.find(u => u.email === loggedInEmail);
              const canEdit = currentUser && (currentUser.role === 'manager' || currentUser.role === 'trainer');
              return (
                <div className="upcoming-card" key={exam.title + idx}>
                  <div style={{ fontWeight: 600 }}>{exam.title}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>Duration: {exam.duration}</div>
                  <div style={{ color: '#888', fontSize: 13 }}>{exam.course && `Course: ${exam.course}`}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 2 }}>
                    <span>{exam.date}</span>
                    <span>{exam.time}</span>
                  </div>
                  {exam.file && currentUser && currentUser.role !== 'trainee' && (
                    <a href={exam.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#2b7a29', marginTop: 4 }}>View Question Paper</a>
                  )}
                  {canEdit && (
                    <button className="btn btn-sm btn-warning mt-2" style={{ fontSize: 12 }} onClick={() => handleEditExam(idx)}>Edit</button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Exam Modal */}
          {showAddExam && (() => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const loggedInEmail = localStorage.getItem('loggedInEmail');
            const currentUser = users.find(u => u.email === loggedInEmail);
            if (!currentUser || currentUser.role === 'trainee') return null;
            return (
              <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
              }}>
                <div style={{ background: '#fff', padding: 24, borderRadius: 12, minWidth: 340, boxShadow: '0 2px 16px #bbb', position: 'relative' }}>
                  <h4>{editExamIdx !== null ? 'Edit Exam' : 'Upload New Exam'}</h4>
                  <form onSubmit={handleAddExam}>
                    <div className="mb-2">
                      <label>Title</label>
                      <input type="text" className="form-control" value={newExam.title} onChange={e => setNewExam({ ...newExam, title: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                      <label>Date</label>
                      <input type="date" className="form-control" value={newExam.date} onChange={e => setNewExam({ ...newExam, date: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                      <label>Time</label>
                      <input type="time" className="form-control" value={newExam.time} onChange={e => setNewExam({ ...newExam, time: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                      <label>Duration</label>
                      <input type="text" className="form-control" value={newExam.duration} onChange={e => setNewExam({ ...newExam, duration: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                      <label>Course</label>
                      <div style={{display:'flex',gap:18,marginTop:6}}>
                        <label><input type="radio" name="examCourse" value="UI/UX" checked={newExam.course==='UI/UX'} onChange={e=>setNewExam({...newExam,course:e.target.value})} required/> UI/UX</label>
                        <label><input type="radio" name="examCourse" value="Python Full Stack" checked={newExam.course==='Python Full Stack'} onChange={e=>setNewExam({...newExam,course:e.target.value})}/> Python Full Stack</label>
                        <label><input type="radio" name="examCourse" value="Data Analytics" checked={newExam.course==='Data Analytics'} onChange={e=>setNewExam({...newExam,course:e.target.value})}/> Data Analytics</label>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label>Question Paper (PDF)</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="form-control"
                        onChange={e => {
                          const file = e.target.files[0];
                          if (file && file.type === 'application/pdf') {
                            const reader = new FileReader();
                            reader.onload = ev => {
                              setNewExam(prev => ({ ...prev, file, fileUrl: ev.target.result }));
                            };
                            reader.readAsDataURL(file);
                          } else {
                            setNewExam(prev => ({ ...prev, file: null, fileUrl: '' }));
                          }
                        }}
                        required={editExamIdx === null && !newExam.fileUrl}
                      />
                      {newExam.fileUrl && (
                        <div style={{ marginTop: 4 }}>
                          <a href={newExam.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#2b7a29' }}>Current PDF</a>
                          <span style={{ fontSize: 12, marginLeft: 8, color: '#888' }}>(Choose a new file to replace)</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => { setShowAddExam(false); setEditExamIdx(null); }}>Cancel</button>
                      <button type="submit" className="btn btn-success">{editExamIdx !== null ? 'Update' : 'Upload'}</button>
                    </div>
                  </form>
                </div>
              </div>
            );
          })()}


        </section>
      </div>

      {(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        const currentUser = users.find(u => u.email === loggedInEmail);
        if (!currentUser || currentUser.role === 'trainee') return null;
        return (
          <section className="upload-section">
            <div className="upload-label">Upload Question Paper</div>
            <label htmlFor="file-upload" className="upload-btn">Browse Files</label>
            <input id="file-upload" type="file" accept=".pdf,.doc,.docx" />
            <div style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Supported formats: PDF, DOC, DOCX (Max: 10MB)</div>
          </section>
        );
      })()}

    </div>
  );
}

export default Home;
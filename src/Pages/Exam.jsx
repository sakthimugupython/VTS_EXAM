import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
  // Get current user
  const users = useMemo(() => JSON.parse(localStorage.getItem('users') || '[]'), []);
  const exams = useMemo(() => JSON.parse(localStorage.getItem('exams') || '[]'), []);
  const loggedEmail = localStorage.getItem('loggedInEmail');
  const currentUser = users.find(u => u.email === loggedEmail);

  if (!currentUser) {
    return <div style={{padding: 32, color: '#888'}}>Login to view upcoming exams.</div>;
  }

  // Exams to show: trainees see only their course, managers/trainers see all
  let examsToShow = exams;
  if (currentUser.role === 'trainee') {
    examsToShow = exams.filter(exam => exam.course === currentUser.course);
  }

  // Group exams by type
  const technicalExams = examsToShow.filter(e => /technical/i.test(e.title));
  const practicalExams = examsToShow.filter(e => !/technical/i.test(e.title));

  // Helper for date/time formatting
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      const [h, m] = timeStr.split(':');
      const hour = parseInt(h, 10);
      const min = parseInt(m, 10);
      let ampm = 'AM';
      let hour12 = hour;
      if (hour >= 12) { ampm = 'PM'; hour12 = hour === 12 ? 12 : hour - 12; }
      if (hour === 0) hour12 = 12;
      return `${hour12}:${min.toString().padStart(2, '0')} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  // Card component
  const navigate = useNavigate();
  const ExamCard = ({exam, onEdit, onDelete, navigate}) => (
    <div style={{
      border: '1px solid #b8e86b',
      borderRadius: 8,
      background: '#fff',
      margin: '10px 0',
      padding: '12px 18px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 6px #e7f7c8',
      fontFamily: 'inherit'
    }}>
      <div>
        <div style={{fontWeight:600, fontSize:15}}>{exam.title}</div>
        <div style={{fontSize:13, color:'#7c7c7c'}}>Duration: {exam.duration || 'N/A'}</div>
      </div>
      <div style={{textAlign:'right'}}>
        <div style={{fontWeight:600, fontSize:13}}>{formatDate(exam.date)}</div>
        <div style={{fontSize:13}}>{formatTime(exam.time)}</div>
        {currentUser.role === 'trainee' && (
          localStorage.getItem('examSubmitted') === 'true' ? (
            <div style={{marginTop:8, color:'#3a3a3a', fontWeight:600, background:'#eaf8b8', borderRadius:6, padding:'6px 18px', fontSize:15}}>
              Thank you for submitting
            </div>
          ) : (
            <button
              style={{marginTop:6, background:'#222', color:'#fff', border:'none', borderRadius:6, padding:'4px 14px', fontSize:13, cursor:'pointer', fontWeight:500}}
              onClick={() => navigate('/question', { state: { examTitle: exam.title } })}
            >
              Start a Exam
            </button>
          )
        )}
        {(currentUser.role === 'manager' || currentUser.role === 'trainer') && (
          <div style={{marginTop:6, display:'flex', gap:8, justifyContent:'flex-end'}}>
            <button style={{background:'#d8f275', color:'#222', border:'1px solid #b8e86b', borderRadius:6, padding:'4px 12px', fontSize:13, cursor:'pointer', fontWeight:500}} onClick={()=>onEdit(exam)}>Edit</button>
            <button style={{background:'#fff', color:'#d00', border:'1px solid #d00', borderRadius:6, padding:'4px 12px', fontSize:13, cursor:'pointer', fontWeight:500}} onClick={()=>onDelete(exam)}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );

  // Modal state for add/edit
  const [showModal, setShowModal] = React.useState(false);
  const [editExam, setEditExam] = React.useState(null);
  const [form, setForm] = React.useState({ title: '', date: '', time: '', duration: '', course: '' });
  const [err, setErr] = React.useState({});

  // Open modal for add/edit
  const handleEdit = (exam) => {
    setEditExam(exam);
    setForm({ ...exam });
    setShowModal(true);
  };
  const handleAdd = () => {
    setEditExam(null);
    setForm({ title: '', date: '', time: '', duration: '', course: '' });
    setShowModal(true);
  };
  const handleDelete = (exam) => {
    if (window.confirm('Delete this exam?')) {
      const updated = exams.filter(e => e !== exam);
      localStorage.setItem('exams', JSON.stringify(updated));
      window.location.reload();
    }
  };
  const handleModalSubmit = (e) => {
    e.preventDefault();
    let errs = {};
    if (!form.title) errs.title = 'Title required';
    if (!form.date) errs.date = 'Date required';
    if (!form.time) errs.time = 'Time required';
    if (!form.duration) errs.duration = 'Duration required';
    if (!form.course) errs.course = 'Course required';
    setErr(errs);
    if (Object.keys(errs).length > 0) return;
    let updated;
    if (editExam) {
      updated = exams.map(e => e === editExam ? { ...form } : e);
    } else {
      updated = [...exams, { ...form }];
    }
    localStorage.setItem('exams', JSON.stringify(updated));
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div style={{padding: 24, fontFamily:'inherit'}}>
      <h2 style={{fontWeight:700, fontSize:22}}>Upcoming Exams</h2>
      {(currentUser.role === 'manager' || currentUser.role === 'trainer') && (
        <button style={{background:'#222',color:'#fff',border:'none',borderRadius:8,padding:'8px 24px',fontWeight:600,marginBottom:16}} onClick={handleAdd}>Upload New Exam</button>
      )}
      <div style={{background:'#d8f275', borderRadius:12, padding:24, marginTop:8, maxWidth:800}}>
        {/* Technical Questions */}
        <div style={{fontWeight:600, marginBottom:10}}>Technical Questions</div>
        {technicalExams.length === 0 ? (
          <div style={{color:'#888', fontSize:14, marginBottom:16}}>No technical exams scheduled.</div>
        ) : technicalExams.map((exam,i) => (
          <ExamCard exam={exam} key={i} onEdit={handleEdit} onDelete={handleDelete} navigate={navigate} />
        ))}
        {/* Practical Questions */}
        <div style={{fontWeight:600, marginTop:28, marginBottom:10}}>Practical Questions</div>
        {practicalExams.length === 0 ? (
          <div style={{color:'#888', fontSize:14}}>No practical exams scheduled.</div>
        ) : practicalExams.map((exam,i) => (
          <ExamCard exam={exam} key={i} onEdit={handleEdit} onDelete={handleDelete} navigate={navigate} />
        ))}
      </div>

      {/* Modal for add/edit exam */}
      {showModal && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.2)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'#fff',borderRadius:12,padding:32,minWidth:320,maxWidth:400,boxShadow:'0 2px 16px #eaeaea',position:'relative'}}>
            <button onClick={()=>setShowModal(false)} style={{position:'absolute',top:8,right:12,fontSize:20,border:'none',background:'none',cursor:'pointer'}}>&times;</button>
            <div style={{fontWeight:600,fontSize:18,marginBottom:18}}>{editExam ? 'Edit Exam' : 'Upload New Exam'}</div>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-3">
                <label>Exam Title</label>
                <input className="form-control" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
                {err.title && <div style={{color:'red',fontSize:13}}>{err.title}</div>}
              </div>
              <div className="mb-3">
                <label>Date</label>
                <input type="date" className="form-control" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
                {err.date && <div style={{color:'red',fontSize:13}}>{err.date}</div>}
              </div>
              <div className="mb-3">
                <label>Time</label>
                <input type="time" className="form-control" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} />
                {err.time && <div style={{color:'red',fontSize:13}}>{err.time}</div>}
              </div>
              <div className="mb-3">
                <label>Duration</label>
                <input className="form-control" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} />
                {err.duration && <div style={{color:'red',fontSize:13}}>{err.duration}</div>}
              </div>
              <div className="mb-3">
                <label>Course</label>
                <input className="form-control" value={form.course} onChange={e=>setForm({...form,course:e.target.value})} />
                {err.course && <div style={{color:'red',fontSize:13}}>{err.course}</div>}
              </div>
              <div style={{textAlign:'center'}}>
                <button type="submit" style={{background:'#222',color:'#fff',border:'none',borderRadius:6,padding:'8px 28px',fontWeight:600,fontSize:15}}>{editExam ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;

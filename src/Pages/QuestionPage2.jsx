import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QUESTIONS2 = [
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
];

const QuestionPage2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const examTitle = location.state?.examTitle || 'Exam Questions';
  const [answers, setAnswers] = React.useState(() => {
    const saved = localStorage.getItem('examAnswersPage2');
    return saved ? JSON.parse(saved) : Array(QUESTIONS2.length).fill('');
  });

  const handleChange = (idx, val) => {
    const newAns = [...answers];
    newAns[idx] = val;
    setAnswers(newAns);
  };

  const handlePrevious = () => {
    localStorage.setItem('examAnswersPage2', JSON.stringify(answers));
    navigate('/question', { state: { examTitle } });
  };

  const handleSubmit = () => {
    localStorage.setItem('examAnswersPage2', JSON.stringify(answers));
    const page1 = JSON.parse(localStorage.getItem('examAnswersPage1') || '[]');
    const page2 = answers;
    const allAnswers = [...page1, ...page2];
    localStorage.setItem('examAnswersAll', JSON.stringify(allAnswers));
    localStorage.setItem('examSubmitted', 'true');
    navigate('/thank', { state: { examTitle } });
  };

  return (
    <div style={{padding: 24, fontFamily:'inherit'}}>
      <h2 style={{textAlign:'center', fontWeight:700, marginBottom:28}}>{examTitle}</h2>
      <div style={{background:'#eaf8b8', borderRadius:12, padding:32, maxWidth:700, margin:'0 auto'}}>
        {QUESTIONS2.map((q, i) => (
          <div key={i} style={{marginBottom:18, fontSize:18, fontWeight:500}}>
            <div style={{marginBottom:8}}>{i+6}. {q.q}</div>
            <div style={{display:'flex', gap:32, marginLeft:24}}>
              {q.options.map(opt => (
                <label key={opt} style={{fontSize:17, fontWeight:400}}>
                  <input
                    type="radio"
                    name={`q${i+6}`}
                    value={opt}
                    checked={answers[i] === opt}
                    onChange={() => handleChange(i, opt)}
                    style={{marginRight:8, accentColor:'#222'}}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div style={{display:'flex', justifyContent:'center', gap:18, marginTop:32}}>
          <button onClick={handlePrevious} style={{background:'#181a2b', color:'#fff', border:'none', borderRadius:6, padding:'8px 30px', fontWeight:600, fontSize:17, cursor:'pointer'}}>Previous</button>
          <button onClick={handleSubmit} style={{background:'#d8f275', color:'#222', border:'none', borderRadius:6, padding:'8px 30px', fontWeight:600, fontSize:17, cursor:'pointer'}}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage2;

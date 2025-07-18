import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const QUESTIONS = [
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
  { q: 'where label text can be aligned ?', options: ['Top', 'Right', 'Center', 'Left'] },
];

const Question = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const examTitle = location.state?.examTitle || 'Exam Questions';
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(''));

  const handleChange = (idx, val) => {
    const newAns = [...answers];
    newAns[idx] = val;
    setAnswers(newAns);
  };

  const handleNext = () => {
    navigate('/question2', { state: { examTitle } });
  };

  return (
    <div style={{padding: 2, fontFamily:'inherit'}}>
      <h2 style={{textAlign:'center', fontWeight:700, marginBottom:28}}>{examTitle}</h2>
      <div style={{background:'#eaf8b8', borderRadius:12, padding:32, maxWidth:700, margin:'0 auto'}}>
        {QUESTIONS.map((q, i) => (
          <div key={i} style={{marginBottom:18, fontSize:18, fontWeight:500}}>
            <div style={{marginBottom:8}}>{i+1}. {q.q}</div>
            <div style={{display:'flex', gap:32, marginLeft:24}}>
              {q.options.map(opt => (
                <label key={opt} style={{fontSize:17, fontWeight:400}}>
                  <input
                    type="radio"
                    name={`q${i}`}
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
          <button onClick={handleNext} style={{background:'#d8f275', color:'#222', border:'none', borderRadius:6, padding:'8px 30px', fontWeight:600, fontSize:17, cursor:'pointer'}}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Question;

import React from 'react';

const summary = [
  { label: 'Total Trainees', value: 15 },
  { label: 'Total Marks', value: 100 },
  { label: 'No of Student Present', value: 10 },
  { label: 'No of Student Absent', value: 5 },
];

const results = [
  { name: 'Kavya', trainer: 'Priya', technical: 20, practical: 40, total: 60 },
  { name: 'Diya', trainer: 'Priya', technical: 10, practical: 50, total: 60 },
  { name: 'Geetha', trainer: 'Priya', technical: 15, practical: 45, total: 55 },
  { name: 'keerthi', trainer: 'Priya', technical: 10, practical: 60, total: 70 },
  { name: 'Sujitha', trainer: 'Priya', technical: 20, practical: 30, total: 50 },
  { name: 'Ramu', trainer: 'Priya', technical: 25, practical: 60, total: 85 },
  { name: 'Ram', trainer: 'Priya', technical: 15, practical: 30, total: 45 },
];

const Result = () => {
  return (
    <div style={{padding:32, fontFamily:'inherit'}}>
      {/* Summary cards */}
      <div style={{display:'flex', gap:32, marginBottom:36}}>
        {summary.map((item, idx) => (
          <div key={idx} style={{background:'#eaf8b8', borderRadius:8, minWidth:170, padding:'18px 0', textAlign:'center', boxShadow:'0 1px 6px #e7f7c8'}}>
            <div style={{fontWeight:600, fontSize:18, marginBottom:8}}>{item.label}</div>
            <div style={{fontSize:28, fontWeight:700, color:'#333'}}>{item.value}</div>
          </div>
        ))}
      </div>
      {/* Results Table */}
      <div style={{background:'#222', borderRadius:'10px 10px 0 0', color:'#fff', fontWeight:600, fontSize:17, display:'flex', alignItems:'center', padding:'14px 0', maxWidth:900}}>
        <div style={{width:50, textAlign:'center'}}>S.no</div>
        <div style={{flex:1}}>Trainee's Name</div>
        <div style={{flex:1}}>Trainer Name</div>
        <div style={{width:160, textAlign:'center'}}>Technical Marks<br/>(Out of 30)</div>
        <div style={{width:180, textAlign:'center'}}>Practical Marks<br/>(Out of 70)</div>
        <div style={{width:120, textAlign:'center'}}>Total Marks</div>
      </div>
      <div style={{background:'#eaf8b8', borderRadius:'0 0 10px 10px', maxWidth:900, marginBottom:24}}>
        {results.map((row, i) => (
          <div key={i} style={{display:'flex', alignItems:'center', padding:'11px 0', fontSize:17, fontWeight:500, borderBottom: i===results.length-1?'none':'1px solid #d8f275', color:'#222'}}>
            <div style={{width:50, textAlign:'center', fontWeight:700}}>{i+1}.</div>
            <div style={{flex:1, fontWeight:600}}>{row.name}</div>
            <div style={{flex:1}}>{row.trainer}</div>
            <div style={{width:160, textAlign:'center'}}>{row.technical}</div>
            <div style={{width:180, textAlign:'center'}}>{row.practical}</div>
            <div style={{width:120, textAlign:'center', fontWeight:700}}>{row.total}</div>
          </div>
        ))}
      </div>
      {/* Buttons */}
      <div style={{display:'flex', gap:22, justifyContent:'center'}}>
        <button style={{background:'#181a2b', color:'#fff', border:'none', borderRadius:6, padding:'8px 34px', fontWeight:600, fontSize:17, cursor:'pointer'}}>Download</button>
        <button style={{background:'#d8f275', color:'#222', border:'none', borderRadius:6, padding:'8px 34px', fontWeight:600, fontSize:17, cursor:'pointer'}}>Edit</button>
      </div>
    </div>
  );
};

export default Result;

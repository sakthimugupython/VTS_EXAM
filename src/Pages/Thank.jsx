import React from 'react';
import { useNavigate } from 'react-router-dom';
import thankimage from '../assets/images/success 1.png';

const Thank = () => {
  const navigate = useNavigate();
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'80vh'}}>
      <div style={{marginBottom:32}}>
       <img src={thankimage} alt="" />
      </div>
      <div style={{fontSize:26, fontWeight:500, textAlign:'center', marginBottom:28, color:'#212'}}>Thank You your response<br/>has been submitted</div>
      <button
        style={{background:'#d8f275', color:'#222', border:'none', borderRadius:6, padding:'10px 38px', fontWeight:700, fontSize:22, cursor:'pointer'}}
        onClick={()=>navigate('/result')}
      >
        Done
      </button>
    </div>
  );
};

export default Thank;

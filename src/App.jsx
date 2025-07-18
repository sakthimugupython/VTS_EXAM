import React from 'react'
import Register from './Pages/Register'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Designing from './Pages/Designing'
import Development from './Pages/Development'
import Exam from './Pages/Exam'
import Result from './Pages/Result'
import AppLayout from './Pages/AppLayout';
import FilterPage from './Pages/FilterPage';
import Question from './Pages/Question';  
import QuestionPage2 from './Pages/QuestionPage2';
import Thank from './Pages/Thank';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/designing" element={<Designing />} />
          <Route path="/development" element={<Development />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/result" element={<Result />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/question" element={<Question />} />
          <Route path="/question2" element={<QuestionPage2 />} />
          <Route path="/thank" element={<Thank />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
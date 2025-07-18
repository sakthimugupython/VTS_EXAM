import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import '../assets/CSS/Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    course: '',
    classMode: '', // Online/Offline for trainees
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!form.role) newErrors.role = 'Please select a role';
    if (form.role !== 'manager' && !form.course) newErrors.course = 'Please select a course';
    if (form.role === 'trainee' && !form.classMode) newErrors.classMode = 'Please select class mode';

    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClassModeChange = (e) => {
    setForm({ ...form, classMode: e.target.value });
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = users.some(u => u.email === form.email);
      if (emailExists) {
        setAlertMsg('Email already registered');
        setAlertType('danger');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1500);
        return;
      }
      users.push(form);
      localStorage.setItem('users', JSON.stringify(users));
      setAlertMsg('Registration successful! Redirecting to login...');
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/');
      }, 1000);
    }
  };

  return (
    <div className="register-bg d-flex align-items-center justify-content-center min-vh-100">
      <div className="card bg-transparent border-0 p-4 w-100" style={{maxWidth: 400}}>
        <h1 className="text-center mb-4">Register Page</h1>
        {showAlert && (
          <div className={`alert alert-${alertType} text-center`} role="alert">
            {alertMsg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold fs-5">Name</label>
            <input
              type="text"
              className={`form-control border-1 border-dark bg-transparent ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              placeholder="Enter your Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold fs-5">Email Address</label>
            <input
              type="email"
              className={`form-control border-1 border-dark bg-transparent ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              placeholder="Enter your Email Id"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold fs-5">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control border-1 border-dark bg-transparent ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={form.password}
                onChange={handleChange}
              />
              <span className="input-group-text bg-transparent border-1 border-dark" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(s => !s)}>
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label fw-semibold fs-5">Choose Role</label>
            <select
              className={`form-select border-1 border-dark bg-transparent ${errors.role ? 'is-invalid' : ''}`}
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="" className='bg-transparent'>Select</option>
              <option value="trainer">Trainer</option>
              <option value="trainee">Trainee</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          {form.role === 'trainee' && (
            <div className="mb-3">
              <label htmlFor="course" className="form-label fw-semibold fs-5">Select Course</label>
              <select
                className={`form-select border-1 border-dark bg-transparent ${errors.course ? 'is-invalid' : ''}`}
                id="course"
                name="course"
                value={form.course}
                onChange={handleChange}
              >
                <option value="" className='bg-transparent'>Select Course</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Python Full Stack">Python Full Stack</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
              {errors.course && <div className="invalid-feedback">{errors.course}</div>}
            </div>
          )}
          {form.role === 'trainer' && (
            <div className="mb-3">
              <label htmlFor="course" className="form-label fw-semibold fs-5">Select Course</label>
              <select
                className={`form-select border-1 border-dark bg-transparent ${errors.course ? 'is-invalid' : ''}`}
                id="course"
                name="course"
                value={form.course}
                onChange={handleChange}
              >
                <option value="" className='bg-transparent'>Select Course</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Python Full Stack">Python Full Stack</option>
                <option value="Data Analytics">Data Analytics</option>
              </select>
              {errors.course && <div className="invalid-feedback">{errors.course}</div>}
            </div>
          )}

          {/* Class Mode for Trainees */}
          {form.role === 'trainee' && (
            <div className="mb-3">
              <label className="form-label fw-semibold fs-5">Class Mode</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="classMode"
                    id="online"
                    value="Online"
                    checked={form.classMode === 'Online'}
                    onChange={handleClassModeChange}
                  />
                  <label className="form-check-label" htmlFor="online">Online</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="classMode"
                    id="offline"
                    value="Offline"
                    checked={form.classMode === 'Offline'}
                    onChange={handleClassModeChange}
                  />
                  <label className="form-check-label" htmlFor="offline">Offline</label>
                </div>
              </div>
              {errors.classMode && <div className="invalid-feedback d-block">{errors.classMode}</div>}
            </div>
          )}
          <div className="d-grid">
            <button type="submit" className="btn btn-success w-50 d-block mx-auto">Register</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <a href="/" className="text-primary fw-semibold" style={{ textDecoration: 'none' }}>Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages - Ensure all imports use .jsx extension
import Landing from './pages/Landing.jsx'; // NEW IMPORT for the public overview page
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import Profile from './pages/Profile.jsx';

// Components
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <Routes>
      
      {/* 1. Public Landing Page - Accessible at the root URL (/) */}
      <Route path="/" element={<Landing />} />

      {/* 2. Public Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* 3. Protected Application Routes */}
      {/* Routes nested inside PrivateRoute require the user to be logged in */}
      <Route element={<PrivateRoute />}>
        {/* We use specific paths for dashboard, profile, and courses now */}
        <Route path="dashboard" element={<Dashboard />} /> 
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* 4. 404 Not Found Fallback Route */}
      <Route path="*" element={
        <div className="auth-container">
          <h1 style={{color: 'var(--error-color)'}}>404: Page Not Found</h1>
        </div>
      } />
    </Routes>
  );
}

export default App;
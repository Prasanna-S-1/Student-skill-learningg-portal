import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper.jsx';
import CourseCard from '../components/CourseCard.jsx';
import { useAuth } from '../context/AuthContext';
import coursesData from '../data/courses.json';
import { FaGraduationCap, FaCalendarAlt, FaLayerGroup, FaSearch } from 'react-icons/fa';
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript, IoLogoReact } from 'react-icons/io5';


// --- Dashboard Specific Styles ---
const StatCardStyle = {
    backgroundColor: 'var(--card-bg)',
    padding: '20px',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--border-color)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s', // Added box-shadow/border-color transitions
    flex: '1 1 30%', 
};

const StatIcon = (color) => ({
    fontSize: '2rem',
    color: color,
    marginBottom: '10px'
});

const ProgressCardStyle = {
    backgroundColor: 'var(--card-bg)',
    padding: '20px',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border 0.3s, transform 0.3s, box-shadow 0.3s', // Added box-shadow transition
    height: '100%',
};

const ProgressBarContainer = {
    height: '8px',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '4px',
    marginTop: '5px',
    overflow: 'hidden'
};

const SearchInputStyle = {
    width: '100%',
    padding: '12px 15px',
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    marginBottom: '20px',
    outline: 'none',
    transition: 'border-color 0.3s',
};

const CategoryIcons = {
    HTML: { icon: IoLogoHtml5, color: '#e34f26' },
    CSS: { icon: IoLogoCss3, color: '#1572b6' },
    JavaScript: { icon: IoLogoJavascript, color: '#f7df1e' },
    React: { icon: IoLogoReact, color: '#61dafb' },
};

// --- Helper Component for Category Progress Card (Enhanced Glow) ---
const CategoryProgressCard = ({ category, completedCount, totalCount }) => {
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    const { icon: Icon, color } = CategoryIcons[category];
    const categoryGlow = `0 0 10px 1px ${color}50`; // Subtle glow based on category color

    const handleMouseEnter = (e) => {
        e.currentTarget.style.border = `1px solid ${color}`; 
        e.currentTarget.style.transform = 'translateY(-2px)'; 
        e.currentTarget.style.boxShadow = `0 8px 20px rgba(0, 0, 0, 0.5), ${categoryGlow}`; // Add glow
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.border = `1px solid var(--border-color)`;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)'; // Reset shadow
    };
    
    return (
        <div 
            style={ProgressCardStyle} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ 
                    backgroundColor: `${color}1A`,
                    borderRadius: '50%',
                    padding: '10px',
                    marginRight: '15px',
                    fontSize: '1.5rem',
                    color: color
                }}>
                    <Icon />
                </div>
                <div>
                    <h4 style={{ margin: 0, fontWeight: '700' }}>{category}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {completedCount} of {totalCount} completed
                    </p>
                </div>
            </div>
            
            <div style={ProgressBarContainer}>
                <div style={{ 
                    width: `${progress}%`, 
                    height: '100%', 
                    backgroundColor: color, 
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-in-out'
                }} />
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState(''); 
    
    // Define the global glow for stat cards
    const statGlowShadow = '0 0 10px var(--pulse-color)'; 
    const statBaseShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';

    // Handler for Stat Cards
    const handleStatMouseEnter = (e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'; // Slightly more lift
        e.currentTarget.style.boxShadow = `${statBaseShadow}, ${statGlowShadow}`; // Add neon glow
        e.currentTarget.style.borderColor = 'var(--accent-color)'; // Highlight border
    };
    const handleStatMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = statBaseShadow; // Reset shadow
        e.currentTarget.style.borderColor = 'var(--border-color)'; // Reset border
    };
    
    // --- Data Calculation ---
    const allCourses = coursesData;
    const totalCourses = allCourses.length;
    const totalCompletedLessons = user?.completedLessons?.length || 0;
    
    // Filter courses based on search term
    const filteredCourses = allCourses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = ['HTML', 'CSS', 'JavaScript', 'React'];
    
    // Calculate progress for each category
    const categoryProgress = categories.map(category => {
        const categoryCourses = allCourses.filter(c => c.category === category);
        const totalCount = categoryCourses.length;
        const completedCount = categoryCourses.filter(c => user?.completedLessons.includes(c.id)).length;
        return { category, completedCount, totalCount };
    });

    return (
        <PageWrapper>
            {/* Welcome Section */}
            <h1 style={{ marginBottom: '5px' }}>Welcome back, <span className='neon-accent'>{user?.username}</span></h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Continue your learning journey and master new skills.</p>
            
            {/* 1. Key Statistics Cards (with intense hover glow) */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <div 
                    style={StatCardStyle} 
                    onMouseEnter={handleStatMouseEnter} 
                    onMouseLeave={handleStatMouseLeave}
                >
                    <FaGraduationCap style={StatIcon('var(--success-color)')} />
                    <h2 style={{ fontSize: '2rem', margin: '5px 0' }}>{totalCompletedLessons}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Lessons Completed</p>
                </div>
                
                <div 
                    style={StatCardStyle} 
                    onMouseEnter={handleStatMouseEnter} 
                    onMouseLeave={handleStatMouseLeave}
                >
                    <FaCalendarAlt style={StatIcon('var(--gradient-end)')} />
                    <h2 style={{ fontSize: '2rem', margin: '5px 0' }}>{user?.lastLogin || 'N/A'}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Last Login</p>
                </div>
                
                <div 
                    style={StatCardStyle} 
                    onMouseEnter={handleStatMouseEnter} 
                    onMouseLeave={handleStatMouseLeave}
                >
                    <FaLayerGroup style={StatIcon('var(--accent-color)')} />
                    <h2 style={{ fontSize: '2rem', margin: '5px 0' }}>{totalCourses}</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Total Courses</p>
                </div>
            </div>
            
            {/* 2. Progress Section */}
            <h2 style={{ marginBottom: '20px' }}>Your Progress</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {categoryProgress.map(p => (
                    <CategoryProgressCard key={p.category} {...p} />
                ))}
            </div>

            {/* 3. All Courses Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>All Courses ({filteredCourses.length} found)</h2>
                <Link to="/courses" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>
                    View All &rarr;
                </Link>
            </div>
            
            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '30px' }}>
                 <FaSearch style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    style={{ 
                        ...SearchInputStyle, 
                        paddingLeft: '45px'
                    }} 
                />
            </div>
            
            {/* Course Grid (Show filtered courses, up to 3) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {filteredCourses.slice(0, 3).map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>

        </PageWrapper>
    );
};

export default Dashboard;
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper.jsx';
import coursesData from '../data/courses.json';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';

// --- Styling Definitions ---
const VideoContainerStyle = {
    position: 'relative',
    paddingBottom: '56.25%', 
    height: 0,
    overflow: 'hidden',
    borderRadius: 'var(--border-radius)',
    marginBottom: '30px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.4)'
};

const VideoIframeStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
};

const SectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    borderBottom: '2px solid var(--border-color)',
    paddingBottom: '10px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--accent-color)'
};

const CompletedButtonStyle = (isCompleted) => ({
    padding: '1rem 2rem',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    cursor: isCompleted ? 'default' : 'pointer',
    
    backgroundColor: isCompleted ? 'var(--success-color)' : 'var(--gradient-start)',
    color: 'var(--bg-color)',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: isCompleted ? '0 4px 15px rgba(76, 175, 80, 0.4)' : '0 4px 15px rgba(0, 188, 212, 0.4)'
});
// ------------------------------------

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user, markLessonCompleted } = useAuth();

    const course = useMemo(() => 
        coursesData.find(c => c.id === parseInt(courseId))
    , [courseId]);

    const isCompleted = useMemo(() => 
        user?.completedLessons?.includes(course?.id)
    , [user, course]);

    const handleComplete = () => {
        if (!isCompleted && course) {
            markLessonCompleted(course.id);
            alert(`Lesson "${course.title}" marked as completed!`);
        }
    };

    if (!course) {
        return (
            <PageWrapper>
                <h1 style={{ color: 'var(--error-color)' }}>404 - Course Not Found</h1>
                <p>The lesson you are looking for does not exist.</p>
                <button 
                    onClick={() => navigate('/courses')} 
                    className="btn-primary" 
                    style={{ padding: '0.75rem 1.5rem', marginTop: '20px' }}
                >
                    <FaArrowLeft style={{ marginRight: '10px' }} /> Back to Courses
                </button>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            {/* Back Button (with hover) */}
            <button 
                onClick={() => navigate('/courses')} 
                style={{ 
                    background: 'var(--card-bg)', 
                    color: 'var(--text-secondary)',
                    padding: '8px 15px', 
                    borderRadius: '8px', 
                    marginBottom: '20px',
                    border: '1px solid var(--border-color)',
                    transition: 'border-color 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-color)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
                <FaArrowLeft style={{ marginRight: '5px' }} /> Back to Courses
            </button>
            
            <h1 style={{ marginBottom: '5px' }}>{course.title}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Category: {course.category} | Duration: {course.duration}</p>

            {/* Video Player (YouTube Embed) */}
            <div style={VideoContainerStyle}>
                <iframe
                    title={course.title}
                    // Uses the correct /embed/ URL from courses.json
                    src={course.video} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={VideoIframeStyle}
                />
            </div>

            {/* Course Summary */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={SectionTitleStyle}><FaInfoCircle style={{ marginRight: '10px', fontSize: '1.2rem' }} /> Course Summary</h2>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>{course.summary}</p>
            </div>
            
            {/* Mark as Completed Button */}
            <button
                onClick={handleComplete}
                style={CompletedButtonStyle(isCompleted)}
                onMouseEnter={e => {
                    if (!isCompleted) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                }}
                onMouseLeave={e => {
                    if (!isCompleted) {
                        e.currentTarget.style.transform = 'translateY(0)';
                    }
                }}
                disabled={isCompleted}
            >
                <FaCheckCircle style={{ marginRight: '10px' }} />
                {isCompleted ? 'Lesson Completed!' : 'Mark as Completed'}
            </button>
            
            {isCompleted && (
                <p style={{ color: 'var(--success-color)', textAlign: 'center', marginTop: '10px' }}>
                    Great job! Your progress has been updated.
                </p>
            )}

        </PageWrapper>
    );
};

export default CourseDetail;
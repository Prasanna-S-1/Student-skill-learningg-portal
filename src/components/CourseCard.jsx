import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript, IoLogoReact } from 'react-icons/io5';

const CategoryInfo = {
    HTML: { color: '#e34f26', icon: IoLogoHtml5, label: 'HTML' },
    CSS: { color: '#1572b6', icon: IoLogoCss3, label: 'CSS' },
    JavaScript: { color: '#f7df1e', icon: IoLogoJavascript, label: 'JS' },
    React: { color: '#61dafb', icon: IoLogoReact, label: 'React' },
};

// --- Styling Definitions ---
const CardStyle = {
    backgroundColor: 'var(--card-bg)',
    borderRadius: 'var(--border-radius)',
    padding: '20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    // Combined transitions for smooth hover effect
    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), border 0.4s',
    border: '1px solid var(--border-color)', 
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const CardImagePlaceholder = ({ category }) => {
    const info = CategoryInfo[category] || { color: 'var(--accent-color)', icon: FaExternalLinkAlt };
    const Icon = info.icon;
    
    const imageStyle = {
        backgroundColor: info.color,
        width: '80px',
        height: '80px',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
        color: 'var(--bg-color)',
        marginBottom: '15px'
    };

    return (
        <div style={imageStyle}>
            <Icon />
        </div>
    );
};

const TitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: 'var(--text-primary)',
};

const DescriptionStyle = {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    marginBottom: '15px',
    flexGrow: 1,
};

const TagStyle = (color) => ({
    backgroundColor: color,
    color: 'var(--bg-color)',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'inline-block',
    marginRight: '10px'
});

const DurationStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
};

const ButtonStyle = {
    padding: '10px 15px',
    backgroundColor: 'var(--accent-color)',
    color: 'var(--bg-color)',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.9rem',
    marginTop: '10px',
    border: 'none',
    transition: 'background-color 0.3s',
};


const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const info = CategoryInfo[course.category];
    const categoryColor = info ? info.color : 'var(--accent-color)';
    const categoryLabel = info ? info.label : 'Course';
    
    const [isHovered, setIsHovered] = useState(false); 

    const handleViewLesson = () => {
        navigate(`/courses/${course.id}`);
    };

    // Premium Interactive Effects - Dynamic Style for unique color glow
    const dynamicCardStyle = {
        ...CardStyle,
        boxShadow: isHovered 
            ? `0 10px 20px rgba(0, 0, 0, 0.5), 0 0 15px 2px ${categoryColor}80` // Glow shadow based on category color
            : '0 4px 15px rgba(0, 0, 0, 0.3)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        border: isHovered ? `1px solid ${categoryColor}` : '1px solid var(--border-color)',
    };
    

    return (
        <div 
            style={dynamicCardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleViewLesson}
        >
            <CardImagePlaceholder category={course.category} />
            
            <div style={{ marginBottom: '10px' }}>
                <h3 style={TitleStyle}>{course.title}</h3>
                <p style={DescriptionStyle}>{course.description}</p>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={TagStyle(categoryColor)}>{categoryLabel}</span>
                    
                    <div style={DurationStyle}>
                        <FaClock style={{ marginRight: '5px' }} />
                        {course.duration}
                    </div>
                </div>
                
                <button 
                    onClick={(e) => { e.stopPropagation(); handleViewLesson(); }} 
                    style={ButtonStyle}
                >
                    <FaExternalLinkAlt style={{ marginRight: '5px' }} /> View Lesson
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
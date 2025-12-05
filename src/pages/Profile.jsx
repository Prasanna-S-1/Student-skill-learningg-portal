import React, { useMemo, useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper.jsx';
import { useAuth } from '../context/AuthContext';
import coursesData from '../data/courses.json';
import { FaCalendarAlt, FaLayerGroup, FaCamera } from 'react-icons/fa';
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript, IoLogoReact } from 'react-icons/io5';

// --- Styling Definitions ---
const ProfileHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--card-bg)',
    padding: '30px',
    borderRadius: 'var(--border-radius)',
    marginBottom: '40px',
    border: '1px solid var(--border-color)'
};

const UserAvatarContainer = {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginRight: '30px',
    overflow: 'hidden',
    border: '4px solid var(--accent-color)',
    boxShadow: '0 0 15px rgba(0, 188, 212, 0.4)',
    // Add flex alignment to hide the broken image icon text more reliably
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const UserAvatarImageStyle = {
    width: '100%', 
    height: '100%', 
    objectFit: 'cover',
    // Setting display block and max size can help hide error icons
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    fontSize: '0', // Hide broken link text in some browsers
};

const ChangePhotoOverlay = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%', // Make overlay cover entire area to hide text
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'var(--text-primary)',
    textAlign: 'center',
    paddingTop: '45px', // Center the text roughly
    fontSize: '0.9rem',
    cursor: 'pointer',
    opacity: 0,
    transition: 'opacity 0.3s',
};

const UserInfoStats = {
    display: 'flex',
    gap: '20px',
    marginTop: '15px'
};

const StatBoxStyle = {
    backgroundColor: 'var(--bg-color)',
    padding: '10px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid var(--border-color)',
};

const ProgressCardStyle = {
    backgroundColor: 'var(--card-bg)',
    padding: '20px',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border 0.3s, transform 0.3s',
    height: '100%',
};

const CategoryIcons = {
    HTML: { icon: IoLogoHtml5, color: '#e34f26' },
    CSS: { icon: IoLogoCss3, color: '#1572b6' },
    JavaScript: { icon: IoLogoJavascript, color: '#f7df1e' },
    React: { icon: IoLogoReact, color: '#61dafb' },
};

const ProgressBarContainer = {
    height: '8px',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '4px',
    marginTop: '5px',
    overflow: 'hidden'
};

const CategoryProgressCard = ({ category, completedCount, totalCount }) => {
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    const { icon: Icon, color } = CategoryIcons[category];

    const handleMouseEnter = (e) => {
        e.currentTarget.style.border = `1px solid ${color}`;
        e.currentTarget.style.transform = 'translateY(-2px)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.border = `1px solid var(--border-color)`;
        e.currentTarget.style.transform = 'translateY(0)';
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
// ------------------------------------


const Profile = () => {
    const { user, updateProfilePhoto } = useAuth();
    const fileInputRef = useRef(null); 

    // --- Data Calculation ---
    const allCourses = coursesData;
    const totalCourses = allCourses.length;
    const totalCompletedLessons = user?.completedLessons?.length || 0;

    const categories = ['HTML', 'CSS', 'JavaScript', 'React'];
    
    const categoryProgress = useMemo(() => {
        return categories.map(category => {
            const categoryCourses = allCourses.filter(c => c.category === category);
            const totalCount = categoryCourses.length;
            const completedCount = categoryCourses.filter(c => user?.completedLessons.includes(c.id)).length;
            return { category, completedCount, totalCount };
        });
    }, [user, allCourses]);
    
    const completedCourses = useMemo(() => {
        return allCourses.filter(c => user?.completedLessons.includes(c.id));
    }, [user, allCourses]);


    // --- Mock Photo Upload Handlers ---
    const handlePhotoClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newUrl = URL.createObjectURL(file);
            updateProfilePhoto(newUrl); 
            alert(`New photo selected: ${file.name}. (Note: This is a frontend-only change, persistent only in local storage.)`);
        }
    };

    return (
        <PageWrapper>
            {/* Profile Header Section */}
            <div style={ProfileHeaderStyle}>
                
                {/* Avatar with Change Photo Overlay (Interactive) */}
                <div 
                    style={UserAvatarContainer} 
                    onMouseEnter={e => e.currentTarget.querySelector('div').style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.querySelector('div').style.opacity = 0}
                    onClick={handlePhotoClick} 
                >
                    {/* Source pulled from global user state */}
                    <img 
                        src={user?.photoUrl} 
                        alt="User Avatar" 
                        style={UserAvatarImageStyle} // Use the new style object
                        onError={(e) => { e.target.style.display = 'none'; }} // Hide image completely if it fails
                    /> 
                    <div style={ChangePhotoOverlay}>
                        <FaCamera style={{ marginRight: '5px' }} /> Change Photo
                    </div>
                </div>
                
                {/* HIDDEN FILE INPUT ELEMENT */}
                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                />

                {/* Main User Info */}
                <div>
                    <h1 style={{ marginBottom: '5px' }}>{user?.username}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>

                    <div style={UserInfoStats}>
                        <div style={StatBoxStyle}>
                            <p style={{ color: 'var(--accent-color)', fontWeight: '700' }}>Lessons Completed</p>
                            <h3 style={{ margin: 0 }}>{totalCompletedLessons}</h3>
                        </div>
                        <div style={StatBoxStyle}>
                            <p style={{ color: 'var(--accent-color)', fontWeight: '700' }}>Total Courses</p>
                            <h3 style={{ margin: 0 }}>{totalCourses}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Status and Dates */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '40px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Member Since: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{user?.memberSince}</span>
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Last Login: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{user?.lastLogin}</span>
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Account Status: <span style={{ color: 'var(--success-color)', fontWeight: '600' }}>Active ✅</span>
                </p>
            </div>


            {/* Learning Progress by Category */}
            <h2 style={{ marginBottom: '20px' }}>Learning Progress by Category</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {categoryProgress.map(p => (
                    <CategoryProgressCard key={p.category} {...p} />
                ))}
            </div>

            {/* Completed Courses List */}
            <h2 style={{ marginBottom: '20px' }}>Completed Courses</h2>
            <div style={{ 
                backgroundColor: 'var(--card-bg)', 
                padding: '20px', 
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-color)'
            }}>
                {completedCourses.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {completedCourses.map(c => (
                            <li 
                                key={c.id} 
                                style={{ 
                                    padding: '10px 0', 
                                    borderBottom: '1px dotted var(--border-color)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <span style={{ fontWeight: '600' }}>{c.title}</span>
                                <span style={{ color: 'var(--success-color)' }}>Completed</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                        No courses completed yet. Start learning today!
                    </p>
                )}
            </div>

        </PageWrapper>
    );
};

export default Profile;
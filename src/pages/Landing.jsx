import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBookOpen, FaSignInAlt, FaUserPlus, FaUsers, FaBriefcase, FaEnvelope } from 'react-icons/fa';

// --- Styling Definitions ---

const LandingNavbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 3rem', 
    backgroundColor: 'var(--sidebar-bg)', 
    borderBottom: '1px solid var(--border-color)',
    position: 'sticky',
    top: 0,
    zIndex: 100
};

const NavLinks = {
    display: 'flex',
    gap: '20px', 
    alignItems: 'center',
};

const LogoContainer = {
    display: 'flex', 
    alignItems: 'center', 
    cursor: 'pointer', 
    textDecoration: 'none',
};

const LogoIcon = {
    backgroundColor: 'var(--accent-color)',
    color: 'var(--bg-color)',
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginRight: '10px'
};

const ContentContainer = {
    padding: '4rem 3rem', // Refined padding
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 'calc(100vh - 80px)', 
};

const TextSection = {
    maxWidth: '600px', 
    marginRight: '50px',
};

const OverviewCard = {
    backgroundColor: 'var(--card-bg)',
    padding: '30px',
    borderRadius: 'var(--border-radius)',
    border: '1px solid var(--border-color)',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
    minWidth: '350px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'default'
};

const MockModalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
};

const ModalContentStyle = {
    backgroundColor: 'var(--card-bg)',
    padding: '40px',
    borderRadius: 'var(--border-radius)',
    maxWidth: '700px',
    boxShadow: '0 10px 40px var(--gradient-end)',
    border: '2px solid var(--accent-color)',
};


const Landing = () => {
    const { isAuthenticated } = useAuth();
    const [modal, setModal] = useState({ visible: false, title: '', content: '' });
    
    // --- Mock Data Generator for About/Careers/Contact (Using combosquare@gmail.com) ---
    const generateMockContent = (key) => {
        switch (key) {
            case 'About':
                return {
                    title: 'About SkillHub: Our Mission',
                    icon: FaUsers,
                    content: (
                        <>
                            <p style={{marginBottom: '15px'}}>SkillHub is dedicated to bridging the gap between academic knowledge and real-world developer demands. We provide a curated learning path focused exclusively on the MERN stack essentials (HTML, CSS, JavaScript, React) using interactive lessons and project-based learning. Our goal is to make professional-level web development accessible to everyone, empowering you to build and deploy modern applications.</p>
                            <p style={{color: 'var(--accent-color)', fontWeight: '600'}}>We believe competence is earned, not given. Start building today.</p>
                        </>
                    )
                };
            case 'Careers':
                return {
                    title: 'Join Our Team',
                    icon: FaBriefcase,
                    content: (
                        <>
                            <p style={{marginBottom: '15px'}}>We're a remote-first team passionate about ed-tech. To apply for the roles listed below, please send your resume and portfolio to our HR department:</p>
                            <p style={{fontWeight: '600', color: 'var(--accent-color)'}}>Email: combosquare@gmail.com</p>
                            <ul style={{marginLeft: '20px', color: 'var(--text-secondary)', marginTop: '10px'}}>
                                <li>Senior React Developer (Focus on Context API/Redux)</li>
                                <li>Full Stack Engineer (Node.js/Express expertise required)</li>
                                <li>UX/UI Designer (Figma required, emphasis on Dark Mode aesthetics)</li>
                            </ul>
                        </>
                    )
                };
            case 'Contact':
                return {
                    title: 'Get in Touch',
                    icon: FaEnvelope,
                    content: (
                        <>
                            <p style={{marginBottom: '10px'}}>Have questions about our courses or need technical support?</p>
                            <p style={{fontWeight: '600'}}>Email: <span style={{color: 'var(--accent-color)'}}>combosquare@gmail.com</span></p>
                            <p style={{fontWeight: '600'}}>Phone: <span style={{color: 'var(--accent-color)'}}>+91 98765 43210</span></p>
                        </>
                    )
                };
            default: return { title: '', content: '' };
        }
    };
    
    const handleNavClick = (key) => {
        const content = generateMockContent(key);
        setModal({ 
            visible: true, 
            title: content.title, 
            content: content.content,
            icon: content.icon
        });
    };
    
    // Public Navigation Items
    const publicNavItems = [
        { name: 'About', key: 'About' },
        { name: 'Careers', key: 'Careers' },
        { name: 'Contact', key: 'Contact' },
    ];
    
    const totalCourses = 8; 

    return (
        <div>
            {/* --- Public Navigation Bar --- */}
            <header style={LandingNavbarStyle}>
                <Link to="/" style={LogoContainer}>
                    <div style={LogoIcon}>S</div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>SkillHub</span>
                </Link>
                
                <nav style={NavLinks}>
                    {publicNavItems.map(item => (
                        <button 
                            key={item.name} 
                            onClick={() => handleNavClick(item.key)}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: 'var(--text-secondary)', 
                                padding: '0',
                                fontSize: '1rem',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >
                            {item.name}
                        </button>
                    ))}
                    <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: '600' }}><FaSignInAlt style={{marginRight: '5px'}}/> Login</Link>
                    <Link to="/signup" className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '6px' }}><FaUserPlus style={{marginRight: '5px'}}/> Signup</Link>
                </nav>
            </header>
            
            {/* --- Main Content Section (Unique SkillHub Aesthetic) --- */}
            <main style={ContentContainer}>
                <div style={TextSection}>
                    <p style={{ color: 'var(--accent-color)', fontWeight: '600', marginBottom: '10px' }}>Future-ready skill development</p>
                    <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '20px', color: 'var(--text-primary)' }}> 
                        Forge your <span className='neon-accent'>coding future</span> with practical projects.
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.8' }}>
                        Master modern web technologies—HTML5, CSS3, JavaScript, and React—through our project-focused curriculum designed to simulate real industry challenges. Your skills, tracked and validated.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {isAuthenticated ? (
                            <Link to="/dashboard" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem' }}>Go to Dashboard</Link> 
                        ) : (
                            // Unique call to action
                            <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2rem' }}>Activate Free Trial</Link> 
                        )}
                        <Link to="/courses" className="btn-secondary" style={{ textDecoration: 'none', padding: '1rem 2rem' }}>
                            <FaBookOpen style={{ marginRight: '8px' }} /> Browse Curriculum
                        </Link>
                    </div>
                </div>
                
                {/* Overview Card */}
                <div 
                    style={OverviewCard}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 15px var(--accent-color)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)'}
                >
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Skill Track Status</h2>
                    <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '15px', paddingBottom: '15px' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>Tracks Available</p>
                        <h3 style={{ color: 'var(--accent-color)', fontSize: '1.8rem', margin: '5px 0' }}>{totalCourses / 4}</h3>
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-secondary)' }}>Core technologies covered</p>
                        <p style={{ color: 'var(--text-primary)', fontWeight: '600', margin: '5px 0 10px 0' }}>HTML • CSS • JS • React</p>
                        <p style={{ color: 'var(--text-secondary)' }}>Total Courses: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{totalCourses}</span></p>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>Estimated time: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>4–6 Weeks</span></p>
                    </div>
                </div>
            </main>
            
            {/* --- Mock Modal Display --- */}
            {modal.visible && (
                <div style={MockModalStyle} onClick={() => setModal({ visible: false, title: '', content: '' })}>
                    <div style={ModalContentStyle} onClick={e => e.stopPropagation()}>
                        <h2 style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-color)', marginBottom: '20px' }}>
                            {modal.icon && <modal.icon style={{ marginRight: '10px' }} />}
                            {modal.title}
                        </h2>
                        <div style={{color: 'var(--text-primary)', lineHeight: '1.6'}}>
                           {modal.content}
                        </div>
                        <button 
                            onClick={() => setModal({ visible: false, title: '', content: '' })}
                            className="btn-primary" 
                            style={{ 
                                padding: '0.75rem 1.5rem', 
                                marginTop: '30px',
                                float: 'right'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;
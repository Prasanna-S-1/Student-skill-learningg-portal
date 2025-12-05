import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

// --- Styling Definitions ---
const NavbarStyle = {
    height: '60px',
    backgroundColor: 'var(--sidebar-bg)', 
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 var(--padding-default)',
    borderBottom: '1px solid var(--border-color)',
    position: 'sticky',
    top: 0,
    zIndex: 990
};

const NavLinks = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px'
};

const NavLinkStyle = {
    color: 'var(--text-secondary)',
    fontWeight: '500',
    padding: '0 15px',
    transition: 'color 0.2s',
};

const UserInfoLink = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
    cursor: 'pointer',
    textDecoration: 'none', 
    transition: 'color 0.2s',
    padding: '5px 10px', 
    borderRadius: '6px',
    backgroundColor: 'transparent',
};

const UserAvatar = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-color)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--bg-color)',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginRight: '10px',
    overflow: 'hidden'
};

const LogoContainer = { // Styling for the logo container in the Navbar
    display: 'flex', 
    alignItems: 'center', 
    cursor: 'pointer', 
    textDecoration: 'none',
    position: 'absolute', 
    left: '280px', 
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

// ------------------------------------

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const userPhotoUrl = user?.photoUrl || 'https://i.imgur.com/gK4I8h8.png'; 

    return (
        <div style={NavbarStyle}>
            {/* FINAL LOGO LINK: Now links to the Landing Page (/) from anywhere */}
            <Link to="/" style={LogoContainer}>
                <div style={LogoIcon}>S</div>
                <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)' }}>SkillHub</span>
            </Link>

            <div style={NavLinks}>
                <Link to="/dashboard" style={NavLinkStyle} onMouseEnter={e => e.target.style.color = 'var(--text-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                    Dashboard
                </Link>
                <Link to="/courses" style={NavLinkStyle} onMouseEnter={e => e.target.style.color = 'var(--text-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                    Courses
                </Link>
            </div>

            {/* User Info wrapped in Link to Profile */}
            <Link 
                to="/profile" 
                style={UserInfoLink}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--card-bg)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <div style={UserAvatar}>
                    <img src={userPhotoUrl} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                    {user?.username || 'Guest'}
                </span>
            </Link>

            <button onClick={handleLogout} className="btn-logout" style={{ padding: '0.5rem 1rem', borderRadius: '6px' }}>
                <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
            </button>
        </div>
    );
};

export default Navbar;
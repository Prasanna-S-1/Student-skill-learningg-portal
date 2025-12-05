import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaBookOpen, FaUser } from 'react-icons/fa';
import { IoLogoHtml5, IoLogoCss3, IoLogoJavascript, IoLogoReact } from 'react-icons/io5';

// --- Styling Definitions ---
const SidebarStyle = {
    width: '250px',
    backgroundColor: 'var(--sidebar-bg)',
    padding: '20px 0',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    borderRight: '1px solid var(--border-color)',
    zIndex: 1000
};

const LogoContainer = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 var(--padding-default)',
    marginBottom: '30px'
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

const LogoText = {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--text-primary)'
};

const MenuSection = {
    marginBottom: '30px',
    padding: '0 var(--padding-default)'
};

const MenuTitle = {
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: '10px'
};

const NavItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    transition: 'background-color 0.2s, color 0.2s, transform 0.2s', // Added transform transition
    marginBottom: '5px'
};

const ActiveNavItemStyle = {
    ...NavItemStyle,
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
    color: 'var(--accent-color)',
    fontWeight: '600'
};

const IconStyle = {
    fontSize: '1.2rem',
    marginRight: '15px'
};

const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
    { name: 'Courses', path: '/courses', icon: FaBookOpen },
    { name: 'Profile', path: '/profile', icon: FaUser },
];

const categoryLinks = [
    { name: 'HTML', path: '/courses?category=HTML', icon: IoLogoHtml5, color: '#e34f26' },
    { name: 'CSS', path: '/courses?category=CSS', icon: IoLogoCss3, color: '#1572b6' },
    { name: 'JavaScript', path: '/courses?category=JavaScript', icon: IoLogoJavascript, color: '#f7df1e' },
    { name: 'React', path: '/courses?category=React', icon: IoLogoReact, color: '#61dafb' },
];

const Sidebar = () => {
    const location = useLocation();

    const isCategoryActive = (path) => {
        return location.search.includes(path.split('?')[1]);
    };

    return (
        <div style={SidebarStyle}>
            <div style={LogoContainer}>
                <div style={LogoIcon}>S</div>
                <span style={LogoText}>SkillHub</span>
            </div>

            <div style={MenuSection}>
                <h3 style={MenuTitle}>Menu</h3>
                <nav>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            style={({ isActive }) => 
                                isActive || (link.path === '/dashboard' && location.pathname === '/') ? ActiveNavItemStyle : NavItemStyle
                            }
                            // Premium hover effect logic (Added transform)
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(5px)'; // Subtle horizontal shift
                                if (!location.pathname.includes(link.path)) {
                                    e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                if (!location.pathname.includes(link.path)) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }
                            }}
                        >
                            <link.icon style={IconStyle} />
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div style={MenuSection}>
                <h3 style={MenuTitle}>Categories</h3>
                <nav>
                    {categoryLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            style={() => {
                                const isActive = isCategoryActive(link.path);
                                return isActive ? ActiveNavItemStyle : NavItemStyle;
                            }}
                            // Premium hover effect logic (Added transform)
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(5px)';
                                if (!isCategoryActive(link.path)) {
                                    e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                if (!isCategoryActive(link.path)) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                }
                            }}
                        >
                            <link.icon style={{ ...IconStyle, color: link.color }} />
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
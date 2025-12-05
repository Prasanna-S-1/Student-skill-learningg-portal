import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignInAlt, FaLock, FaEnvelope } from 'react-icons/fa';

// --- Shared Styling Components (kept for completeness) ---
const AuthCard = ({ children }) => (
    <div style={{
        backgroundColor: 'var(--card-bg)',
        padding: '3rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        border: '1px solid var(--border-color)'
    }}>
        {children}
    </div>
);

const InputGroup = ({ children }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '8px',
        padding: '0.75rem',
        border: '1px solid var(--border-color)',
        transition: 'border-color 0.3s'
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-color)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
    >
        {children}
    </div>
);

const InputIcon = ({ icon: Icon }) => (
    <Icon style={{ color: 'var(--accent-color)', marginRight: '10px', fontSize: '1.2rem' }} />
);

const InputField = (props) => (
    <input style={{
        flexGrow: 1,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'var(--text-primary)',
        fontSize: '1rem'
    }} {...props} />
);

const LogoIcon = () => (
    <div style={{
        backgroundColor: 'var(--accent-color)',
        color: 'var(--bg-color)',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '0 auto 1.5rem auto'
    }}>
        S
    </div>
);
// -----------------------------------------------------------------------


const Login = () => {
    // --- CORRECTED: Initial values are empty, relying on user input ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        const result = login(email, password);
        
        if (result.success) {
            navigate('/dashboard', { replace: true });
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <AuthCard>
                <LogoIcon />
                <h1 style={{ marginBottom: '0.5rem' }}>Welcome Back</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Sign in to continue your learning journey
                </p>
                
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputIcon icon={FaEnvelope} />
                        <InputField
                            type="email"
                            placeholder="Email Address (e.g., user@example.com)" // Added Placeholder
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputIcon icon={FaLock} />
                        <InputField
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </InputGroup>

                    {error && (
                        <p style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'left' }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        <FaSignInAlt style={{ marginRight: '8px' }} /> Sign In
                    </button>
                </form>

                <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/signup">Create one</Link>
                </p>
                
                {/* Demo Credentials box remains helpful */}
                <div style={{ 
                    marginTop: '2rem', 
                    padding: '1rem', 
                    backgroundColor: 'rgba(0, 210, 255, 0.1)', 
                    borderRadius: '8px', 
                    borderLeft: '4px solid var(--accent-color)',
                    textAlign: 'left',
                    fontSize: '0.9rem'
                }}>
                    <strong style={{ color: 'var(--accent-color)' }}>Demo Credentials:</strong>
                    <p style={{ margin: '0.25rem 0 0 0' }}>Email: user@example.com</p>
                    <p style={{ margin: '0' }}>Password: demo123</p>
                </div>

            </AuthCard>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserPlus, FaLock, FaEnvelope, FaUser } from 'react-icons/fa';

// --- Shared Styling Components (reused from Login) ---
// (In a real project, you would put these in a separate file, but we keep them here for completeness)
const AuthCard = (props) => (
    <div style={{
        backgroundColor: 'var(--card-bg)',
        padding: '3rem',
        borderRadius: 'var(--border-radius)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        border: '1px solid var(--border-color)'
    }} {...props} />
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
    // Premium hover effect
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


const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const result = signup(username, email, password);
        
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
                <h1 style={{ marginBottom: '0.5rem' }}>Get Started</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Create your account and begin learning today
                </p>

                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputIcon icon={FaUser} />
                        <InputField
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </InputGroup>
                    
                    <InputGroup>
                        <InputIcon icon={FaEnvelope} />
                        <InputField
                            type="email"
                            placeholder="Email Address"
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
                    
                    <InputGroup>
                        <InputIcon icon={FaLock} />
                        <InputField
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </InputGroup>

                    {error && (
                        <p style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'left' }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        <FaUserPlus style={{ marginRight: '8px' }} /> Create Account
                    </button>
                </form>

                <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>

            </AuthCard>
        </div>
    );
};

export default Signup;
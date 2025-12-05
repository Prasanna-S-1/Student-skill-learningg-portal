import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// Styling for the overall application container
const AppContainerStyle = {
    display: 'flex',
    minHeight: '100vh',
};

// Styling for the main content area (offsetting the sidebar width)
const ContentWrapperStyle = {
    marginLeft: '250px', // Must match the fixed width of the Sidebar
    flexGrow: 1, // Takes up the remaining space
    width: 'calc(100% - 250px)', // Ensures responsiveness
};

// Styling for the padding around the actual page content
const MainContentStyle = {
    padding: 'var(--padding-default)', // 1.5rem padding defined in index.css
    minHeight: 'calc(100vh - 60px)', // 100vh minus Navbar height (60px)
};


const PageWrapper = ({ children }) => {
    return (
        <div style={AppContainerStyle}>
            {/* 1. Fixed Sidebar */}
            <Sidebar /> 
            
            {/* 2. Content Area */}
            <div style={ContentWrapperStyle}>
                
                {/* 3. Sticky Navbar */}
                <Navbar />
                
                {/* 4. The actual Page Content (Dashboard, Profile, etc.) */}
                <main style={MainContentStyle}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default PageWrapper;
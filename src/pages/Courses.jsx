import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper.jsx';
import CourseCard from '../components/CourseCard.jsx';
import coursesData from '../data/courses.json';
import { FaSearch } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

// --- Styling Definitions ---
const CoursesHeaderStyle = {
    marginBottom: '30px',
};

const CourseGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
};

const SearchInputContainer = {
    position: 'relative',
    marginBottom: '30px',
    maxWidth: '600px',
};

const SearchInputStyle = {
    width: '100%',
    padding: '12px 15px',
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    paddingLeft: '45px',
};

const FilterContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '40px',
    flexWrap: 'wrap',
};

const FilterButtonStyle = (isActive) => ({
    padding: '8px 15px',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    backgroundColor: isActive ? 'var(--accent-color)' : 'var(--card-bg)',
    color: isActive ? 'var(--bg-color)' : 'var(--text-primary)',
    border: `1px solid ${isActive ? 'var(--accent-color)' : 'var(--border-color)'}`,
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
    cursor: 'pointer',
});

const categories = ['All', 'HTML', 'CSS', 'JavaScript', 'React'];
// ------------------------------------

const Courses = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    
    const currentCategory = searchParams.get('category') || 'All';
    
    const filteredCourses = useMemo(() => {
        let courses = coursesData;
        
        // 1. Filter by Category
        if (currentCategory !== 'All') {
            courses = courses.filter(course => course.category === currentCategory);
        }
        
        // 2. Filter by Search Term
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            courses = courses.filter(course => 
                course.title.toLowerCase().includes(lowerCaseSearch) || 
                course.description.toLowerCase().includes(lowerCaseSearch)
            );
        }
        
        return courses;
    }, [currentCategory, searchTerm]);


    const handleCategoryFilter = (category) => {
        if (category === 'All') {
            setSearchParams({}); 
        } else {
            setSearchParams({ category });
        }
    };
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    return (
        <PageWrapper>
            <div style={CoursesHeaderStyle}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '5px' }}>Explore All Courses</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Discover our complete library of web development courses.</p>
            </div>
            
            {/* Search Bar */}
            <div style={SearchInputContainer}>
                 <FaSearch style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                    type="text" 
                    placeholder="Search courses..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={SearchInputStyle}
                />
            </div>

            {/* Filter Buttons (with hover) */}
            <div style={FilterContainerStyle}>
                {categories.map(category => (
                    <button
                        key={category}
                        style={FilterButtonStyle(category === currentCategory)}
                        onClick={() => handleCategoryFilter(category)}
                        // Premium hover effect
                        onMouseEnter={e => {
                            if (category !== currentCategory) {
                                e.currentTarget.style.backgroundColor = 'var(--bg-color)';
                                e.currentTarget.style.borderColor = 'var(--accent-color)';
                                e.currentTarget.style.color = 'var(--accent-color)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (category !== currentCategory) {
                                e.currentTarget.style.backgroundColor = 'var(--card-bg)';
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                e.currentTarget.style.color = 'var(--text-primary)';
                            }
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
                <div style={CourseGridStyle}>
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <h3 style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '50px' }}>
                    No courses found matching your criteria.
                </h3>
            )}
            
        </PageWrapper>
    );
};

export default Courses;
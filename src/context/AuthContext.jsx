import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

// Utility function to load user data and ensure photoUrl is present
const getInitialUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    // Ensure default avatar if photoUrl is missing
    user.photoUrl = user.photoUrl || 'https://i.imgur.com/gK4I8h8.png'; 
    user.completedLessons = user.completedLessons || [];
    return user;
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);

  // Effect to sync user state with localStorage whenever 'user' changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // --- Authentication Logic (Frontend Only) ---
  
  const signup = (username, email, password) => {
    let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check for existing user (for mock validation)
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered.' };
    }
    
    const newUser = {
      username,
      email,
      id: Date.now(),
      lastLogin: new Date().toLocaleDateString('en-GB'),
      memberSince: new Date().toLocaleDateString('en-GB'),
      completedLessons: [], 
      photoUrl: 'https://i.imgur.com/gK4I8h8.png' // Default photo URL
    };

    // Save the new user to the global list and log them in
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    setUser(newUser); 
    
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = users.find(u => u.email === email);
    
    // Mock login validation (check if user exists)
    if (foundUser) {
        const currentPhoto = foundUser.photoUrl || 'https://i.imgur.com/gK4I8h8.png';
        
        const updatedUser = { 
            ...foundUser, 
            lastLogin: new Date().toLocaleDateString('en-GB'),
            photoUrl: currentPhoto
        };
        
        // Update the user list in localStorage
        const updatedUsers = users.map(u => u.id === foundUser.id ? updatedUser : u);
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        
        setUser(updatedUser);
        return { success: true };
    }
    
    return { success: false, message: 'Invalid credentials.' };
  };

  // ----------------------------------------------------------------
  // 💡 FIX: This function definition resolves the Uncaught ReferenceError: logout is not defined
  // ----------------------------------------------------------------
  const logout = () => {
    setUser(null);
    // localStorage.removeItem('user') is handled by the useEffect hook
  };
  
  // --- Profile Photo Persistence ---
  const updateProfilePhoto = (newPhotoUrl) => {
      if (!user) return;
      
      const updatedUser = { 
          ...user, 
          photoUrl: newPhotoUrl 
      };
      
      setUser(updatedUser); // Update local state, which triggers localStorage save

      // Also update the photo in the main list of registered users
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  };
  
  // --- Progress Management ---
  const markLessonCompleted = (lessonId) => {
      if (!user) return;
      
      const isCompleted = user.completedLessons.includes(lessonId);
      if (isCompleted) return; 

      const updatedUser = {
          ...user,
          completedLessons: [...user.completedLessons, lessonId],
      };
      setUser(updatedUser);
      
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  };
  
  // 3. The value provided by the Context
  const contextValue = {
    user,
    isAuthenticated: !!user,
    signup,
    login,
    logout, // This now correctly points to the defined function above
    markLessonCompleted,
    updateProfilePhoto,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
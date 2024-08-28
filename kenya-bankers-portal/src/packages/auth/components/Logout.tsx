import { useNavigate } from 'react-router-dom';

export const logout = (navigate: any) => {
    
    // Clear all data from localStorage
    localStorage.clear();
    
    // Navigate to the home page
    navigate('/');
};

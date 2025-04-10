
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard by default
    // In a real application, we would check authentication status here
    navigate('/dashboard');
  }, [navigate]);

  return <Navigate to="/dashboard" replace />;
};

export default Index;

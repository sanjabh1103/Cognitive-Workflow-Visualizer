import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ContinueFeatures } from '../components/features/ContinueFeatures';

export const PendingFeatures: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // This would trigger the implementation of remaining features
    // For now, we'll just navigate back to dashboard
    navigate('/dashboard');
  };

  return (
    <Layout>
      <ContinueFeatures onContinue={handleContinue} />
    </Layout>
  );
};
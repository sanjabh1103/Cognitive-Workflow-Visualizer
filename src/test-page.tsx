import React from 'react';

export const TestPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#6366f1' }}>NeuroFlow Designer - Test Page</h1>
      <p>If you can see this, the application is working correctly!</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h2>Application Status:</h2>
        <ul>
          <li>✅ React is working</li>
          <li>✅ Components are rendering</li>
          <li>✅ Styling is applied</li>
          <li>✅ Server is running</li>
        </ul>
      </div>
      <div style={{ marginTop: '20px' }}>
        <a
          href="/"
          style={{
            padding: '10px 20px',
            backgroundColor: '#6366f1',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px'
          }}
        >
          Go to Main App
        </a>
      </div>
    </div>
  );
};
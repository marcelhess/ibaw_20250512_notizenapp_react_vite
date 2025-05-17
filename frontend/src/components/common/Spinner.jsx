import React from 'react';

const Spinner = () => (
  <div style={{ textAlign: 'center', padding: 24 }}>
    <div style={{ display: 'inline-block', width: 32, height: 32, border: '4px solid #eee', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Spinner; 
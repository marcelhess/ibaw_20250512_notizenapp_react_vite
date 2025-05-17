import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;
  const bg = type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db';
  return (
    <div style={{ background: bg, color: '#fff', padding: '12px 20px', borderRadius: 6, margin: '12px 0', position: 'relative' }}>
      {message}
      {onClose && <button onClick={onClose} style={{ position: 'absolute', right: 8, top: 8, background: 'transparent', color: '#fff', border: 'none', fontSize: 18, cursor: 'pointer' }}>&times;</button>}
    </div>
  );
};

export default Alert; 
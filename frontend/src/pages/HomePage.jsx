import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBookOpen, FiLogIn, FiUserPlus } from 'react-icons/fi';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #e0e0e0', padding: '2.5rem 2.2rem', minWidth: 320, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <FiBookOpen size={48} style={{ color: 'var(--primary)', marginBottom: 16 }} />
        <h1 style={{ marginBottom: 10 }}>Willkommen zur Notes App</h1>
        <p style={{ marginBottom: 28, color: '#555' }}>Verwalte deine Notizen einfach und sicher.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button className="button-login" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, padding: '12px 18px' }} onClick={() => navigate('/login')}>
            <FiLogIn size={20} /> Login
          </button>
          <button className="button-register" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, padding: '12px 18px' }} onClick={() => navigate('/register')}>
            <FiUserPlus size={20} /> Registrieren
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 
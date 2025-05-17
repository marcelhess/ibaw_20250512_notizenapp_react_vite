import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FiLogIn } from 'react-icons/fi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(email, password);
    if (res.token) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Login fehlgeschlagen');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #e0e0e0', padding: '2.5rem 2rem', minWidth: 340, maxWidth: 380, width: '100%' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
        {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>E-Mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#f6faff' }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Passwort</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#f6faff' }} />
        </div>
        <button type="submit" className="button-login" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 18, padding: '12px 0' }}>
          <FiLogIn size={20} /> Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm; 
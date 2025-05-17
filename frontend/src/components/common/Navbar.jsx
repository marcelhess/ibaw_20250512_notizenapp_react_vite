import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { AiOutlineHome } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #eee', marginBottom: '2rem', display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
      <Link to="/">
        <button className="button-icon button-home" title="Home" aria-label="Home">
          <AiOutlineHome size={24} style={{ color: 'var(--primary)' }} />
        </button>
      </Link>
      {user ? (
        <>
          <Link to="/dashboard">
            <button className="button-icon button-dashboard" title="Dashboard" aria-label="Dashboard">
              <MdDashboard size={24} style={{ color: '#fff' }} />
            </button>
          </Link>
          <button onClick={handleLogout} className="button-icon button-danger" title="Logout" aria-label="Logout">
            <FiLogOut size={22} style={{ color: '#fff' }} />
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="button-icon button-login" title="Login" aria-label="Login">
              <FiLogIn size={22} />
            </button>
          </Link>
          <Link to="/register">
            <button className="button-icon button-register" title="Register" aria-label="Register">
              <FiUserPlus size={22} />
            </button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar; 
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import octroLogo from '../assets/octro-logo.png';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <div className="header-right">
          <img src={octroLogo} alt="Octro Logo" />        
        </div>
        <div className="header-left">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col">
              <div className="text-lg font-medium">{user?.role || 'User'}</div>
              <div className="text-sm text-gray-600">{user?.name || 'User'}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
              >
                Admin Panel
              </button>
            )}
            
            <button 
              onClick={logout}
              className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <h1>TapeX</h1>
        <h4>Tape Management demystified</h4>
        <div className="button-group">
          <button>Upload</button>
          <button>View</button>
          <button>Download</button>
        </div>
        <div className="file-input-container">
          <button>Choose File</button>
        </div>
      </main>

      <footer className="footer">
        Made with <span className="heart">❤</span> by DevOps Team
      </footer>
    </div>
  );
};

export default Home; 
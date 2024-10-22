import {useState } from 'react';

import {FaUser } from 'react-icons/fa';
import './design/HomePage.css'; 
import { useNavigate } from 'react-router-dom';
import MateriaIndex from '../Materia/MateriaIndex';

function HomeProfessor({ user, onLogout }) {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Redireciona para a tela de login
};

  return (
    <div className="home-page">
      <nav className="navbar">
      <span>Bem vindo Professor {user?.firstname}!</span>
      <div className="nav-icons">
          <FaUser className="user-icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="custom-menu">
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
          
        </div>
      </nav>

      <div className='container' > <MateriaIndex user={user} /> 
      </div>
    </div>
  );
}

export default HomeProfessor;


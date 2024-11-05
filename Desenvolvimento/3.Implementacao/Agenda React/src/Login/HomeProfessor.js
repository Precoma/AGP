import {useState } from 'react';
import {FaUser } from 'react-icons/fa';
import './design/HomePage.css'; 
import { useNavigate } from 'react-router-dom';
import MateriaIndex from '../Materia/MateriaIndex';
import Navbar from './navbar.jsx';  

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
      <Navbar
        user= {user.firstname}
        toggle= {toggleUserMenu}
        iumo= {isUserMenuOpen}
        handle= {handleLogout}
      />

      <div className='container' > <MateriaIndex user={user} /> 
      </div>
    </div>
  );
}

export default HomeProfessor;


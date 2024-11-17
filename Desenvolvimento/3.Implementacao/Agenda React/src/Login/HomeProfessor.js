import {useState } from 'react';
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
    <MateriaIndex user={user}/> 
  </div>
);
}

export default HomeProfessor;


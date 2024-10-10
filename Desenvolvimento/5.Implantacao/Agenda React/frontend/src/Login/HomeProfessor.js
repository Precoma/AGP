import React, { useState } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import './design/HomePage.css'; 

function HomeProfessor({ user, onLogout }) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="home-page">
      <nav className="navbar">
      <span>Bem vindo Professor TESTE {user?.firstname || 'Visitante'}!</span>
      <div className="nav-icons">
          <FaUser className="user-icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="custom-menu">
              <ul>
                <li>Perfil</li>
                <li>Noticias</li>
                <li onClick={onLogout}>Logout</li>
              </ul>
            </div>
          )}
          <FaShoppingCart className="cart-icon"/>
        </div>
      </nav>
      <header>
      <h1>Bem vindo, {user?.firstname || 'Visitante'}!</h1> {/* Adicionando verificação */}
      </header>
      <main>{}</main>
    </div>
  );
}

export default HomeProfessor;


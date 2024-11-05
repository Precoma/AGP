import React from "react";
import {FaUser} from 'react-icons/fa';

function navbar ({ user, toggle, iumo, handle }) {
    return (
        <nav className="navbar">
                <span>Bem-vindo {user}!</span>
                <div className="nav-icons">
                    <FaUser className="user-icon" onClick={toggle} />
                    {iumo && (
                        <div className="custom-menu">
                            <ul>
                                <li onClick={handle}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
    );
};

export default navbar;
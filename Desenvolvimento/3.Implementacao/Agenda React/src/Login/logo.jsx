import React from "react";
import logoImg from '../estilos/img/logo.png'

const logo = () => {
    return (
        <div className='title'>
        <img src={logoImg}/>
        <p>AGP</p>
        </div>
    );
};

export default logo;
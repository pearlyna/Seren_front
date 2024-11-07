import React from 'react';
import { Link } from 'react-router-dom';  
import logo from '../assets/imgs/serenvilar_logo.png';
import '../estilos/Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <img src={logo} alt='Logo' />
      </div>
      <nav>
        <Link to='/' className='home'>Home</Link>
        <Link to='/login' className='acesso_dono'>Acesso Dono</Link> 
      </nav>
    </header>
  );
};

export default Header;

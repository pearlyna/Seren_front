import React from 'react';
import logo from '../assets/imgs/serenvilar_logo.png'
import '../estilos/Header.scss'

const Header = () => {
return (
<header className='header'>
    <div className='logo'>
        <img src={logo} alt='Logo' />
    </div>
    <nav>
        <a href='/' className='home'>Home</a>
        <a href='/acesso-dono' className='acesso_dono'>Acesso Dono</a>
    </nav>
</header>
);
};

export default Header;
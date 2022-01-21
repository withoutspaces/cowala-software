import * as React from 'react';
import Logo from '../../assets/Logo.png'
import LogoName from '../../assets/LogoName.png'
import './style.css'

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-container">
                <img src={Logo} alt="Logo Cowala" />
                <img src={LogoName} alt="Cowala Software" />
            </div>
        </div>
    );
}

export default Header;
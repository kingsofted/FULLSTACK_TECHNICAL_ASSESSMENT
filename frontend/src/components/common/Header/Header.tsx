import React from 'react'
import { STRINGS } from '../../../constants/constant';
import './Header.css'; 

const Header:React.FC = () => {
  return (
      <header className="header-banner">
        <div className="overlay"></div>
        <div className="animated-texts overlay-content">
          <h1>
            Welcome to <span className="header-color">{STRINGS.APPLICATION_NAME}</span>
          </h1>
          <h4>Discover the Best Career Opportunities</h4>
        </div>
      </header>
  )
}

export default Header

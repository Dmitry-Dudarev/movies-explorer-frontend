import React from "react";
import './NavTab.css';

function NavTab(props) {
  return (
    <nav>
      <ul className='nav-tab'>
        <li><a className='app-link nav-tab__link app-text' href="#about-project">О&nbsp;проекте</a></li>
        <li><a className='app-link nav-tab__link app-text' href="#techs">Технологии</a></li>
        <li><a className='app-link nav-tab__link app-text' href="#about-me">Студент</a></li>
      </ul>
    </nav>
  );
}

export default NavTab;
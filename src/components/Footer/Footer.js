import React from 'react';
import './Footer.css';

function Footer(props) {
  return (
    <footer className='footer'>
      <p className='footer__description app-text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className='app-borderline' />
      <div className='footer__bar'>
        <p className='footer__copyright app-text'>©&nbsp;2023</p>
        <ul className='footer__links'>
          <li><a className='app-link footer__link app-text' href='https://practicum.yandex.ru/'
            target='_blank' rel='noopener noreferrer'>
            Яндекс.Практикум
          </a></li>
          <li><a className='app-link footer__link app-text' href='https://github.com/'
            target='_blank' rel='noopener noreferrer'>
            Github
          </a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
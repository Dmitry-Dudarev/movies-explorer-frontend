import React from 'react';
import './Portfolio.css';

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title app-text'>Портфолио</h2>
      <a className='app-link portfolio__link app-text' href='https://github.com/Dmitry-Dudarev/how-to-learn'
        target='_blank' rel='noopener noreferrer'>
        Статичный сайт
        <span className='portfolio__link-arrow'>↗</span>
      </a>
      <hr className='app-borderline portfolio__borderline' />
      <a className='app-link portfolio__link app-text' href='https://github.com/Dmitry-Dudarev/russian-travel'
        target='_blank' rel='noopener noreferrer'>
        Адаптивный сайт
        <span className='portfolio__link-arrow'>↗</span>
      </a>
      <hr className='app-borderline portfolio__borderline' />
      <a className='app-link portfolio__link app-text' href='https://github.com/Dmitry-Dudarev/react-mesto-api-full-gha'
        target='_blank' rel='noopener noreferrer'>
        Одностраничное приложение
        <span className='portfolio__link-arrow'>↗</span>
      </a>
    </section>
  );
}

export default Portfolio;
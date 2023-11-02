import React from 'react';
import './AboutMe.css';
import MyPhoto from '../../images/MyPhoto.jpg';

function AboutMe(props) {
  return (
    <section id='about-me' className='about-me'>
      <h2 className='app-section-title app-text about-me__section-title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__info'>
          <p className='about-me__name app-text'>Дмитрий</p>
          <p className='about-me__description app-text'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__bio app-text'>Живу в Москве. Закончил ПМГМУ имени И.М. Сеченова.
            У меня есть собака. Люблю литературу.</p>
          <a className='app-link about-me__github-link app-text' href='https://github.com/Dmitry-Dudarev'
            target='_blank' rel='noopener noreferrer'>
            Github</a>
        </div>
        <div className='about-me__photo-container'>
          <img className='about-me__photo' src={MyPhoto} alt='Фото' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
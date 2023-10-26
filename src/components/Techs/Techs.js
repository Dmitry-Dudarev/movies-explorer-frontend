import React from 'react';
import './Techs.css';

function Techs(props) {
  return (
    <section id='techs' className='techs'>
      <h2 className='app-section-title app-text techs__title'>Технологии</h2>
      <p className='techs__technologies app-text'>7 технологий</p>
      <p className='techs__description app-text'>
        На курсе веб-разработки мы освоили технологии,
        которые применили в дипломном проекте.</p>
      <ul className='techs__icons'>
        <li className='techs__icon app-text'>HTML</li>
        <li className='techs__icon app-text'>CSS</li>
        <li className='techs__icon app-text'>JS</li>
        <li className='techs__icon app-text'>React</li>
        <li className='techs__icon app-text'>Git</li>
        <li className='techs__icon app-text'>Express.js</li>
        <li className='techs__icon app-text'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
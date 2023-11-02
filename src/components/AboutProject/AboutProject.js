import React from 'react';
import './AboutProject.css';

function AboutProject(props) {
  return (
    <section id='about-project' className='about-project'>
      <h2 className='app-section-title app-text about-project__section-title'>О проекте</h2>
      <div className='about-project__info'>
        <p className='about-project__info-title app-text'>
          Дипломный проект включал 5 этапов</p>
        <p className='about-project__info-content app-text'>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className='about-project__info-title app-text'>
          На выполнение диплома ушло 5 недель</p>
        <p className='about-project__info-content app-text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className='about-project__timeline'>
        <p className='about-project__timeline-week about-project__timeline-week--first app-text'>
          1 неделя</p>
        <p className='about-project__timeline-week about-project__timeline-week--fourth app-text'>
          4 недели</p>
        <p className='about-project__timeline-content app-text'>
          Back-end</p>
        <p className='about-project__timeline-content app-text'>
          Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
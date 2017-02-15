import React from 'react';
import s from './EventHero.scss';

function EventHero() {
  const heroInlineStyle = {
    backgroundImage: 'url(../../../assets/images/photos/solar-event.png)',
  };

  return (
    <div style={heroInlineStyle} className={s.eventHeroRoot}>
      <header className={s.titleContainer}>
        <h1 className={s.title}>Upcoming event</h1>
      </header>

      <article className={s.eventDetailsContainer}>
        <h2 className={s.eventTitle}>The LIVE Continental Eclipse</h2>
        <h3 className={s.eventTimeData}>
          Sunday, August 21, 2017 <span className={s.time}>7:00P.M. EST</span> USA
        </h3>
      </article>

    </div>
  );
}

export default EventHero;

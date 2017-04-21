import React from 'react';
import style from './AboutEclipse.scss';

function AboutEclipse() {
  return (
    <div className={style.aboutEclipseWrapper}>
      <div className={style.container}>
        <div className={style.header}>
          About
          <br />
          the Eclipse
        </div>
        <div className={style.eclipseDescription}>
          For the first time in nearly a century, the continental United States will be engulfed in a single shadow. It’s been 99 years since a total solar eclipse has stretched from coast-to-coast, and we haven’t seen one on US soil since 1979. On the morning of August 21st, a shadow will begin to move across Oregon’s West Coast at 16:04 UTC as the Transcontinental Eclipse will make its way East, crossing the entirety of the United States, before ending in South Carolina at 20:10 UTC. The narrow line of totality will directly hit only 12 states but every inch of the lower 48 will see at least partial solar obscuration.
        </div>
        <div className={style.sloohStream}>
          Slooh will also live stream this event:
          <div className={style.date}>
            Monday, August 21, 2017 8:00 A.M. EST USA
          </div>
        </div>
        <div className={style.btnGroup}>
          { /* <button className={style.actionBtn}>Set Reminder</button> */ }
          <a href="/#/shows/event-details/393" className={style.actionBtn}>Learn More</a>
        </div>
      </div>
    </div>
  );
}

export default AboutEclipse;

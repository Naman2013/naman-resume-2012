import React from 'react';
import s from './ViewerVideoDetails.scss';

function ViewerVideoDetails() {
  return (
    <div className={s.viewerVideoDetailsRoot}>
      <h2 className={s.title}>Top Clip</h2>
      <h3 className={s.videoTitle}>Eclipses in History: Fear Turns to Understanding</h3>
      <div className={s.videoDescription}>
        <p>
          Since humans have cowered in caves, the eclipse has been a source of
          anxiety, interpretation, power, and, ultimately insight. Join us for a
          survey of the most notable times that the moon, sun and earth in
          alignment have worked together to impact history.
        </p>
      </div>

      <div className={s.hostedByContainer}>
        <h5 className={s.hostedByTitle}>Hosted by:</h5>
        <div className={s.hostDetail}>
          <span className={s.profilePicture} />
          <p className={s.profileName}>
            Dr. Lucie Green <span className={s.profileNameGuestStatus}>Special guest editor</span>
          </p>
        </div>
      </div>

      <div className={s.advertisement}>
        <img alt="Advertisement placement" src="" />
      </div>
    </div>
  );
}

export default ViewerVideoDetails;

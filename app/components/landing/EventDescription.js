import React from 'react';
import style from './EventDescription.scss';

function EventDescription() {
  return (
    <div className={style.eventDescriptionWrapper}>
      <div className={style.container}>
        <div className={style.header}>
          <span>Registration for this event is now closed</span>
          <div className={style.btnGroup}>
            {
              /**
              <span className={style.shareBtn} />
              <span className={style.bookmarkBtn} />
              */
            }
          </div>
        </div>
        <div className={style.content}>
          <div className={style.description}>
            Toward the goal of connecting humanity through communal exploration of the universe, Slooh is bringing its community together to celebrate the total solar eclipse in Stanley, Idaho. The three day cultural pot-luck will bring together diverse perspectives about space in anticipation of this momentous occasion. In keeping with its mission, Slooh will set the stage for the community to step forward and offer their own visions of the eclipse. We are open to the spiritual, the artistic, the imaginative, along with the scientific, just as members express themselves on the website every day together looking up at space through Slooh’s global network of telescopes.
          </div>
          <div className={style.data}>
            <div className={style.date}>
              <div className={style.dataItemHeader}>Date & Time:</div>
              <div className={style.dataItemContent}>
                Fri. August 18 - Tues. August 22 Starting 12:00 PM MDT
              </div>
              {
                /**
                <button className={style.dataItemBtn}>Add to Calendar</button>
                */
              }
            </div>
            <div className={style.place}>
              <div className={style.dataItemHeader}>Location:</div>
              <div className={style.dataItemContent}>
                Elk Creek Campground, Sawtooth National Forest Stanley, ID
              </div>

              {
                /**
                  <button className={style.dataItemBtn}>View Map</button>
                */
              }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDescription;

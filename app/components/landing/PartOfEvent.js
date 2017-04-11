import React from 'react';
import style from './PartOfEvent.scss';

import { categories } from '../publish-post/select-content-category';

function PartOfEvent() {
  return (
    <div className={style.partOfEventWrapper}>
      <div className={style.container}>
        <div className={style.bg}>
          <div className={style.mainContent}>
            <div className={style.header}>
              Be a Part
              <br />
              of Our Event
            </div>
            <div className={style.description}>
              In keeping with its mission, Slooh will set the stage for the community to step forward and offer their own visions of the eclipse. We are open to the spiritual, the artistic, the imaginative, along with the scientific, just as members express themselves on the website every day together looking up at space through Slooh’s global network of telescopes.
            </div>
            <div className={style.btnGroup}>
              {
                /**
                  <button className={style.actionBtn}>Apply Now</button>
                  <button className={`${style.actionBtn} ${style.inverse}`}>Terms & Conditions</button>
                */
              }
            </div>
          </div>
        </div>
        <ul className={style.categories}>
          {categories.map(category => {
            return (
              <li key={category.contentKey} className={`${style.categoryItem} ${category.className}`}>
                {category.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PartOfEvent;

import React from 'react';
import style from './WhatToImageNext.scss';

const objects = [
  {
    info: 'As featured in the first Outer Limits episode.',
    imgURL: 'assets/icons/galaxy.svg',
    title: 'Andromeda Galaxy (M31)',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam atque debitis dolorem maxime nulla quod? Laborum magni repellendus sit.',
  },
  {
    info: 'As featured in the first Outer Limits episode.',
    imgURL: 'assets/icons/Jupiter.svg',
    title: 'Andromeda Galaxy (M31)',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam atque debitis dolorem maxime nulla quod? Laborum magni repellendus sit.',
  },
  {
    info: 'As featured in the first Outer Limits episode.',
    imgURL: 'assets/icons/Jupiter.svg',
    title: 'Andromeda Galaxy (M31)',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam atque debitis dolorem maxime nulla quod? Laborum magni repellendus sit.',
  },
];

function WhatToImageNext() {
  return (
    <div className={`${style.whatToImageNextContainer} text-center`}>
      <div className={style.mainTitle}>
        Here are some ideas on what to image next...
      </div>
      <div className="row">
        {
          objects.map((obj, key) => {
            return (
              <div key={key} className={`${style.object} col-xs-12 col-md-4`}>
                <div className={style.info}>{obj.info}</div>
                <img src={obj.imgURL} alt="" className={style.objImage} />
                <div className={style.title}>{obj.title}</div>
                <div className={style.description}>{obj.description}</div>
                <div>
                  <button className={style['btn-primary']}>
                    Go to Object Page
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default WhatToImageNext;

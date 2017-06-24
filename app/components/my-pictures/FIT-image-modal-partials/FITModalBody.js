import React from 'react';
import uniqueId from 'lodash/uniqueId';
import s from './FITModalBody.scss';

export default function FITModalBody({ groupList, infoText }) {
  return (
    <div className={s.FITModalBody}>
      {
        groupList.map(group => (
          <ul key={uniqueId()} className={s.FITImageList}>
            <li className={s.imageGroup}>
              <h3 className={s.imageGroupTitle}>{group.groupName}</h3>
              <ul className={s.imageList}>
                {
                  group.groupImageList.map(image => (
                    <li key={uniqueId()} className={s.image}>
                      <a className={s.imageLink} target="_blank" rel="noopener noreferrer" href={image.imageURL}>{image.imageTitle}</a>
                    </li>
                  ))
                }
              </ul>
            </li>
          </ul>
        ))
      }

      <h4 className={s.subTitle}>
        {infoText}
      </h4>
    </div>
  );
}

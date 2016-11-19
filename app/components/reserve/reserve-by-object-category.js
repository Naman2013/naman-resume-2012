import React from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';

const ReserveObjectsCategory = ({ items = [], onClickHandler }) => {
  return (
    <div className={styles.objectCategories}>
      <ul>
        {
          _.map(items, (item, i) => {
            return (
              <li key={i} onClick={onClickHandler(item)} className="item">
                <img className="icon" src={item.categoryIcon} /> {item.title}
              </li>   
            );
          })
        }
      </ul>
    </div>
  )
}

export default ReserveObjectsCategory;

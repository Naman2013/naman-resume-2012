import React from 'react';
import _ from 'lodash';
import styles from './reserve-by-object.scss';

const ReserveObjectsList = ({ objects = [], onClickHandler }) => {
  return (
    <div className={styles.objectCategories}>
      <ul>
        {
          _.map(objects, (obj, i) => {
            return (
              <li key={i}>
                {obj.title}
                <ul>
                {
                  _.map(obj.items, (item, i) => {
                    return (
                      <li key={i} onClick={onClickHandler(item)}>{item.title}</li>
                    );
                  })
                }
                </ul>
              </li>   
            );
          })
        }
      </ul>
    </div>
  )
}

export default ReserveObjectsList;

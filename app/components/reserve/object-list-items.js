import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

const ObjectItems = ({ items, selectedItem = {}, handleClickEvent }) => {
  return (
    <ul className="object-items">

      {
        _.map(items, (item, i) => {
          
          // TODO: replace selectedItem.title === item.title with id comparisons
          const elementStyles = classnames({
            'object-item': true,
            selected: selectedItem.title === item.title
          });

          return (
            <li
              className={elementStyles}
              key={i}
              onClick={handleClickEvent(item)}>
              {item.title}
            </li>
          );
        })
      }

    </ul>
  );
}

export default ObjectItems;

import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

const ObjectItems = (props) => {
  const {
    items,
    selectedItemIndex,
    handleClickEvent,
    selectedSubCategory
  } = props;

  return (
    <ul className="object-items">

      {
        _.map(items, (item, i) => {

          // TODO: replace selectedItem.title === item.title with id comparisons
          const elementStyles = classnames({
            'object-item': true,
            'selected': selectedSubCategory && selectedItemIndex === i
          });

          return (
            <li
              className={elementStyles}
              key={i}
              onClick={ () => { handleClickEvent(item, i); } }>
              {item.title}
            </li>
          );
        })
      }

    </ul>
  );
}

export default ObjectItems;

/**
  select list API documentation:

  this list will generate a list with either just elements
  or sections with titles and elements.

  to incorporate a section title, use the object API to
  include the title in the very first element in the
  next set

  [ // flat select design
    {
      title:
      option:
    },
    'option',
    {
      title:
      option:
    },
    'option',
    'option',
  ]

*/

import React, { Component, PropTypes } from 'react';
import style from './reservation-select-list.scss';

class ReservationSelectList extends Component {
  generateId(seed) {
    const random = Math.floor(Math.random() * 99999);
    return `${seed}-${random}`;
  }

  render() {
    const {
      options,
      name,
      selectedIndex,
      handleSelectChange,
      listHeight } = this.props;

    const inlineStyle = {
      height: `${listHeight}px`,
    };

    return(
      <div
        className="reservation-select-list"
        style={inlineStyle}
      >
        {
          options.map((option, index) => {
            const elementId = this.generateId(index);
            const isChecked = selectedIndex == index;

            // here is where we determine whether or not we have a titled Option
            const titledOptions = option.hasOwnProperty('title');
            const title = titledOptions ? option.title : false;
            const optionContent = titledOptions ? option.option : option;

            return(
              <div key={elementId}>
                {
                  title ?
                  <h5 className="title">{title}</h5> : null
                }
                <input checked={isChecked} onChange={handleSelectChange} value={index} ref={elementId} name={name} id={elementId} className="multi-option-list-option" type="radio" />
                <label className="multi-option-list-label" htmlFor={elementId}>{optionContent}</label>
              </div>
            );
          })
        }
      </div>
    );
  }
}

ReservationSelectList.defaultProps = {
  listHeight: 340,
};

ReservationSelectList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired, // strings or react components
  name: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func,
  listHeight: PropTypes.number,
  selectedIndex: PropTypes.string,
};

export default ReservationSelectList;

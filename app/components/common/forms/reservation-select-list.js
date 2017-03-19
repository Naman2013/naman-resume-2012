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
import _ from 'lodash';
import classnames from 'classnames';
import './reservation-select-list.scss';

function generateId(seed) {
  const random = Math.floor(Math.random() * 99999);
  return `${seed}-${random}`;
}

class ReservationSelectList extends Component {
  render() {
    const {
      className,
      options,
      name,
      selectedIndex,
      handleSelectChange,
      listHeight,
      theme
    } = this.props;

    const inlineStyle = {
      height: `${listHeight}px`,
    };

    const themeClassname = `theme-${theme}`;

    return (
      <div
        className={`reservation-select-list ${className}`}
        style={inlineStyle}
      >
        {
          options.map((option, index) => {
            const elementId = generateId(index);
            const isChecked = parseInt(selectedIndex, 10) === index;
            // here is where we determine whether or not we have a titled Option
            const isTitle = _.has(option, 'title');
            const optionContent = option.option || option;

            // if the option has a property enabled to read - use that - otherwise set it to true
            const enabled = (_.has(option, 'enabled')) ? option.enabled : true;

            const labelClasses = classnames(`multi-option-list-label ${themeClassname}`, {
              disabled: !enabled,
            });

            if (isTitle) {
              return (
                <div key={elementId}>
                  <h5 className="title">{option.title}</h5>
                </div>
              );
            }

            return (
              <div key={elementId}>
                {
                  enabled ?
                    <input checked={isChecked} onChange={handleSelectChange} value={index} ref={elementId} name={name} id={elementId} className="multi-option-list-option" type="radio" /> : null
                }
                <label
                  className={labelClasses}
                  htmlFor={elementId}
                >
                  {optionContent}
                </label>
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
  selectedIndex: undefined,
  theme: 'light',
  className: '',
};

ReservationSelectList.propTypes = {
  // strings or react components
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  name: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string,
  listHeight: PropTypes.number,
  theme: PropTypes.oneOf(['light', 'dark']),
  className: PropTypes.string,
};

export default ReservationSelectList;

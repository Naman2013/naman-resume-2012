/**
  this component is similar to reservation-select-list however
  it doesnt use an input radio field to make the fields toggable
  toggable select list API documentation:

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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import classnames from 'classnames';
import { customScrollBar } from '../../../styles/custom-ui';
import { white, lightTurqoise, lightGray, darkBlueGray } from '../../../styles/variables/colors';

function generateId(seed) {
  const random = Math.floor(Math.random() * 99999);
  return `${seed}-${random}`;
}

class SelectToggleList extends Component {

  static defaultProps = {
    listHeight: 340,
    selectedIndex: undefined,
    theme: 'light',
    className: '',
  };

  static propTypes = {
    // strings or react components
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
    name: PropTypes.string.isRequired,
    handleSelectedChange: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number,
    listHeight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    theme: PropTypes.oneOf(['light', 'dark']),
    className: PropTypes.string,
  };
  render() {
    const {
      className,
      options,
      name,
      selectedIndex,
      handleSelectedChange,
      listHeight,
      theme
    } = this.props;

    const inlineStyle = {
      height: `${listHeight}px`,
    };

    const themeClassname = `theme-${theme}`;

    return (
      <div
        className={`select-list ${className}`}
        style={inlineStyle}
      >
        {
          options.map((option, index) => {
            const elementId = generateId(index);
            const isChecked = parseInt(selectedIndex, 10) === index;
            // here is where we determine whether or not we have a titled Option
            const isTitle = has(option, 'title');
            const optionContent = option.option || option;

            // if the option has a property enabled to read - use that - otherwise set it to true
            const enabled = (has(option, 'enabled')) ? option.enabled : true;

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
                    <input onClick={() => handleSelectedChange(index)} ref={elementId} name={name} id={elementId} className={classnames('multi-option-list-option', { checked: isChecked })} /> : null
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
      <style jsx>{`
        /**
          theme-dark: for placing over a light background
        */

        ${customScrollBar('select-list')}

        .select-list {
          overflow-y: scroll;
        }

        .title {
          padding: 10px 0 0 20px;
          font-size: 18px;
          font-weight: normal;
        }

        .multi-option-list-label {
          cursor: pointer;
          display: block;
          margin-bottom: 2px;
          padding: 5px 0 5px 20px;
          font-size: 16px;
          -webkit-border-top-left-radius: 20px;
          -webkit-border-bottom-left-radius: 20px;
          -moz-border-radius-topleft: 20px;
          -moz-border-radius-bottomleft: 20px;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }

        .theme-dark {
          color: ${darkBlueGray};
        }

        .disabled {
          cursor: not-allowed;
          color: ${lightGray};
        }

        .multi-option-list-option {
          display: none;
        }

        .multi-option-list-option.checked + .multi-option-list-label,
        .multi-option-list-label:hover {
          color: ${white};
          background: ${lightTurqoise};
        }

      `}</style>
      </div>
    );
  }
}

export default SelectToggleList;

import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import styles from './TelescopNavigationDropDown.style';

const {
  func,
  bool,
  string,
  number,
  shape,
  arrayOf,
  oneOfType,
  noop,
  object,
} = PropTypes;

const CustomOption = (
  { innerRef, innerProps, children, value },
  listOfTelescopes
) => {
  return (
    <div ref={innerRef} {...innerProps} className="dropdown-opt">
      <div className="dropdown-name">
        <img
          className="option-icon"
          src={listOfTelescopes[value].thumbnailURL}
          alt=""
        />
        {children}
      </div>
    </div>
  );
};

export default class TelescopNavigationDropDown extends Component {
  static propTypes = {
    selectedIndex: number,
    options: arrayOf(
      shape({
        value: oneOfType([number, string]),
        label: oneOfType([string, object]),
      })
    ).isRequired,
    onSelect: func.isRequired,
    handleBlur: func,
    handleMenuClose: func,
    autoFocus: bool,
    defaultMenuIsOpen: bool,
    customOption: PropTypes.node,
  };

  static defaultProps = {
    selectedIndex: 0,
    autoFocus: false,
    defaultMenuIsOpen: false,
    handleBlur: noop,
    handleMenuClose: noop,
    customOption: CustomOption,
  };

  handleChange = selectedOption => {
    const { onSelect } = this.props;
    onSelect(selectedOption);
  };

  render() {
    const {
      defaultMenuIsOpen,
      options,
      handleBlur,
      handleMenuClose,
      selectedIndex,
      autoFocus,
      customOption,
      listOfTelescopes,
    } = this.props;

    return (
      <div className="root telescop-select-wrapper">
        <Select
          defaultMenuIsOpen={defaultMenuIsOpen}
          components={{
            Option: props =>
              customOption(props, listOfTelescopes, selectedIndex),
          }}
          defaultValue={options[0]}
          onChange={this.handleChange}
          onBlur={handleBlur}
          onMenuClose={handleMenuClose}
          options={options}
          value={selectedIndex}
          isSearchable={false}
          classNamePrefix="slooh-select"
          autoFocus={autoFocus}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

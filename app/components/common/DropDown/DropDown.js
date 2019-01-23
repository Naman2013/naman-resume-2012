/***********************************
* V4 DropDown component
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import uniqueId from 'lodash/uniqueId';
import noop from 'lodash/noop';
import Select from 'react-select';
import styles from './DropDown.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const CustomOption = (props) => (
  <div ref={props.innerRef} {...props.innerProps} className="dropdown-opt">
    <div className="dropdown-name">{props.children}</div>
    <div className="focused-ind" />
  </div>
);

class DropDown extends Component {
  static propTypes = {
    selectedIndex: number,
    placeholder: string,
    options: arrayOf(shape({
      value: oneOfType([number, string]),
      label: string,
    })),
    handleSelect: func.isRequired,
    handleBlur: func,
    handleMenuClose: func,
    autoFocus: bool,
    defaultMenuIsOpen: bool,
  };

  static defaultProps = {
    selectedIndex: 0,
    autoFocus: false,
    defaultMenuIsOpen: false,
    handleBlur: noop,
    handleMenuClose: noop,
  };

  handleChange = (selectedOption) => {
    this.props.handleSelect(null, selectedOption);
  }

  render() {
    const {
      placeholder,
      options,
      selectedIndex,
      defaultMenuIsOpen,
      autoFocus,
      handleMenuClose,
      handleBlur,
    } = this.props;

    return (
      <div className="root">
        <Select
          defaultMenuIsOpen={defaultMenuIsOpen}
          components={{ Option: CustomOption }}
          defaultValue={options[0]}
          onChange={this.handleChange}
          onBlur={handleBlur}
          onMenuClose={handleMenuClose}
          options={options}
          value={options[selectedIndex]}
          isSearchable={false}
          placeholder={placeholder}
          classNamePrefix="slooh-select"
          autoFocus={autoFocus}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DropDown;

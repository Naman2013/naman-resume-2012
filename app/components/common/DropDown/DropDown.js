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
  };

  static defaultProps = {
    selectedIndex: 0,
  };

  handleChange = (selectedOption) => {
    this.props.handleSelect(null, selectedOption);
  }

  render() {
    const {
      placeholder,
      options,
      selectedIndex,
    } = this.props;

    return (
      <div className="root">
        <Select
          components={{ Option: CustomOption }}
          defaultValue={options[0]}
          onChange={this.handleChange}
          options={options}
          value={options[selectedIndex]}
          isSearchable={false}
          placeholder={placeholder}
          classNamePrefix="slooh-select"
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DropDown;

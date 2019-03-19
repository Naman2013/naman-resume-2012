import React, { Component } from 'react';
import RSelect from 'react-select';
import './styles.scss';

export class Select extends Component {
  getCustomOption = props => (
    <div
      ref={props.innerRef}
      {...props.innerProps}
      className={`dropdown-opt${props.data.disabled ? ' disabled' : ''}`}
    >
      <div className="dropdown-name">{props.children}</div>
      <div className="focused-ind" />
    </div>
  );

  getValueFromOptions = value => {
    const { options } = this.props;
    return options.find(item => item.value === value);
  };

  handleChange = selectedOption => {
    const { handleChange } = this.props;
    handleChange(selectedOption.value);
  };

  render() {
    const { placeholder, options, value, isDisabled } = this.props;
    return (
      <div className="slooh-select-container">
        <RSelect
          components={{ Option: this.getCustomOption }}
          onChange={this.handleChange}
          options={options}
          value={value && this.getValueFromOptions(value)}
          isSearchable={false}
          placeholder={placeholder}
          classNamePrefix="slooh-react-select"
          isDisabled={isDisabled}
          isOptionDisabled={option => option.disabled}
        />
      </div>
    );
  }
}

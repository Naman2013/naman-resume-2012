import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';
import uniqueId from 'lodash/uniqueId';
import styles from './select-list-option.style';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;


const SelectListOption = (props) => {
  const {
    handleSelectChange,
    id,
    index,
    isChecked,
    name,
    value,
  } = props;
  return (
    <Fragment>
      <input
        checked={isChecked}
        className="multi-select-option"
        data-index={index}
        id={id}
        name={name}
        onChange={handleSelectChange}
        type="radio"
        value={value}
      />
      <style jsx>{styles}</style>
    </Fragment>
  );
};

SelectListOption.propTypes = {
  handleSelectChange: func.isRequired,
  id: string.isRequired,
  index: number.isRequired,
  isChecked: bool,
  name: string.isRequired,
  value: string.isRequired,
};

SelectListOption.defaultProps = {
  isChecked: false,
};

export default SelectListOption;

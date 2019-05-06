import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import SelectListOption from './select-list-option';
import styles from './select-list.style';

const { arrayOf, func, shape, string } = PropTypes;

const SelectList = props => {
  const { name, handleSelectChange, options, selectedValue } = props;
  return (
    <div className="root">
      {options.map((opt, index) => {
        const elementId = `option-${index}-${opt.value}`;
        const isChecked = selectedValue === opt.value;
        return (
          <div key={uniqueId()}>
            <SelectListOption
              handleSelectChange={handleSelectChange}
              id={elementId}
              index={index}
              isChecked={isChecked}
              name={name}
              value={opt.value}
            />
            <label
              className={classnames('multi-select-label', {
                active: isChecked,
              })}
              htmlFor={elementId}
            >
              {opt.label}
            </label>
          </div>
        );
      })}
      <style jsx>{styles}</style>
    </div>
  );
};

SelectList.propTypes = {
  options: arrayOf(
    shape({
      label: string.isRequired,
      value: string.isRequired,
    })
  ),
  name: string.isRequired,
  selectedValue: string,
  handleSelectChange: func.isRequired,
};

SelectList.defaultProps = {
  options: [],
  selectedValue: null,
};

export default SelectList;

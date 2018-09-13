import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { lynch, seashell, shadows, gainsboro } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';
const { shape, string } = PropTypes;

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  <label
    className={classnames('root', { error: touched && error })}
  >
    <input
      className="field-input"
      type={type}
      {...input}
      placeholder={label}
    />
    {touched && error && <span className="error-text">{error}</span>}
    <style jsx>{`
      .root {
        margin: 15px;
        display: block;
      }

      .field-input {
        display: block;
        width: 100%;
        padding: 10px;
        font-size: 14px;
        font-family: Arial, sans-serif;
        font-weight: normal;
        line-height: 1.5;
        color: ${gainsboro};
        background-color: ${seashell};
        background-clip: padding-box;
        border: 1px solid ${shadows};
        border-radius: .25rem;
      }

      .error-text {
        display: block;
        margin: 5px 0 10px 0;
        color: red;
        font-size: 11px;
        text-align: right;
      }
    `}</style>
  </label>
);

renderField.propTypes = {
  input: shape({}).isRequired,
  label: string.isRequired,
  type: string.isRequired,
  meta: shape({}).isRequired,
};

export default renderField;

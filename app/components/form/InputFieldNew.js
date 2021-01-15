import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  astronaut,
  lynch,
  seashell,
  shadows,
  gainsboro,
} from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';
const { shape, string } = PropTypes;

const renderField = ({
  input,
  label,
  type,
  className,
  id,
  disabled,
  meta: { touched, error },
  currentValue,
  editable,
}) => (
  <label
    className={classnames(className ? `${className} root` : 'root', {
      error: touched && error,
    })}
  >
    <input id={id} readOnly={editable} className="field-input" type={type} disabled={disabled} {...input} placeholder={label} value={currentValue} />
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
        font-family: ${secondaryFont};
        font-weight: normal;
        line-height: 1.5;
        color: ${astronaut};
        background-color: ${seashell};
        background-clip: padding-box;
        border: 1px solid ${shadows};
        border-radius: 0.25rem;
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

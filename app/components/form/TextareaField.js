import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  astronaut,
  lynch,
  seashell,
  shadows,
  gainsboro,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';

const { object, string } = PropTypes;

export default class renderField extends Component {
  static propTypes = {
    input: object.isRequired,
    label: string.isRequired,
    type: string.isRequired,
    meta: object.isRequired,
    className: string,
  };

  render() {
    const {
      input,
      label,
      type,
      meta: { touched, error },
      className,
    } = this.props;

    return (
      <label className={classnames('root', { error: touched && error })}>
        {touched && error && <span className="error-text">{error}</span>}
        <textarea
          className={`field-input ${className}`}
          type={type}
          placeholder={label}
          {...input}
        >
          {input}
        </textarea>

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
  }
}

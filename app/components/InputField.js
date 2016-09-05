import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const { object, string } = PropTypes;

export default class renderField extends Component {
  static propTypes = {
    input: object.isRequired,
    label: string.isRequired,
    type: string.isRequired,
    meta: object.isRequired,
  };

  render() {
    const { input, label, type, meta: { touched, error } } = this.props;

    return (
      <label className={classnames({ error: touched && error })}>
        <span>{label}</span>
        <input type={type} {...input} />
        {touched && error && <span className="error-description">{error}</span>}
      </label>
    );
  }
}

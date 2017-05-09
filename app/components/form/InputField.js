import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

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
    const { input, label, type, meta: { touched, error }, className } = this.props;

    return (
      <label className={classnames({ error: touched && error })}>
        {type !== 'radio' && <span>{label}</span>}
        <input type={type} {...input} className={className} />
        &nbsp;{type === 'radio' && <span>{label}</span>}
        {type !== 'radio' && touched && error && <span className="error-description">{error}</span>}
      </label>
    );
  }
}

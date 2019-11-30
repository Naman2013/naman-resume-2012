import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const {
  func,
  string,
  bool,
} = PropTypes;

class StyleButton extends React.Component {

  static propTypes = {
    onToggle: func.isRequired,
    style: string.isRequired,
    active: bool.isRequired,
    label: string.isRequired,
  }

  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    const { active, readOnly } = this.props;
    let className = cx('RichEditor-styleButton', {
      'RichEditor-activeButton': active,
      'RichEditor-readOnly': readOnly,
    });

    return (
      <span
        className={className}
        onMouseDown={this.onToggle}
        dangerouslySetInnerHTML={{ __html: this.props.label }}
      />
    );
  }
}

export default StyleButton;

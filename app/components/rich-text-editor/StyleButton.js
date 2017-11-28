import React from 'react';
import PropTypes from 'prop-types';

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
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

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

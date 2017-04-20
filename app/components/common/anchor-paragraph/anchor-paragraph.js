import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnchorParagraph extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.scrollTop = this.scrollTop.bind(this);
  }

  scrollTop() {
    // Timeout is some hack - window.scrollTo won't work without it
    setTimeout(() => {
      // 80 is header height and some padding
      window.scrollTo(0, this.paragraph.offsetTop - 80);
    }, 100);
  }

  componentDidMount() {
    if (this.props.isActive) {
      this.scrollTop();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isActive && !prevProps.isActive) {
      this.scrollTop();
    }
  }

  render() {
    return (
      <div ref={ref => this.paragraph = ref} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default AnchorParagraph;

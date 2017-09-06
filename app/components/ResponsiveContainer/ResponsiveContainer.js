/**
  ResponsiveContainer will report its current size back to its host

  ResponsiveContainer is designed to take up 100% of the width of its containing
  parent.
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

const PAGE_RESIZE_DEBOUNCE = 150;

class ResponsiveContainer extends Component {
  static defaultProps = {
    width: 300,
    height: 200,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResizeEvent);
  }

  componentWillUnMount() {
    window.removeEventListener('resize', this.handleResizeEvent);
  }

  handleResizeEvent = debounce(() => {
    const { offsetHeight, offsetWidth } = this.container;
    this.props.onResizeHandler({ width: offsetWidth, height: offsetHeight });
  }, PAGE_RESIZE_DEBOUNCE)

  container = null;

  render() {
    return (
      <div
        className="responsive-container-root"
        ref={(container) => { this.container = container; }}
      >

        { this.props.children }

        <style jsx>{`
          responsive-container-root {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    );
  }
}

ResponsiveContainer.propTypes = {
  onResizeHandler: PropTypes.func.isRequired,
};

export default ResponsiveContainer;

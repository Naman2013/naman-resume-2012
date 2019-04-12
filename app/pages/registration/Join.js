import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styles from './Join.style';

class Join extends Component {

  static defaultProps = {
  }

  state = {};

  render() {
    const {
      location,
      children,
    } = this.props;
    return (
      <div className="join-root">

        {
          cloneElement(children, {
            pathname: location.pathname,
          })
        }
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default Join;

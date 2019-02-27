/***********************************
 * V4 Mission Detail List populated with info
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './BlueLineDrop.style';

const { bool, func, string } = PropTypes;

class BlueLineDrop extends Component {
  static propTypes = {
    isDesktop: bool,
    title: string,
    render: func.isRequired,
  };

  static defaultProps = {
    isDesktop: false,
    title: '',
  };

  state = {
    showInfo: !this.props.isDesktop,
  };

  toggleInfo = e => {
    e.preventDefault();

    this.setState(state => ({
      showInfo: !state.showInfo,
    }));
  };

  render() {
    const { isDesktop, title, theme, render } = this.props;
    const { showInfo } = this.state;
    return (
      <div
        style={theme}
        className={classnames({
          'component-container': isDesktop && !showInfo,
        })}
      >
        {isDesktop ? (
          <div
            className={classnames('title-container', {
              open: showInfo,
            })}
          >
            <span
              className="title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <img
              className={classnames('action', {
                up: showInfo,
              })}
              onClick={this.toggleInfo}
              src="https://vega.slooh.com/assets/v4/common/arrow_down.svg"
            />
          </div>
        ) : (
          <span
            className="title"
            style={{ textAlign: 'initial' }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}

        {showInfo ? (
          <div className="container-detail-items">{render()}</div>
        ) : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default BlueLineDrop;

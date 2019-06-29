/***********************************
 * V4 Observations Page
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { darkGray, gray } from 'app/styles/variables/colors';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from 'app/styles/variables/breakpoints';

const {
  any,
  arrayOf,
  bool,
  func,
  instanceOf,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class ResponsiveTwoColumnContainer extends Component {
  static propTypes = {
    isScreenSize: bool.isRequired,
    renderMainContent: func.isRequired,
    renderAsideContent: func.isRequired,
    renderNavigationComponent: func.isRequired,
  };

  static defaultProps = {};

  state = {
    showMainContainer: true,
    showAsideContainer: this.props.isScreenSize,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isScreenSize && nextProps.isScreenSize) {
      this.setState({
        showMainContainer: nextProps.isScreenSize,
        showAsideContainer: nextProps.isScreenSize,
      });
    } else if (this.props.isScreenSize && !nextProps.isScreenSize) {
      this.setState(state => ({
        showMainContainer: state.showMainContainer,
        showAsideContainer:
          state.showMainContainer && state.showAsideContainer
            ? false
            : state.showAsideContainer,
      }));
    }
  }

  onShowMainContainer = () => {
    if (!this.props.isScreenSize) {
      this.setState({
        showMainContainer: true,
        showAsideContainer: false,
      });
    }
  };

  onShowAsideContainer = () => {
    if (!this.props.isScreenSize) {
      this.setState({
        showMainContainer: false,
        showAsideContainer: true,
      });
    }
  };

  render() {
    const { onShowAsideContainer, onShowMainContainer, props, state } = this;
    const {
      asideContainerTitle,
      mainContainerTitle,
      renderNavigationComponent,
      renderAsideContent,
      renderMainContent,
      isScreenSize,
    } = props;
    const { showMainContainer, showAsideContainer } = state;
    return (
      <div className="root">
        {!isScreenSize && (
          <div className="split-nav">
            {renderNavigationComponent({
              showMainContainer,
              onShowMainContainer,
              showAsideContainer,
              onShowAsideContainer,
            })}
          </div>
        )}
        <div className="main-container responsive-two-cols">
          {showMainContainer ? (
            <div className="left-container">{renderMainContent()}</div>
          ) : null}
          {showAsideContainer ? (
            <div className="right-container">{renderAsideContent()}</div>
          ) : null}
        </div>
        <style jsx>{`
          .root {
            font-family: ${primaryFont};
            color: ${darkGray};
            min-height: 100px;
          }

          .is-hidden {
            visibility: hidden;
          }

          .main-container {
            display: flex;
            width: 100%;
          }

          .left-container {
            margin: 0 auto;
          }

          .left-container,
          .right-container {
            width: 100%;
          }

          .arrow {
            margin-bottom: -5px;
          }

          .split-nav {
            display: flex;
            width: 100%;
          }

          @media screen and (min-width: 1024px) {
            .root {
              width: 940px;
              margin: 0 auto;
            }

            .right-container {
              width: 300px;
            }

            .left-container {
              width: 620px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default ResponsiveTwoColumnContainer;

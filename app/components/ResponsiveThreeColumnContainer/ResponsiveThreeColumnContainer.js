/***********************************
 * V4 Observations Page
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { darkGray } from 'app/styles/variables/colors';
import { primaryFont } from 'app/styles/variables/fonts';

const { bool, func } = PropTypes;

class ResponsiveThreeColumnContainer extends Component {
  static propTypes = {
    isScreenSize: bool.isRequired,
    isAdditionalContainerPresent: bool.isRequired,
    renderMainContent: func.isRequired,
    renderAsideContent: func.isRequired,
    renderNavigationComponent: func.isRequired,
    renderAdditionalContainer: func.isRequired,
  };

  static defaultProps = {};

  state = {
    showMainContainer: true,
    showAsideContainer: this.props.isScreenSize,
    showAdditionalContainer: !this.props.isScreenSize,
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
        showAdditionalContainer: false,
      });
    }
  };

  onShowAsideContainer = () => {
    if (!this.props.isScreenSize) {
      this.setState({
        showMainContainer: false,
        showAsideContainer: true,
        showAdditionalContainer: false,
      });
    }
  };

  onShowAdditionalContainer = () => {
    const { isScreenSize, isAdditionalContainerPresent } = this.props;

    if (!isScreenSize && isAdditionalContainerPresent) {
      this.setState({
        showMainContainer: false,
        showAsideContainer: false,
        showAdditionalContainer: true,
      });
    }
  };

  render() {
    const {
      onShowAsideContainer,
      onShowMainContainer,
      onShowAdditionalContainer,
      props,
      state,
    } = this;
    const {
      renderNavigationComponent,
      renderAsideContent,
      renderMainContent,
      isScreenSize,
    } = props;
    const {
      showMainContainer,
      showAsideContainer,
      showAdditionalContainer,
    } = state;

    return (
      <div className="root">
        {!isScreenSize && (
          <div className="split-nav">
            {renderNavigationComponent({
              showMainContainer,
              onShowMainContainer,
              showAsideContainer,
              onShowAsideContainer,
              showAdditionalContainer,
              onShowAdditionalContainer,
            })}
          </div>
        )}
        <div className="main-container responsive-two-cols">
          {showMainContainer && (
            <div className="left-container">{renderMainContent()}</div>
          )}
          {showAsideContainer && (
            <div className="right-container">{renderAsideContent()}</div>
          )}
          {showAdditionalContainer && !showMainContainer && (
            <div className="additional-container">
              It's additional container Baby!
            </div>
          )}
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
          .right-container,
          .additional-container {
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

export default ResponsiveThreeColumnContainer;

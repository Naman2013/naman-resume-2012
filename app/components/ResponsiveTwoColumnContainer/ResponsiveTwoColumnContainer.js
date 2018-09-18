/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { darkGray, gray } from 'styles/variables/colors';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';

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
    isScreenLarge: bool.isRequired,
    renderMainContent: func.isRequired,
    renderAsideContent: func.isRequired,
    renderNavigationComponent: func.isRequired,
  }

  static defaultProps = {
  };

  state = {
    showMainContainer: true,
    showAsideContainer: this.props.isScreenLarge,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isScreenLarge && nextProps.isScreenLarge) {
      this.setState({
        showMainContainer: nextProps.isScreenLarge,
        showAsideContainer: nextProps.isScreenLarge,
      });
    } else if (this.props.isScreenLarge && !nextProps.isScreenLarge) {
      this.setState(state => ({
        showMainContainer: state.showMainContainer,
        showAsideContainer: (state.showMainContainer && state.showAsideContainer) ?
          false : state.showAsideContainer,
      }));
    }
  }

  onShowMainContainer = () => {
    if (!this.props.isScreenLarge) {
      this.setState({
        showMainContainer: true,
        showAsideContainer: false,
      });
    }
  }

  onShowAsideContainer = () => {
    if (!this.props.isScreenLarge) {
      this.setState({
        showMainContainer: false,
        showAsideContainer: true,
      });
    }
  }

  render() {
    const {
      onShowAsideContainer,
      onShowMainContainer,
      props,
      state,
    } = this;
    const {
      asideContainerTitle,
      mainContainerTitle,
      renderNavigationComponent,
      renderAsideContent,
      renderMainContent,
    } = props;
    const { showMainContainer, showAsideContainer } = state;
    return (<div className="root">
      <div className="split-nav">
        {renderNavigationComponent({
          showMainContainer,
          onShowMainContainer,
          showAsideContainer,
          onShowAsideContainer,
        })}
      </div>
      <div className="main-container">
        {showMainContainer ? <div className="left-container">
          {renderMainContent()}
        </div> : null}
        {showAsideContainer ? <div className="right-container">
          {renderAsideContent()}
        </div> : null}
      </div>
      <style jsx>{`

        .root {
          font-family: ${primaryFont};
          color: ${darkGray};
          max-width: 940px;
          min-height: 100px;
          margin: 0 auto;
        }


        .is-hidden {
          visibility: hidden;
        }

        .main-container {
          display: flex;
        }

        .left-container {
          margin: 0 auto;
        }

        .split-nav {
          display: none;
          width: 100%;
        }

        .left-container,
        .right-container {
          width: 620px;
        }

        .arrow {
          margin-bottom: -5px;
        }

        .split-nav {
          display: flex;
          width: 100%;
        }


        @media ${screenMedium} {
          .root {
            max-width: 940px;
          }

          .split-nav {
            display: none;
            width: 100%;
          }

          .right-container {
            width: 300px;
          }

        }

      `}</style>
    </div>);
  }
}

export default ResponsiveTwoColumnContainer;

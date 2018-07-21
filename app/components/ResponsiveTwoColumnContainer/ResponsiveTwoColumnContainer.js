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
    isDesktop: bool.isRequired,
    renderMainContent: func.isRequired,
    renderAsideContent: func.isRequired,
    renderNavigationComponent: func.isRequired,
  }

  static defaultProps = {
  };

  state = {
    showMainContainer: true,
    showAsideContainer: this.props.isDesktop,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isDesktop && nextProps.isDesktop) {
      this.setState({
        showMainContainer: nextProps.isDesktop,
        showAsideContainer: nextProps.isDesktop,
      });
    } else if (this.props.isDesktop && !nextProps.isDesktop) {
      this.setState(state => ({
        showMainContainer: state.showMainContainer,
        showAsideContainer: (state.showMainContainer && state.showAsideContainer) ?
          false : state.showAsideContainer,
      }));
    }
  }

  onShowMainContainer = () => {
    if (!this.props.isDesktop) {
      this.setState({
        showMainContainer: true,
        showAsideContainer: false,
      });
    }
  }

  onShowAsideContainer = () => {
    if (!this.props.isDesktop) {
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

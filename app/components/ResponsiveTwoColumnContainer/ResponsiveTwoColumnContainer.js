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
      <div className="split-nav component-container">
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


        .component-container {
          margin: 25px;
          -moz-box-shadow: 0 2px 4px 1px ${gray};
          -webkit-box-shadow: 0 2px 4px 1px ${gray};
          box-shadow: 0 2px 4px 1px ${gray};
        }

        .is-hidden {
          visibility: hidden;
        }

        .main-container {
          display: flex;
        }

        .split-nav {
          margin-top: 25px;
          display: none;
          width: 100%;
        }

        .left-container {
          width: 620px;
        }

        .right-container {
          width: 300px;
        }

        .arrow {
          margin-bottom: -5px;
        }


        @media all and (min-width: 641px) and (max-width: 768px) {

          .split-nav {
            display: flex;
          }

          .right-container {
            width: 620px;
          }
        }
        @media all and (max-width: 640px){
          .split-nav {
            display: flex;
          }

          .right-container {
            width: 620px;
          }
        }

      `}</style>
    </div>);
  }
}

export default ResponsiveTwoColumnContainer;

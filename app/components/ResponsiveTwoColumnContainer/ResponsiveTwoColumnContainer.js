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
    mainContainerTitle: string,
    renderMainContent: func.isRequired,
    asideContainerTitle: string,
    renderAsideContent: func.isRequired,
  }

  static defaultProps = {
    mainContainerTitle: '',
    asideContainerTitle: '',
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

  showMainContainer = () => {
    if (!this.props.isDesktop) {
      this.setState({
        showMainContainer: true,
        showAsideContainer: false,
      });
    }
  }

  showAsideContainer = () => {
    if (!this.props.isDesktop) {
      this.setState({
        showMainContainer: false,
        showAsideContainer: true,
      });
    }
  }

  render() {
    const {
      renderMainContent,
      mainContainerTitle,
      renderAsideContent,
      asideContainerTitle,
    } = this.props;
    const { showMainContainer, showAsideContainer } = this.state;
    return (<div className="root">
      <div className="split-nav component-container">
        <div className="split-nav-item-container" onClick={this.showMainContainer}>
          <div className="split-nav-item" dangerouslySetInnerHTML={{ __html: mainContainerTitle }} />
          <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg"
            className={classnames('arrow', {
            'is-hidden': !showMainContainer,
          })} />
        </div>
        <div className="split-nav-item-container" onClick={this.showAsideContainer}>
          <div className="split-nav-item" dangerouslySetInnerHTML={{ __html: asideContainerTitle }} />
          <img src="https://vega.slooh.com/assets/v4/common/status_triangle_up.svg" className={classnames('arrow',{
            'is-hidden': !showAsideContainer,
          })} />
        </div>
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
          align-items: center;
          display: none;
          flex-direction: row;
          font-size: 11px;
          font-weight: bold;
          justify-content: space-evenly;
          margin-top: 25px;
          padding: 0;
          text-align: center;
          text-transform: uppercase;
          width: 100%;
        }

        .split-nav-item {
          margin: 0 5px;
          margin-top: 15px;
        }

        .split-nav-item-container {
          border: 1px solid ${gray};
          flex: 0 50%;
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

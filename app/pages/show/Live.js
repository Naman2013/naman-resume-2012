/***********************************
* V4 Observations Page
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThreeTabbedNav from 'components/ThreeTabbedNav';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HeaderContainer from './partials/HeaderContainer'
import MainContainer from './partials/MainContainer';
import AsideContainer from './partials/AsideContainer';
import styles from './LiveShow.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

class LiveShow extends Component {
  static propTypes = {
    additionalFeeds: arrayOf(shape({})),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    additionalFeeds: [],
  };

  state = {
    aboutIsActive: false,
    commentsIsActive: false,
    detailsIsActive: false,
    selectedTab: 0,
  }

  showAbout = () => {
    this.setState({
      aboutIsActive: true,
      commentsIsActive: false,
      detailsIsActive: false,
    });
  }

  showComments = () => {
    this.setState({
      aboutIsActive: false,
      commentsIsActive: true,
      detailsIsActive: false,
    });
  }

  showDetails = () => {
    this.setState({
      aboutIsActive: false,
      commentsIsActive: false,
      detailsIsActive: true,
    });
  }

  handleSelect = (index) => {
    console.log("selecting", index)
    window.scrollTo(0, 0);
    this.setState({
      selectedTab: index,
    });
  }

  render() {
    const {
      additionalFeeds,
      isScreenMedium,
      isScreenLarge,
    } = this.props;

    const {
      aboutIsActive,
      commentsIsActive,
      detailsIsActive,
      selectedTab,
    } = this.state;

    return (
      <div className="root">
          <HeaderContainer
            {...this.props}
            label="Airing Now"
            handleSelect={this.handleSelect}
            selectedTab={selectedTab}
          />
          <div className="main-container">
            <ResponsiveTwoColumnContainer
              renderNavigationComponent={() =>
                (<ThreeTabbedNav
                  firstTitle="About"
                  secondTitle="Comments"
                  thirdTitle="Details"
                  firstTabIsActive={aboutIsActive}
                  firstTabOnClick={this.showAbout}
                  secondTabIsActive={commentsIsActive}
                  secondTabOnClick={this.showComments}
                  thirdTabIsActive={detailsIsActive}
                  thirdTabOnClick={this.showDetails}
                />)
              }
              renderAsideContent={() => (<div
                {...this.props}
                aboutIsActive={aboutIsActive}
                commentsIsActive={commentsIsActive}
                detailsIsActive={detailsIsActive}
              />)}
              isScreenLarge={isScreenLarge}
              renderMainContent={() => (<MainContainer
                {...this.props}
                selectedTab={selectedTab}
                handleSelect={this.handleSelect}
                aboutIsActive={aboutIsActive}
                commentsIsActive={commentsIsActive}
                detailsIsActive={detailsIsActive}
              />)}
            />
          </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LiveShow;

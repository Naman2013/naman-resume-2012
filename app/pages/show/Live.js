/***********************************
* V4 LiveShow
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThreeTabbedNav from 'components/ThreeTabbedNav';
import TwoTabbedNav from 'components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'components/ResponsiveTwoColumnContainer';
import HeaderContainer from './partials/HeaderContainer'
import MainContainer from './partials/MainContainer';
import AsideContainerWithTabs from './partials/AsideContainerWithTabs';
import styles from './Show.style';

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
    isDesktop: bool.isRequired,
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
    aboutIsActive: true,
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
      hasDiscussionThread,
    } = this.props;

    const {
      aboutIsActive,
      commentsIsActive,
      detailsIsActive,
      selectedTab,
    } = this.state;

    const headerLabel = 'Airing Now';

    return (
      <div className="root live-show">
          <HeaderContainer
            {...this.props}
            headerLabel={headerLabel}
            handleSelect={this.handleSelect}
            selectedTab={selectedTab}
          />
          <div className="main-container">
            <ResponsiveTwoColumnContainer
              renderNavigationComponent={() =>
                (<div className="full-width">{hasDiscussionThread ? <ThreeTabbedNav
                  firstTitle="About"
                  secondTitle="Comments"
                  thirdTitle="Details"
                  firstTabIsActive={aboutIsActive}
                  firstTabOnClick={this.showAbout}
                  secondTabIsActive={commentsIsActive}
                  secondTabOnClick={this.showComments}
                  thirdTabIsActive={detailsIsActive}
                  thirdTabOnClick={this.showDetails}
                /> : <TwoTabbedNav
                  firstTitle="About"
                  secondTitle="Details"
                  firstTabIsActive={aboutIsActive}
                  firstTabOnClick={this.showAbout}
                  secondTabIsActive={detailsIsActive}
                  secondTabOnClick={this.showDetails}
                /> }
                </div>)
              }
              renderAsideContent={() => (<AsideContainerWithTabs
                {...this.props}
                headerTitle="Slooh Live Show"
                aboutIsActive={aboutIsActive}
                commentsIsActive={commentsIsActive}
                detailsIsActive={detailsIsActive}
                showDetails={this.showDetails}
                showAbout={this.showAbout}
                showComments={this.showComments}
              />)}
              isScreenLarge={isScreenLarge}
              renderMainContent={() => (<MainContainer
                {...this.props}
                headerLabel={headerLabel}
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

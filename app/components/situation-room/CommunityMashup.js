import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TintUp from './TintUp';
import CommunityPerspectives from '../common/community-perspectives/community-perspectives';
import SloohRecommends from '../common/recommendations/SloohRecommends';
import ShowsList from '../video-viewer/ShowsList';
import s from './CommunityMashup.scss';

class CommunityMashup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTabIndex: 0,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(index, last) {
    this.setState({
      selectedTabIndex: index,
    });
  }

  render() {
    const {
      colNum,
      hasSocialFlow,
      hasPerspectives,
      hasUpcomingShows,
      hasRecommends,
      hasRecentShows,
      communityPosts,
      recommends,
      recentShows,
      upcomingShows,
    } = this.props;
    const { selectedTabIndex } = this.state;
    return (
      <div className={s.communityMashupRoot}>
        <Tabs className={s.tabSet} onSelect={this.handleSelect} selectedIndex={selectedTabIndex}>
          <TabList className={s.tabList}>
            {
              hasSocialFlow ?
                <Tab className={s.tab}>
                  <h5 className={s.tabTitle}>Social Flow</h5>
                </Tab> : null
            }

            {
              hasPerspectives ?
                <Tab className={s.tab}>
                  <h5 className={s.tabTitle}>Illuminations</h5>
                </Tab> : null
            }

            {
              hasUpcomingShows ?
                <Tab className={s.tab}>
                  <h5 className={s.tabTitle}>Upcoming Shows</h5>
                </Tab> : null
            }

            {
              hasRecentShows ?
                <Tab className={s.tab}>
                  <h5 className={s.tabTitle}>Recent Shows</h5>
                </Tab> : null
            }

            {
              hasRecommends ?
                <Tab className={s.tab}>
                  <h5 className={s.tabTitle}>Slooh Recommends</h5>
                </Tab> : null
            }
          </TabList>


          {
            hasSocialFlow ?
              <TabPanel className={s.tabPanel}>
                <aside>
                  <TintUp />
                </aside>
              </TabPanel> : null
          }

          {
            hasPerspectives ?
              <TabPanel className={s.tabPanel}>
                <aside>
                  <CommunityPerspectives
                    communityContent={communityPosts}
                  />
                </aside>
              </TabPanel> : null
          }

          {
            hasUpcomingShows ?
              <TabPanel className={s.tabPanel}>
                <aside>
                  <ShowsList eventList={upcomingShows} textSize="12px" colNum={colNum} />
                </aside>
              </TabPanel> : null
          }

          {
            hasRecentShows ?
              <TabPanel className={s.tabPanel}>
                <aside>
                  <ShowsList eventList={recentShows} textSize="12px" colNum={colNum} />
                </aside>
              </TabPanel> : null
          }

          {
            hasRecommends ?
              <TabPanel className={s.tabPanel}>
                <aside className={s.sloohRecommendsPanel}>
                  <SloohRecommends
                    columns={2}
                    recommendations={recommends}
                    type="community"
                  />
                </aside>
              </TabPanel> : null
          }
        </Tabs>
      </div>
    );
  }
}

CommunityMashup.defaultProps = {
  communityPosts: [],
  recommends: [],
  upcomingShows: [],
  recentShows: [],
  hasRecentShows: false,
  colNum: undefined,
};

CommunityMashup.propTypes = {
  hasSocialFlow: PropTypes.bool.isRequired,
  hasPerspectives: PropTypes.bool.isRequired,
  hasUpcomingShows: PropTypes.bool.isRequired,
  hasRecommends: PropTypes.bool.isRequired,
  hasRecentShows: PropTypes.bool,
  colNum: PropTypes.string,
  recommends: PropTypes.arrayOf(PropTypes.number.isRequired),
  communityPosts: PropTypes.arrayOf(PropTypes.shape({
    postId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
};

export default CommunityMashup;

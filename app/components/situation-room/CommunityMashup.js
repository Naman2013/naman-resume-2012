import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TintUp from './TintUp';
import CommunityPerspectives from '../common/community-perspectives/community-perspectives';
import SloohRecommends from '../common/recommendations/SloohRecommends';
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
      hasSocialFlow,
      hasPerspectives,
      hasUpcomingShows,
      hasRecommends,
      communityPosts,
      recommends,
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
                  <h5 className={s.tabTitle}>Community Perspectives</h5>
                </Tab> : null
            }

            {
              hasUpcomingShows ?
                <Tab className={s.tab}>
                  <h5 className={s.tabTitle}>Upcoming Shows</h5>
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
                  <h3>Upcoming shows...</h3>
                </aside>
              </TabPanel> : null
          }

          {
            hasRecommends ?
              <TabPanel className={s.tabPanel}>
                <aside>
                  <SloohRecommends
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
};

CommunityMashup.propTypes = {
  hasSocialFlow: PropTypes.bool.isRequired,
  hasPerspectives: PropTypes.bool.isRequired,
  hasUpcomingShows: PropTypes.bool.isRequired,
  hasRecommends: PropTypes.bool.isRequired,
  recommends: PropTypes.arrayOf(PropTypes.number.isRequired),
  communityPosts: PropTypes.arrayOf(PropTypes.shape({
    postId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })),
};

export default CommunityMashup;

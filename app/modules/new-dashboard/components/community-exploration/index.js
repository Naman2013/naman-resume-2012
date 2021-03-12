import React, { Component, PureComponent } from 'react';

import './style.css';
import { getUserInfo } from 'app/modules/User';
import { ImageSlider } from '../image-slider';
import {
  getCommunityExploration,
  getActivityFeed,
  getObservations,
} from '../../dashboardApi';

import { RecentCommunityActivities } from '../recent-community-activities';
import { SectionDivider } from '../section-divider';
import { TabHeader } from '../tab-header';
import { Spinner } from '../../common/spinner';

export class CommunityExploration extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      communityExploration: undefined,
      activeHeading: 'Featured',
      ActivitiesFeed: '',
      isFetching: false,
      // communityExplorationAll: '',
    };
    this.getActivityFeedList();
    // this.getObservationsList('alltime');
    this.getObservationsList('featured');

    // this.getCommunityObservationAction();
  }

  /*   componentDidMount() {
            this.getObservationsList('featured');
            this.getActivityFeedList();
        } */

  timerId = null;
  activityFeedTimerId = null;

  /*  getCommunityObservationAction = () => {
           const { at, cid, token } = getUserInfo();
           getCommunityExploration({ at, cid, token, }).then(response => {
               const res = response.data;
               if (!res.apiError) {
                   const { timestamp, expires } = res;
                   const duration = (expires - timestamp) * 1000;
                   console.log("Community Exploration Duration" + duration);
                   if (this.timerId !== null)
                       clearTimeout(this.timerId);
                   this.timerId = setTimeout(this.getCommunityObservationAction, duration);
                   this.setState({ communityExploration: res });
               }
               else
                   this.props.validateResponseAccess(res);
           });
       } */

  getObservationsList = viewType => {
    this.setState({ isFetching: true });
    const { at, cid, token } = getUserInfo();
    getObservations({ at, cid, token, viewType }).then(response => {
      const res = response.data;
      const { validateResponseAccess } = this.props;
      validateResponseAccess(res);
      if (!res.apiError) {
        const { timestamp, expires } = res;
        const duration = (expires - timestamp) * 1000;
        // console.log(`Community Exploration Duration${duration}`);
        if (this.timerId !== null) {
          clearTimeout(this.timerId);
        }        
        this.timerId = setTimeout(()=>this.getObservationsList(viewType), duration);
        this.setState({ communityExploration: res, isFetching: false });       
      }
      
    });
  };

  getActivityFeedList = () => {    
    const { at, cid, token } = getUserInfo();
    const { validateResponseAccess } = this.props;
    getActivityFeed({ at, cid, token }).then(response => {
      const res = response.data;
      validateResponseAccess(res);
      if (!res.apiError) {
        const { timestamp, expires } = res;
        const duration = (expires - timestamp) * 1000;
        // console.log(`CommunityFeed Exploration Duration${duration}`);
        if (this.activityFeedTimerId !== null) {
          clearTimeout(this.activityFeedTimerId);
        }
        this.activityFeedTimerId=setTimeout(this.getActivityFeedList, duration);
        this.setState({ ActivitiesFeed: res});
      }
    });
  };

  componentWillUnmount() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
    if (this.activityFeedTimerId !== null) {
      clearTimeout(this.activityFeedTimerId);
    }
  }

  startTimer = () => {
    let viewType = this.state.viewType === 'All' ? 'alltime' : 'featured';
    this.getCommunityObservationAction(viewType);
  };

  stopTimer = () => {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
  };

  onTabChange = title => {
    let viewType = title === 'All' ? 'alltime' : 'featured';
    this.getObservationsList(viewType);
    this.setState({ activeHeading: title });
  };

  render() {
    const {
      communityExploration,
      activeHeading,
      ActivitiesFeed,
      isFetching,
      // communityExplorationAll,
    } = this.state;
    const { onClickItem, scrollToRef, validateResponseAccess } = this.props;
    // let feedList = ActivitiesFeed.activitiesList
    //   ? ActivitiesFeed.activitiesList
    //   : '';

    // console.log('nnnnnnn', activeHeading);
    return (
      <div className="explore-main">
        <h2 className="photo-hub-heading">Observations</h2>
        {communityExploration && (
          <div>
            {/* <br/> */}
            {communityExploration.featuredObservations.sectionHeading && (
              <h2 className="recent-heading">
                {communityExploration.featuredObservations.sectionHeading}
                <Spinner
                  loading={isFetching}
                  text="Loading..."
                /> 
              </h2>
            )}
            <TabHeader
              headings={['Featured', 'All']}
              activeHeading={activeHeading}
              spaceequally={false}
              theme="dark"
              onTabChange={this.onTabChange}
            />
            {communityExploration.featuredObservations.sectionSubHeading && (
              <h4 className="title-subHeading">
                {communityExploration.featuredObservations.sectionSubHeading}                
              </h4>
            )}
            {/* <Spinner
              loading={isFetching}
              text="Please wait...loading discussions"
            /> */}

            {communityExploration && (
              <ImageSlider
                communityExploration={communityExploration}
                onClickItem={onClickItem}
                scrollToRef={scrollToRef}
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
                validateResponseAccess={validateResponseAccess}
              />
            )}

            {/* {communityExplorationAll && activeHeading === 'Featured' ? (
              <ImageSlider
                communityExploration={communityExplorationAll}
                onClickItem={onClickItem}
                scrollToRef={scrollToRef}
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
                validateResponseAccess={validateResponseAccess}
              />
            ) : (
              ''
            )}
            {communityExploration && activeHeading === 'All' ? (
              <ImageSlider
                communityExploration={communityExploration}
                onClickItem={onClickItem}
                scrollToRef={scrollToRef}
                startTimer={this.startTimer}
                stopTimer={this.stopTimer}
                validateResponseAccess={validateResponseAccess}
              />
            ) : (
              ''
            )} */}
            <SectionDivider />
            {ActivitiesFeed.activitiesList && (
              <RecentCommunityActivities
                heading="Recent Community Activities"
                activities={ActivitiesFeed}
                onClickItem={onClickItem}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

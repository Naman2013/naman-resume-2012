import { Component, PureComponent } from 'react';
import React from "react";
import './style.css';
import { ImageSlider } from '../image-slider';
import { getCommunityExploration, getActivityFeed, getObservations } from '../../dashboardApi';

import { getUserInfo } from 'app/modules/User';
import { RecentCommunityActivities } from '../recent-community-activities';
import { SectionDivider } from '../section-divider';
import { TabHeader } from '../tab-header';





export class CommunityExploration extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            communityExploration: undefined,
            activeHeading: "Featured",
            ActivitiesFeed: ''

        }
        // this.getCommunityObservationAction();

    }

    componentDidMount() {
        this.getObservationsList('featured');
        this.getActivityFeedList();
    }



    timerId = null;

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


    getObservationsList = (viewType) => {

        const { at, cid, token } = getUserInfo();
        getObservations({ at, cid, token, viewType }).then(response => {
            const res = response.data;
            if (!res.apiError) {
                const { timestamp, expires } = res;
                const duration = (expires - timestamp) * 1000;
                console.log("Community Exploration Duration" + duration);
                if (this.timerId !== null)
                    clearTimeout(this.timerId);
                this.setState({ communityExploration: res });
            }
            this.props.validateResponseAccess(res);

        })
    }

    getActivityFeedList = () => {

        const { at, cid, token } = getUserInfo();
        getActivityFeed({ at, cid, token }).then(response => {
            const res = response.data;
            if (!res.apiError) {
                this.setState({ ActivitiesFeed: res });
            }
            this.props.validateResponseAccess(res);
        })
    }

    componentWillUnmount() {
        if (this.timerId !== null)
            clearTimeout(this.timerId);
    }

    startTimer = () => {
        this.getCommunityObservationAction();
    }

    stopTimer = () => {
        if (this.timerId !== null)
            clearTimeout(this.timerId);
    }

    onTabChange = (title) => {

        let viewType = title == 'All' ? 'alltime' : 'featured';
        this.getObservationsList(viewType);
        this.setState({ activeHeading: title });
    };

    render() {
        const { communityExploration, activeHeading, ActivitiesFeed } = this.state;
        const { onClickItem, scrollToRef, validateResponseAccess } = this.props;

        return (
            <div className="explore-main">
                <h2 className="photo-hub-heading">{"Community"}</h2>
                {communityExploration && (
                    <div>
                        {/* <br/> */}
                        {communityExploration.featuredObservations.sectionHeading && (
                            <h2 className="recent-heading">{communityExploration.featuredObservations.sectionHeading}</h2>
                        )}
                        <TabHeader
                            headings={["Featured", "All"]}
                            activeHeading={activeHeading}
                            spaceequally={false}
                            theme={"dark"}
                            onTabChange={this.onTabChange}
                        />
                        {communityExploration.featuredObservations.sectionSubHeading && (
                            <h4 className="title-subHeading">{communityExploration.featuredObservations.sectionSubHeading}</h4>
                        )}
                        <ImageSlider
                            communityExploration={communityExploration}
                            onClickItem={onClickItem}
                            scrollToRef={scrollToRef}
                            startTimer={this.startTimer}
                            stopTimer={this.stopTimer}
                            validateResponseAccess={validateResponseAccess}
                        />
                        <SectionDivider />
                        {ActivitiesFeed.activities && <RecentCommunityActivities
                            heading={"Recent Community Activities"}
                            activities={ActivitiesFeed.activities}
                            onClickItem={onClickItem}
                        />}
                    </div>
                )}
            </div>
        );
    }

}
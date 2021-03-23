import { Component } from 'react';
import React from "react";
import './style.scss';
import { ConversationLayout } from '../conversation-layout';
import { TabHeader } from '../tab-header';


export class RecentCommunityActivities extends Component{

    
    render() {
        const { activities, onClickItem } = this.props;
        const { activitiesList } = activities;        
        
        return (
            <div className="recent-main">
                <h2 className="recent-heading">{activities.sectionHeading}</h2> 
                {/* <TabHeader
                    headings={["All", "Only My Activites"]}
                    activeHeading={"All"}
                    spaceequally={false}
                    theme={"dark"}
                /> */}
                <ConversationLayout
                    onClickItem={onClickItem}
                    activitiesList={activitiesList}
                />
            </div>   
        );
    }

}
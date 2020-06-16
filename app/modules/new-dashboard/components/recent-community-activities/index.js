import { Component } from 'react';
import React from "react";
import './style.css';
import { ConversationLayout } from '../conversation-layout';
import { TabHeader } from '../tab-header';


export class RecentCommunityActivities extends Component{

    
    render() {
        const { heading } = this.props;
        
        return (
            <div className="recent-main">
                <h2 className="upcoming-heading">{heading}</h2> 
                <TabHeader
                    headings={["All", "Only My Activites"]}
                    activeHeading={"All"}
                    spaceequally={false}
                />
                <ConversationLayout
                />
            </div>   
        );
    }

}
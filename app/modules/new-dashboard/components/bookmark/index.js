import { Component } from 'react';
import React from "react";
import './style.scss';
import { GuideCard } from '../guide-card';
import { TabHeader } from '../tab-header';
import { getBookmarksList } from '../../dashboardApi';


export class BookMark extends Component{
    
    state={
        activeHeading: "Guides",
    }
    
    onTabChange=(title)=>{
        const { getBookmarkList } = this.props;
        
        switch(title){

            case "Objects":
                getBookmarkList({readingListType: "object"});
                break;

            case "Illuminations":
                getBookmarkList({readingListType: "story"});
                break;
            
            case "Star Parties":
                getBookmarkList({readingListType: "show"});
                break;

            case "Guides":
                getBookmarkList({readingListType: "guide"});
                break;
        }
        this.setState({activeHeading: title});
    };

    render() {
        const {heading, guideList, emptySetDisplay } = this.props;
        const { activeHeading } = this.state;

        return (
            <div className="guide-list-main">
                <h2 className="guide-list-heading">{heading}</h2>
                    <TabHeader
                        headings={["Objects", "Illuminations", "Star Parties", "Guides"]}
                        activeHeading={activeHeading}
                        spaceequally={false}
                        theme={"dark"}
                        onTabChange={this.onTabChange}
                    />                        
                    <div className="guide-list">                        
                        {guideList.map(guide=>(
                            <GuideCard
                                guide={guide}
                            />
                        ))}
                        {guideList.length === 0 && (
                            <div className="empty-guide">
                                <h3 className="guide-list-heading">{emptySetDisplay}</h3>
                            </div>
                            
                        )}                                                
                    </div>                                                               
            </div>   
        );
    }

}
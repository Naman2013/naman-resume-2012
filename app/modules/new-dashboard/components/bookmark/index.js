import { Component } from 'react';
import React from "react";
import './style.css';
import { GuideCard } from '../guide-card';
import { TabHeader } from '../tab-header';


export class BookMark extends Component{
    
    render() {
        const {heading, guideList} = this.props;
        
        return (
            <div className="guide-list-main">
                <h2 className="guide-list-heading">{heading}</h2>
                    <TabHeader
                        headings={["Objects", "Illuminations", "Star Parties", "Guides"]}
                        activeHeading={"Guides"}
                        spaceequally={false}
                    />                        
                    <div className="guide-list">
                        {guideList.map(guide=>(
                            <GuideCard
                                guide={guide}
                            />
                        ))}                                                
                    </div>                                                               
            </div>   
        );
    }

}
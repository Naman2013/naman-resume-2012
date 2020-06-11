import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from '../tab-header';
import { GPCard } from "../gp-card";

export class CommunityFame extends Component{

    
    render() {
        const {heading, gpPoints} = this.props;
        const gplist = [{gpPoints: "0", text: "Hubble"},
                            {gpPoints: "4", text: "Swan"},
                            {gpPoints: "14", text: "Herchels"}];

        return (
            <div className="community-fame-main">

                <h2 className="community-fame-heading">{heading}</h2> 

                    <GPCard
                        points={gpPoints}
                    />

                    <TabHeader
                        headings={["Earned Today", "Earned Last 30 Days"]}
                        activeHeading={"Earned Today"}
                        spaceequally={true}
                    />

                    <div className="community-flex-layout">
                        {gplist.map(gp=>(
                            <div className="community-gp-card">
                                <h2 className="community-gp-points">{gp.gpPoints}</h2>
                                <h2 className="community-gp-txt">{gp.text}</h2>
                            </div>
                        ))}
                    </div>                                               
            </div>   
        );
    }

}
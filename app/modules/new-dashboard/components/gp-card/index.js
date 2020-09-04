import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';


export class GPCard extends Component{

    
    render() {
        const {gravityEarnedToday} = this.props;      

        return (
            <div className="gp-main">
                <div className="gp-container">
                    <h2 className="gp-txt">{gravityEarnedToday.gravityPoints}</h2> 
                    <div>
                        <h5 className="gravity-text">{"Gravity Points"}</h5>
                        <h5 className="gravity-by-tab">{"Earned Today"}</h5>
                    </div>
                </div>
                <br/>
                {/* <br/>
                <TabHeader
                        headings={["Earned Today", "Earned Last 30 Days"]}
                        activeHeading={"Earned Today"}
                        spaceequally={true}
                        theme={"light"}
                    />                                                     */}
            </div>   
        );
    }

}
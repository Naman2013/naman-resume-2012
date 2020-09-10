import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';
import { LineChart } from '../../common/line-chart';


export class GPCard extends Component{

    
    render() {
        const {gravityEarnedToday, data, yLabel, sectionHeading} = this.props;      

        return (
            <div className="gp-main">
                <div className="gp-container">
                    <h2 className="gp-txt">{gravityEarnedToday.gravityPoints}</h2> 
                    <div>
                        <h5 className="gravity-text">{"Gravity Points"}</h5>
                        <h5 className="gravity-by-tab">{"Earned Today"}</h5>
                    </div>
                </div>
                {/* <br/> */}
                {/* <br/>
                <TabHeader
                        headings={["Earned Today", "Earned Last 30 Days"]}
                        activeHeading={"Earned Today"}
                        spaceequally={true}
                        theme={"light"}
                    />*/}
                    <h2 className="gp-chart-heading">{sectionHeading}</h2> 
                     <LineChart
                        data={data}
                        yLabel={yLabel}
                    />   
            </div>   
        );
    }

}
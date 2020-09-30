import { Component } from 'react';
import React from "react";
import './style.scss';


export class DashboardHeader extends Component{

    onHeadingChange(heading, index){
        const { scrollToRef } = this.props;        
        scrollToRef(index, heading);
    }

    render() {
        const headings = ["Observatories", "Missions", "Photos", "Community Exploration"];       
        const { activeHeading } = this.props;

        return (
            <div className="header-main">
                <ul>
                    {headings.map((heading,i)=>(
                        <li className={"header-txt" + (activeHeading === heading ? "-active": "")} key={heading} onClick={()=>this.onHeadingChange(heading, i)}>
                            <div className="header_div">
                                {heading}
                                {/* {activeHeading === heading && (
                                    <img className="active-dot mar-top-10" src="https://vega.slooh.com/assets/v4/dashboard-new/circle_white.svg"/>
                                )} */}
                            </div>
                            
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
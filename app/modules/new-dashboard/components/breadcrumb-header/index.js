import { Component } from 'react';
import React from "react";
import './style.css';


export class DashboardHeader extends Component{

    constructor(props){
        super(props);
        this.state={activeHeading: "Explore the Universe"};
    }
    
    onHeadingChange(heading){
        this.setState({activeHeading: heading});
    }

    render() {
        const headings = ["Explore the Universe", "Observatory and Missions", "Photo", "Community Exploration"];
        const { activeHeading } = this.state;
        
        return (
            <div className="header-main">
                <ul>
                    {headings.map(heading=>(
                        <li className={"header-txt" + (activeHeading === heading ? "-active": "")} key={heading} onClick={()=>this.onHeadingChange(heading)}>
                            <div className="header_div">
                                {heading}
                                {activeHeading === heading && (
                                    <img className="mar-top-10" src="https://vega.slooh.com/assets/v4/dashboard-new/circle_white.svg"/>
                                )}
                            </div>
                            
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
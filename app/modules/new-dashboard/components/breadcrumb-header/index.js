import { Component } from 'react';
import React from "react";
import './style.scss';


export class DashboardHeader extends Component{

    constructor(props){
        super(props);
        this.state={activeHeading: "Explore the Universe"};
    }
    
    onHeadingChange(heading, index){
        const { scrollToRef } = this.props;
        this.setState({activeHeading: heading});
        scrollToRef(index);
    }

    render() {
        const headings = ["Explore the Universe", "Observatory and Missions", "Photo", "Community Exploration"];
        const { activeHeading } = this.state;
        const { refArray } = this.props;

        return (
            <div className="header-main">
                <ul>
                    {headings.map((heading,i)=>(
                        <li className={"header-txt" + (activeHeading === heading ? "-active": "")} key={heading} onClick={()=>this.onHeadingChange(heading, i)}>
                            <div className="header_div">
                                {heading}
                                {activeHeading === heading && (
                                    <img className="active-dot mar-top-10" src="https://vega.slooh.com/assets/v4/dashboard-new/circle_white.svg"/>
                                )}
                            </div>
                            
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
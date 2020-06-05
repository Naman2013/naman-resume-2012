import { Component } from 'react';
import React from "react";
import './style.css';


export class DashboardHeader extends Component{

    
    render() {
        const headings = ["Explore the Universe", "Observatory and Missions", "Photo", "Community Exploration"];
        const activeHeading="Explore the Universe";
        return (
            <div className="main">
                <ul>
                    {headings.map(heading=>(
                        <li className={"header-txt" + (activeHeading === heading ? "-active": "")} key={heading} >
                            {heading}
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
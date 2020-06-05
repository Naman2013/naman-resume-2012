import { Component } from 'react';
import React from "react";
import './style.css';


export class TabHeader extends Component{

    
    render() {
        const headings = ["Explore Quests", "Explore Objects"];
        const activeHeading="Explore Quests";
        return (
            <div>
                <ul className="tab-header-main">
                    {headings.map(heading=>(
                        <li className={"tab-header-txt" + (activeHeading === heading ? "-active": "")} key={heading} >
                            {heading}
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
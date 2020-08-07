import { Component } from 'react';
import React from "react";
import './style.scss';


export class TabHeader extends Component{
    
    render() {
        const { headings, spaceequally, theme, onTabChange, activeHeading } = this.props;          

        return (
            <div>
                <ul className="tab-header-main">
                    {headings.map(heading=>(
                        <li className={"tab-header-txt " + theme + (activeHeading === heading ? "-active ": " ") + (spaceequally ? " space-equally" : "")} key={heading} onClick={()=>onTabChange(heading)}>
                            {heading}
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
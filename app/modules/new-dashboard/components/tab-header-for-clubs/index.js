import { Component } from 'react';
import React from "react";
import './style.scss';


export class ClubTabHeader extends Component{
    
    render() {
        const { headings, spaceequally, theme, onTabChange, activeHeading } = this.props;
        return (            
                <ul className="tab-header-main">
                    {headings.map(heading=>(
                        <li className={"tab-header-txt " + theme + (activeHeading === heading.viewType ? "-active ": " ") + (spaceequally ? " space-equally" : "")} key={heading.viewType} onClick={()=>onTabChange(heading.viewType)}>
                            {heading.label}
                        </li>
                    ))}
                </ul> 
        );
    }

}
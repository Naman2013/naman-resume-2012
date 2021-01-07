import { Component } from 'react';
import React from "react";
import './style.scss';


export class TabHeaderWithNewLabel extends Component{
    
    render() {
        const { headings, spaceequally, theme, onTabChange, activeHeading, } = this.props;          

        return (
            <div>
                <ul className="tab-header-main">
                    {headings.map(heading=>(
                        <li className={"tab-header-txt " + theme + (activeHeading === heading.label ? "-active ": " ") + (spaceequally ? " space-equally" : "")} key={heading.label} onClick={()=>onTabChange(heading.label)}>
                            {heading.showNewLabel && (<h6 className="new-btn-style">NEW!</h6>)}
                            {heading.label}
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
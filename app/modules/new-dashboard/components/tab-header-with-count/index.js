import { Component } from 'react';
import React from "react";
import './style.scss';


export class TabHeaderCount extends Component{
    
    render() {
        const { headings, spaceequally, theme, onTabChange, activeHeading } = this.props;          

        return (
            <div>
                <ul className="tab-header-main">
                    {headings.map(heading=>(
                        <li className={"tab-header-txt " + theme + (activeHeading.tabAction === heading.tabAction ? "-active ": " ") + (spaceequally ? " space-equally" : "")} key={heading} onClick={()=>onTabChange(heading)}>
                            {heading.label}
                            {heading.newCountLabel && (
                                <h6 className="photohub-status-text">{heading.newCountLabel}</h6>
                            )}
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
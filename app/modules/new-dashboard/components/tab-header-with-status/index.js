import { Component } from 'react';
import React from "react";
import './style.css';


export class TabHeaderWithStatus extends Component{

    
    render() {
        const { headings, activeHeading, spaceequally } = this.props;        
        return (
            <div>
                <ul className="tab-header-status-main">
                    {headings.map(header=>(
                        <li className={"tab-header-status-txt" + (activeHeading === header.heading ? "-active": "") + (spaceequally ? " space-equally" : "")} key={header.heading} >
                            {header.heading}
                            <h5 className={ header.status ? "online":"offline" }>
                                <i className={header.status ? "dot online-bg" : "dot offline-bg"}></i>
                                {header.statusText}
                            </h5>
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
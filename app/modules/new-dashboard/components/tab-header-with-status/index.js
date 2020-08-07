import { Component } from 'react';
import React from "react";
import './style.scss';


export class TabHeaderWithStatus extends Component{

    render() {
        const { headings, spaceequally, activeHeading, onTabChange } = this.props;  
       
        return (
            <div>
                <ul className="tab-header-status-main">
                    {headings.map(header=>(
                        <li className={"tab-header-status-txt" + (activeHeading === header.obsShortName ? "-active": "") + (spaceequally ? " space-equally" : "")} key={header.obsShortName} onClick={()=>onTabChange(header.obsShortName, header.obsId, header.SeeingConditionsWidgetId)}>
                            {header.obsShortName}
                            <h5 className={ header.obsStatus === "live" ? "online":"offline" }>
                                <i className={ header.obsStatus === "live" ? "dot online-bg" : "dot offline-bg"}></i>
                                {header.obsStatus === "live" ? "Online" : "Offline(Non-Active Hours)"}
                            </h5>
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
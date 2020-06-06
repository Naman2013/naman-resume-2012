import { Component } from 'react';
import React from "react";
import './style.css';


export class TabHeader extends Component{

    
    render() {
        const { headings, activeHeading, spaceequally } = this.props;        
        return (
            <div>
                <ul className="tab-header-main">
                    {headings.map(heading=>(
                        <li className={"tab-header-txt" + (activeHeading === heading ? "-active": "") + (spaceequally ? " space-equally" : "")} key={heading} >
                            {heading}
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
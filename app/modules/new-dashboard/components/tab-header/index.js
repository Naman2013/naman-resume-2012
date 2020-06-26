import { Component } from 'react';
import React from "react";
import './style.css';


export class TabHeader extends Component{

    constructor(props){
        super(props);
        this.state={
            activeHeading: props.activeHeading
        };
    }    
    
    onTabChanged(tabName){
        this.setState({activeHeading: tabName});
    }

    render() {
        const { headings, spaceequally, theme } = this.props;   
        const { activeHeading } = this.state;

        return (
            <div>
                <ul className="tab-header-main">
                    {headings.map(heading=>(
                        <li className={"tab-header-txt " + theme + (activeHeading === heading ? "-active ": " ") + (spaceequally ? " space-equally" : "")} key={heading} onClick={()=>this.onTabChanged(heading)}>
                            {heading}
                        </li>
                    ))}
                </ul>                
            </div>   
        );
    }

}
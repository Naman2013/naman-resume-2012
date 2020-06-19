import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from "../tab-header";

export class ObjectList extends Component{

    
    render() {
        const {heading, showTab, headerlist, selectedheader, headerspaceequally} = this.props;
        const objectList = [{objectPoints: "44 GP", text: "Jupiter", icon: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg"},
                            {objectPoints: "41 GP", text: "Saturn", icon: "https://vega.slooh.com/assets/v4/dashboard-new/saturn.svg"},
                            {objectPoints: "28 GP", text: "Moon", icon: "https://vega.slooh.com/assets/v4/dashboard-new/moon.svg"},
                            {objectPoints: "24 GP", text: "Pluto", icon: "https://vega.slooh.com/assets/v4/dashboard-new/pluto.svg"}];

        return (
            <div className="object-main">
                <h2 className="object-heading">{heading}</h2>     
                    {showTab &&(
                        <TabHeader
                        headings={headerlist}
                        activeHeading={selectedheader}
                        spaceequally={headerspaceequally}
                        />
                    )}
                    <div className="object-list">
                        {objectList.map(object=>(
                            <div className="object-item">
                                <div className="objecticonContainer">
                                    <img src={object.icon} className=""/>
                                </div>
                                <h2 className="object-name">{object.text}</h2>
                                <h4 className="object-gp">{object.objectPoints}</h4>
                            </div> 
                        ))}                            
                    </div>
                                                               
            </div>   
        );
    }

}
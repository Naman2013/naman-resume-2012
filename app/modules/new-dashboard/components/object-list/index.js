import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from "../tab-header";

export class ObjectList extends Component{

    
    render() {
        const {heading, showTab, headerlist, selectedheader, headerspaceequally} = this.props;
        const objectList = [{objectPoints: "44", text: "Jupiter"},
                            {objectPoints: "41", text: "Saturn"},
                            {objectPoints: "28", text: "Moon"},
                            {objectPoints: "24", text: "Pluto"}];

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
                                    <img src="" className=""/>
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
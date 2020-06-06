import { Component } from 'react';
import React from "react";
import './style.css';


export class ObjectList extends Component{

    
    render() {
        const {heading} = this.props;
        const objectList = [{objectPoints: "44", text: "Jupiter"},
                            {objectPoints: "41", text: "Saturn"},
                            {objectPoints: "28", text: "Moon"},
                            {objectPoints: "24", text: "Pluto"}];

        return (
            <div className="object-main">
                <h2 className="object-heading">{heading}</h2>      
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
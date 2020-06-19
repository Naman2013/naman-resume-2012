import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from "../tab-header";
import { Button } from '../button';

export class PhotoHub extends Component{

    
    render() {
        const {heading, headerlist, selectedheader, headerspaceequally} = this.props;
        const photoList = [{objectName: "Comet C/2017 T2", date: "April 1, 2020", showNewButton: true},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",},
                            {objectName: "Comet C/2017 T2", date: "April 1, 2020",}];

        return (
            <div className="photo-hub-main">
                <h2 className="photo-hub-heading">{heading}</h2>    
                    <div className="photo-hub-card-header">
                        <TabHeader
                            headings={headerlist}
                            activeHeading={selectedheader}
                            spaceequally={headerspaceequally}
                        /> 
                        <Button
                            type={"button"}
                            onClickEvent={()=>{}} 
                            text={"Upload Photo"}                                             
                            style={"upload-button"}
                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/upload.svg"}
                        />
                    </div>                         
                    <h5 className="sort-filter">{"Sort & Filter"}</h5>             
                    <div className="photo-hub-list">
                        {photoList.map(photo=>(
                            <div className="photo-hub-item">                               
                                <img className="img-fit" src="https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/stsci-h-2010a-d-1280x720.png?itok=erAC9c78"/>                                
                                {photo.showNewButton &&(
                                    <div className="overlay-without-bg-div">
                                        <Button
                                            type={"button"}
                                            onClickEvent={()=>{}} 
                                            text={"New"}                                             
                                            style={"button-style"}
                                        />
                                    </div>
                                )}
                                <div className="overlay-div">
                                    <h5 className="mission-obj-name">{photo.objectName}</h5>
                                    <h5 className="mission-obj-date">{photo.date}</h5>
                                    <h5 className="view-details">{"View Details"}</h5>
                                </div>
                                
                            </div> 
                        ))}                            
                    </div>
                                                               
            </div>   
        );
    }
}
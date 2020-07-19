import { Component } from 'react';
import React from "react";
import { Button } from '../button';


export class PhotoRoll extends Component{
    const
    
    render() {
        const { photoHub } = this.props;        
        
        return (                            
                <div className="photo-hub-list">
                    {photoHub.imageList.map(photo=>(
                        <div>
                            <div className="photo-hub-item">                               
                                <img className="img-fit" src={photo.imageURL}/>                                
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
                                        <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                        <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                        <div className="photo-hub-details">
                                            <h5 className="view-details">{"View Details"}</h5>
                                            <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                        </div>                                    
                                    </div>                                
                                
                                <div className="overlay-div-tab">
                                    <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                    <div>
                                        <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                        <div className="photo-hub-details">
                                            <h5 className="view-details">{"View Details"}</h5>
                                            <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                        </div>
                                    </div>                                                                        
                                </div> 
                            </div>
                        </div>    
                    ))}                            
                </div>
        );
    }
}
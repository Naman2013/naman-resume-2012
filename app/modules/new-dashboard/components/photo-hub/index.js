import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from "../tab-header";
import { Button } from '../button';
import { ImageSlider } from '../image-slider';
import { PhotoRoll } from './photo-roll';

export class PhotoHub extends Component{
    state = {
        selectedheader: "Photo Roll"
    }
    
    onTabChange=(title)=>{
        const { getMyPictures, ref } = this.props;
        
        switch(title){

            case "Photo Roll":
                getMyPictures({
                    viewType: 'photoRoll',                 
                });                
                break;

            case "Observations":
                getMyPictures({
                    viewType: 'photoRoll',  
                    sharedOnly: true,               
                }); 
                break;
            
            case "Missions":
                // getMyPictures({
                //     viewType: 'photoRoll',                 
                // }); 
                break;

            case "Galleries":
                // getMyPictures({
                //     viewType: 'photoRoll',                 
                // }); 
                break;
        }
        this.setState({selectedheader: title});
    };

    render() {
        const { heading, headerlist, headerspaceequally, photoHub, ref} = this.props;
        const { selectedheader } = this.state;
        
        const getTabContent = header => {
            switch (header) {
                case "Photo Roll":
                    return <PhotoRoll photoHub={photoHub}/>;
                case "Observations":
                    return <ImageSlider photoHub={photoHub}/>;             
                default:
                    break;
            }
        }
        return (
            <div className="photo-hub-main" ref={ref}>
                <h2 className="photo-hub-heading">{heading}</h2>    
                    <div className="photo-hub-card-header">
                        <TabHeader
                            headings={headerlist}
                            activeHeading={selectedheader}
                            spaceequally={headerspaceequally}
                            theme={"dark"}
                            onTabChange={this.onTabChange}
                        /> 
                        <Button
                            type={"button"}
                            onClickEvent={()=>{}} 
                            text={"Upload Photo"}                                             
                            style={"upload-button"}
                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/upload_white.svg"}
                        />
                        {/* {canUploadToPhotoHub && <UploadPhoto onHide={this.fetchImages} />} */}
                    </div>                         
                    <h5 className="sort-filter">{"Sort & Filter"}</h5> 
                    
                    {photoHub &&(                        
                        <div>
                            {getTabContent(selectedheader)}  
                            {photoHub.emptySetFlag ? (
                                <div className="empty-photoHub">
                                    <h2 className="photo-hub-heading">{photoHub.emptySetDisplay}</h2>    
                                </div>
                            ):null}                                                       
                        </div>
                    )}
                                                      
            </div>   
        );
    }
}
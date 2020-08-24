import { Component } from 'react';
import React from "react";
import { Button } from '../button';
import { Link } from 'react-router';
import Pagination from '../../common/v4-pagination/pagination';
import { browserHistory } from 'react-router';

export class Mission extends Component{

    state = {
        activePage: 1,
    }    

    PHOTOS_ON_ONE_PAGE=18

    handlePageChange = ({ activePage }) => {
        const { getMyPictures } = this.props;       
        const PREVIOUS_PAGE = activePage - 1;
        this.startFrom = activePage === 1 ? 1 : PREVIOUS_PAGE * this.PHOTOS_ON_ONE_PAGE + 1;
       
        getMyPictures({
          viewType: 'photoRoll',  
          sharedOnly: false,
          firstMissionNumber: this.startFrom,
          firstImageNumber: this.startFrom,
          maxImageCount: this.PHOTOS_ON_ONE_PAGE,
          pagingMode: "api",       
        });
        this.setState({ activePage });
      };
    
    render() {
        const { imageList, totalCount } = this.props;        
        const { activePage } = this.state;
        
        return (
            imageList !== undefined ? ( 
                <div>                
                    <div className="photo-hub-list">
                        {imageList.map(photo=>(
                            <div>
                                <div className="photo-mission-item">  
                                    <div className="mission-main-div">
                                        <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                        <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                        <div className="photo-mission-telescope">
                                            <h5 className="mission-obj-date">{photo.telescopeName}</h5>
                                            <h5 className="mission-obj-date">|</h5>
                                            <h5 className="mission-obj-date">{photo.missionImageCount} Images</h5>
                                        </div>
                                        
                                        <div className="mission-center-bottom-div">
                                            <img className="photo-hub-mission-img" src={photo.imageURL}/>
                                            <div className="overlay-div-tab">
                                                {/* <h5 className="mission-obj-name">{photo.imageTitle}</h5> */}
                                                <div>
                                                    {/* <h5 className="mission-obj-date">{photo.displayDate}</h5> */}
                                                    <Link to={photo.photoViewFullURL}>
                                                        <div className="photo-hub-details" onClick={()=>browserHistory.push(photo.missionURL)}>                                                
                                                            <h5 className="view-details">{"View Details"}</h5>
                                                            <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                        </div>
                                                    </Link>
                                                </div>                                                                        
                                            </div> 
                                        </div>
                                    </div>                             
                                                               
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
                                            <div className="photo-mission-telescope">
                                                <h5 className="mission-obj-date">{photo.telescopeName}</h5>
                                                <h5 className="mission-obj-date">|</h5>
                                                <h5 className="mission-obj-date">{photo.missionImageCount} Images</h5>
                                            </div>
                                            <Link to={photo.photoViewFullURL}>
                                                <div className="photo-hub-details" onClick={()=>browserHistory.push(photo.missionURL)}>
                                                    <h5 className="view-details">{"View Details"}</h5>
                                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                </div>                            
                                            </Link>        
                                        </div>                                
                                    
                                    {/* <div className="overlay-div-tab">
                                        <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                        <div>
                                            <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                            <Link to={photo.photoViewFullURL}>
                                                <div className="photo-hub-details" onClick={()=>browserHistory.push(photo.missionURL)}>                                                
                                                    <h5 className="view-details">{"View Details"}</h5>
                                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                </div>
                                            </Link>
                                        </div>                                                                        
                                    </div>  */}
                                </div>
                            </div>    
                        ))}                           
                    </div>
                    <Pagination
                        pagesPerPage={this.PHOTOS_ON_ONE_PAGE}
                        activePage={activePage}
                        onPageChange={this.handlePageChange}
                        totalPageCount={Math.ceil(totalCount / this.PHOTOS_ON_ONE_PAGE)}
                    />
                
            </div>  
            ):null)                        
        
    }
}
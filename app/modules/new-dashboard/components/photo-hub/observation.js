import { Component } from 'react';
import React from "react";
import { Button } from '../button';
import { Link } from 'react-router';
import Pagination from '../../common/v4-pagination/pagination';
import SocialSharingBar from '../../../../components/common/social-sharing-bar';
import { browserHistory } from 'react-router';

export class Observation extends Component{

    state = {
        activePage: 1,        
        selectedShareItem: null,
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
    
      handleShowShareOptionClick = (index) => {
          const { selectedShareItem } = this.state;          
          if(selectedShareItem === index)
            index=null;
          this.setState({selectedShareItem: index});
      }
    
    render() {
        const { imageList, totalCount } = this.props;        
        const { activePage, showShareOption, selectedShareItem } = this.state;
        
        return (
            imageList !== undefined ? ( 
                <div>                
                    <div className="photo-hub-list">
                        {imageList.map((photo,i)=>(
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
                                            <Link to={photo.photoViewFullURL}>
                                                <div className="photo-hub-details">
                                                    <h5 className="view-details">{"View Details"}</h5>
                                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                </div>                            
                                            </Link>        
                                        </div>                                
                                    
                                    <div className="overlay-div-tab">
                                        <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                        <div>
                                            <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                            <Link to={photo.photoViewFullURL}>
                                                <div className="photo-hub-details">                                                
                                                    <h5 className="view-details">{"View Details"}</h5>
                                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                </div>
                                            </Link>
                                        </div>                                                                        
                                    </div> 
                                </div>
                                <div className="slider-content-footer">
                                    <div className="slider-buttons-container">
                                        <Button
                                            type={"button"}
                                            onClickEvent={()=>{}} 
                                            text={photo.likesCount}                                             
                                            style={photo.likesCount > 0 ? "slider-footer-button" : "slider-footer-button-grey" }
                                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/heart.svg"}
                                        />
                                        <Button
                                            type={"button"}
                                            onClickEvent={()=>{browserHistory.push(photo.photoViewFullURL)}} 
                                            text={photo.commentsCount }                                             
                                            style={photo.likesCount > 0 ? "slider-footer-button" : "slider-footer-button-grey" }
                                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/comment.svg"}
                                        />
                                        <Button
                                            type={"button"}
                                            onClickEvent={()=>{this.handleShowShareOptionClick(i)}} 
                                            text={""}                                             
                                            style={"slider-footer-button"}
                                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/share.svg"}
                                        />
                                    </div>                                    
                                </div> 
                                { selectedShareItem === i && (
                                    <div className="socialsharingbar">
                                        <SocialSharingBar
                                            contentLayout="horizontal"
                                            shareTitle={photo.imageTitle}
                                            shareDescription={"socialShareDescription"}
                                            shareURL="https://nova.slooh.com/lnk/randomizeForNow"
                                            shareImageURL={photo.imageURL}
                                        />
                                    </div>
                                )}                                            
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
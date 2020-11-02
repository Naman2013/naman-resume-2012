import { Component } from 'react';
import React from "react";
import { Button } from '../button';
import { Link } from 'react-router';
import Pagination from '../../common/v4-pagination/pagination';
import SocialSharingBar from '../../../../components/common/social-sharing-bar';
import { browserHistory } from 'react-router';
import { getSocialSharingInfo } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { ErrorPopup } from '../../common/errorPopup';

export class Observation extends Component{

    state = {
        activePage: 1,        
        selectedShareItem: null,
        shareInformation: null,
        errorInfo: null
    }    

    PHOTOS_ON_ONE_PAGE=18

    handlePageChange = ({ activePage }) => {
        const { getMyPictures } = this.props;       
        const PREVIOUS_PAGE = activePage - 1;
        this.startFrom = activePage === 1 ? 1 : PREVIOUS_PAGE * this.PHOTOS_ON_ONE_PAGE + 1;       
        getMyPictures({
          viewType: 'photoRoll',  
          sharedOnly: true,          
          firstImageNumber: this.startFrom,
          maxImageCount: this.PHOTOS_ON_ONE_PAGE,
        //   pagingMode: "api",       
        });
        this.setState({ activePage });
      };
    
      handleShowShareOptionClick = (index, customerImageId) => {
        const { token, at, cid } = getUserInfo();
        const { selectedShareItem } = this.state;  
        const self = this;        
        if(selectedShareItem === index)
        {
            index=null;
            this.setState({selectedShareItem: index, shareInformation: null });
        }            
        else{
            getSocialSharingInfo({token, cid, at, itemType: "image", itemId: customerImageId }).then(response=>{
                const res=response.data;
                if(!res.apiError){
                    self.setState({selectedShareItem: index, shareInformation: res });
                }
                else{
                    self.setState({errorInfo: res});
                }
            });
        }
        
    }
        
    
    render() {
        const { imageList, totalCount, showModal } = this.props;        
        const { activePage, showShareOption, selectedShareItem, shareInformation, errorInfo } = this.state;
        
        return (
            imageList !== undefined ? ( 
                <div>                
                    <div className="photo-hub-list">
                        {imageList.map((photo,i)=>(
                            <div>
                                <div className="photo-hub-item">                               
                                    <img className="img-fit" src={photo.imageURL}/>                                
                                        {photo.dashboardIsImageNewFlag &&(
                                            <div className="overlay-without-bg-div">
                                                <Button
                                                    type={"button"}
                                                    onClickEvent={()=>{}} 
                                                    text={photo.dashboardIsImageNewLabel}                                             
                                                    style={"button-style"}
                                                />
                                            </div>
                                        )}
                                        <div className="overlay-div">
                                            <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                            <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                            <Link to={photo.photoViewFullURL}>
                                                <div className="photo-hub-details" >
                                                    <h5 className="view-details">{"View Details"}</h5>
                                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                </div>                            
                                            </Link>        
                                        </div>  
                                        { selectedShareItem === i && shareInformation && (
                                            <div className="overlay-social-div">
                                                <i onClick={()=>{this.handleShowShareOptionClick(i, photo.customerImageId)}} className="photo-roll-icon icon-close" />
                                                <SocialSharingBar
                                                    contentLayout="horizontal"
                                                    shareTitle={shareInformation.socialShareTitle}
                                                    shareDescription={shareInformation.socialShareDescription}
                                                    shareURL={shareInformation.socialShareURL}
                                                    shareImageURL={shareInformation.shareImageURL ? shareInformation.shareImageURL : null}
                                                    shareIntroText={shareInformation.socialShareIntroText}
                                                    shareText={"How would you like to share your observation?"}
                                                />
                                            </div>
                                        )}  
                                </div>
                                <div className="overlay-div-tab">
                                    <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                        <div>
                                            <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                            <Link to={photo.photoViewFullURL}>
                                                <div className="photo-hub-details" >                                                
                                                    <h5 className="view-details">{"View Details"}</h5>
                                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                </div>
                                            </Link>
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
                                            onClickEvent={()=>{this.handleShowShareOptionClick(i, photo.customerImageId)}} 
                                            text={""}                                             
                                            style={"slider-footer-button"}
                                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/share.svg"}
                                        />
                                    </div>                                    
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

                    {errorInfo &&(
                       <ErrorPopup
                        errorstate={errorInfo}
                        onHide={()=>this.setState({errorInfo: null})}
                       />
                    )}

                
            </div>  
            ):null)                        
        
    }
}
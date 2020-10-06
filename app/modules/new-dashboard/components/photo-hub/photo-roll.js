import { Component } from 'react';
import React from "react";
import { Button } from '../button';
import { Link } from 'react-router';
import Pagination from '../../common/v4-pagination/pagination';
import AsideToggleableMenu from 'app/modules/profile-photos/components/AsideToggleableMenu';
import { getTagsApi } from 'app/modules/mission-details/api';
import { getUserInfo } from 'app/modules/User';
import { browserHistory } from 'react-router';
import { downloadFile } from 'app/utils/downloadFile';

export class PhotoRoll extends Component{

    state = {
        activePage: 1,
        menuIsVisible: false,
        menuIndex: null,
        
    }      

    getOptionList = (photo) => {
        let optionsList = [
            { label: 'Remove from This Gallery', action: 'removeFromGallery' },
            { label: 'Add to gallery', action: 'addToGallery' },
            { label: 'Delete image', action: 'remove' },
            { label: 'Write observation', action: 'redirect' },
            { label: 'Add Tags', action: 'tagging' },
            { label: 'Share Image', action: 'redirect' },
        ];
        
        if(!(photo.canEditFlag && !photo.observationLog)){
            optionsList=optionsList.filter((item)=>item.label !== "Write observation");
        }

        if(!photo.canShareFlag){
            optionsList=optionsList.filter((item)=>item.label !== "Share Image");
        }
        return optionsList;
    }

    
    
    blockWidth = null;
    PHOTOS_ON_ONE_PAGE=18

    componentDidMount() {
        if(this.blockWidth !== undefined && this.blockWidth !== null)
            this.setState({ width: this.blockWidth.clientWidth });
    }

    toggleMenuVisibility = (index) => {
        if(index === this.state.menuIndex )
            if(this.state.menuIsVisible)
                this.setState({ menuIndex: null, menuIsVisible: !this.state.menuIsVisible });
            else
                this.setState({ menuIndex: index, menuIsVisible: !this.state.menuIsVisible });
        else
            this.setState({ menuIndex: index, menuIsVisible: true });
    };

    redirectToImage = (photo, label) => ()=> {
        const { customerImageId } = photo;
        const { token } = getUserInfo();
        let option = undefined;
        switch(label){
            case "Write observation":
                if(photo.canEditFlag && !photo.observationLog)
                    option=label;
                break;
            case "Share Image":
                if(photo.canShareFlag)
                    option=label;
                break;
        }
        return browserHistory.push({
            pathname: `/my-pictures/show-image/${customerImageId}/${token}`,
            state: {option: option}}
        );
    };

    onDownloadFile = (e, imageURL, imageTitle) => {
        e.preventDefault();
        downloadFile(imageURL, imageTitle);
    };

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
        this.setState({ activePage, menuIndex: null });
      };
    
    render() {
        const { imageList, totalCount, tagActions, tagsData, showModal } = this.props;        
        const { activePage, menuIsVisible, width, menuIndex } = this.state;
        return (
            imageList !== undefined ? ( 
                <div>                
                    <div className="photo-hub-list">
                        {imageList.map((photo,i)=>(
                            <div>
                                <div className="photo-hub-item" ref={node => {
                                        this.blockWidth = node;
                                    }}>                               
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
                                            <div className="photo-card-header">
                                                <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                                <img onClick={()=>this.toggleMenuVisibility(i)} className="three-dot-icon mar-top-2" src="https://vega.slooh.com/assets/v4/dashboard-new/three_dots_white.svg"/>
                                            </div>                                            
                                            <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                            {/* <Link to={photo.photoViewFullURL}> */}
                                                <div className="photo-hub-details">
                                                    <h5 onClick={()=>browserHistory.push(photo.photoViewFullURL)} className="view-details">{"View Details"}</h5>
                                                    <i style={{color: "white"}} 
                                                        className="white icon-download" 
                                                        onClick={e =>this.onDownloadFile( e, photo.imageDownloadURL, photo.imageDownloadFilename )}
                                                    />
                                                    <img onClick={()=>browserHistory.push(photo.photoViewFullURL)} className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                    {/* <img onClick={()=>showModal({customerImageId: photo.customerImageId, shareToken: getUserInfo().token})} className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/> */}
                                                </div>                            
                                            {/* </Link>         */}
                                        </div>   
                                        {menuIndex == i && (
                                            <div className="photo-roll-menu">
                                                <AsideToggleableMenu
                                                    blockWidth={width}
                                                    visible={menuIsVisible}
                                                    tagActions={tagActions}
                                                    optionsList={this.getOptionList(photo)}
                                                    redirectToImage={(label)=>{return this.redirectToImage(photo,label)}}
                                                    toggleMenuVisibility={()=>this.toggleMenuVisibility(i)}
                                                    typeGallery={false}
                                                    currentItem={photo}
                                                    newDash
                                                    refresh={()=>this.handlePageChange({activePage})}
                                                    tagsData={tagsData}
                                                    {...photo}
                                                />
                                            </div>
                                        )}                                       
                                                                     
                                    
                                    <div className="overlay-div-tab">
                                        <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                        <div>
                                            <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                            {/* <Link to={photo.photoViewFullURL}> */}
                                                <div className="photo-hub-details" >                                                
                                                    <h5  className="view-details" onClick={()=>browserHistory.push(photo.photoViewFullURL)}>{"View Details"}</h5>
                                                    <img className="card-options" onClick={()=>browserHistory.push(photo.photoViewFullURL)} src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                    {/* ()=>showModal({customerImageId: photo.customerImageId, shareToken: getUserInfo().token}) */}
                                                </div>
                                            {/* </Link> */}
                                        </div>                                                                        
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
                
            </div>  
            ):null)                        
        
    }
}
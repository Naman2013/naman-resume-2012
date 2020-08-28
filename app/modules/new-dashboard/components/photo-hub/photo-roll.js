import { Component } from 'react';
import React from "react";
import { Button } from '../button';
import { Link } from 'react-router';
import Pagination from '../../common/v4-pagination/pagination';
import AsideToggleableMenu from 'app/modules/profile-photos/components/AsideToggleableMenu';

export class PhotoRoll extends Component{

    state = {
        activePage: 1,
        menuIsVisible: false,
        menuIndex: null,
    }    

    optionsList = [
        { label: 'Remove from This Gallery', action: 'removeFromGallery' },
        { label: 'Add to gallery', action: 'addToGallery' },
        { label: 'Delete image', action: 'remove' },
        { label: 'Write observation', action: 'redirect' },
        { label: 'Add Tags', action: 'tagging' },
        { label: 'Share Image', action: 'redirect' },
    ];
    
    blockWidth = null;
    PHOTOS_ON_ONE_PAGE=18

    componentDidMount() {
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

    redirectToImage = () => {
        // const { currentItem, user, isShareToken } = this.props;
        // const token = isShareToken ? currentItem.shareToken : user.token;
        // return browserHistory.push(
        //   `/my-pictures/show-image/${currentItem.customerImageId}/${token}`
        // );
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
        this.setState({ activePage });
      };
    
    render() {
        const { imageList, totalCount, tagActions } = this.props;        
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
                                            <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                            <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                            {/* <Link to={photo.photoViewFullURL}> */}
                                                <div className="photo-hub-details">
                                                    <h5 onClick={()=>browserHistory.push(photo.photoViewFullURL)} className="view-details">{"View Details"}</h5>
                                                    <img onClick={()=>this.toggleMenuVisibility(i)} className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                </div>                            
                                            {/* </Link>         */}
                                        </div>   
                                        {menuIndex == i && (
                                            <div className="photo-roll-menu">
                                                <AsideToggleableMenu
                                                    blockWidth={width}
                                                    visible={menuIsVisible}
                                                    tagActions={tagActions}
                                                    optionsList={this.optionsList}
                                                    redirectToImage={this.redirectToImage}
                                                    toggleMenuVisibility={()=>this.toggleMenuVisibility(i)}
                                                    typeGallery={false}
                                                    currentItem={photo}
                                                    newDash
                                                    tagsData={{isFetching: true, tagList: []}}
                                                    {...photo}
                                                />
                                            </div>
                                        )}                                       
                                                                     
                                    
                                    <div className="overlay-div-tab">
                                        <h5 className="mission-obj-name">{photo.imageTitle}</h5>
                                        <div>
                                            <h5 className="mission-obj-date">{photo.displayDate}</h5>
                                            {/* <Link to={photo.photoViewFullURL}> */}
                                                <div className="photo-hub-details">                                                
                                                    <h5 onClick={()=>browserHistory.push(photo.photoViewFullURL)} className="view-details">{"View Details"}</h5>
                                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
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
import { Component, Fragment } from 'react';
import React from "react";
import { Button as NewButton } from '../button';
import { Link } from 'react-router';
import Pagination from '../../common/v4-pagination/pagination';
import { browserHistory } from 'react-router';
import { customModalStylesFitDeviceScrollable } from 'app/styles/mixins/utilities';
import Modal from 'react-modal';
import { downloadFile } from 'app/utils/downloadFile';
import Button from 'app/components/common/style/buttons/Button';

export class Mission extends Component{

    state = {
        activePage: 1,
        showPrompt: false,
        menuIsVisible: false,
        modalComponent: null,
        modalStyles: customModalStylesFitDeviceScrollable,
    }    

    optionsList = [
        { label: 'Add tags' },
        { label: 'Download fits data', action: 'download' },
        { label: 'Download all images', action: 'downloadAll' },
    ];

    blockWidth = null;

    PHOTOS_ON_ONE_PAGE=18

    componentDidMount() {
        this.setState({ width: this.blockWidth.clientWidth });
    }

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

    onDownloadFitsData = (currentItem) => {
        const { getFitsData, fitsData } = this.props;
        const { data } = fitsData;
        const { scheduledMissionId } = data;
        if (currentItem.scheduledMissionId !== scheduledMissionId) {
          getFitsData({scheduledMissionId: currentItem.scheduledMissionId}).then(() => {
            const { fitsData } = this.props;
            this.setModal(fitsData);
          });
        }
        this.showModal();
    };

    onDownloadFile = (e, url, name) => {
        e.preventDefault();
        downloadFile(url, name);
    };

    setModal = modalComponent => {
        this.setState(state => ({
          modalComponent: modalComponent || state.modalComponent,
        }));
    };

    showModal = () => {
        this.setState(() => ({
          showPrompt: true,
        }));
    };

    closeModal = () => {
        this.setState(() => ({
          showPrompt: false,
        }));
    };

    generateFitsViewerUrl = imageUrl => {
        return `/fits-viewer/fits-viewer.html?url=${imageUrl}`;
    };

    renderModalComponent = data => {
        const {
          popupTitleText,
          missionIconURL,
          missionTitle,
          missionObsName,
          missionPierName,
          missionDateTime,
          takenByText,
          ownerAvatarURL,
          groupList,
          buttonText,
          ownerDisplayName,
        } = data;
    
        const { closeModal, onDownloadFile, generateFitsViewerUrl } = this;
        return (
          <div className="fitsData">
            <h2>{popupTitleText}</h2>
            <h3>
              <img src={missionIconURL} alt="" />
              {missionTitle}
            </h3>
            <h3>{missionObsName}</h3>
            <h3>{missionPierName}</h3>
            <h3>{missionDateTime}</h3>
            <h5>
              <p>{takenByText}</p>
              <img src={ownerAvatarURL} alt="" />
              <p className="flex-column text-left">
                <p>{ownerDisplayName}</p>
              </p>
            </h5>
    
            {groupList &&
              groupList.length &&
              groupList.map(({ groupIndex, groupName, groupImageList }) => {
                return (
                  <ul
                    key={`${groupIndex}-${groupName}`}
                    className="fits-image-list"
                  >
                    <h5>{groupName}</h5>
                    {groupImageList.map(({ imageId, imageTitle, imageURL }) => {
                      return (
                        <li
                          key={`${imageId}-${imageTitle}`}
                          className="fits-image-item"
                        >
                          <div className="fits-item-title">{imageTitle}</div>
                          <div className="fits-item-action">
                            <a
                              href={generateFitsViewerUrl(imageURL)}
                              target="_blank"
                              className="astronomical-view-btn btn btn-primary"
                            >
                              View FITS
                            </a>
                            <a
                              href={imageURL}
                              className="astronomical-download-btn btn-circle"
                              onClick={e => onDownloadFile(e, imageURL, imageTitle)}
                              download
                            >
                              <span className="icon-download" />
                            </a>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            <Button onClickEvent={closeModal} mod="auto">
              {buttonText}
            </Button>
          </div>
        );
    };
    
    render() {
        const { imageList, totalCount, showModal, fitsData } = this.props; 
        const { closeModal, renderModalComponent } = this;       
        const { activePage, showPrompt, modalStyles, modalComponent } = this.state;
        
        return (
            imageList !== undefined ? ( 
                <div>                
                    <div className="photo-hub-list">
                        {imageList.map(photo=>(
                            <div>
                                <div className="photo-mission-item" ref={node => {
                                    this.blockWidth = node;
                                }}>  
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
                                                    {/* <Link to={photo.photoViewFullURL}> */}
                                                        {/* <div className="photo-hub-details" onClick={()=>browserHistory.push(photo.missionURL)}>                                                 */}
                                                        <div className="photo-hub-details" onClick={()=>showModal({missionId: photo.scheduledMissionId})}>                                                
                                                            <h5 className="view-details">{"View Details"}</h5>
                                                            <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                        </div>
                                                    {/* </Link> */}
                                                </div>                                                                        
                                            </div> 
                                        </div>
                                    </div>                             
                                                               
                                        {photo.dashboardIsImageNewFlag &&(
                                            <div className="overlay-without-bg-div">
                                                <NewButton
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
                                            <div className="photo-mission-telescope">
                                                <h5 className="mission-obj-date">{photo.telescopeName}</h5>
                                                <h5 className="mission-obj-date">|</h5>
                                                <h5 className="mission-obj-date">{photo.missionImageCount} Images</h5>
                                            </div>
                                            {photo.fitsIsAvailable && (
                                                <Fragment>                                                    
                                                    <div className="photo-mission-telescope" style={{border: "1px solid white", borderWidth: "1px 0 1px 0"}}>
                                                        <h5 className="mission-obj-date" style={{margin: "5px 0px"}}>Contains fits data</h5>                                            
                                                        <Button
                                                            mod="plain"
                                                            onClickEvent={()=>this.onDownloadFitsData(photo)}
                                                            theme={{ borderColor: '#fff', color: '#fff' }}
                                                        >
                                                            <i className="white icon-download" />
                                                        </Button>                                                
                                                    </div>
                                                    <Modal
                                                        ariaHideApp={false}
                                                        isOpen={showPrompt}
                                                        style={modalStyles}
                                                        contentLabel="Fits image download"
                                                        onRequestClose={closeModal}
                                                        shouldCloseOnOverlayClick
                                                    >
                                                        {fitsData && fitsData.isFetching && !modalComponent && (
                                                            <div className="text-center">Loading...</div>
                                                        )}
                                                        {modalComponent &&
                                                            modalComponent.isLoaded &&
                                                            renderModalComponent(modalComponent.data)}
                                                    </Modal>
                                                </Fragment>
                                            )}
                                            
                                            
                                            
                                            {/* <Link to={photo.photoViewFullURL}> */}
                                                <div className="photo-hub-details" onClick={()=>showModal({missionId: photo.scheduledMissionId})}>
                                                    <h5 className="view-details">{"View Details"}</h5>
                                                    <img className="card-options" src="https://vega.slooh.com/assets/v4/dashboard-new/right_arrow_white.svg"/>
                                                </div>                            
                                            {/* </Link>         */}
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
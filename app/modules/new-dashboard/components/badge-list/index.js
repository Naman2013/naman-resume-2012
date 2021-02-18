import { Component } from 'react';
import React from "react";
import './style.scss';
import Popup from 'react-modal';
import { customModalStylesSloohBlueOverlay, customModalStylesBlackOverlayBadge } from 'app/styles/mixins/utilities';
import { getObjectCard } from '../../dashboardApi';
import ObjectCard from '../object-card';
import { getUserInfo } from 'app/modules/User';
import { Spinner } from 'app/components/spinner/index';

export class BadgeList extends Component{

    state={
        showBadge: false,
        currentBadge: undefined,
        objectBadge: undefined,
        loading: false
    }

    handleBadgeClick = (item) =>{
        const self=this;
        switch(item.itemType){
            case "object":
                if(this.props.publicProfile)
                    return;
                this.setState({loading: true});
                const { token, at, cid } = getUserInfo();
                getObjectCard({
                    token, 
                    at, 
                    cid,
                    objectId: item.objectId,
                    objectUUID: item.objectUUID,
                    objectVersion: 1.1,
                    callSource: this.props.callSource,
                  }).then(response=>{
                      const res=response.data;
                      if(!res.apiError)
                        self.setState({showBadge: true, currentBadge: item, objectBadge: res, loading: false});
                      else
                        self.setState({loading: false});
                  });  
                break;
            case "quest":
            case "badge":
                this.setState({showBadge: true, currentBadge: item});
                break;
        }
        // this.setState({showBadge: true, currentBadge: item});
    }

    closePopup = () => {
        this.setState({showBadge: false, currentBadge: undefined, objectBadge: undefined});
    }
    
    render() {

        const { badgeLists, totalBadgeCount, currentBadgeCount, scrollToRef, refreshPhotoHub, publicProfile } = this.props;
        const { showBadge, currentBadge, objectBadge, loading } = this.state;
        // const heading = "Badges(" +badgeLists.length + "/"+ totalBadgeCount + ")";        
        const heading = "Badges";
        const badgeCount = currentBadgeCount > 40 ? currentBadgeCount : 40;
        
        return (
            <div className="badge-main">
                <Spinner loading={loading} />
                <h2 className="badge-heading">{heading}</h2>
                <div className="badgelist">   
                    {[...Array(badgeCount)].map((e,index)=>(
                        <div className={ index < badgeLists.length ? badgeLists[index].itemType === "badge" ? "quest-badge-present" : publicProfile ? "badge-present-no-cursor" : "badge-present" : "badge-empty"}>
                            {badgeLists[index] && (
                                <img src={badgeLists[index].badgeIconURL} className={badgeLists[index].itemType === "badge" ? "badge-icon-quest" : "badge-icon"} onClick={()=>this.handleBadgeClick(badgeLists[index])}/>
                            )}
                        </div>
                    ))} 
                </div>
                {showBadge &&(
                    (currentBadge.itemType === "object" && objectBadge) ? (
                        <Popup
                        // ariaHideApp={false}
                            isOpen={true}
                            style={customModalStylesBlackOverlayBadge}
                            contentLabel="Badge"
                            shouldCloseOnOverlayClick={true}
                            onRequestClose={this.closePopup}
                        >
                            <div className="new-dash">
                                <ObjectCard
                                    onHide={this.closePopup}
                                    objectCardDetails={objectBadge}
                                    scrollToRef={scrollToRef} 
                                    refreshPhotoHub={refreshPhotoHub}
                                />
                            </div>   
                        </Popup>                      
                       
                    ):(
                    <Popup
                        // ariaHideApp={false}
                        isOpen={true}
                        style={customModalStylesSloohBlueOverlay}
                        contentLabel="Badge"
                        shouldCloseOnOverlayClick={true}
                        onRequestClose={this.closePopup}
                    >                        
                                <div>
                                    <i className="fa fa-close float-right" onClick={this.closePopup} />
                                    <div className="popup-div">
                                        <div className={currentBadge.itemType === "badge" ? "popup-quest-badge-present" : "popup-badge-present"}>
                                            <img className={currentBadge.itemType === "badge" ? "quest-badge-icon-popup" : "badge-icon-popup"} src={currentBadge.badgeIconURL} />
                                        </div>                            
                                        <h3 className="popup-badge-name">{currentBadge.badgeTitle}</h3>
                                        {/* <h5 className="popup-badge-desc">{currentBadge.badgeDescription}</h5> */}
                                    </div>
                                </div>
                    </Popup>
                ))}                              
            </div>   
        );
    }

}
import { Component } from 'react';
import React from "react";
import './style.scss';
import Popup from 'react-modal';
import { customModalStylesSloohBlueOverlay } from 'app/styles/mixins/utilities';

export class BadgeList extends Component{

    state={
        showBadge: false,
        currentBadge: undefined,
    }

    handleBadgeClick = (item) =>{
        this.setState({showBadge: true, currentBadge: item});
    }

    closePopup = () => {
        this.setState({showBadge: false, currentBadge: undefined});
    }
    
    render() {

        const { badgeLists, totalBadgeCount, currentBadgeCount } = this.props;
        const { showBadge, currentBadge } = this.state;
        const heading = "Badges(" +badgeLists.length + "/"+ totalBadgeCount + ")";        
        const badgeCount = currentBadgeCount > 40 ? currentBadgeCount : 40;
        
        return (
            <div className="badge-main">
                <h2 className="badge-heading">{heading}</h2>
                <div className="badgelist">   
                    {[...Array(badgeCount)].map((e,index)=>(
                        <div className={ index < badgeLists.length ? "badge-present" : "badge-empty"}>
                            {badgeLists[index] && (
                                <img src={badgeLists[index].badgeIconURL} className="badge-icon" onClick={()=>this.handleBadgeClick(badgeLists[index])}/>
                            )}
                        </div>
                    ))} 
                </div>
                {showBadge &&(
                    <Popup
                        // ariaHideApp={false}
                        isOpen={true}
                        style={customModalStylesSloohBlueOverlay}
                        contentLabel="Badge"
                        shouldCloseOnOverlayClick={true}
                        onRequestClose={this.closePopup}
                    >
                        <i className="fa fa-close float-right" onClick={this.closePopup} />
                        <div className="popup-div">
                            <div className="popup-badge-present">
                                <img className="badge-icon-popup" src={currentBadge.badgeIconURL} />
                            </div>                            
                            <h3 className="popup-badge-name">{currentBadge.badgeTitle}</h3>
                            <h5 className="popup-badge-desc">{currentBadge.badgeDescription}</h5>
                        </div>
                    </Popup>
                )}                              
            </div>   
        );
    }

}
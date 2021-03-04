import { Component } from 'react';
import React from "react";
import './style.scss';
import { browserHistory } from 'react-router';
import { Button } from '../button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilters } from 'app/modules/my-pictures-filters/actions';
import MVPAstronomerNew from 'app/components/common/MVPAstronomer/MVPAstronomerNew';


class ObjectCard extends Component{
    
    state={
        seeMore: false
    }

    handleViewImageClick = () => {
        const { actions, objectCardDetails, scrollToRef, refreshPhotoHub,onHide, fullScreenMode, exixFullScreenMode } = this.props;
        if(fullScreenMode){
            exixFullScreenMode();
        }
        actions.setFilters({pierNumber: null,
            observatoryId: null,
            filterType: null,
            timeFilter: null,
            dateFilter: null,
            missionSystemTags: [],
            missionUserTags: [],
            pictureUserTags: [], 
            astroObjectName: objectCardDetails.title.text, 
            astroObjectIds: objectCardDetails.viewImagesObjectList});
        onHide();
        scrollToRef(2);
        refreshPhotoHub();
        
    }

    render() {
               
        const { onHide, objectCardDetails, setPublicCardStatusAction, } = this.props;
        const { seeMore } = this.state;   
        return (
            <div id="object-card" className="object-card-main" style={{background: objectCardDetails.cardBackgroundColor}}>
                <img className="object-close-icon" onClick={onHide} src={objectCardDetails.imageArray.showImage ? "https://vega.slooh.com/assets/v4/dashboard-new/close_slooh_blue.svg" : "https://vega.slooh.com/assets/v4/dashboard-new/close_white.svg"} />
                <div className="object-header-container" style={{background: objectCardDetails.imageArray.showImage ? "none" : objectCardDetails.imageArray.imagePlaceholderBackgroundColor }}>                    
                    {objectCardDetails.imageArray.showImage ?
                        <img src={objectCardDetails.imageArray.imageURL} className="object-header-bg"  /> :
                       
                        <div className="header-no-img-container">
                            <img src={objectCardDetails.imageArray.imagePlaceholderIconURL} className="no-img-placeholder" />                           
                                <div className="no-img-textPlaceHolder">
                                    {objectCardDetails.imageArray.showImagePlaceholderText && (
                                        <h2 className="header-image-text">{objectCardDetails.imageArray.imagePlaceholderText}</h2>
                                    )}

                                    {objectCardDetails.imageArray.showImagePlaceholderSubtext && (
                                        <h5 className="header-image-subtext">{objectCardDetails.imageArray.imagePlaceholderSubtext}</h5>
                                    )}
                                
                                </div>                            
                        </div>                        
                    }                         
                </div> 
                {objectCardDetails.imageArray.showImageInfoText && (
                        <h2 className="obj-info-img-text">{objectCardDetails.imageArray.imageInfoText}</h2>
                    )}  
                <hr className="horizontalline" />          
                <div className="object-details-container">
                    <h2 className="object-title">{objectCardDetails.title.text}</h2>
                    <h6 className="object-subtitle">{objectCardDetails.subtitle.text}</h6>
                    <h6 className="object-subtitle">{objectCardDetails.objectType.text} <img classname="object-img" src={objectCardDetails.objectType.iconURL}/></h6>
                    <br/>
                    <p className="object-tagline">{objectCardDetails.tagline.text}</p>
                    <br/>
                    <p className="object-description" dangerouslySetInnerHTML={{__html: objectCardDetails.description.text}}/>
                    <br/>

                    {objectCardDetails.featuresArray.map(feature =>(
                        <h6 className="object-features">{feature.title} <b>{feature.data}</b></h6>
                    ))}                    
                    {objectCardDetails?.showMVPSection && objectCardDetails?.specialistsList?.length > 0 && (
                        <div>
                            <br/>
                            <br/>
                            <hr className="horizontalline"/>
                            <h5 className="mvp-title"><b>{objectCardDetails?.specialistsListTitle}</b> {objectCardDetails?.mvpObjectTitle}</h5>
                            <div className="mvp-card-container">
                                {objectCardDetails?.specialistsList.map(card=>(
                                    <MVPAstronomerNew {...card} cardClass="contents-mvp-card" />                                    
                                ))}
                            </div>
                        </div>
                        
                    )}
                </div>
                <hr className="horizontalline"/>
                <div className="object-button-controls">
                    {objectCardDetails.showPlanMissionButton && (
                        <Button
                            type={"button"}
                            onClickEvent={()=>{browserHistory.push(objectCardDetails.planMissionUrl)}} 
                            text={objectCardDetails.planMissionButtonCaption}                                             
                            style={"plan-btn"}
                        />
                    )}
                    {objectCardDetails.showViewImagesButton && (
                        <Button
                            type={"button"}
                            onClickEvent={this.handleViewImageClick} 
                            text={objectCardDetails.viewImagesButtonCaption}                                             
                            style={"view-btn"}
                        />
                    )}
                    {objectCardDetails.showMoreInfoButton && (
                        <Button
                            type={"button"}
                            onClickEvent={()=>{browserHistory.push(objectCardDetails.moreInfoUrl)}} 
                            text={objectCardDetails.moreInfoButtonCaption}                                             
                            style={"more-btn"}
                        />
                    )}
                    
                </div>               
                    
                   
               
                {/* <div className="quest-badge-container">                    
                    <img src={objectCardDetails.badgeIconURL} className="quest-badge-icon"/>
                </div>                
                <img className="close-icon" onClick={onHide} src="https://vega.slooh.com/assets/v4/dashboard-new/close_white.svg" />
                <h3 dangerouslySetInnerHTML={{ __html: objectCardDetails.progressMessage.text}} className="quest-status" style={{color: objectCardDetails.progressMessage.color}}/>
                <h2 dangerouslySetInnerHTML={{ __html: objectCardDetails.title.text}} className="quest-heading" style={{color: objectCardDetails.title.color}}/>
                <h5 dangerouslySetInnerHTML={{ __html: objectCardDetails.subtitle.text}} className="quest-subheading" style={{color: objectCardDetails.subtitle.color}}/>
                <br/>           

                <div className="quest-steps">
                    {objectCardDetails.bulletPointsList.map(point =>(
                        <div className="quest-steps-item" style={{background: point.backgroundColor}}>
                            <img className="step-icon" src={point.iconURL}/>
                            <div className="quest-item-container">
                                <h5 dangerouslySetInnerHTML={{ __html: point.text}} className="step-title" style={{color: point.textColor}}/>
                                <h5 dangerouslySetInnerHTML={{ __html: point.subtext}} className="step-subtitle" style={{color: point.textColor}}/>
                            </div>
                        </div>                    
                    ))}                    
                </div>
                <br/>                

                <h4 dangerouslySetInnerHTML={{ __html: objectCardDetails.description.title}} className="quest-heading-desc" />                
                <div  className="quest-description" style={{color: objectCardDetails.description.textColor}}>
                    <div dangerouslySetInnerHTML={{ __html: seeMore ? objectCardDetails.description.longText : objectCardDetails.description.shortText}} style={{color: objectCardDetails.description.titleColor}}/>
                    {objectCardDetails.description.showPromptText && (
                        <h5 dangerouslySetInnerHTML={{ __html: seeMore ? objectCardDetails.description.promptTextLong : objectCardDetails.description.promptTextShort}} className="see-more" style={{color: objectCardDetails.description.promptColor}} onClick={()=>this.setState({seeMore: !seeMore})} />
                    )}    
                </div>
                            
                <br/>

                <div className="quest-navigation">
                    {objectCardDetails.showViewQuestButton && (
                        <Button
                            type={"button"}
                            onClickEvent={()=>browserHistory.push(objectCardDetails.viewQuestUrl)} 
                            text={objectCardDetails.viewQuestButtonCaption}                                             
                            style={"quest-button-style"}
                        />
                        // <h1 dangerouslySetInnerHTML={{ __html: objectCardDetails.viewQuestButtonCaption}} onClick={()=>browserHistory.push(objectCardDetails.viewQuestUrl)} style={{color: objectCardDetails.description.promptColor}}/>
                    )}

                    {objectCardDetails.showStartQuestButton && (
                        <Button
                            type={"button"}
                            onClickEvent={()=>browserHistory.push(objectCardDetails.startQuestUrl)} 
                            text={objectCardDetails.startQuestButtonCaption}                                             
                            style={"quest-button-style"}
                        />
                        // <h1 dangerouslySetInnerHTML={{ __html: objectCardDetails.startQuestButtonCaption}} onClick={()=>browserHistory.push(objectCardDetails.startQuestUrl)} style={{color: objectCardDetails.description.promptColor}}/>
                    )}

                    {objectCardDetails.showClaimBadgeButton && (
                        <Button
                            type={"button"}
                            onClickEvent={()=>browserHistory.push(objectCardDetails.claimBadgeUrl)} 
                            text={objectCardDetails.claimBadgeButtonCaption}                                             
                            style={"quest-button-style"}
                        />
                        // <h1 dangerouslySetInnerHTML={{ __html: objectCardDetails.claimBadgeButtonCaption}} onClick={()=>browserHistory.push(objectCardDetails.claimBadgeUrl)} style={{color: objectCardDetails.description.promptColor}}/>
                    )}
                </div> */}
                <br/>
                {/* Quest Progress */}
                                        
            </div>   
        );
    }

}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
      {   
        setFilters,
      },
      dispatch
    ),
  });
  
   
  
  export default connect(
    null,
    mapDispatchToProps
  )(ObjectCard)


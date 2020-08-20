import { Component } from 'react';
import React from "react";
import './style.scss';
import { browserHistory } from 'react-router';
import { Button } from '../button';

export class QuestCard extends Component{
    
    state={
        seeMore: false
    }

    render() {
               
        const { onHide, questCardDetails } = this.props;
        const { seeMore } = this.state;
     
        return (
            <div id="quest-card" className="quest-card-main" style={{background: questCardDetails.cardBackgroundColor}}>
                <div className="quest-badge-container">                    
                    <img src={questCardDetails.badgeIconURL} className="quest-badge-icon"/>
                </div>                
                <img className="close-icon" onClick={onHide} src="https://vega.slooh.com/assets/v4/dashboard-new/close_white.svg" />
                <h3 dangerouslySetInnerHTML={{ __html: questCardDetails.progressMessage.text}} className="quest-status" style={{color: questCardDetails.progressMessage.color}}/>
                <h2 dangerouslySetInnerHTML={{ __html: questCardDetails.title.text}} className="quest-heading" style={{color: questCardDetails.title.color}}/>
                <h5 dangerouslySetInnerHTML={{ __html: questCardDetails.subtitle.text}} className="quest-subheading" style={{color: questCardDetails.subtitle.color}}/>
                <br/>           

                <div className="quest-steps">
                    {questCardDetails.bulletPointsList.map(point =>(
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

                <h4 dangerouslySetInnerHTML={{ __html: questCardDetails.description.title}} className="quest-heading-desc" />                
                <div  className="quest-description" style={{color: questCardDetails.description.textColor}}>
                    <div dangerouslySetInnerHTML={{ __html: seeMore ? questCardDetails.description.longText : questCardDetails.description.shortText}} style={{color: questCardDetails.description.titleColor}}/>
                    {questCardDetails.description.showPromptText && (
                        <h5 dangerouslySetInnerHTML={{ __html: seeMore ? questCardDetails.description.promptTextLong : questCardDetails.description.promptTextShort}} className="see-more" style={{color: questCardDetails.description.promptColor}} onClick={()=>this.setState({seeMore: !seeMore})} />
                    )}    
                </div>
                            
                <br/>

                <div className="quest-navigation">
                    {questCardDetails.showViewQuestButton && (
                        <Button
                            type={"button"}
                            onClickEvent={()=>browserHistory.push(questCardDetails.viewQuestUrl)} 
                            text={questCardDetails.viewQuestButtonCaption}                                             
                            style={"quest-button-style"}
                        />
                        // <h1 dangerouslySetInnerHTML={{ __html: questCardDetails.viewQuestButtonCaption}} onClick={()=>browserHistory.push(questCardDetails.viewQuestUrl)} style={{color: questCardDetails.description.promptColor}}/>
                    )}

                    {questCardDetails.showStartQuestButton && (
                        <Button
                            type={"button"}
                            onClickEvent={()=>browserHistory.push(questCardDetails.startQuestUrl)} 
                            text={questCardDetails.startQuestButtonCaption}                                             
                            style={"quest-button-style"}
                        />
                        // <h1 dangerouslySetInnerHTML={{ __html: questCardDetails.startQuestButtonCaption}} onClick={()=>browserHistory.push(questCardDetails.startQuestUrl)} style={{color: questCardDetails.description.promptColor}}/>
                    )}

                    {questCardDetails.showClaimBadgeButton && (
                        <Button
                            type={"button"}
                            onClickEvent={()=>browserHistory.push(questCardDetails.claimBadgeUrl)} 
                            text={questCardDetails.claimBadgeButtonCaption}                                             
                            style={"quest-button-style"}
                        />
                        // <h1 dangerouslySetInnerHTML={{ __html: questCardDetails.claimBadgeButtonCaption}} onClick={()=>browserHistory.push(questCardDetails.claimBadgeUrl)} style={{color: questCardDetails.description.promptColor}}/>
                    )}
                </div>
                <br/>
                {/* Quest Progress */}
                                        
            </div>   
        );
    }

}
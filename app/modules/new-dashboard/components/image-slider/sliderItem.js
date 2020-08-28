import { Component } from 'react';
import React from "react";
import './style.scss';
import { getImageDetails } from '../../dashboardApi';
import { CALLSOURCE_PHOTOVIEW } from 'app/modules/image-details/components/imageDetailsConfiguration';
import { getUserInfo } from 'app/modules/User';
import { Button } from '../button';
import ObservationComments from 'app/modules/observations/containers/observation-comments';

export class SliderItem extends Component{

    state={
        imageDetails: null
    }

    constructor(props){
        super(props);
        const { index, slideElement, getImageDetails } = props;
        const { at, token, cid } = getUserInfo();
        getImageDetails(index, {at, cid, token, callSource: "sharedpictures", customerImageId: slideElement.customerImageId, useShareToken: 'n'});
    }
    
    render() {
        const { imageDetails } = this.props;
        const { index, isDiscussionsOpen, onCommentButtonClick  } = this.props;        
   
        return (
            imageDetails && (
                <div>
                    <div className="slider-item">
                        <div className="slider-info-container-large">
                                    <h2 className="slider-title">{imageDetails.observationTitle}</h2>
                                    <h4 className="slider-subtitle">by <u>{imageDetails.displayName}</u></h4>
                                    <p className="slider-content">{imageDetails.observationLog}</p>
                                    <div className="slider-content-footer">
                                        <div className="slider-buttons-container">
                                            <Button
                                                type={"button"}
                                                onClickEvent={()=>{}} 
                                                text={imageDetails.likesCount}                                             
                                                style={"slider-footer-button"}
                                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/heart.svg"}
                                            />
                                            <Button
                                                type={"button"}
                                                onClickEvent={onCommentButtonClick} 
                                                text={imageDetails.commentsCount}                                             
                                                style={"slider-footer-button"}
                                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/comment.svg"}
                                            />
                                            <Button
                                                type={"button"}
                                                onClickEvent={()=>{}} 
                                                text={"0"}                                             
                                                style={"slider-footer-button"}
                                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/share.svg"}
                                            />
                                        </div>
                                        <span className="slider-updated">{imageDetails.observationTimeDisplay[0]}</span>
                                    </div> 
                                    {/* <input type="text" className="slider-comment-input" placeholder="Write a Comment"/>  */}
                                    {isDiscussionsOpen &&  (
                                        <ObservationComments
                                            topLevelThread={false}
                                            callSource={CALLSOURCE_PHOTOVIEW}
                                            count={10}
                                            commentsCount={imageDetails.commentsCount}
                                            commentsThreadId={imageDetails.commentsThreadId}
                                            forumId={imageDetails.commentsForumId}
                                            topicId={imageDetails.commentsTopicId}
                                            threadId={imageDetails.commentsThreadId}
                                            canSubmitReplies={imageDetails.canSubmitReplies}
                                        />
                                    )}
                                </div> 
                        <img className="img-slider" src={imageDetails.imageURL} />
                    </div>
                    {/* <div>
                        <div className="slider-info-container">
                            <h2 className="slider-title">{imageDetails.observationTitle}</h2>
                            <h4 className="slider-subtitle">by <u>{imageDetails.displayName}</u></h4>
                            <p className="slider-content">{imageDetails.observationLog}</p>
                            <div className="slider-content-footer">
                                <div className="slider-buttons-container">
                                            <Button
                                                type={"button"}
                                                onClickEvent={()=>{}} 
                                                text={imageDetails.likesCount}                                             
                                                style={"slider-footer-button"}
                                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/heart.svg"}
                                            />
                                            <Button
                                                type={"button"}
                                                onClickEvent={onCommentButtonClick} 
                                                text={imageDetails.commentsCount}                                             
                                                style={"slider-footer-button"}
                                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/comment.svg"}
                                            />
                                            <Button
                                                type={"button"}
                                                onClickEvent={()=>{}} 
                                                text={"0"}                                             
                                                style={"slider-footer-button"}
                                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/share.svg"}
                                            />
                                </div>
                                <span className="slider-updated">{imageDetails.observationTimeDisplay[0]}</span>
                            </div> 
                            <input type="text" className="slider-comment-input" placeholder="Write a Comment"/> 
                            {isDiscussionsOpen && (
                                <ObservationComments
                                topLevelThread={false}
                                callSource={CALLSOURCE_PHOTOVIEW}
                                count={10}
                                commentsCount={currentItem.commentsCount}
                                commentsThreadId={currentItem.commentsThreadId}
                                forumId={currentItem.commentsForumId}
                                topicId={currentItem.commentsTopicId}
                                threadId={currentItem.commentsThreadId}
                                canSubmitReplies={currentItem.canSubmitReplies}
                                />
                            )}
                        </div>                       
                    </div>    */}
                </div>
            )
             
        );
    }

}
import { Component } from 'react';
import React from "react";
import './style.scss';
import { getImageDetails } from '../../dashboardApi';
import { CALLSOURCE_PHOTOVIEW } from 'app/modules/image-details/components/imageDetailsConfiguration';
import { getUserInfo } from 'app/modules/User';
import { Button } from '../button';
import ObservationComments from 'app/modules/observations/containers/observation-comments';
import LikeButton from '../button/LikeButton';
import { Link } from 'react-router';
import { Tooltip } from 'react-tippy';
import { browserHistory } from 'react-router';

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
        const { imageDetails, onClickItem, onImageClick } = this.props;
        const { index, isDiscussionsOpen, onCommentButtonClick  } = this.props;        
        
        return (
            imageDetails && (
                <div>
                    <div className="slider-item">
                        <div className="slider-info-container-large">
                                    <h2 className="slider-title">{imageDetails.observationTitle}</h2>
                                    <h4 className="slider-subtitle">by <u onClick={()=>onClickItem(imageDetails.customerUUID, true)}>{imageDetails.displayName}</u>
                                    <span className="slider-updated">{imageDetails.observationTimeDisplay[0]}</span>
                                    </h4>
                                    <br/>
                                    <p className="slider-content" dangerouslySetInnerHTML={{__html: imageDetails.observationLog}} />
                                    <div className="icon-container">
                                        {Object.keys(imageDetails.iconFileData).map(icon=>(
                                            <div>
                                                {imageDetails.iconFileData[icon].hasLink ? (                                                    
                                                        <Link to={imageDetails.iconFileData[icon].linkUrl} >
                                                            <Tooltip
                                                                title={imageDetails.iconFileData[icon].text}
                                                                arrow
                                                            >
                                                                <img className="member-icons" src={imageDetails.iconFileData[icon].dashboardIconUrl}/>
                                                            </Tooltip>
                                                        </Link>
                                                    
                                                ):(   
                                                    <Tooltip
                                                        title={imageDetails.iconFileData[icon].text}
                                                        arrow
                                                    >                                          
                                                        <img 
                                                            onClick={ icon === "Member" ? ()=>onClickItem(imageDetails.customerUUID, true) : null } 
                                                            className="member-icons" 
                                                            src={imageDetails.iconFileData[icon].dashboardIconUrl}/>  
                                                    </Tooltip>                                                 
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="slider-content-footer">
                                        <div className="slider-buttons-container">
                                            {/* <Button
                                                type={"button"}
                                                onClickEvent={()=>{}} 
                                                text={imageDetails.likesCount}                                             
                                                style={"slider-footer-button"}
                                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/heart.svg"}
                                            /> */}
                                            <LikeButton
                                                mod="no-border"
                                                likePrompt={imageDetails.likePrompt}
                                                likesCount={imageDetails.likesCount}
                                                likedByMe={imageDetails.likedByMe}
                                                likeTooltip={imageDetails.likeTooltip}                                        
                                                customerId={imageDetails.customerImageId}
                                                showLikePrompt={imageDetails.showLikePrompt}
                                                btnStyle={"slider-footer-button"}
                                            />

                                            <div>
                                                <Button
                                                    type={"button"}
                                                    onClickEvent={onCommentButtonClick} 
                                                    text={imageDetails.commentsCount}                                             
                                                    style={"slider-footer-button"}
                                                    icon={"https://vega.slooh.com/assets/v4/dashboard-new/comment.svg"}
                                                />
                                            </div>                                            

                                            <Button
                                                type={"button"}
                                                onClickEvent={()=>browserHistory.push(imageDetails.photoViewFullURL)} 
                                                text={"View Details"}                                             
                                                style={"view-details-btn"}
                                                icon={null}
                                            />
                                            {/* <Button
                                                type={"button"}
                                                onClickEvent={()=>{}} 
                                                text={"0"}                                             
                                                style={"slider-footer-button"}
                                                icon={"https://vega.slooh.com/assets/v4/dashboard-new/share.svg"}
                                            /> */}
                                        </div>
                                        {/* <span className="slider-updated">{imageDetails.observationTimeDisplay[0]}</span> */}
                                    </div> 
                                    {/* <input type="text" className="slider-comment-input" placeholder="Write a Comment"/>  */}
                                    {/* {isDiscussionsOpen &&  (
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
                                    )} */}
                                </div>
                        {/* <Link to={imageDetails.linkUrl} > */}
                            <img className="img-slider" src={imageDetails.imageURL} onClick={onImageClick} />
                        {/* </Link> */}
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
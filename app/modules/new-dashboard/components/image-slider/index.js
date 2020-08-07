import { Component } from 'react';
import React from "react";
import './style.scss';
import Slider from "react-slick";
import { Button } from '../button';
// import './slick.min.css';
// import './slick-theme.min.css';
import ObservationComments from 'app/modules/observations/containers/observation-comments';
import { CALLSOURCE_PHOTOVIEW } from 'app/modules/image-details/components/imageDetailsConfiguration';

export class ImageSlider extends Component{

    state={
        
    }

    constructor(props){
        super(props);
        if ( props.photoHub !== undefined && props.photoHub.imageList.length > 0 )
            this.state = { currentItem: props.photoHub.imageList[0],
                            isDiscussionsOpen: false };
        else
            this.state = { currentItem: undefined,
                            isDiscussionsOpen: false };
    }
    
    render() {      
        const slideImages = [{imageURL: "https://vega.slooh.com/assets/v4/dashboard-new/test1.PNG", title: "IC2602 (Southern Pleiades) With Chile 2", subtile: "Marjorie Robertson", content: "Messier 99 is a grand design galaxy in the constellation Coma Berenices. The galaxy is a member of the Virgo cluster and lies at a distance of 55 million LY with a diameter of 85,000 LY. It has a peculiar shape with one normal looking arm and an extended arm that is less tightly wound.", updated: "15 mins ago"},
                                {imageURL: "https://vega.slooh.com/assets/v4/dashboard-new/test1.PNG", title: "IC2602 (Southern Pleiades) With Chile 2", subtile: "Marjorie Robertson", content: "Messier 99 is a grand design galaxy in the constellation Coma Berenices. The galaxy is a member of the Virgo cluster and lies at a distance of 55 million LY with a diameter of 85,000 LY. It has a peculiar shape with one normal looking arm and an extended arm that is less tightly wound.", updated: "15 mins ago"}];
        const { imageList } = this.props;
        const showSliderInfo = true;
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (current, after) =>
                this.setState({ currentItem: photoHub.imageList[after] })
        };
        const { currentItem, isDiscussionsOpen } = this.state;
        const readOnly = false;
        
        return (
            <div className="slider-div">
                <Slider {...settings}> 
                    {imageList && imageList.map(slideElement => (                      
                        <div className="slider-item">
                            <div className="slider-info-container-large">
                                <h2 className="slider-title">{slideElement.imageTitle}</h2>
                                <h4 className="slider-subtitle">by <u>{slideElement.overlayData.owner}</u></h4>
                                <p className="slider-content">{slideElement.socialShareDescription}</p>
                                <div className="slider-content-footer">
                                    <div className="slider-buttons-container">
                                        <Button
                                            type={"button"}
                                            onClickEvent={()=>{}} 
                                            text={slideElement.likesCount}                                             
                                            style={"slider-footer-button"}
                                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/heart.svg"}
                                        />
                                        <Button
                                            type={"button"}
                                            onClickEvent={()=>{this.setState({isDiscussionsOpen: !isDiscussionsOpen})}} 
                                            text={slideElement.commentsCount}                                             
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
                                    <span className="slider-updated">{slideElement.overlayData.imageDate}</span>
                                </div> 
                                {/* <input type="text" className="slider-comment-input" placeholder="Write a Comment"/>  */}
                                {isDiscussionsOpen && !readOnly && (
                                    <ObservationComments
                                    topLevelThread={false}
                                    callSource={CALLSOURCE_PHOTOVIEW}
                                    count={10}
                                    commentsCount={slideElement.commentsCount}
                                    commentsThreadId={slideElement.commentsThreadId}
                                    forumId={slideElement.commentsForumId}
                                    topicId={slideElement.commentsTopicId}
                                    threadId={slideElement.commentsThreadId}
                                    canSubmitReplies={slideElement.canSubmitReplies}
                                    />
                                )}
                            </div>
                            <img className="img-slider" src={slideElement.imageURL} />
                        </div>
                    ))}
                </Slider>
                {showSliderInfo && currentItem && (
                    <div>
                        <div className="slider-info-container">
                            <h2 className="slider-title">{currentItem.imageTitle}</h2>
                            <h4 className="slider-subtitle">by <u>{currentItem.overlayData.owner}</u></h4>
                            <p className="slider-content">{currentItem.socialShareDescription}</p>
                            <div className="slider-content-footer">
                                <div className="slider-buttons-container">
                                    <Button
                                        type={"button"}
                                        onClickEvent={()=>{}} 
                                        text={currentItem.likesCount}                                             
                                        style={"slider-footer-button"}
                                        icon={"https://vega.slooh.com/assets/v4/dashboard-new/heart.svg"}
                                    />
                                    <Button
                                        type={"button"}
                                        onClickEvent={()=>{this.setState({isDiscussionsOpen: !isDiscussionsOpen})}} 
                                        text={currentItem.commentsCount}                                             
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
                                <span className="slider-updated">{currentItem.overlayData.imageDate}</span>
                            </div> 
                            {/* <input type="text" className="slider-comment-input" placeholder="Write a Comment"/>  */}
                            {isDiscussionsOpen && !readOnly && (
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
                       
                    </div>    
                )}                      
            </div>
        );
    }

}
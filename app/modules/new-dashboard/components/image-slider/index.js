import { Component } from 'react';
import React from "react";
import './style.scss';
import Slider from "react-slick";
import { Button } from '../button';
// import './slick.min.css';
// import './slick-theme.min.css';
import DiscussionComments from 'app/components/common/DiscussionsBoard/DiscussionComments';

export class ImageSlider extends Component{

    constructor(props){
        super(props);
        if ( props.photoHub !== undefined && props.photoHub.imageList.length > 0 )
            this.state = { currentItem: props.photoHub.imageList[0]};
        else
            this.state = { currentItem: undefined };
    }
    
    render() {      
        const slideImages = [{imageURL: "https://vega.slooh.com/assets/v4/dashboard-new/test1.PNG", title: "IC2602 (Southern Pleiades) With Chile 2", subtile: "Marjorie Robertson", content: "Messier 99 is a grand design galaxy in the constellation Coma Berenices. The galaxy is a member of the Virgo cluster and lies at a distance of 55 million LY with a diameter of 85,000 LY. It has a peculiar shape with one normal looking arm and an extended arm that is less tightly wound.", updated: "15 mins ago"},
                                {imageURL: "https://vega.slooh.com/assets/v4/dashboard-new/test1.PNG", title: "IC2602 (Southern Pleiades) With Chile 2", subtile: "Marjorie Robertson", content: "Messier 99 is a grand design galaxy in the constellation Coma Berenices. The galaxy is a member of the Virgo cluster and lies at a distance of 55 million LY with a diameter of 85,000 LY. It has a peculiar shape with one normal looking arm and an extended arm that is less tightly wound.", updated: "15 mins ago"}];
        const { photoHub } = this.props;
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
        const { currentItem } = this.state;

        return (
            <div className="slider-div">
                <Slider {...settings}> 
                    {photoHub.imageList.map(slideElement => (                      
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
                                            onClickEvent={()=>{}} 
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
                                <input type="text" className="slider-comment-input" placeholder="Write a Comment"/> 
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
                                        onClickEvent={()=>{}} 
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
                            <input type="text" className="slider-comment-input" placeholder="Write a Comment"/> 
                        </div>
                        {/* <DiscussionComments
                            // validateResponseAccess={validateResponseAccess}
                            // discussions={this.state}
                            // discussionsActions={discussionsActions}
                            // errorMessage={errorMessage}
                            // callSource={callSource}
                            // count={count}
                            threadId={currentItem.commentsThreadId}
                            // formPlaceholder="Write a public comment"
                            formPlaceholder="Write a comment"
                            page={page}
                            topicId={currentItem.commentsTopicId}
                            forumId={currentItem.commentsForumId}
                            // user={user}
                            // getReplies={this.getReplies}
                            // updateComments
                            // flagParams={flagParams}
                            canSubmitReplies={this.props.canSubmitReplies}
                        />    */}
                    </div>    
                )}                      
            </div>
        );
    }

}
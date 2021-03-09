import { Component } from 'react';
import React from "react";
import './style.scss';
import Slider from "react-slick";
import { Button } from '../button';
// import './slick.min.css';
// import './slick-theme.min.css';
import ObservationComments from 'app/modules/observations/containers/observation-comments';
import { CALLSOURCE_PHOTOVIEW } from 'app/modules/image-details/components/imageDetailsConfiguration';
import { SliderItem } from './sliderItem';
import { getImageDetails } from '../../dashboardApi';
import LikeButton from '../button/LikeButton';
import { Link } from 'react-router';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import { Tooltip } from 'react-tippy';
import { browserHistory } from 'react-router';

export class ImageSlider extends Component {

    // state={
    //     currentItem: undefined,
    //     isDiscussionsOpen: false,
    //     currentIndex: 0,
    //     initialLoadIndex: 5,
    //     limitedIndex: 5,
    //     imageDetailsList: [],
    // }

    constructor(props) {
        super(props);
        const { communityExploration } = this.props;
        const { featuredObservations, activites } = communityExploration;
        if (featuredObservations !== undefined && featuredObservations.imageList.length > 0) {
            const imageDetailsList = featuredObservations.imageList.map(image => { return null; });
            this.state = {
                currentItem: undefined,
                isDiscussionsOpen: false,
                currentIndex: 0,
                initialLoadIndex: 5,
                limitedIndex: 5,
                imageDetailsList: [],
                imageDetailsList: imageDetailsList,
                isOpen: false,
            };
        }
        //     this.state = { currentItem: props.photoHub.imageList[0],
        //                     isDiscussionsOpen: false };
        // else
        //     this.state = { currentItem: undefined,
        //                     isDiscussionsOpen: false };
    }


    // addImageDetails(index, data){   
    //     const { currentIndex } = self.state;
    //     let { imageDetailsList } = self.state;
    //     imageDetailsList[index]=data;
    //     if(currentIndex===index)
    //         this.setState({imageDetailsList: imageDetailsList, currentItem: data});
    //     else
    //         this.setState({imageDetailsList: imageDetailsList})        
    // }

    getImageDetails = (index, data) => {
        const self = this;
        getImageDetails(data).then(response => {
            const res = response.data;
            if (!res.apiError) {
                const { currentIndex } = self.state;
                let { imageDetailsList } = self.state;
                imageDetailsList[index] = res;
                if (currentIndex === index)
                    self.setState({ imageDetailsList: imageDetailsList, currentItem: res });
                else
                    self.setState({ imageDetailsList: imageDetailsList })
            }
            else
                self.props.validateResponseAccess(res);
        })
    }

    showDiscussion = () => {
        const { isDiscussionsOpen } = this.state;
        const { stopTimer, startTimer } = this.props;
        if (!isDiscussionsOpen)
            stopTimer();
        else
            startTimer();
        this.setState({ isDiscussionsOpen: !isDiscussionsOpen })
    }

    render() {
        const slideImages = [{ imageURL: "https://vega.slooh.com/assets/v4/dashboard-new/test1.PNG", title: "IC2602 (Southern Pleiades) With Chile 2", subtile: "Marjorie Robertson", content: "Messier 99 is a grand design galaxy in the constellation Coma Berenices. The galaxy is a member of the Virgo cluster and lies at a distance of 55 million LY with a diameter of 85,000 LY. It has a peculiar shape with one normal looking arm and an extended arm that is less tightly wound.", updated: "15 mins ago" },
        { imageURL: "https://vega.slooh.com/assets/v4/dashboard-new/test1.PNG", title: "IC2602 (Southern Pleiades) With Chile 2", subtile: "Marjorie Robertson", content: "Messier 99 is a grand design galaxy in the constellation Coma Berenices. The galaxy is a member of the Virgo cluster and lies at a distance of 55 million LY with a diameter of 85,000 LY. It has a peculiar shape with one normal looking arm and an extended arm that is less tightly wound.", updated: "15 mins ago" }];
        const { communityExploration, onClickItem, } = this.props;
        const { featuredObservations, activites } = communityExploration;

        const showSliderInfo = true;
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (current, after) => {
                if (this.state.isDiscussionsOpen) {
                    this.showDiscussion();
                }
                // else
                //     this.setState({ isDiscussionsOpen: false});
            },
            afterChange: (after) => {
                const { limitedIndex, initialLoadIndex, imageDetailsList } = this.state;

                if (after > 3 - initialLoadIndex) {
                    this.setState({ limitedIndex: limitedIndex + 1, currentIndex: after, currentItem: imageDetailsList[after] });
                }
            }
        };
        const { currentItem, isOpen, isDiscussionsOpen, limitedIndex, imageDetailsList } = this.state;
        const readOnly = false;

        return (
            <div className="slider-div">
                <Slider {...settings}>
                    {featuredObservations && featuredObservations.imageList.slice(0, limitedIndex).map((slideElement, i) => (
                        <SliderItem
                            slideElement={slideElement}
                            isDiscussionsOpen={isDiscussionsOpen}
                            onCommentButtonClick={this.showDiscussion}
                            index={i}
                            imageDetails={imageDetailsList[i]}
                            getImageDetails={this.getImageDetails}
                            onClickItem={onClickItem}
                            onImageClick={() => this.setState({ isOpen: true })}
                        />
                    ))}
                </Slider>
                {showSliderInfo && currentItem && (
                    <div>
                        <div className="slider-info-container">
                            <h2 className="slider-title">{currentItem.observationTitle}</h2>
                            <h4 className="slider-subtitle">by <u onClick={() => onClickItem(currentItem.customerUUID, true)}>{currentItem.displayName}</u>
                                <span className="slider-updated">{currentItem.observationTimeDisplay[0]}</span>
                            </h4>
                            <br />
                            <p className="slider-content" dangerouslySetInnerHTML={{ __html: currentItem.observationLog }} />
                            <div className="icon-container">
                                {Object.keys(currentItem.iconFileData).map(icon => (
                                    <div>
                                        {currentItem.iconFileData[icon].hasLink ? (
                                            <Link to={currentItem.iconFileData[icon].linkUrl} >
                                                <Tooltip
                                                    title={currentItem.iconFileData[icon].text}
                                                    arrow
                                                >
                                                    <img className="member-icons" src={currentItem.iconFileData[icon].dashboardIconUrl} />
                                                </Tooltip>
                                            </Link>
                                        ) : (
                                            <Tooltip
                                                title={currentItem.iconFileData[icon].text}
                                                arrow
                                            >
                                                <img
                                                    onClick={icon === "Member" ? () => onClickItem(currentItem.customerUUID, true) : null}
                                                    className="member-icons"
                                                    src={currentItem.iconFileData[icon].dashboardIconUrl} />
                                            </Tooltip>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="slider-content-footer">
                                <div className="slider-buttons-container">
                                    {/* <Button
                                        type={"button"}
                                        onClickEvent={onLikeClick} 
                                        text={currentItem.likesCount}                                             
                                        style={"slider-footer-button"}
                                        icon={"https://vega.slooh.com/assets/v4/dashboard-new/heart.svg"}
                                    /> */}
                                    <LikeButton
                                        mod="no-border"
                                        likePrompt={currentItem.likePrompt}
                                        likesCount={currentItem.likesCount}
                                        likedByMe={currentItem.likedByMe}
                                        likeTooltip={currentItem.likeTooltip}
                                        customerId={currentItem.customerImageId}
                                        showLikePrompt={currentItem.showLikePrompt}
                                        btnStyle={"slider-footer-button"}
                                    />

                                    <div>
                                        <Button
                                            type={"button"}
                                            onClickEvent={this.showDiscussion}
                                            text={currentItem.commentsCount}
                                            style={"slider-footer-button"}
                                            icon={"https://vega.slooh.com/assets/v4/dashboard-new/comment.svg"}
                                        />
                                    </div>

                                    <Button
                                        type={"button"}
                                        onClickEvent={() => browserHistory.push(currentItem.photoViewFullURL)}
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
                                {/* <span className="slider-updated">{currentItem.observationTimeDisplay[0]}</span> */}
                            </div>
                            {/* <input type="text" className="slider-comment-input" placeholder="Write a Comment"/>  */}

                        </div>
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
                                toggleComment={this.showDiscussion}
                            />
                        )}
                    </div>
                )}

                {currentItem && (
                    <ModalImg
                        isOpen={isOpen}
                        imageURL={currentItem.imageDownloadURL}
                        onHide={() => this.setState({ isOpen: false })}
                        customClassName="obs-image-wrapper"
                        magnifierClassName="obs-image-magnifier"
                    />
                )}
            </div>
        );
    }

}
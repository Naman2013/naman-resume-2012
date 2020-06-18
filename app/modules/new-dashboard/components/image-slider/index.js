import { Component } from 'react';
import React from "react";
import './style.css';
import Slider from "react-slick";
import { Button } from '../button';
// import './slick.min.css';
// import './slick-theme.min.css';

export class ImageSlider extends Component{

    
    render() {      
        const slideImages = [{imageURL: "https://vega.slooh.com/assets/v4/dashboard-new/test1.PNG", title: "IC2602 (Southern Pleiades) With Chile 2", subtile: "Marjorie Robertson", content: "Messier 99 is a grand design galaxy in the constellation Coma Berenices. The galaxy is a member of the Virgo cluster and lies at a distance of 55 million LY with a diameter of 85,000 LY. It has a peculiar shape with one normal looking arm and an extended arm that is less tightly wound.", updated: "15 mins ago"},
                                {imageURL: "https://vega.slooh.com/assets/v4/dashboard-new/test1.PNG", title: "IC2602 (Southern Pleiades) With Chile 2", subtile: "Marjorie Robertson", content: "Messier 99 is a grand design galaxy in the constellation Coma Berenices. The galaxy is a member of the Virgo cluster and lies at a distance of 55 million LY with a diameter of 85,000 LY. It has a peculiar shape with one normal looking arm and an extended arm that is less tightly wound.", updated: "15 mins ago"}];
        const showSliderInfo = true;
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        
        return (
            <div>
                <Slider {...settings}> 
                    {slideImages.map(slideElement => (                      
                        <div className="slider-item">
                            <img className="img-slider" src={slideElement.imageURL} />
                        </div>
                    ))}
                </Slider>
                {showSliderInfo && (
                    <div>
                        <h2 className="slider-title">{slideImages[0].title}</h2>
                        <h4 className="slider-subtitle">by <u>{slideImages[0].subtile}</u></h4>
                        <p className="slider-content">{slideImages[0].content}</p>
                        <div className="slider-content-footer">
                            <div>
                                <Button
                                    type={"button"}
                                    onClickEvent={()=>{}} 
                                    text={"5"}                                             
                                    style={"slider-footer-button"}
                                    icon={"https://vega.slooh.com/assets/v4/dashboard-new/heart.svg"}
                                />
                                <Button
                                    type={"button"}
                                    onClickEvent={()=>{}} 
                                    text={"0"}                                             
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
                            <span className="slider-updated">{slideImages[0].updated}</span>
                        </div> 
                    </div>
                )}                       
            </div>
        );
    }

}
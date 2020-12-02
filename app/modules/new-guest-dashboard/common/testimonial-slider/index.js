import { Component } from 'react';
import React from "react";
import './style.scss';
import Slider from "react-slick";
import TestimonialCard from '../../components/testimonial-card';
import { isMobileScreen, isTabletScreen } from 'app/services';

export class TestimonialSlider extends Component{  

    constructor(props){
        super(props);
    } 

    render() { 

        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: isTabletScreen() ? 2 : isMobileScreen() ? 1 : 3,
            slidesToScroll: 1,
            beforeChange: (current, after) =>{
                              
            },
            afterChange: ( after) =>{
                
            }
        };        
       
        const { cardList } = this.props;
        return (
            <div className="slider-div">
                <Slider {...settings}> 
                    {cardList && cardList.map(card=>(                        
                            <TestimonialCard
                                card={card}
                            />                                               
                    ))}
                </Slider>                                  
            </div>
        );
    }

}
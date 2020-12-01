import { Component } from 'react';
import React from "react";
import './style.scss';
import Slider from "react-slick";
import { isMobileScreen, isTabletScreen } from 'app/services';
import PartnerCard from '../partners-card'

export class PartnerSlider extends Component{  

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
                            <PartnerCard
                                card={card}
                            />                                               
                    ))}
                </Slider>                                  
            </div>
        );
    }

}
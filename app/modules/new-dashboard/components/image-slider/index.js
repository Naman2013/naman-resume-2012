import { Component } from 'react';
import React from "react";
import './style.css';
import Slider from "react-slick";
import './slick.min.css';
import './slick-theme.min.css';

export class ImageSlider extends Component{

    
    render() {      
        const slideImages = [
            'http://www.astro-photography.net/images/IC2602_large.jpg',
            'https://cosmicfocus.files.wordpress.com/2019/02/2019-02-11-c102-ic-2602-southern-pleiades-2387-sec.jpg',
            'https://earthsky.org/upl/2018/11/pleiades-seven-sisters-nov2019-e1572962425736.jpg'
          ];

        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className="">
                <Slider {...settings}> 
                    {slideImages.map(slideElement => (
                        <div>
                            <img className="img-slider" src={slideElement} />
                        </div>
                    ))}
                </Slider>  
            </div>
        );
    }

}
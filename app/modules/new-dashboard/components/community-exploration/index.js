import { Component } from 'react';
import React from "react";
import './style.css';
import { ImageSlider } from '../image-slider';


export class CommunityExploration extends Component{

    
    render() {
        const { heading, communityExploration } = this.props;
        
        return (
            <div className="explore-main">
                {/* <h2 className="explore-heading">{heading}</h2> */}
                <ImageSlider
                    communityExploration={communityExploration}
                />                
            </div>   
        );
    }

}
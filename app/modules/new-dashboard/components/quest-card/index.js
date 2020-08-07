import { Component } from 'react';
import React from "react";
import './style.scss';

export class QuestCard extends Component{
    
    render() {
               
        const { onHide } = this.props;

        return (
            <div id="quest-card" className="quest-card-main">
                <img className="close-icon" onClick={onHide} src="https://vega.slooh.com/assets/v4/dashboard-new/close_white.svg" />
                <h3 className="quest-status">Quest in progress</h3>
                <h2 className="quest-heading">The Solar - Our Local Star</h2>
                <h5 className="quest-subheading">Learnings: How to Slooh</h5>
                <br/>

                <div className="quest-steps">
                    <div className="quest-steps-item">
                        <img className="step-icon" src="https://vega.slooh.com/assets/v4/dashboard-new/calender_icon.svg"/>
                        <div className="quest-item-container">
                            <h5 className="step-title">Complete in 1 Day</h5>
                            <h5 className="step-subtitle">`Easy Peasy`</h5>
                        </div>
                    </div>
                    <div className="quest-steps-item">
                        <img className="step-icon" src="https://vega.slooh.com/assets/v4/dashboard-new/award_icon.svg"/>
                        <div className="quest-item-container">
                            <h5 className="step-title">25 Gravity Points</h5>
                            <h5 className="step-subtitle">Finish to earn</h5>
                        </div>
                    </div>
                    <div className="quest-steps-item">
                        <img className="step-icon" src="https://vega.slooh.com/assets/v4/dashboard-new/refresh_icon.svg"/>
                        <div className="quest-item-container">
                            <h5 className="step-title">All Year Availability</h5>
                            <h5 className="step-subtitle">Available now!</h5>
                        </div>
                    </div>
                    <div className="quest-steps-item">                        
                        <div className="quest-item-container">  
                            <h5><span className="step-100-title">100</span> <span className="step-title">100 Level</span></h5>
                            <h5 className="step-subtitle">Beginners Welcome</h5>
                        </div>
                    </div>
                </div>
                <br/>                

                <h4 className="quest-heading-desc">Quest Description</h4>
                <p className="quest-description">Do you think of the sun as a star? It is in fact quite an ordinary star but to us on earth it is daylight, it is warmth, it is life-giving. And yet we are not able to look at it, to see it. With the help of Slooh's special solar telescope in the Canary Islands, you can view it as you've never seen before.</p>
                <h5 className="see-more">See More</h5>

                {/* Quest Progress */}
                                        
            </div>   
        );
    }

}
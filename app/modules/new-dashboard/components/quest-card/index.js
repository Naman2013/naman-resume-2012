import { Component } from 'react';
import React from "react";
import './style.scss';
import { ProgressBar } from 'react-bootstrap';


export class QuestCard extends Component{

    
    render() {

        const { currentProgress, totalProgress, nextLevelName } = this.props;        
        const progress = ((currentProgress/totalProgress) * 100);
        
        return (
            <div className="progress-card-main">
                <h3>Quest in progress</h3>
                <h2>The Solar - Our Local Star</h2>
                <h5>Learnings: How to Slooh</h5>

                {/* card layout */}

                <h4>Quest Description</h4>
                <p>Do you think of the sun as a star? It is in fact quite an ordinary star but to us on earth it is daylight, it is warmth, it is life-giving. And yet we are not able to look at it, to see it. With the help of Slooh's special solar telescope in the Canary Islands, you can view it as you've never seen before.</p>
                <h5>See More</h5>

                {/* Quest Progress */}
                                        
            </div>   
        );
    }

}
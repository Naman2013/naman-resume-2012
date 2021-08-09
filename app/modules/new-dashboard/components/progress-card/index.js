import { Component } from 'react';
import React from "react";
import './style.scss';
import { ProgressBar } from 'react-bootstrap';


export class ProgressCard extends Component{

    
    render() {

        const { currentProgress, totalProgress, nextLevelName } = this.props;        
        const progress = ((currentProgress/totalProgress) * 100);
        
        return (
            <div className="progress-card-main">
                <div class="info">
                    <span className="currentProgress">{currentProgress}{totalProgress}</span>
                    <span className="nextLevelName">{nextLevelName}</span>
                </div> 
                <ProgressBar                    
                    now={progress} 
                />                               
            </div>   
        );
    }

}
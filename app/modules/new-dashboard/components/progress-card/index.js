import { Component } from 'react';
import React from "react";
import './style.css';
import { ProgressBar } from 'react-bootstrap';


export class ProgressCard extends Component{

    
    render() {
        const currentProgress = 76;
        const totalProgress = 100;
        const nextLevelName = "The Herschles"
        

        return (
            <div className="progress-card-main">
                <div class="info">
                    <span className="currentProgress">{currentProgress}/{totalProgress}</span>
                    <span className="nextLevelName">{nextLevelName}</span>
                </div> 
                <ProgressBar                    
                    now={currentProgress} 
                />                               
            </div>   
        );
    }

}
import { Component } from 'react';
import React from "react";
import './style.scss';


export class SectionDivider extends Component{

    
    render() {
        
        
        return (
            <div className="section-divider-main">
                {/* <div className="divider-line"></div> */}
                <img className="divider-icon" src="https://vega.slooh.com/assets/v4/dashboard-new/divider_icon.svg" />
                <div className="divider-line"></div>
                <img className="divider-icon rotated" src="https://vega.slooh.com/assets/v4/dashboard-new/divider_icon.svg" />
                {/* <div className="divider-line"></div> */}
            </div>   
        );
    }

}
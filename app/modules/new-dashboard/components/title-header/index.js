import { Component } from 'react';
import React from "react";
import './style.css';


export class TitleHeader extends Component{

    
    render() {
        const heading = "Explore the Universe";
        const subHeading = "Discover and Observe";

        return (
            <div className="title-main">
                <h2 className="title-heading">{heading}</h2>               
                <h4 className="title-subHeading">{subHeading}</h4>
            </div>   
        );
    }

}
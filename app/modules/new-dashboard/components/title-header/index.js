import { Component } from 'react';
import React from "react";
import './style.scss';


export class TitleHeader extends Component{

    
    render() {
        const { heading, subHeading } = this.props;
        
        return (
            <div className="title-main">
                <h2 className="title-heading">{heading}</h2>               
                <h4 className="title-subHeading">{subHeading}</h4>
            </div>   
        );
    }

}
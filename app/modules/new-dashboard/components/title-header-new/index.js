import { Component } from 'react';
import React from "react";
import './style.scss';


export class TitleHeaderNew extends Component{

    
    render() {
        const { heading, subHeading } = this.props;
        
        return (
            <div className="title-main">
                <h2 className="title-heading">{heading} : <span className="title-subHeading">{subHeading}</span></h2>               
                {/* <h4 className="title-subHeading">{subHeading}</h4> */}
            </div>   
        );
    }

}
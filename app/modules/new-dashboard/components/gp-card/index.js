import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from '../tab-header';


export class GPCard extends Component{

    
    render() {
        const {points} = this.props;      

        return (
            <div className="gp-main">
                <h2 className="gp-txt">{points}</h2>                                                     
            </div>   
        );
    }

}
import { Component } from 'react';
import React from "react";
import './style.css';


export class BadgeList extends Component{

    
    render() {
        const heading = "Badges";
        const badgelist = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];

        return (
            <div className="badge-main">
                <h2 className="badge-heading">{heading}</h2>
                <div className="badgelist">
                    {badgelist.map(badge=>(
                        <div className="iconempty">

                        </div>
                    ))}
                </div>                              
            </div>   
        );
    }

}
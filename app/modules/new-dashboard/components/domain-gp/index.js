import { Component } from 'react';
import React from "react";
import './style.css';


export class DomainGP extends Component{

    
    render() {
        const {heading} = this.props;
        const domaingpList = [{rank: "1", gpPoints: "73", text: "Solar System"},
                            {rank: "2", gpPoints: "31", text: "Milky Way"},
                            {rank: "3", gpPoints: "29", text: "Deep Space"}];

        return (
            <div className="domain-main">
                <h2 className="domain-heading">{heading}</h2>      
                    <div className="domain-list">
                        {domaingpList.map(domain=>(
                            <div className="domain-item">
                                <div className="domainiconContainer">
                                    <span className="domain-rank">#{domain.rank}</span>
                                </div>
                                <h2 className="domain-name">{domain.text}</h2>
                                <h4 className="domain-gp">{domain.gpPoints}</h4>
                            </div> 
                        ))}                            
                    </div>
                                                               
            </div>   
        );
    }

}
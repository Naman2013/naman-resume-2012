import { Component } from 'react';
import React from "react";
import './style.css';


export class DomainGP extends Component{

    
    render() {
        const {heading} = this.props;
        const domaingpList = [{rank: "1", gpPoints: "73 GP", text: "Solar System", icon: "https://vega.slooh.com/assets/v4/dashboard-new/trophy_1.svg"},
                            {rank: "2", gpPoints: "31 GP", text: "Milky Way", icon: "https://vega.slooh.com/assets/v4/dashboard-new/trophy_2.svg"},
                            {rank: "3", gpPoints: "29 GP", text: "Deep Space", icon: "https://vega.slooh.com/assets/v4/dashboard-new/trophy_3.svg"}];

        return (
            <div className="domain-main">
                <h2 className="domain-heading">{heading}</h2>      
                    <div className="domain-list">
                        {domaingpList.map(domain=>(
                            <div className="domain-item">
                                <div className="domainiconContainer">
                                    <img src={domain.icon}/>
                                    {/* <span className="domain-rank">#{domain.rank}</span> */}
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
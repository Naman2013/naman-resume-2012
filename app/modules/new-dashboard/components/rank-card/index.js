import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from '../tab-header';


export class RankCard extends Component{

    
    render() {
        const {heading} = this.props;
        const rankList = [{rank: "2065", gpPoints: "49", text: "Serenity Henry"},
                            {rank: "2064", gpPoints: "48", text: "Harold Russell"},
                            {rank: "2063", gpPoints: "46", text: "Colleen Henry"},
                            {rank: "2062", gpPoints: "46", text: "Tanya Pena"},
                            {rank: "2061", gpPoints: "45", text: "Bruce Mccoy"}];

        return (
            <div className="rank-main">
                <h2 className="rank-heading">{heading}</h2> 
                    <TabHeader
                        headings={["Last 30 Days", "All Time"]}
                        activeHeading={"Last 30 Days"}
                        spaceequally={true}
                    />
                    <table>
                        {rankList.map(rank=>(
                            <tr>
                                <td className="rank-id">#{rank.rank}</td>
                                <td className="rank-name">{rank.text}</td>
                                <td className="rank-gp">{rank.gpPoints}</td>
                            </tr>
                        ))}
                    </table>                                   
            </div>   
        );
    }

}
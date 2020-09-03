import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';


export class RankCard extends Component{

    
    render() {
        const {heading, rankList, showRowCount, showMoreButton} = this.props;
        const showmorebtntext = "Show More";

        return (
            <div className="rank-main">
                <h2 className="rank-heading">{heading}</h2> 
                    <TabHeader
                        headings={["2020-2021 School Year", "All Time"]}
                        activeHeading={"2020-2021 School Year"}
                        spaceequally={true}
                        theme={"light"}

                    />
                    <table>
                        {rankList.slice(0, showRowCount === 0 ? rankList.length : showRowCount).map(rank=>(
                            <tr>
                                <td className={"rank-id" + (rank.highlight ? " rank-highlight" : "")}>#{rank.rank}</td>
                                <td className={"rank-name" + (rank.highlight ? " rank-highlight" : "")}>
                                    <div>
                                        {rank.text}
                                        {rank.subText && (
                                            <span className="university mar-top-5"><br/>{rank.subText}</span>
                                        )}                                       
                                    </div>
                                </td>
                                <td className={"rank-gp" + (rank.highlight ? " rank-highlight" : "")}>{rank.gpPoints}</td>
                            </tr>
                        ))}
                    </table> 
                    {showMoreButton && (
                        <h2 className="rank-show-more-button">
                            {showmorebtntext} 
                            <img className="mar-lr-5" src="https://vega.slooh.com/assets/v4/dashboard-new/down_arrow_white.svg"/>
                        </h2>
                    )}
                        
            </div>   
        );
    }

}
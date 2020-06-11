import { Component } from 'react';
import React from "react";
import './style.css';
import { TabHeader } from '../tab-header';


export class RankCard extends Component{

    
    render() {
        const {heading, rankList, showRowCount, showMoreButton} = this.props;
        const showmorebtntext = "Show More";

        return (
            <div className="rank-main">
                <h2 className="rank-heading">{heading}</h2> 
                    <TabHeader
                        headings={["Last 30 Days", "All Time"]}
                        activeHeading={"Last 30 Days"}
                        spaceequally={true}
                    />
                    <table>
                        {rankList.slice(0, showRowCount === 0 ? rankList.length : showRowCount).map(rank=>(
                            <tr>
                                <td className="rank-id">#{rank.rank}</td>
                                <td className="rank-name">{rank.text}</td>
                                <td className="rank-gp">{rank.gpPoints}</td>
                            </tr>
                        ))}
                    </table> 
                    {showMoreButton && (
                        <h2 className="rank-show-more-button">{showmorebtntext}</h2>
                    )}
                        
            </div>   
        );
    }

}
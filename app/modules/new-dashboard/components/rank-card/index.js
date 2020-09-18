import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';
import { Spinner } from '../../common/spinner';


export class RankCard extends Component{


    constructor(props){
        super(props);
        const tabHeaders=props.tabOptions.map(item => item.label);
        this.state={tabHeaders: tabHeaders, activeHeading: tabHeaders[0]};
    }

    onTabChange = (title) =>{
        const { tabOptions, getRankData } = this.props;
        const { tabHeaders } = this.state;
        const index = tabHeaders.indexOf(title);
        getRankData({viewType: tabOptions[index].viewType})
        this.setState({activeHeading: tabHeaders[index]});
    }
    
    render() {
        const {heading, rankList, showRowCount, showMoreButton, loading} = this.props;
        const showmorebtntext = "Show More";
        const { tabHeaders, activeHeading} = this.state;

        return (
            <div className="rank-main">
                <h2 className="rank-heading">
                    {heading}
                    <Spinner
                            loading={loading}
                            text="Loading..."
                    /> 
                </h2> 
                    <TabHeader
                        headings={tabHeaders}
                        activeHeading={activeHeading}
                        spaceequally={true}
                        theme={"light"}
                        onTabChange={this.onTabChange}
                    />
                    <table>
                        {rankList.slice(0, showRowCount === 0 ? rankList.length : showRowCount).map(rank=>(
                            <tr>
                                <td className={"rank-id" + (rank.highlight ? " rank-highlight" : "")}>{rank.rank}</td>
                                <td className={"rank-name" + (rank.highlight ? " rank-highlight" : "")}>
                                    <div>
                                        {rank.displayName}
                                        {rank.subText && (
                                            <span className="university mar-top-5"><br/>{rank.subText}</span>
                                        )}                                       
                                    </div>
                                </td>
                                <td className={"rank-gp" + (rank.highlight ? " rank-highlight" : "")}>{rank.gp}</td>
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
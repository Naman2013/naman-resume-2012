import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';


export class CommunityClubList extends Component{

    
    render() {
        const { heading, clubList, showRowCount } = this.props;

        return (
            <div className="community-club-main">
                <h2 className="community-club-heading">{heading}</h2> 
                    <TabHeader
                        headings={["Last 30 Days", "All Time"]}
                        activeHeading={"Last 30 Days"}
                        spaceequally={true}
                        theme={"light"}
                    />
                    <table>
                        {clubList.slice(0, showRowCount === 0 ? clubList.length : showRowCount).map(club=>(
                            <tr>
                                <td>
                                    <div className="community-club-id-div">
                                        <h2 className="community-club-id">#{club.rank}</h2>
                                    </div>
                                </td>
                                <td className="community-clubs-div-pad-left-10">
                                    <h3 className="community-club-name">{club.text}</h3>
                                    <h3 className="community-club-gp">{club.gpPoints}</h3>
                                    <h3 className="community-club-admin">{club.admin}</h3>
                                </td>                                
                            </tr>
                        ))}
                    </table>                    
            </div>   
        );
    }

}
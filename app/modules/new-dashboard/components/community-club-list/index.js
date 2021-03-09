import { Component } from 'react';
import React from "react";
import './style.scss';
import { TabHeader } from '../tab-header';
import { browserHistory } from 'react-router';
import { Spinner } from '../../common/spinner';
import classnames from 'classnames';

export class CommunityClubList extends Component{

    constructor(props){
        super(props);
        const tabHeaders=props.tabOptions.map(item => item.label);
        this.state={tabHeaders: tabHeaders, activeHeading: tabHeaders[0]};
    }

    onTabChange = (title) =>{        
        const { tabOptions, getClubData } = this.props;
        const { tabHeaders } = this.state;
        const index = tabHeaders.indexOf(title);
        getClubData({viewType: tabOptions[index].viewType})
        this.setState({activeHeading: tabHeaders[index]});
    }
    
    render() {
        const { heading, clubList, showRowCount, loading } = this.props;
        const { tabHeaders, activeHeading } = this.state;

        return (
            <div className="community-club-main">
                <h2 className="community-club-heading">
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
                        {clubList.slice(0, showRowCount === 0 ? clubList.length : showRowCount).map(club=>(
                            <tr>
                                <td>
                                    <div className={classnames("community-club-id-div", {"pointer": club.linkURL !== false})} onClick={club.linkURL !== false ? ()=>browserHistory.push(club.linkURL) : null}>
                                        <h2 className="community-club-id">{club.rank}</h2>
                                    </div>
                                </td>
                                <td className="community-clubs-div-pad-left-10">
                                    <h3 className={classnames("community-club-name", {"pointer": club.linkURL !== false})} onClick={club.linkURL !== false ? ()=>browserHistory.push(club.linkURL) : null}>{club.name}</h3>
                                    <h3 className="community-club-gp">{club.gp}</h3>
                                    <h3 className="community-club-admin">{club.descriptiveText}</h3>
                                </td>                                
                            </tr>
                        ))}
                    </table>                    
            </div>   
        );
    }

}
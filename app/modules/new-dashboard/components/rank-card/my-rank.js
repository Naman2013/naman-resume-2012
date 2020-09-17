import { Component } from 'react';
import React from "react";
import './style.scss';
import { getMyRank } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { RankCard } from './index';

export class MyRank extends Component{

    constructor(props){
        super(props);
        this.state={
            myRank: undefined
        }
        this.getMyRankAction();
    }

    timerId= null;

    getMyRankAction = (data) =>{
        const { at, cid, token } = getUserInfo();
        getMyRank({at, cid, token, ...data}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                console.log("My Rank Duration"+duration);                
                if (this.timerId !== null )
                    clearTimeout(this.timerId);
                this.timerId=setTimeout(()=>this.getMyRankAction(data),duration );
                this.setState({myRank: res});
            }
        });
    }
    
    render() {
        const { myRank } = this.state;
        
        return (
            <div>
                {myRank && (
                    <RankCard
                        heading={myRank.sectionHeading}                        
                        rankList={myRank.rankList}
                        showRowCount={0}
                        showMoreButton={false}
                        tabOptions={myRank.tabOptions}
                        getRankData={this.getMyRankAction}
                    />
                )}                                             
            </div>   
        );
    }

}
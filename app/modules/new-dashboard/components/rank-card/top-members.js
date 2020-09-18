import { Component } from 'react';
import React from "react";
import './style.scss';
import { getTopMembers } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { RankCard } from './index';

export class TopMembers extends Component{

    constructor(props){
        super(props);
        this.state={
            topMembers: undefined,     
            loading: false,       
        }
        this.getTopMemberAction();
    }

    timerId= null;

    getTopMemberAction = (data) =>{
        const { at, cid, token } = getUserInfo();
        this.setState({loading: true});
        getTopMembers({at, cid, token, ...data}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                console.log("Top Members Duration"+duration);                
                if (this.timerId !== null )
                    clearTimeout(this.timerId);
                this.timerId=setTimeout(()=>this.getTopMemberAction(data),duration );
                this.setState({topMembers: res, loading: false});
            }
        });
    }
    
    render() {
        const { topMembers, loading } = this.state;
        
        return (
            <div>
                {topMembers && (
                    <RankCard
                        heading={topMembers.sectionHeading}                        
                        rankList={topMembers.rankList}
                        showRowCount={0}
                        showMoreButton={true}
                        tabOptions={topMembers.tabOptions}
                        getRankData={this.getTopMemberAction}
                        loading={loading}
                    />
                )}                                             
            </div>   
        );
    }

}
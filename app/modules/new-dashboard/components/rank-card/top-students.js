import { Component } from 'react';
import React from "react";
import './style.scss';
import { getMyRank, getTopStudents } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { RankCard } from './index';

export class TopStudents extends Component{

    constructor(props){
        super(props);
        this.state={
            topStudents: undefined,
            loading: false,
        }
        this.getTopStudentsAction();
    }

    timerId= null;

    getTopStudentsAction = (data) =>{
        const { at, cid, token } = getUserInfo();
        this.setState({loading: true});
        getTopStudents({at, cid, token, ...data}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                console.log("Top Students Duration"+duration);                
                if (this.timerId !== null )
                    clearTimeout(this.timerId);
                this.timerId=setTimeout(()=>this.getTopStudentsAction(data),duration );
                this.setState({topStudents: res, loading: false});
            }
        });
    }
    
    render() {
        const { topStudents, loading } = this.state;
        
        return (
            <div>
                {topStudents && (
                    <RankCard
                        heading={topStudents.sectionHeading}                        
                        rankList={topStudents.rankList}
                        showRowCount={10}
                        showMoreButton={true}
                        tabOptions={topStudents.tabOptions}
                        getRankData={this.getTopStudentsAction}
                        loading={loading}
                    />
                )}                                             
            </div>   
        );
    }

}
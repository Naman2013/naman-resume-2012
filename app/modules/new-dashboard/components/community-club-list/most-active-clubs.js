import { Component } from 'react';
import React from "react";
import './style.scss';
import { getMostActiveClubs, getUserActiveObject } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { CommunityClubList } from './index';

export class ActiveClub extends Component{

    constructor(props){
        super(props);
        this.state={
            mostActiveClubs: undefined
        }
        this.getActiveClubAction();
    }

    timerId= null;

    getActiveClubAction = (data) =>{
        const { at, cid, token } = getUserInfo();
        getMostActiveClubs({at, cid, token, ...data}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                console.log("Most Active Club Duration"+duration);                
                if (this.timerId !== null )
                    clearTimeout(this.timerId);
                this.timerId=setTimeout(()=>this.getActiveClubAction(data),duration );
                this.setState({mostActiveClubs: res});
            }
        });
    }
    
    render() {
        const { mostActiveClubs } = this.state;
        
        return (
            <div>
                {mostActiveClubs && (
                    <CommunityClubList
                        heading={mostActiveClubs.sectionHeading}                                        
                        clubList={mostActiveClubs.rankList}
                        tabOptions={mostActiveClubs.tabOptions}
                        getClubData={this.getActiveClubAction}  
                        showRowCount={3}                       
                    />
                )}                                             
            </div>   
        );
    }

}
import { Component } from 'react';
import React from "react";
import './style.scss';
import { getTopSchoolClubs } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { CommunityClubList } from './index';

export class SchoolClub extends Component{

    constructor(props){
        super(props);
        this.state={
            topSchoolClubs: undefined,
            loading: false,
        }
        this.getActiveClubAction();
    }

    timerId= null;

    getActiveClubAction = (data) =>{
        const { at, cid, token } = getUserInfo();
        this.setState({loading: true});
        getTopSchoolClubs({at, cid, token, ...data}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                // console.log("School Club Duration"+duration);
                if (this.timerId !== null )
                    clearTimeout(this.timerId);
                this.timerId=setTimeout(()=>this.getActiveClubAction(data),duration );
                this.setState({topSchoolClubs: res, loading: false});
            }
            else
                this.props.validateResponseAccess(res)
        });
    }

    componentWillUnmount(){
        if(this.timerId !== null)
            clearTimeout(this.timerId);
    }
    
    render() {
        const { topSchoolClubs, loading } = this.state;
        
        return (
            <div>
                {topSchoolClubs && (
                    <CommunityClubList
                        heading={topSchoolClubs.sectionHeading}                                        
                        clubList={topSchoolClubs.rankList}
                        tabOptions={topSchoolClubs.tabOptions}
                        getClubData={this.getActiveClubAction} 
                        showRowCount={0}    
                        loading={loading}                 
                    />
                )}                                             
            </div>   
        );
    }

}
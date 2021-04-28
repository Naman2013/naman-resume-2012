import { Component } from 'react';
import React from "react";
import './style.scss';
import { getUserPouplarObservation } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { ObjectList } from './index';

export class PopularObservation extends Component{

    constructor(props){
        super(props);
        this.state={
            userPopularObservation: undefined
        }
        this.getPopularObservationtAction();
    }

    timerId=null;

    getPopularObservationtAction = () =>{
        const { at, cid, token } = getUserInfo();
        let data;
        if(this.props.publicProfile)
            data={customerUUID: this.props.customerUUID};
        else
            data={at, cid, token};
        getUserPouplarObservation({ at, cid, token, ...data }).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                if(this.timerId !== null)
                    clearTimeout(this.timerId);                
                this.timerId=setTimeout(this.getPopularObservationtAction,duration );
                this.setState({userPopularObservation: res});
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
        const { userPopularObservation } = this.state;
        
        return (
            <div>
                {userPopularObservation && (
                    <ObjectList
                        heading={"Popular Observations"}
                        showTab={false}
                        headerlist={[]}
                        selectedheader={""}
                        headerspaceequally={false}
                        objectList={userPopularObservation.popularObservations}
                    />
                )}                                             
            </div>   
        );
    }

}
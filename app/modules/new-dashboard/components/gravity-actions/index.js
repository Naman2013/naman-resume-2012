import { Component } from 'react';
import React from "react";
import './style.scss';
import { getUserInfo } from 'app/modules/User';
import { getRecentGravityActions } from '../../dashboardApi';

export class GravityActions extends Component{

    constructor(props){
        super(props);
        this.state={
            gravityList: undefined
        }
        this.getRecentGravityAction();
    }

    timerId=null;

    getRecentGravityAction = () =>{
        const { at, cid, token } = getUserInfo();
        getRecentGravityActions({at, cid, token}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                // console.log("Recent Gravity Action Duration"+duration);   
                if(this.timerId !== null)
                    clearTimeout(this.timerId);             
                this.timerId=setTimeout(this.getRecentGravityAction,duration );
                this.setState({gravityList: res});
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
        const heading = "Recent Gravity Actions";        
        const { gravityList } = this.state;

        return (
            <div>
                {gravityList && (
                    <div className="gravity-main">
                        <h2 className="gravity-heading">{heading}</h2>                
                            {gravityList.foundGravityActions ? gravityList.actions?.map(gravity=>(
                                <div className="gravityaction">
                                    <div className="gravityiconContainer">
                                        <span className="gravitypoints">{gravity.gravityPoints}</span>
                                    </div>
                                    <span className="gravitytext">{gravity.title}</span>
                                </div>
                            )):null}                                            
                    </div>  
                )}
            </div>
             
        );
    }

}
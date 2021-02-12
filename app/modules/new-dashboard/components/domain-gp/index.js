import { Component } from 'react';
import React from "react";
import './style.scss';
import { getGravityByDomain } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';

export class DomainGP extends Component{

    constructor(props){
        super(props);
        this.state={
            domaingpList: undefined
        }
        this.getDomainGPAction();
    }

    timerId=null;

    getDomainGPAction = () =>{
        const { at, cid, token } = getUserInfo();
        getGravityByDomain({at, cid, token}).then(response=>{
            const res=response.data;
            if(!res.apiError && res.GravityByDomainFound){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                // console.log("community stats Duration"+duration);  
                if(this.timerId !== null)
                    clearTimeout(this.timerId);              
                this.timerId=setTimeout(this.getDomainGPAction,duration );
                this.setState({domaingpList: res});
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
        const { domaingpList} = this.state;
        
        return (
            <div>
                {domaingpList && (
                    <div className="domain-main">
                        <h2 className="domain-heading">{domaingpList.title}</h2>      
                            <div className="domain-list">
                                {domaingpList.list.map(domain=>(
                                    <div className="domain-item">
                                        <div className="domainiconContainer">
                                            <img src={domain.icon}/>
                                            {/* <span className="domain-rank">#{domain.rank}</span> */}
                                        </div>
                                        <h2 className="domain-name">{domain.label}</h2>
                                        <h4 className="domain-gp">{domain.perc}</h4>
                                    </div> 
                                ))}                            
                            </div>
                                                                    
                    </div> 
                )}
            </div>
              
        );
    }

}
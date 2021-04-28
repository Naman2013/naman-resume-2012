import { Component } from 'react';
import React from "react";
import { getUserInfo } from 'app/modules/User';
import { getTopCommunityObservations } from '../../dashboardApi';
import { ObjectList } from './index';

export class TopCommunityObservations extends Component{

    constructor(props){
        super(props);
        this.state={
            topCommunityObservations: undefined,     
            loading: false,                
        }
        this.getTopCommunityObservationsAction();
    }

    timerId= null;

    getTopCommunityObservationsAction = (data) =>{
        const { at, cid, token } = getUserInfo();
        this.setState({loading: true});        
        getTopCommunityObservations({at, cid, token, ...data}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                             
                if (this.timerId !== null )
                    clearTimeout(this.timerId);
                this.timerId=setTimeout(()=>this.getTopCommunityObservationsAction(data),duration );
                this.setState({topCommunityObservations: res, loading: false});
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
        const { topCommunityObservations, loading } = this.state;
        // const objectList = [{objectPoints: "44 GP", text: "Jupiter", icon: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg"},
        //                     {objectPoints: "41 GP", text: "Saturn", icon: "https://vega.slooh.com/assets/v4/dashboard-new/saturn.svg"},
        //                     {objectPoints: "28 GP", text: "Moon", icon: "https://vega.slooh.com/assets/v4/dashboard-new/moon.svg"},
        //                     {objectPoints: "24 GP", text: "Pluto", icon: "https://vega.slooh.com/assets/v4/dashboard-new/pluto.svg"}];
       
        return (
            <div>
                {topCommunityObservations && (
                    <ObjectList
                        heading={"Community Top Observations"}
                        showTab={true}
                        // headerlist={["Last 30 Days", "All Time"]}
                        tabOptions={topCommunityObservations.tabOptions}                        
                        headerspaceequally={true}
                        objectList = {topCommunityObservations.popularObservations}                                        
                        loading={loading}
                        getTopCommunityObjects={this.getTopCommunityObservationsAction}
                    />
                )}                   
            </div>
            
        );
    }

}
import { Component } from 'react';
import React from "react";
import './style.scss';
import { getUserInfo } from 'app/modules/User';
import { getTopCommunityObjects } from '../../dashboardApi';
import { ObjectList } from './index';

export class TopCommunityObjects extends Component{

    constructor(props){
        super(props);
        this.state={
            topCommunityObjects: undefined,     
            loading: false,                
        }
        this.getTopCommunityObjects();
    }

    timerId= null;

    getTopCommunityObjects = (data) =>{
        const { at, cid, token } = getUserInfo();        
        this.setState({loading: true}); 
        getTopCommunityObjects({at, cid, token, ...data}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
                // console.log("Top Community Objects Duration"+duration);                
                if (this.timerId !== null )
                    clearTimeout(this.timerId);
                this.timerId=setTimeout(()=>this.getTopCommunityObjects(data),duration );
                this.setState({topCommunityObjects: res, loading: false});
            }
            else
                this.props.validateResponseAccess(res);
        });
    }

    componentWillUnmount(){
        if(this.timerId !== null)
            clearTimeout(this.timerId);
    }

    render() {
        
        const { topCommunityObjects, loading } = this.state;        
       
        return (
            <div>
                {topCommunityObjects && (
                    <ObjectList
                        heading={"Community Top Objects"}
                        showTab={true}
                        // headerlist={["Last 30 Days", "All Time"]}
                        tabOptions={topCommunityObjects.tabOptions}
                        selectedheader={"Last 30 Days"}
                        headerspaceequally={true}
                        objectList = {topCommunityObjects.activeObjects}
                        loading={loading}
                        getTopCommunityObjects={this.getTopCommunityObjects}
                    />
                )}                   
            </div>
            
        );
    }

}
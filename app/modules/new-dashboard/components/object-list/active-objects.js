import { Component } from 'react';
import React from "react";
import './style.scss';
import { getUserActiveObject } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { ObjectList } from './index';

export class ActiveObject extends Component{

    constructor(props){
        super(props);
        this.state={
            userActiveObject: undefined
        }
        this.getActiveObjectAction();
    }

    timerId=null;

    getActiveObjectAction = () =>{
        const { at, cid, token } = getUserInfo();
        getUserActiveObject({at, cid, token}).then(response=>{
            const res=response.data;
            if(!res.apiError){
                const { timestamp, expires } = res;
                const duration=(expires-timestamp)*1000;
               
                if(this.timerId !== null)
                    clearTimeout(this.timerId);               
                this.timerId=setTimeout(this.getActiveObjectAction,duration );
                this.setState({userActiveObject: res});
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
        const { userActiveObject } = this.state;
        
        return (
            <div>
                {userActiveObject && (
                    <ObjectList
                        heading={"Active Objects"}
                        showTab={false}
                        headerlist={[]}
                        selectedheader={""}
                        headerspaceequally={false}
                        objectList={userActiveObject.activeObjects}
                    />
                )}                                             
            </div>   
        );
    }

}
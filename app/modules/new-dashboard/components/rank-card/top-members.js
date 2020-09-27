import { Component } from 'react';
import React from "react";
import './style.scss';
import { getTopMembers } from '../../dashboardApi';
import { getUserInfo } from 'app/modules/User';
import { RankCard } from './index';
import { PublicProfileCard } from '../public-card';
import Popup from 'react-modal';
import { customModalStylesPublicProfileCardBlueOverlay } from 'app/styles/mixins/utilities';

export class TopMembers extends Component{

    constructor(props){
        super(props);
        this.state={
            topMembers: undefined,     
            loading: false, 
            customerUUID: null,
            showPublicProfile: false,      
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

    handlePublicProfileCard = (customerUUID) =>{
        this.setState({showPublicProfile: true, customerUUID: customerUUID});
    }

    
    componentWillUnmount(){
        if(this.timerId !== null)
            clearTimeout(this.timerId);
    }

    render() {
        const { topMembers, loading, showPublicProfile, customerUUID } = this.state;
        
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
                        onClickItem={this.handlePublicProfileCard}
                    />
                )}

                {showPublicProfile && (
                    <Popup
                    // ariaHideApp={false}
                    isOpen={true}
                    style={customModalStylesPublicProfileCardBlueOverlay}
                    contentLabel="Badge"
                    shouldCloseOnOverlayClick={false}
                    onRequestClose={()=>this.setState({customerUUID: null, showPublicProfile: false})}
                    >   
                        <PublicProfileCard
                            customerUUID={customerUUID}
                            onClose={()=>this.setState({customerUUID: null, showPublicProfile: false})}
                        />
                    </Popup>
                )}                                             
            </div>   
        );
    }

}
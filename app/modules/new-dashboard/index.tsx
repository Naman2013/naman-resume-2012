import { Component } from "react";
import { DashboardHeader } from './components/breadcrumb-header/index';
import React from "react";
import './style.scss'
import { TitleHeader } from "./components/title-header";
import { TabHeader } from "./components/tab-header";
import { ProfileCard} from "./components/profile-card";
import { BadgeList } from "./components/badge-list";
import { GravityActions } from "./components/gravity-actions";


export class NewDashboard extends Component{
    

    render(){

        return(
            <div className="row">
                <div className="left">
                    <DashboardHeader/>
                    
                    <TitleHeader/>

                    <TabHeader/>

                    
                </div>
                <div className="right">
                    <ProfileCard/>
                    <BadgeList/>
                    <GravityActions/>
                </div>
            </div>
        );
    }
}
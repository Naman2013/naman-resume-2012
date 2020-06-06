import { Component } from "react";
import { DashboardHeader } from './components/breadcrumb-header/index';
import React from "react";
import './style.scss'
import { TitleHeader } from "./components/title-header";
import { TabHeader } from "./components/tab-header";
import { ProfileCard} from "./components/profile-card";
import { BadgeList } from "./components/badge-list";
import { GravityActions } from "./components/gravity-actions";
import { ObjectList } from "./components/object-list"
import { DomainGP } from "./components/domain-gp";
import { RankCard } from "./components/rank-card";

export class NewDashboard extends Component{
    

    render(){

        return(
            <div className="row">
                <div className="left">
                    <DashboardHeader/>
                    
                    <TitleHeader/>

                    <TabHeader
                        headings={["Explore Quests", "Explore Objects"]}
                        activeHeading={"Explore Quests"}
                        spaceequally={false}
                    />

                    
                </div>
                <div className="right">
                    <ProfileCard/>
                    <BadgeList/>
                    <GravityActions/>
                    <ObjectList
                        heading={"Most Active Objects"}
                    />
                    <ObjectList
                        heading={"Most Popular Observations"}
                    />
                    <DomainGP
                        heading={"GP by Domain"}
                    />
                    <RankCard
                        heading={"Your Rank"}
                    />
                </div>
            </div>
        );
    }
}
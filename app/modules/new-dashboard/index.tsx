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
import { CommunityFame } from "./components/community-fame";

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
                        showTab={false}
                        headerlist={[]}
                        selectedheader={""}
                        headerspaceequally={false}
                    />
                    <ObjectList
                        heading={"Most Popular Observations"}
                        showTab={false}
                        headerlist={[]}
                        selectedheader={""}
                        headerspaceequally={false}
                    />
                    <DomainGP
                        heading={"GP by Domain"}
                    />
                    <RankCard
                        heading={"Your Rank"}
                        rankList={[{rank: "2065", gpPoints: "49", text: "Serenity Henry"},
                                    {rank: "2064", gpPoints: "48", text: "Harold Russell"},
                                    {rank: "2063", gpPoints: "46", text: "Colleen Henry"},
                                    {rank: "2062", gpPoints: "46", text: "Tanya Pena"},
                                    {rank: "2061", gpPoints: "45", text: "Bruce Mccoy"}]}
                        showRowCount={0}
                        showMoreButton={false}
                    />
                    <CommunityFame
                        heading={"Community Hall of Fame"}
                        gpPoints={"18 647 GP"}
                    />
                    <ObjectList
                        heading={"Community Top Object"}
                        showTab={true}
                        headerlist={["Last 30 Days", "All Time"]}
                        selectedheader={"Last 30 Days"}
                        headerspaceequally={true}
                    />
                    <ObjectList
                        heading={"Community Top Observations"}
                        showTab={true}
                        headerlist={["Last 30 Days", "All Time"]}
                        selectedheader={"Last 30 Days"}
                        headerspaceequally={true}
                    />
                    <RankCard
                        heading={"Top Members"}
                        rankList={[{rank: "1", gpPoints: "49088", text: "Serenity Henry"},
                                    {rank: "2", gpPoints: "49014", text: "Harold Russell"},
                                    {rank: "3", gpPoints: "46799", text: "Colleen Henry"},
                                    {rank: "4", gpPoints: "46034", text: "Tanya Pena"},
                                    {rank: "5", gpPoints: "45857", text: "Bruce Mccoy"},
                                    {rank: "6", gpPoints: "49088", text: "Serenity Henry"},
                                    {rank: "7", gpPoints: "49014", text: "Harold Russell"},
                                    {rank: "8", gpPoints: "46799", text: "Colleen Henry"},
                                    {rank: "9", gpPoints: "46034", text: "Tanya Pena"},
                                    {rank: "10", gpPoints: "45857", text: "Bruce Mccoy"},
                                    {rank: "11", gpPoints: "49125", text: "Serenity Henry"},
                                    {rank: "12", gpPoints: "48524", text: "Harold Russell"},
                                    {rank: "13", gpPoints: "46447", text: "Colleen Henry"},
                                    {rank: "14", gpPoints: "46984", text: "Tanya Pena"},
                                    {rank: "15", gpPoints: "45547", text: "Bruce Mccoy"}]}
                        showRowCount={10}
                        showMoreButton={true}
                    />
                </div>
            </div>
        );
    }
}
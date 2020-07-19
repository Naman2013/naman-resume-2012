import { Component, PureComponent } from "react";
import { DashboardHeader } from './components/breadcrumb-header/index';
import React, { useRef } from "react";
import './style.scss';
import { TitleHeader } from "./components/title-header";
import { TabHeader } from "./components/tab-header";
import { ProfileCard} from "./components/profile-card";
import { BadgeList } from "./components/badge-list";
import { GravityActions } from "./components/gravity-actions";
import { ObjectList } from "./components/object-list"
import { DomainGP } from "./components/domain-gp";
import { RankCard } from "./components/rank-card";
import { CommunityFame } from "./components/community-fame";
import { CommunityClubList } from "./components/community-club-list";
import { Observatories } from "./components/observatories";
import { UpcomingMissionList }  from "./components/upcoming-mission-list";
import { PhotoHub } from "./components/photo-hub";
import { ImageSlider } from "./components/image-slider";
import { RecentCommunityActivities } from "./components/recent-community-activities";
import { StarPartyList } from "./components/start-party-list";
import { ClubList } from "./components/club-list";
import { BookMark } from "./components/bookmark";
import { AstronomerConversationLayout } from "./components/astronomer-conversation-layout";
import { ObjectMap } from "./components/object-map";
import { Spinner } from 'app/components/spinner/index';
import { SectionDivider } from "./components/section-divider";

export class NewDashboard extends PureComponent{
    
    componentDidMount() {
        this.getStarPartyList();
    }

    scrollToRef = (index) => {
        switch(index){
            case 0:
                this.exploreRef.scrollIntoView();
                break;
            case 1:
                this.observatoryRef.scrollIntoView();
                break;
            case 2:
                this.photoRef.scrollIntoView()
                break;
            case 3:
                this.communityRef.scrollIntoView()
                break;
        }
        // debugger;
        // ref.current.scrollIntoView({
        //     behavior: 'smooth',
        //     block: 'start',
        //   });
    }

    getStarPartyList = () => {
        const { fetchStarPartyDataAction, getUserGravityDataAction, getMyPicturesDataAction, getDashboardFeaturedObjectsDataAction, getMyClubListDataAction, getBookmarkListDataAction, getPrivateProfileDataAction } = this.props;        
        getPrivateProfileDataAction();
        fetchStarPartyDataAction();
        getUserGravityDataAction();
        getMyPicturesDataAction({
            viewType: 'photoRoll',                 
        });
        getDashboardFeaturedObjectsDataAction();
        getMyClubListDataAction({
            callSource: "profile",
        });
        getBookmarkListDataAction({
            readingListType: "guide",
        });
    };
    
    render(){
        const { privateProfile, upcomingStarPartyList, userGravityStatus, photoHub, dashboardFeaturedObjects, myClubList, bookmarkList, isFetching } =this.props;
        const { getBookmarkListDataAction, getMyPicturesDataAction } = this.props;        
        
        return(
            <div>
                <Spinner loading={isFetching} />
                {privateProfile && (
                    <div className="row new-dash">
                        <div className="left">
                            <DashboardHeader
                                refArray={[this.exploreRef, this.observatoryRef, this.photoRef, this.communityRef]}
                                scrollToRef={this.scrollToRef}
                            />
                            <div className="left-contents">
                                <TitleHeader
                                    ref={ refs => {this.exploreRef=refs}}
                                    heading = {"Explore the Universe"}
                                    subHeading = {"Discover and Observe"}
                                />

                                <TabHeader
                                    headings={["Explore Quests", "Explore Objects"]}
                                    activeHeading={"Explore Quests"}
                                    spaceequally={false}
                                    theme={"dark"}
                                />
                                <ObjectMap/>

                                <SectionDivider/>

                                <Observatories ref={ refs => { this.observatoryRef=refs}}/>
                                
                                <SectionDivider/>

                                <UpcomingMissionList
                                    heading={"Upcoming Missions"}
                                    scheduleMission={true}
                                    missionList = {[{objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", emptyslot: false},
                                                    {objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", emptyslot: true, title: "Plan new mission", subtitle: "Empty Slot"},
                                                    {objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", emptyslot: true, title: "Plan new mission", subtitle: "Empty Slot"},
                                                    {objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", emptyslot: true, title: "Plan new mission", subtitle: "Empty Slot"},
                                                    {objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", emptyslot: true, title: "Plan new mission", subtitle: "Empty Slot"},]}
                                    advancedmissionList = {[{objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", emptyslot: false}]}
                                    showSubHeading={true}
                                    featuredMission={true}
                                    dashboardFeaturedObjects={dashboardFeaturedObjects}
                                />

                                <UpcomingMissionList
                                    heading={"Past Missions"}
                                    missionList = {[{objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", showPicturetaken: true, picturetakentext: "1 Picture taken"},
                                                    {objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", showPicturetaken: true, picturetakentext: "1 Picture taken"},
                                                    {objectname: "Comet C/2017 T2 (PanSTARRS)" , time: "Wednesday, April 1, 20:20", telescope: "Canary One", showPicturetaken: true, picturetakentext: "1 Picture taken"}]}
                                    scheduleMission={false}
                                    showSubHeading={false}
                                    advancedmissionList={[]}
                                    featuredMission={false}
                                />
                                
                                <SectionDivider/>

                                <PhotoHub
                                    heading={"Phot Hub (1 New)"}                            
                                    headerlist={["Photo Roll", "Observations", "Missions", "Galleries"]}
                                    selectedheader={"Photo Roll"}
                                    headerspaceequally={false}
                                    photoHub={photoHub}
                                    getMyPictures={getMyPicturesDataAction}
                                    ref={refs => this.photoRef=refs}                                    
                                />

                                <SectionDivider/>

                                <TitleHeader
                                    ref={refs => this.communityRef=refs }
                                    heading = {"Community Exploration"}
                                    subHeading = {"Latest Community Insights"}
                                />

                                {photoHub && (
                                    <ImageSlider
                                        photoHub={photoHub}
                                    />
                                )}                                    

                                <SectionDivider/>

                                <RecentCommunityActivities
                                    heading={"Recent Community Activities"}
                                />

                                <SectionDivider/>
                                
                                {upcomingStarPartyList && (
                                    <StarPartyList
                                    heading={"Upcoming StarParties"}
                                    partylist={upcomingStarPartyList.eventList}                            
                                    // partylist={[{startText: "Starts in 00:24:21", name: "Supermoon Trilogy: Episode II - The Super Pink Moon", dateTime: "Wednesday, April 7, 18:30", astronomerImageURL: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-person-512.png", astronomerName: "Paul Cox" },
                                    //             {startText: "Upcoming StarParty", name: "Supermoon Trilogy: Episode II - The Super Pink Moon", dateTime: "Wednesday, April 7, 18:30", astronomerImageURL: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-person-512.png", astronomerName: "Paul Cox" }]}
                                    />
                                )}
                                
                                <SectionDivider/>

                                {myClubList && (
                                    <ClubList
                                        heading={"My Clubs"}
                                        showExploreClubs={true}
                                        // clubList={[{name: "Ad Astra", type: "Public Community", info: "Admin: Paul Cox | 684 Members"},
                                        //             {name: "Astronomy for the Soul", type: "Public Community", info: "Admin: Paul Cox | 684 Members"},]}
                                        clubList={myClubList.groupsList}
                                    />
                                )}
                                
                                <SectionDivider/>

                                {bookmarkList && (
                                    <BookMark
                                        heading={"Bookmarks"}
                                        emptySetDisplay={bookmarkList.emptySetDisplay}
                                        // tabsList={privateProfile.profileMenuList[6].subMenus}
                                        guideList={bookmarkList.itemList}
                                        // guideList={[{title: "Andromeda", subtitle: "Slooh Team", info: "Everything you need to know about the constellation of Andromeda..."},
                                        //             {title: "The Moon", subtitle: "Slooh Team", info: "The Earth's Moon is the fifth largest in our Solar System and the largest moon..."}]}
                                        getBookmarkList={getBookmarkListDataAction}
                                    />
                                )}

                                <SectionDivider/>

                                <h2 className="recent-heading">{"Ask an Astronomer Anything"}</h2> 
                                <AstronomerConversationLayout
                                />
                                <SectionDivider/>
                            </div>
                        </div>
                        <div className="right">

                            {userGravityStatus && (
                                <ProfileCard
                                    userGravityStatus={userGravityStatus}
                                />
                            )}
                            
                            <div className="mar-left-right-16">

                                {userGravityStatus && (
                                    <BadgeList
                                        badgeLists={userGravityStatus.userBadgeList}
                                        totalBadgeCount={userGravityStatus.totalBadgeCount}
                                        currentBadgeCount={userGravityStatus.currentBadgeCount}
                                    />
                                )}
                                
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
                                                {rank: "2063", gpPoints: "46", text: "Colleen Henry", highlight: true},
                                                {rank: "2062", gpPoints: "46", text: "Tanya Pena"},
                                                {rank: "2061", gpPoints: "45", text: "Bruce Mccoy"}]}
                                    showRowCount={0}
                                    showMoreButton={false}
                                />
                                <CommunityFame
                                    heading={"Community Hall of Fame"}
                                    gpPoints={"18 647"}
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
                                <CommunityClubList
                                    heading={"Most Active Clubs"}
                                    clubList={[{rank: "1", gpPoints: "9547 GP", text: "Ad Asta", admin: "Admin: Paul Cox | 1304 Members"},
                                                {rank: "2", gpPoints: "1054 GP", text: "Astronomy for the Soul", admin: "Admin: Paul Cox | 954 Members"},
                                                {rank: "3", gpPoints: "457 GP", text: "Are We Alone?", admin: "Admin: Paul Cox | 847 Members"},
                                                {rank: "4", gpPoints: "46034", text: "Tanya Pena", admin: ""}]}
                                    showRowCount={3}                       
                                />

                                <RankCard
                                    heading={"Top Members"}
                                    rankList={[{rank: "1", gpPoints: "49088", text: "Serenity Henry", subText: "University of South Alabama"},
                                                {rank: "2", gpPoints: "49014", text: "Harold Russell", subText: "University of South Alabama"},
                                                {rank: "3", gpPoints: "46799", text: "Colleen Henry", subText: "University of South Alabama"},
                                                {rank: "4", gpPoints: "46034", text: "Tanya Pena", subText: "University of South Alabama"},
                                                {rank: "5", gpPoints: "45857", text: "Bruce Mccoy", subText: "University of South Alabama"},
                                                {rank: "6", gpPoints: "49088", text: "Serenity Henry", subText: "University of South Alabama"},
                                                {rank: "7", gpPoints: "49014", text: "Harold Russell", subText: "University of South Alabama"},
                                                {rank: "8", gpPoints: "46799", text: "Colleen Henry", subText: "University of South Alabama"},
                                                {rank: "9", gpPoints: "46034", text: "Tanya Pena", subText: "University of South Alabama"},
                                                {rank: "10", gpPoints: "45857", text: "Bruce Mccoy", subText: "University of South Alabama"},
                                                {rank: "11", gpPoints: "49125", text: "Serenity Henry", subText: "University of South Alabama"},
                                                {rank: "12", gpPoints: "48524", text: "Harold Russell", subText: "University of South Alabama"},
                                                {rank: "13", gpPoints: "46447", text: "Colleen Henry", subText: "University of South Alabama"},
                                                {rank: "14", gpPoints: "46984", text: "Tanya Pena", subText: "University of South Alabama"},
                                                {rank: "15", gpPoints: "45547", text: "Bruce Mccoy", subText: "University of South Alabama"}]}
                                    showRowCount={10}
                                    showMoreButton={true}
                                />

                                <CommunityClubList
                                    heading={"Top School Clubs"}
                                    clubList={[{rank: "1", gpPoints: "9547 GP", text: "Austin High School", admin: "1304 Members"},
                                                {rank: "2", gpPoints: "1054 GP", text: "Austin High School", admin: "984 Members"},
                                                {rank: "3", gpPoints: "457 GP", text: "Austin High School", admin: "847 Members"},
                                                {rank: "4", gpPoints: "46034", text: "Tanya Pena", admin: ""}]}
                                    showRowCount={3}                       
                                />
                            </div>                    
                        </div>
                    </div>
                )}                
            </div>
        );
    }
}
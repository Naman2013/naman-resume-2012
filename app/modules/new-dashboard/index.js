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
import  PhotoHub  from "./components/photo-hub";
import { ImageSlider } from "./components/image-slider";
import { RecentCommunityActivities } from "./components/recent-community-activities";
import { StarPartyList } from "./components/start-party-list";
import { ClubList } from "./components/club-list";
import { BookMark } from "./components/bookmark";
import { AstronomerConversationLayout } from "./components/astronomer-conversation-layout";
import { ObjectMap } from "./components/object-map";
import { Spinner } from 'app/components/spinner/index';
import { SectionDivider } from "./components/section-divider";
import { QuestCard } from "./components/quest-card";
import { QuestMap } from "./components/quest-map";
import { ExploreObject } from "./components/explore-objects";
import { CommunityExploration } from "./components/community-exploration";

export class NewDashboard extends PureComponent{

    state={
        selectedBulletingHeader: "Explore the Universe",
    }
    
    constructor(props){
        super(props)
        this.exploreRef = React.createRef();  
        this.observatoryRef = React.createRef();  
        this.photoRef = React.createRef();  
        this.communityRef = React.createRef();  
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getInitialData();
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll= (event) => {
        let scrollTop = event.srcElement.body.scrollTop;
        if(scrollTop < this.observatoryRef.current.offsetTop)
            this.setState({selectedBulletingHeader: "Explore the Universe"});
    }

    scrollToRef = (index, heading) => {
        switch(index){
            case 0:                
                window.scrollTo(0, this.exploreRef.current.offsetTop);
                break;
            case 1:
                window.scrollTo(0, this.observatoryRef.current.offsetTop);
                break;
            case 2:
                window.scrollTo(0, this.photoRef.current.offsetTop);
                break;
            case 3:
                window.scrollTo(0, this.communityRef.current.offsetTop);
                break;
        }  
        this.setState({selectedBulletingHeader: heading});
    }

    getInitialData = () => {
        const { fetchStarPartyDataAction, 
                getUserGravityDataAction, 
                getUserActiveObjectDataAction, 
                getUserPopularObservationDataAction, 
                getMyPicturesDataAction, 
                getDashboardFeaturedObjectsDataAction, 
                getMyClubListDataAction, 
                getBookmarkListDataAction, 
                getPrivateProfileDataAction, 
                getPrivateProfileMissionDataAction,
                getMissionImagesDataAction,
                getGalleryListDataAction,
                getRecentGravityDataAction,
                getWeatherDataAction,
                getObservatoryListAction,
                getQuestMapControlAction,
                getCommunityExplorationAction,
                getCommunityFameAction,
            } = this.props;   

        getPrivateProfileDataAction();
        fetchStarPartyDataAction();
        getUserGravityDataAction();
        getPrivateProfileMissionDataAction();
        getMyPicturesDataAction({
            viewType: 'photoRoll',
            maxImageCount: 18,
            firstImageNumber: 1,
            sharedOnly: false,                 
        });        
        getDashboardFeaturedObjectsDataAction({callSource: "featuredObjectsDashboardV4New"});
        getMyClubListDataAction({
            callSource: "profile",
            paginationStartIndex: 1,
            maxItemsPerPage: 9
        });
        getBookmarkListDataAction({
            readingListType: "object",
            paginationStartIndex: 1,
            maxItemsPerPage: 9
        });
        getUserActiveObjectDataAction();
        getUserPopularObservationDataAction();
        getRecentGravityDataAction();        
        getObservatoryListAction({listType: "full", status: "live", callSource: "details"});
        getQuestMapControlAction();
        getCommunityExplorationAction();
        getCommunityFameAction();
    };
    
    render(){
    
        const { privateProfile, 
                userActiveObject, 
                userPopularObservation, 
                privateProfileMission, 
                upcomingStarPartyList, 
                userGravityStatus, 
                photoHub, 
                dashboardFeaturedObjects, 
                myClubList, 
                bookmarkList, 
                isFetching,
                piggyBackMissionSlot,
                piggybackReservedMissionData,
                piggybackReservedMission,
                cancelReservation,
                cancelPiggyback,
                grabPiggyback,
                reservePiggyback,
                getPrivateProfileMissionDataAction,
                reserveCommunityMission,
                getDashboardFeaturedObjectsDataAction,
                reservedCommunityMissionData,
                reservedCommunityMission,
                user,
                getMissionImagesDataAction,
                getGalleryListDataAction,
                recentGravityAction,
                weatherStatus,
                getWeatherDataAction,
                getMyClubListDataAction,
                getBookmarkListDataAction, 
                getMyPicturesDataAction,
                skyConditions,
                observatoryList,
                getSkyAction, 
                questMapControls, 
                getNewDashObsAction,
                obsWidgetData,
                getObsStatusAction,
                obsStatus,    
                getQuestMapControlAction,
                getObjectMapControlAction,
                objectMapControls,
                communityExploration, 
                communityFame,
              } =this.props;

              const { selectedBulletingHeader } = this.state;
              
        return(
            <div>
                <Spinner loading={isFetching} />
                {privateProfile && (
                    <div className="row new-dash">
                        <div className="left">
                            
                            <DashboardHeader                                
                                scrollToRef={this.scrollToRef}
                                activeHeading={selectedBulletingHeader}
                                // onChange={(header)=>this.setState({selectedBulletingHeader: header})}
                            />
                            <div className="left-contents">

                                <div ref={this.exploreRef}/>
                                <TitleHeader                                    
                                    heading = {"Explore the Universe"}
                                    subHeading = {"Discover and Observe"}
                                />

                                <ExploreObject
                                    questMapControls={questMapControls}
                                    objectMapControls={objectMapControls}
                                    getObjectMapControl={getObjectMapControlAction}
                                    getQuestMapControl={getQuestMapControlAction}
                                />                          
                                
                               
                                <SectionDivider/>

                                <div ref={this.observatoryRef}/>
                                {observatoryList && (
                                    <Observatories                                                                               
                                        getWeatherDataAction={getWeatherDataAction}                                        
                                        list={observatoryList.observatoryList}                                        
                                        getSkyData={getSkyAction}
                                        wxList={weatherStatus}
                                        skyConditions={skyConditions}
                                        getNewDashObs={getNewDashObsAction}
                                        obsWidgetData={obsWidgetData}
                                        getObsStatus={getObsStatusAction}
                                        obsStatus={obsStatus}
                                    />
                                )}
                                
                                
                                <SectionDivider/>

                                {privateProfileMission &&(
                                    <div>
                                        <UpcomingMissionList
                                            heading={"Upcoming Missions"}
                                            scheduleMission={true}
                                            missionList = {privateProfileMission.missionList}
                                            advancedmissionList = {[{missionTitle: "Comet C/2017 T2 (PanSTARRS)" , missionStartFormatted: { displayDateTime: "Wednesday, April 1, 20:20" }, telescopePierName: "Canary One", emptyslot: false}]}
                                            showSubHeading={true}
                                            featuredMission={true}
                                            dashboardFeaturedObjects={dashboardFeaturedObjects}
                                            emptySetDisplay={privateProfileMission.emptySetUpcomingMissionsDisplay}
                                            piggyBackMissionSlot={piggyBackMissionSlot}
                                            piggybackReservedMissionData={piggybackReservedMissionData}
                                            piggybackReservedMission={piggybackReservedMission}
                                            cancelReservation={cancelReservation}
                                            cancelPiggyback={cancelPiggyback}
                                            grabPiggyback={grabPiggyback}
                                            reservePiggyback={reservePiggyback}
                                            getPrivateProfileMissions={getPrivateProfileMissionDataAction}
                                            reserveCommunityMission={reserveCommunityMission}
                                            getDashboardFeaturedObjects={getDashboardFeaturedObjectsDataAction}
                                            reservedCommunityMissionData={reservedCommunityMissionData } 
                                            reservedCommunityMission={reservedCommunityMission}
                                            user={user} 
                                            totalCount={5}                                           
                                        />

                                        <UpcomingMissionList
                                            heading={"Past Missions"}
                                            missionList = {privateProfileMission.recentMissionList}
                                            scheduleMission={false}
                                            showSubHeading={false}
                                            advancedmissionList={[]}
                                            featuredMission={false}
                                            emptySetDisplay={privateProfileMission.emptySetRecentMissionsDisplay}
                                            piggyBackMissionSlot={piggyBackMissionSlot}
                                            piggybackReservedMissionData={piggybackReservedMissionData}
                                            piggybackReservedMission={piggybackReservedMission}
                                            cancelReservation={cancelReservation}
                                            cancelPiggyback={cancelPiggyback}
                                            grabPiggyback={grabPiggyback}
                                            reservePiggyback={reservePiggyback}
                                            getPrivateProfileMissions={getPrivateProfileMissionDataAction}
                                            reserveCommunityMission={reserveCommunityMission}
                                            getDashboardFeaturedObjects={getDashboardFeaturedObjectsDataAction}
                                            reservedCommunityMissionData={reservedCommunityMissionData } 
                                            reservedCommunityMission={reservedCommunityMission}
                                            user={user} 
                                            totalCount={privateProfileMission.recentMissionList.length}                                           
                                        />
                                    </div>
                                )}
                                
                                
                                <SectionDivider/>

                                <div ref={this.photoRef}/>
                                <PhotoHub
                                    heading={"Photo Hub (1 New)"}                            
                                    headerlist={["Photo Roll", "Observations", "Missions", "Galleries"]}
                                    selectedheader={"Photo Roll"}
                                    headerspaceequally={false}
                                    photoHub={photoHub}
                                    getMyPictures={getMyPicturesDataAction}                                    
                                    getMissionImages={getMissionImagesDataAction}
                                    getGalleryList={getGalleryListDataAction}                                                                       
                                />

                                <SectionDivider/>

                                <div ref={this.communityRef}/>    
                                <TitleHeader
                                    
                                    heading = {"Community Exploration"}
                                    subHeading = {"Latest Community Insights"}
                                />

                                {communityExploration && (
                                    <CommunityExploration
                                        communityExploration={communityExploration}
                                    />
                                )}                                    

                                <SectionDivider/>

                                {communityExploration && (
                                    <RecentCommunityActivities
                                        heading={"Recent Community Activities"}
                                        activities={communityExploration.activities}
                                    />
                                )}                               

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
                                        totalClubsCount={myClubList.totalClubsCount}
                                        getClubList={getMyClubListDataAction}
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
                                        totalCount={bookmarkList.resultsReturnedCount}
                                    />
                                )}

                                <SectionDivider/>

                                {/* <h2 className="recent-heading">{"Ask an Astronomer Anything"}</h2> 
                                <AstronomerConversationLayout
                                />
                                <SectionDivider/> */}
                                
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
                                
                                {recentGravityAction && (
                                    <GravityActions
                                        gravityList={recentGravityAction.actions}
                                    />
                                )}
                                

                                {userActiveObject && (
                                    <ObjectList
                                        heading={"Most Active Objects"}
                                        showTab={false}
                                        headerlist={[]}
                                        selectedheader={""}
                                        headerspaceequally={false}
                                        objectList={userActiveObject.activeObjects}
                                    />
                                )}
                                
                                {userPopularObservation && (
                                    <ObjectList
                                        heading={"Most Popular Observations"}
                                        showTab={false}
                                        headerlist={[]}
                                        selectedheader={""}
                                        headerspaceequally={false}
                                        objectList={userPopularObservation.popularObservations}
                                    />
                                )}
                                
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

                                {communityFame && (
                                    <CommunityFame
                                        // heading={"Community Hall of Fame"}
                                        // gpPoints={"18 647"}
                                        communityFame={communityFame}
                                    />
                                )}

                                
                                <ObjectList
                                    heading={"Community Top Object"}
                                    showTab={true}
                                    headerlist={["Last 30 Days", "All Time"]}
                                    selectedheader={"Last 30 Days"}
                                    headerspaceequally={true}
                                    objectList = {[{gravityPoints: "44 GP", title: "Jupiter", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg"},
                                                    {gravityPoints: "41 GP", title: "Saturn", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/saturn.svg"},
                                                    {gravityPoints: "28 GP", title: "Moon", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/moon.svg"},
                                                    {gravityPoints: "24 GP", title: "Pluto", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/pluto.svg"}]}
                                />
                                <ObjectList
                                    heading={"Community Top Observations"}
                                    showTab={true}
                                    headerlist={["Last 30 Days", "All Time"]}
                                    selectedheader={"Last 30 Days"}
                                    headerspaceequally={true}
                                    objectList = {[{gravityPoints: "44 GP", title: "Jupiter", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg"},
                                                    {gravityPoints: "41 GP", title: "Saturn", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/saturn.svg"},
                                                    {gravityPoints: "28 GP", title: "Moon", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/moon.svg"},
                                                    {gravityPoints: "24 GP", title: "Pluto", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/pluto.svg"}]}
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
                                    heading={"Top Students"}
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
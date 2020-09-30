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
import { getMostActiveClubs, getTopCommunityObjects, getTopCommunityObservations } from "./dashboardApi";
import { ActiveObject } from "./components/object-list/active-objects";
import { PopularObservation } from "./components/object-list/popular-observation";
import { SchoolClub } from "./components/community-club-list/top-school-clubs";
import { ActiveClub } from "./components/community-club-list/most-active-clubs";
import { MyRank } from "./components/rank-card/my-rank";
import { TopMembers } from "./components/rank-card/top-members";
import { TopStudents } from "./components/rank-card/top-students";
import { ProfileStatus } from "./components/profile-card/profile-status";
import { CommunityFame } from "./components/community-fame";
import { TitleHeaderNew } from "./components/title-header-new";
import { LiveChat } from "./components/live-chat";
import { pubnubInit } from "../pubnub-handler/actions";
import { PublicProfileCard } from "./components/public-card";
import Popup from 'react-modal';
import { customModalStylesPublicProfileCardBlueOverlay } from 'app/styles/mixins/utilities';
import { TopCommunityObjects } from './components/object-list/top-objects';
import { TopCommunityObservations } from './components/object-list/top-observations';


export class NewDashboard extends PureComponent{

    state={
        selectedBulletingHeader: "Explore the Universe",
        customerUUID: null,
        showPublicProfile: false,  
    }
    
    constructor(props){
        super(props)
        this.missionref = React.createRef();  
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
                window.scrollTo(0, this.observatoryRef.current.offsetTop);
                break;
            case 1:
                window.scrollTo(0, this.missionref.current.offsetTop);
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
                getMyRankAction,
                getTopMembersAction,
                getTopStudentsAction,
                getMostActiveClubsAction,
                getTopSchoolClubsAction,
                pubnubInit, 
                pubnubData,
                setDock,               
                // getGravityByDomainAction,
                getDashboardMissionListAction,
                
            } = this.props;   

        getPrivateProfileDataAction();
        // fetchStarPartyDataAction();
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
        // getUserActiveObjectDataAction();
        // getUserPopularObservationDataAction();
        // getRecentGravityDataAction();        
        getObservatoryListAction({listType: "full", status: "live", callSource: "details"});
        getQuestMapControlAction();
        // getCommunityExplorationAction();
        // getCommunityFameAction();
        // getMyRankAction();
        // getTopMembersAction();
        // getTopStudentsAction();
        // getMostActiveClubsAction();
        // getTopSchoolClubsAction();
        // getGravityByDomainAction();
        // if(!pubnubData.pubnubInitialize)
        //     pubnubInit();
        getDashboardMissionListAction();
        setDock(true);
    };

    // componentWillUnmount(){
    //     if(this.props.pubnubData.docked)
    //         this.props.unSubscribePubnub();
    // }
    
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
                getMyRankAction,
                getTopMembersAction,
                getTopStudentsAction,
                getMostActiveClubsAction,
                getTopSchoolClubsAction,
                myRank,
                topMembers,
                topStudents,
                mostActiveClubs,
                topSchoolClubs,
                gravityByDomain,
                // getCommunityFameAction,
                pubnubData,
                sendMessage,
                setDock, 
                setTab, 
                unSubscribePubnub,
                pubnubInit,
                getActivityFeedMembers,
                setMemberChatState,
                getDashboardMissionListAction,
                dashboardMissionList,
                setPublicCardStatusAction,
              } =this.props;

              const { selectedBulletingHeader, customerUUID, showPublicProfile } = this.state;
           
        return(
            <div>
                <Spinner loading={isFetching} />
                {privateProfile && (
                    <div className="new-dash">
                        <div className="left">
                            
                            <DashboardHeader                                
                                scrollToRef={this.scrollToRef}
                                activeHeading={selectedBulletingHeader}
                                // onChange={(header)=>this.setState({selectedBulletingHeader: header})}
                            />
                            <div className="left-contents">
                                
                                <TitleHeaderNew                                    
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

                                <div ref={this.missionref}/>
                                {privateProfileMission && dashboardMissionList && (
                                    <div>
                                        <UpcomingMissionList
                                            heading={"Upcoming Missions"}
                                            scheduleMission={true}
                                            showMissionsList={dashboardMissionList.missions.showMissionsList}
                                            missionList = {dashboardMissionList.missions.missionsList}
                                            showMissionTitle = {dashboardMissionList.missions.showMissionsTitle}
                                            showMissionQuota = {dashboardMissionList.missions.showMissionsQuota}
                                            showMissionExplanation = {dashboardMissionList.missions.showMissionsExplanation}
                                            missionTitle = {dashboardMissionList.missions.missionsTitle}
                                            missionQuota = {dashboardMissionList.missions.missionsQuota}
                                            missionExplanation = {dashboardMissionList.missions.missionsExplanation}

                                            showAdvancedMissionsList={dashboardMissionList.advancedMissions.showMissionsList}
                                            showAdvancedMissionTitle = {dashboardMissionList.advancedMissions.showMissionsTitle}
                                            showAdvancedMissionQuota = {dashboardMissionList.advancedMissions.showMissionsQuota}
                                            showAdvancedMissionExplanation = {dashboardMissionList.advancedMissions.showMissionsExplanation}
                                            advancedMissionTitle = {dashboardMissionList.advancedMissions.missionsTitle}
                                            advancedMissionQuota = {dashboardMissionList.advancedMissions.missionsQuota}
                                            advancedMissionExplanation = {dashboardMissionList.advancedMissions.missionsExplanation}
                                            // advancedmissionList = {[{missionTitle: "Comet C/2017 T2 (PanSTARRS)" , missionStartFormatted: { displayDateTime: "Wednesday, April 1, 20:20" }, telescopePierName: "Canary One", emptyslot: false}]}
                                            advancedmissionList={dashboardMissionList.advancedMissions.missionsList}
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
                                            getDashboardMissionList={getDashboardMissionListAction}                                           
                                        />

                                        <UpcomingMissionList
                                            heading={undefined}
                                            missionList = {dashboardMissionList.pastMissions.missionsList}
                                            showMissionsList={dashboardMissionList.pastMissions.showMissionsList}
                                            missionList = {dashboardMissionList.pastMissions.missionsList}
                                            showMissionTitle = {dashboardMissionList.pastMissions.showMissionsTitle}
                                            showMissionQuota = {dashboardMissionList.pastMissions.showMissionsQuota}
                                            showMissionExplanation = {dashboardMissionList.pastMissions.showMissionsExplanation}
                                            missionTitle = {dashboardMissionList.pastMissions.missionsTitle}
                                            missionQuota = {dashboardMissionList.pastMissions.missionsQuota}
                                            missionExplanation = {dashboardMissionList.pastMissions.missionsExplanation}
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
                                    heading={"Photos (1 New)"}                            
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

                                {/* {communityExploration && ( */}
                                    <CommunityExploration
                                        onClickItem={setPublicCardStatusAction}
                                        // communityExploration={communityExploration}
                                    />
                                {/* )}                                     */}

                                {/* <SectionDivider/>

                                {communityExploration && (
                                    <RecentCommunityActivities
                                        heading={"Recent Community Activities"}
                                        activities={communityExploration.activities}
                                    />
                                )}                                */}

                                <SectionDivider/>
                                
                                {upcomingStarPartyList && (
                                    <StarPartyList
                                    heading={"Star Party Schedule"}
                                    partylist={upcomingStarPartyList.eventList}                            
                                    // partylist={[{startText: "Starts in 00:24:21", name: "Supermoon Trilogy: Episode II - The Super Pink Moon", dateTime: "Wednesday, April 7, 18:30", astronomerImageURL: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-person-512.png", astronomerName: "Paul Cox" },
                                    //             {startText: "Upcoming StarParty", name: "Supermoon Trilogy: Episode II - The Super Pink Moon", dateTime: "Wednesday, April 7, 18:30", astronomerImageURL: "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-person-512.png", astronomerName: "Paul Cox" }]}
                                    />
                                )}
                                
                                <SectionDivider/>

                                {myClubList && (
                                    <ClubList
                                        heading={"Clubs"}
                                        showExploreClubs={true}
                                        // clubList={[{name: "Ad Astra", type: "Public Community", info: "Admin: Paul Cox | 684 Members"},
                                        //             {name: "Astronomy for the Soul", type: "Public Community", info: "Admin: Paul Cox | 684 Members"},]}
                                        clubList={myClubList.groupsList}
                                        totalClubsCount={myClubList.totalClubsCount}
                                        getClubList={getMyClubListDataAction}
                                        data={privateProfile}
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
                            <div className="mar-left-right-16">
                                <ProfileStatus />
                                {pubnubData && (
                                    <LiveChat
                                        // isOpen={true}
                                        activityFeedMessages={pubnubData.activityFeedMessages}
                                        sendMessage={sendMessage}
                                        setDock={setDock} 
                                        setTab={setTab} 
                                        unSubscribePubnub={unSubscribePubnub} 
                                        pubnubInit={pubnubInit}
                                        docked={pubnubData.docked}
                                        getActivityFeedMembers={getActivityFeedMembers}
                                        pubnubData={pubnubData}
                                        setMemberChatState={setMemberChatState}
                                        onClickItem={setPublicCardStatusAction}
                                    />                                
                                )}
                                
                                {/* {userGravityStatus && (
                                    <ProfileCard
                                        userGravityStatus={userGravityStatus}
                                    />
                                )}
                            
                                

                                {userGravityStatus && (
                                    <BadgeList
                                        badgeLists={userGravityStatus.userBadgeList}
                                        totalBadgeCount={userGravityStatus.totalBadgeCount}
                                        currentBadgeCount={userGravityStatus.currentBadgeCount}
                                    />
                                )} */}
                                
                                {/* {recentGravityAction && ( */}
                                    <GravityActions
                                        // gravityList={recentGravityAction.actions}
                                    />
                                {/* )} */}
                                
                                <ActiveObject />
                                {/* {userActiveObject && (
                                    <ObjectList
                                        heading={"Most Active Objects"}
                                        showTab={false}
                                        headerlist={[]}
                                        selectedheader={""}
                                        headerspaceequally={false}
                                        objectList={userActiveObject.activeObjects}
                                    />
                                )} */}
                                <PopularObservation />
                                {/* {userPopularObservation && (
                                    <ObjectList
                                        heading={"Most Popular Observations"}
                                        showTab={false}
                                        headerlist={[]}
                                        selectedheader={""}
                                        headerspaceequally={false}
                                        objectList={userPopularObservation.popularObservations}
                                    />
                                )} */}
                                
                                {/* {gravityByDomain &&( */}
                                    <DomainGP />
                                {/* )} */}
                                
                                <MyRank 
                                    onClickItem={setPublicCardStatusAction}
                                />

                                {/* {myRank && (
                                    <RankCard
                                        heading={myRank.sectionHeading}
                                        // rankList={[{rank: "2065", gpPoints: "49", text: "Serenity Henry"},
                                        //             {rank: "2064", gpPoints: "48", text: "Harold Russell"},
                                        //             {rank: "2063", gpPoints: "46", text: "Colleen Henry", highlight: true},
                                        //             {rank: "2062", gpPoints: "46", text: "Tanya Pena"},
                                        //             {rank: "2061", gpPoints: "45", text: "Bruce Mccoy"}]}
                                        rankList={myRank.rankList}
                                        showRowCount={0}
                                        showMoreButton={false}
                                        tabOptions={myRank.tabOptions}
                                        getRankData={getMyRankAction}
                                    />
                                )}
                                 */}
                                <CommunityFame />

                                <TopCommunityObjects />

                                <TopCommunityObservations />

                                {/* <ObjectList
                                    heading={"Community Top Object"}
                                    showTab={true}
                                    headerlist={["Last 30 Days", "All Time"]}
                                    selectedheader={"Last 30 Days"}
                                    headerspaceequally={true}
                                    objectList = {[{gravityPoints: "44 GP", title: "Jupiter", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg"},
                                                    {gravityPoints: "41 GP", title: "Saturn", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/saturn.svg"},
                                                    {gravityPoints: "28 GP", title: "Moon", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/moon.svg"},
                                                    {gravityPoints: "24 GP", title: "Pluto", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/pluto.svg"}]}
                                                    getTopCommunityDataAction={getTopCommunityObjects}
                                /> */}
                                {/* <ObjectList
                                    heading={"Community Top Observations"}
                                    showTab={true}
                                    headerlist={["Last 30 Days", "All Time"]}
                                    selectedheader={"Last 30 Days"}
                                    headerspaceequally={true}
                                    objectList = {[{gravityPoints: "44 GP", title: "Jupiter", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/jupiter.svg"},
                                                    {gravityPoints: "41 GP", title: "Saturn", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/saturn.svg"},
                                                    {gravityPoints: "28 GP", title: "Moon", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/moon.svg"},
                                                    {gravityPoints: "24 GP", title: "Pluto", iconUrl: "https://vega.slooh.com/assets/v4/dashboard-new/pluto.svg"}]}
                                                    getTopCommunityDataAction={getTopCommunityObservations}
                                /> */}

                                <TopMembers 
                                    onClickItem={setPublicCardStatusAction}
                                />

                                {/* {topMembers && (
                                    <RankCard
                                        heading={topMembers.sectionHeading}
                                        // rankList={[{rank: "1", gpPoints: "49088", text: "Serenity Henry"},
                                        //             {rank: "2", gpPoints: "49014", text: "Harold Russell"},
                                        //             {rank: "3", gpPoints: "46799", text: "Colleen Henry"},
                                        //             {rank: "4", gpPoints: "46034", text: "Tanya Pena"},
                                        //             {rank: "5", gpPoints: "45857", text: "Bruce Mccoy"},
                                        //             {rank: "6", gpPoints: "49088", text: "Serenity Henry"},
                                        //             {rank: "7", gpPoints: "49014", text: "Harold Russell"},
                                        //             {rank: "8", gpPoints: "46799", text: "Colleen Henry"},
                                        //             {rank: "9", gpPoints: "46034", text: "Tanya Pena"},
                                        //             {rank: "10", gpPoints: "45857", text: "Bruce Mccoy"},
                                        //             {rank: "11", gpPoints: "49125", text: "Serenity Henry"},
                                        //             {rank: "12", gpPoints: "48524", text: "Harold Russell"},
                                        //             {rank: "13", gpPoints: "46447", text: "Colleen Henry"},
                                        //             {rank: "14", gpPoints: "46984", text: "Tanya Pena"},
                                        //             {rank: "15", gpPoints: "45547", text: "Bruce Mccoy"}]}
                                        rankList={topMembers.rankList}
                                        showRowCount={10}
                                        showMoreButton={true}
                                        tabOptions={topMembers.tabOptions}
                                        getRankData={getTopMembersAction}
                                    />
                                )} */}
                                <ActiveClub />
                                {/* {mostActiveClubs && (
                                    <CommunityClubList
                                        heading={mostActiveClubs.sectionHeading}                                        
                                        clubList={mostActiveClubs.rankList}
                                        tabOptions={mostActiveClubs.tabOptions}
                                        getClubData={getMostActiveClubsAction} 
                                        showRowCount={3}                       
                                    />
                                )} */}
                                <TopStudents 
                                    onClickItem={setPublicCardStatusAction}
                                />
                                {/* {topStudents && (
                                    <RankCard
                                        heading={topStudents.sectionHeading}
                                        // rankList={[{rank: "1", gpPoints: "49088", text: "Serenity Henry", subText: "University of South Alabama"},
                                        //             {rank: "2", gpPoints: "49014", text: "Harold Russell", subText: "University of South Alabama"},
                                        //             {rank: "3", gpPoints: "46799", text: "Colleen Henry", subText: "University of South Alabama"},
                                        //             {rank: "4", gpPoints: "46034", text: "Tanya Pena", subText: "University of South Alabama"},
                                        //             {rank: "5", gpPoints: "45857", text: "Bruce Mccoy", subText: "University of South Alabama"},
                                        //             {rank: "6", gpPoints: "49088", text: "Serenity Henry", subText: "University of South Alabama"},
                                        //             {rank: "7", gpPoints: "49014", text: "Harold Russell", subText: "University of South Alabama"},
                                        //             {rank: "8", gpPoints: "46799", text: "Colleen Henry", subText: "University of South Alabama"},
                                        //             {rank: "9", gpPoints: "46034", text: "Tanya Pena", subText: "University of South Alabama"},
                                        //             {rank: "10", gpPoints: "45857", text: "Bruce Mccoy", subText: "University of South Alabama"},
                                        //             {rank: "11", gpPoints: "49125", text: "Serenity Henry", subText: "University of South Alabama"},
                                        //             {rank: "12", gpPoints: "48524", text: "Harold Russell", subText: "University of South Alabama"},
                                        //             {rank: "13", gpPoints: "46447", text: "Colleen Henry", subText: "University of South Alabama"},
                                        //             {rank: "14", gpPoints: "46984", text: "Tanya Pena", subText: "University of South Alabama"},
                                        //             {rank: "15", gpPoints: "45547", text: "Bruce Mccoy", subText: "University of South Alabama"}]}
                                        showRowCount={10}
                                        showMoreButton={true}
                                        getRankData={getTopStudentsAction}
                                        rankList={myRank.rankList}
                                        tabOptions={myRank.tabOptions}
                                    />
                                )} */}
                                <SchoolClub />
                                {/* {topSchoolClubs && (
                                    <CommunityClubList
                                        heading={topSchoolClubs.sectionHeading}                                        
                                        clubList={topSchoolClubs.rankList}
                                        tabOptions={topSchoolClubs.tabOptions}
                                        getClubData={getTopSchoolClubsAction} 
                                        showRowCount={3}    
                                    />
                                )} */}
                                
                            </div>                    
                        </div>
                    </div>
                )} 

              {showPublicProfile && (
                    <Popup
                    ariaHideApp={false}
                    isOpen={true}
                    style={customModalStylesPublicProfileCardBlueOverlay}
                    contentLabel="Public Profile"
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
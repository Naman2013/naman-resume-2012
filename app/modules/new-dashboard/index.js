import { Component, PureComponent } from "react";
import { DashboardHeader } from './components/breadcrumb-header/index';
import React, { useRef } from "react";
import './style.scss';
import { GravityActions } from "./components/gravity-actions";
import { DomainGP } from "./components/domain-gp";
import { Observatories } from "./components/observatories";
import { UpcomingMissionList }  from "./components/upcoming-mission-list";
import  PhotoHub  from "./components/photo-hub";
import { StarPartyList } from "./components/start-party-list";
import { ClubList } from "./components/club-list";
import { BookMark } from "./components/bookmark";
import { Spinner } from 'app/components/spinner/index';
import { SectionDivider } from "./components/section-divider";
import { ExploreObject } from "./components/explore-objects";
import { CommunityExploration } from "./components/community-exploration";
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
import { PublicProfileCard } from "./components/public-card";
import Popup from 'react-modal';
import { customModalStylesPublicProfileCardBlueOverlay } from 'app/styles/mixins/utilities';
import { TopCommunityObjects } from './components/object-list/top-objects';
import { TopCommunityObservations } from './components/object-list/top-observations';
import classnames from 'classnames';
import { Button } from "./components/button";
import { ProfileCard } from "./components/profile-card";


export class NewDashboard extends PureComponent{

    state={
        selectedBulletingHeader: "Explore the Universe",
        customerUUID: null,
        showPublicProfile: false,
        showRightbar: false,  
    }
    
    constructor(props){
        super(props)        
        this.missionref = React.createRef();  
        this.observatoryRef = React.createRef();  
        this.photoRef = React.createRef();  
        this.communityRef = React.createRef();  
        this.clubsRef = React.createRef(); 
        this.photoHubRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.getInitialData();
        setTimeout(()=>this.handleHashAnchor(this.props.location.hash),1000);    
    }

    componentWillReceiveProps(newProps){        
        if(this.props.location.hash !== newProps.location.hash)
            setTimeout(()=>this.handleHashAnchor(newProps.location.hash),100);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleHashAnchor = (hash) =>{
        switch(hash){
            case 0:                
                window.scrollTo(0, this.observatoryRef.current.offsetTop);
                break;
            case "#missions":
                window.scrollTo(0, this.missionref.current.offsetTop);
                break;
            case "#photos":
                window.scrollTo(0, this.photoRef.current.offsetTop);
                break;
            case 3:
                window.scrollTo(0, this.communityRef.current.offsetTop);
                break;
            case "#clubs":
                window.scrollTo(0, this.clubsRef.current.offsetTop);
        }
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
            case 4:
                window.scrollTo(0, this.clubsRef.current.offsetTop);
                break;
        }  
        // this.setState({selectedBulletingHeader: heading});
    }

    refreshPhotoHub = () =>{
        this.photoHubRef.handleApplyFilter();
    }

    getInitialData = () => {
        const { 
                getUserGravityDataAction,
                getMyClubListDataAction, 
                getBookmarkListDataAction, 
                getPrivateProfileDataAction, 
                getPrivateProfileMissionDataAction,
                getQuestMapControlAction,
                setDock,                
                getPhotoHubHeadingAction,
            } = this.props;   

        // getPrivateProfileDataAction();
        getUserGravityDataAction();
        // getPrivateProfileMissionDataAction();
        
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
        getQuestMapControlAction();        
        getPhotoHubHeadingAction();
        setDock(true);
    };
    
    getSortedObsList = (obsList) =>{        
        return obsList.sort((a, b) => a.dashboardObsIndex > b.dashboardObsIndex ? 1 : -1);        
    }

    render(){
    
        const { privateProfile,                 
                upcomingStarPartyList,                
                photoHub,                 
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
                reserveCommunityMission,                
                reservedCommunityMissionData,
                reservedCommunityMission,
                user,
                getMissionImagesDataAction,
                getGalleryListDataAction,
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
                pubnubData,
                sendMessage,
                setDock, 
                setTab, 
                unSubscribePubnub,
                pubnubInit,
                getActivityFeedMembers,
                setMemberChatState,               
                setPublicCardStatusAction,
                photoHubHeadings,
                userGravityStatus,      
                validateResponseAccess,          
              } =this.props;

              const { showRightbar } = this.state;            
            
        return(
            <div>
                <Spinner loading={isFetching} />               
                    <div className="new-dash">
                        <div className="left">
                            
                            <DashboardHeader
                                showRightbar={showRightbar}                                
                                changeStatus={()=>this.setState({showRightbar: !showRightbar})}
                                scrollToRef={this.scrollToRef}                                                              
                            />                             
                            <div className="left-contents">

                                {userGravityStatus && (
                                    <div className="mobile-profile">
                                        <ProfileCard
                                            showRightButton={true}
                                            showLeftBuuton={false}
                                            userGravityStatus={userGravityStatus}
                                            changeStatus={()=>this.setState({showRightbar: !showRightbar})}
                                        />
                                        <SectionDivider/>
                                    </div>
                                )}                                
                                
                                

                                <TitleHeaderNew                                    
                                    heading = {"Explore the Universe"}
                                    subHeading = {"Discover and Observe"}
                                />

                                <ExploreObject
                                    questMapControls={questMapControls}
                                    objectMapControls={objectMapControls}
                                    getObjectMapControl={getObjectMapControlAction}
                                    getQuestMapControl={getQuestMapControlAction}
                                    scrollToRef={this.scrollToRef}
                                    refreshPhotoHub={this.refreshPhotoHub}
                                    validateResponseAccess={validateResponseAccess}
                                />                          
                                
                               
                                <SectionDivider/>

                                <div ref={this.observatoryRef}/>
                                {observatoryList && (
                                    <Observatories                                                                               
                                        getWeatherDataAction={getWeatherDataAction}                                        
                                        list={this.getSortedObsList(observatoryList.observatoryList)}                                        
                                        getSkyData={getSkyAction}
                                        wxList={weatherStatus}
                                        skyConditions={skyConditions}
                                        getNewDashObs={getNewDashObsAction}
                                        obsWidgetData={obsWidgetData}
                                        getObsStatus={getObsStatusAction}
                                        obsStatus={obsStatus}
                                        validateResponseAccess={validateResponseAccess}
                                    />
                                )}
                                
                                
                                <SectionDivider/>

                                <div id="missions" ref={this.missionref}/>
                                
                                    <div>
                                        <UpcomingMissionList                                            
                                            piggyBackMissionSlot={piggyBackMissionSlot}
                                            piggybackReservedMissionData={piggybackReservedMissionData}
                                            piggybackReservedMission={piggybackReservedMission}
                                            cancelReservation={cancelReservation}
                                            cancelPiggyback={cancelPiggyback}
                                            grabPiggyback={grabPiggyback}
                                            reservePiggyback={reservePiggyback}                                            
                                            reserveCommunityMission={reserveCommunityMission}                                            
                                            reservedCommunityMissionData={reservedCommunityMissionData } 
                                            reservedCommunityMission={reservedCommunityMission}
                                            user={user}      
                                            validateResponseAccess={validateResponseAccess}                                                                              
                                        />                                        
                                    </div>
                               
                                
                                
                                <SectionDivider/>

                                <div ref={this.photoRef}/>
                                {photoHubHeadings && (
                                    <PhotoHub
                                        onRef={ref => (this.photoHubRef = ref)}                                        
                                        heading={photoHubHeadings.sectionHeading}       
                                        sectionHeadingLabel={photoHubHeadings.sectionHeadingLabel} 
                                        headerlist={photoHubHeadings.tabOptions} 
                                        defaultTabIndex={photoHubHeadings.defaultTabIndex}
                                        headerspaceequally={false}
                                        photoHub={photoHub}
                                        getMyPictures={getMyPicturesDataAction}                                    
                                        getMissionImages={getMissionImagesDataAction}
                                        getGalleryList={getGalleryListDataAction}                                                                       
                                        canUploadPhotos={photoHubHeadings.canUploadPhotos}
                                        validateResponseAccess={validateResponseAccess}
                                    />
                                )}
                                

                                <SectionDivider/>

                                <div ref={this.communityRef}/>    
                                {/* <TitleHeader
                                    
                                    heading = {"Community"}
                                    // subHeading = {"Latest Community Insights"}
                                /> */}

                                {/* {communityExploration && ( */}
                                    <CommunityExploration
                                        scrollToRef={this.scrollToRef}
                                        onClickItem={setPublicCardStatusAction}
                                        validateResponseAccess={validateResponseAccess}
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
                                <div ref={this.clubsRef}/>
                                {myClubList && (
                                    <ClubList
                                        heading={"Clubs"}
                                        showExploreClubs={true}
                                        // clubList={[{name: "Ad Astra", type: "Public Community", info: "Admin: Paul Cox | 684 Members"},
                                        //             {name: "Astronomy for the Soul", type: "Public Community", info: "Admin: Paul Cox | 684 Members"},]}
                                        clubList={myClubList.groupsList}
                                        totalClubsCount={myClubList.totalClubsCount}
                                        getClubList={getMyClubListDataAction}
                                        data={{groupControls: myClubList.groupControls}}

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
                        <div className={classnames('right', {'show': showRightbar})}>
                            <div className="mar-left-right-16">

                                {userGravityStatus && (
                                    <ProfileStatus 
                                        showRightButton={false}
                                        showLeftBuuton={true}
                                        userGravityStatus={userGravityStatus}
                                        changeStatus={()=>this.setState({showRightbar: !showRightbar})}
                                        scrollToRef={this.scrollToRef}
                                        refreshPhotoHub={this.refreshPhotoHub}
                                    />
                                )}                                
                                 
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
                                        validateResponseAccess={validateResponseAccess}
                                        // gravityList={recentGravityAction.actions}
                                    />
                                {/* )} */}
                                
                                <ActiveObject 
                                    validateResponseAccess={validateResponseAccess}
                                />
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
                                <PopularObservation 
                                    validateResponseAccess={validateResponseAccess}
                                />
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
                                    <DomainGP 
                                        validateResponseAccess={validateResponseAccess}
                                    />
                                {/* )} */}
                                
                                <MyRank 
                                    onClickItem={setPublicCardStatusAction}
                                    validateResponseAccess={validateResponseAccess}
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
                                <CommunityFame 
                                    validateResponseAccess={validateResponseAccess}
                                />

                                <TopCommunityObjects 
                                    validateResponseAccess={validateResponseAccess}
                                />

                                <TopCommunityObservations 
                                    validateResponseAccess={validateResponseAccess}
                                />

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
                                    validateResponseAccess={validateResponseAccess}
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
                                <ActiveClub 
                                    validateResponseAccess={validateResponseAccess}
                                />
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
                                    validateResponseAccess={validateResponseAccess}
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
                                <SchoolClub 
                                    validateResponseAccess={validateResponseAccess}
                                />
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
               

              {/* {showPublicProfile && (
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
                )}                       */}
            </div>
        );
    }
}
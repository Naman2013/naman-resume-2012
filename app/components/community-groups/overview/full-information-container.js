
/***********************************
 * V4 Community Group Overview Full Overview Layout
 *
 *
 *
 ***********************************/

 import React, { Component } from 'react';
 import PropTypes from 'prop-types';
 import { withTranslation } from 'react-i18next';
 import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux';
 import { fetchGroupMembers } from 'app/modules/community-group-overview/actions';
 import { validateResponseAccess } from 'app/modules/authorization/actions';
 import Pagination from 'app/components/common/pagination/v4-pagination/pagination';
 
 
 import DiscussionsBoard from 'app/components/common/DiscussionsBoard';
 import DiscussionBoardInvitationsPanel from 'app/components/community-groups/overview/DiscussionBoardInvitationsPanel';
 import DiscussionBoardGoogleClassroomStudentsPanel from 'app/components/community-groups/overview/DiscussionBoardGoogleClassroomStudentsPanel';
 import { GroupsContainer } from 'app/pages/community-groups/groups-container';
 import ObjectDetailsObservations from 'app/containers/object-details/ObjectDetailsObservations';
 import Members from 'app/containers/members';
 //import GroupMemberListSort  from 'app/components/community-groups/overview/members-list-sort'
 import MembersListSort from './members-list-sort';
 
 import MembersList from './members-list';
 import { TopThreads } from '../../../modules/clubs';
 import { createActivity } from '../../../modules/community-group-activity-list/actions';
 import './full-information-style.scss';
 //import {fetchInvitePopupContent} from '../../../app/modules/community-group-overview/actions';
 import {fetchInvitePopupContent,fetchGroupInvitationPanel,addExistingUser,addGoogleUser,fetechRestoreMember,fetchArchiveMember} from '../../../../app/modules/community-group-overview/actions';
 import validateUser from 'app/route-functions/validateUser';
 
 const { arrayOf, bool, func, number, shape, string } = PropTypes;
 const mapStateToProps = ({ communityGroupOverview, user }) => (
   {
   ...communityGroupOverview,
   user,
   invitePopupContent: communityGroupOverview.invitePopupContent,
   isInvitePopupFetching:communityGroupOverview.invitePopupContentFetching,
   
 });
 
 const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(
     {
       createActivity,
       fetchGroupMembers,
       validateResponseAccess,
       fetchInvitePopupContent,
       fetchGroupInvitationPanel,
       fetechRestoreMember,
       fetchArchiveMember,
       addExistingUser,
       addGoogleUser
     },
     dispatch
   ),
 });
 
 @connect(
   mapStateToProps,
   mapDispatchToProps
 )
 @withTranslation()
 class FullInformationOverview extends Component {
   static propTypes = {
     description: string,
     descriptionHeading: string,
     detailsHeading: string,
     detailsList: shape({}),
     context: shape({
       isDesktop: bool,
       isTablet: bool,
       isMobile: bool,
     }),
     heading: string,
     pageMeta: shape({
       canPost: bool,
       canSeeGroupContent: bool,
       topicId: number,
     }),
     joinOrLeaveGroup: func.isRequired,
     fetchInvitePopupContent:func.isRequired,
     fetechRestoreMember:func.isRequired,
     fetchArchiveMember:func.isRequired,
     joinPrompt: string,
     membersCount: number,
     membersSort: string.isRequired,
     membersList: arrayOf(shape({})),
     showJoinPrompt: bool,
     jumpToThreadId: number,
     subMenus: {
       name: string,
       link: string,
     },
   };
 
   static defaultProps = {
     detailsList: {},
     description: '',
     descriptionHeading: '',
     detailsHeading: '',
     context: {},
     heading: '',
     pageMeta: {
       canPost: false,
       canSeeGroupContent: false,
       topicId: null,
     },
     joinPrompt: '',
     showJoinPrompt: false,
     membersCount: 0,
     membersList: [],
     jumpToThreadId: null,
     subMenus: [],
   };
 
   state = {
     activePage: 1,
     sortBy: 'rankDESC'
   };
 
   handlePageChange = ({ activePage }) => {
 
     const { discussionGroupId, actions } = this.props;
     const { sortBy } = this.state;
 
     actions.fetchGroupMembers({ discussionGroupId, callSource: 'clubLeaders', page: activePage, sortBy: sortBy });
     this.setState({
       activePage: activePage
     })
     this.membersContainer.scrollIntoView();
   };
 
   getDataTroughSortBy = (value) => {
   
     const { actions ,canEditGroup} = this.props;
     if(canEditGroup){
       actions.fetchGroupInvitationPanel(value)
     }else{
       actions.fetchGroupMembers(value);
     }
     this.setState({
       sortBy: value.sortBy,
       activePage: value.activePage
     })
 
   }
 
   componentDidMount(){
     
     const { canEditGroup,discussionGroupId ,actions} = this.props;
     if(!canEditGroup){
      let customerStatus ='ALL'
     actions.fetchGroupInvitationPanel({discussionGroupId,customerStatus})
 
     }
 
 
   }
 
   render() {
     const {
       actions,
       discussionGroupId,
       context,
       pageMeta,
       joinOrLeaveGroup,
       membersCount,
       membersList,
       membersSort,
       leadersList,
       showJoinPrompt,
       refreshHeader,
       user,
       t,
       isEditMode,
       jumpToThreadId,
       subMenus,
       observationsTabCustomClass,
       params,
       hideTitleSection,
       location,
       invitePopupContent,
       isInvitePopupFetching,
       canEditGroup,
       groupInformation,
       actions:{addExistingUser,addGoogleUser}
       
 
     } = this.props;
 
    
 
     if(groupInformation){
       if(groupInformation.customerLinksData){
         var {customerLinks} = groupInformation.customerLinksData;
       }
       groupInformation.customerLinksData
     }
     
     
     console.log('customerLinks=>',customerLinks);
     console.log('membersList=>',membersList);
     const {
       activePage,
     } = this.state;
     
     const createThreadFormParams = {
       canPost: pageMeta.canPost,
       forumId: pageMeta.forumId,
       joinOrLeaveGroup,
       showJoinPrompt,
       topicId: pageMeta.topicId,
       canSeeGroupContent: pageMeta.canSeeGroupContent,
       user,
     };
 
     return (
       <div className="root">
         {pageMeta.canEditGroup &&
           isEditMode &&
           pageMeta.isGoogleClassroom === false && (
             <DiscussionBoardInvitationsPanel
               {...this.props}
               refreshHeader={refreshHeader}
             />
           )}
         {pageMeta.canEditGroup &&
           isEditMode &&
           pageMeta.isGoogleClassroom === true && (
             <DiscussionBoardGoogleClassroomStudentsPanel
               {...this.props}
               refreshHeader={refreshHeader}
             />
           )}
 
 
         <GroupsContainer
           subMenus={subMenus}
           context={context}
           params={params}
           discussionsContent={
             <DiscussionsBoard
               errorMessage={t('Clubs.FetchingListError')}
               topicId={pageMeta.topicId}
               forumId={pageMeta.forumId}
               callSource="groups"
               createThread={actions.createActivity}
               createThreadFormParams={createThreadFormParams}
               user={user}
               validateResponseAccess={actions.validateResponseAccess}
               discussionGroupId={discussionGroupId}
               jumpToThreadId={jumpToThreadId}
               canSeeGroupContent={pageMeta.canSeeGroupContent}
               isClub
               canSubmitReplies={pageMeta.canSubmitReplies}
               canPost={pageMeta.canPost}
             />
           }
           membersContent={
             <div>
               <MembersList
                 membersSort={membersSort}
                 membersList={membersList}
                 membersCount={membersCount}
                 leadersList={leadersList}
                 discussionGroupId={discussionGroupId}
                 fetchGroupMembers={actions.fetchGroupMembers}
                 isDesktop={context.isDesktop}
                 fetchInvitePopupContent={actions.fetchInvitePopupContent}
                 invitePopupContent={invitePopupContent}
                 isInvitePopupFetching={isInvitePopupFetching}
                 canEditGroup={canEditGroup}
               />
               <div className="popular-discussion-wrapper">
                 <TopThreads
                   topicId={pageMeta.topicId}
                   isDesktop={context.isDesktop}
                   discussionGroupId={discussionGroupId}
                 />
               </div>
             </div>
           }
           observationsContent={
             <ObjectDetailsObservations
               params={params}
               hideTitleSection={hideTitleSection}
               customClass={observationsTabCustomClass}
             />
           }
           newMember={
             <>
               <div
                 className="sorting-bar"
                 ref={node => {
                   this.membersContainer = node;
                 }}
               ></div>
               <Members
                 list={canEditGroup ? customerLinks :membersList}
                 discussionGroupId={discussionGroupId}
                 onPageChange={this.getDataTroughSortBy}
                 context={context}
                 leadersList={leadersList}
                 theme={{ marginLeft: 0 }}
                 fetchInvitePopupContent={actions.fetchInvitePopupContent}
                 fetechRestoreMember={actions.fetechRestoreMember}
                 fetchArchiveMember={actions.fetchArchiveMember}
                 invitePopupContent={invitePopupContent}
                 isInvitePopupFetching={isInvitePopupFetching}
                 canEditGroup={canEditGroup}
                 groupInformation={groupInformation}
                 pageMeta = {pageMeta}
                 addExistingUser={addExistingUser}
                 addGoogleUser={addGoogleUser}
                 t={t}
               
 
               />
               {membersCount && activePage ? (
                 <div
                   className="members-pagination"
                 //key={`discussion-pagination-${topicId}-${jumpToThreadId}`}
                 >
                   <Pagination
                     pagesPerPage={4}
                     activePage={activePage}
                     onPageChange={this.handlePageChange}
                     totalPageCount={Math.ceil(membersCount / 10)}
                   />
                 </div>
 
               ) : null}
               <div></div>
             </>
           }
 
         />
       </div>
     );
   }
 }
 
 export default FullInformationOverview;
 
 
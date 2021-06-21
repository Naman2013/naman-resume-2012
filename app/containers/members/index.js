import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import {
  SORT_AZ,
  SORT_ZA,
  SORT_DATE,
  RANK_ASC,
  RANK_DESC
} from 'app/modules/community-group-overview/actions';
import Popup from 'react-modal';
import Btn from 'app/atoms/Btn';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';




import { PublicProfileCard } from 'app/modules/new-dashboard/components/public-card';
import { customModalStylesPublicProfileCardBlueOverlay } from 'app/styles/mixins/utilities';
import MemberListCard from 'app/components/community-groups/overview/members-list-card';
import styles from 'app/components/community-groups/overview/members-list.style';
import { Modal } from '../../../app/components/modal/index';
import DiscussionBoardInviteNewMemberToSlooh from '../../../app/components/community-groups/overview/DiscussionBoardInviteNewMemberToSlooh';
import {ConfirmationPopUp} from '../../../app/components/common/ToggleJoinGroup/common/ConfirmationPopUp'

class Members extends Component {

  constructor(props) {  isInviteOn: false
    super(props)
    this.state = {
      sortValue: 'rankDESC',
      popupVal: false,
      popUpListData: '',
      customerUUID: '',
      isInviteOn: false,
      filterValue:'',
      searchIteam:'',
      setReset:false,
      showModal: false
    }
  }

  handleSearchEnterPress = e => {
    
    this.setState({
      searchIteam:e.target.value.trim(),
      setReset:false
    })
    if (e.keyCode == 13) {
      this.searchByValue();
      
    }
  };


  searchByValue = () =>{
    const { onPageChange, discussionGroupId } = this.props;
    const {filterValue,sortValue,searchIteam}=this.state;
    if(searchIteam){
      onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1 ,customerStatus:filterValue,searchTerms:searchIteam})
     this.setState({
      setReset:true
    })
    } 
  }

  resetSearch = () =>{
    this.searchInput.value = '';
  
    const { onPageChange, discussionGroupId } = this.props;
    const {filterValue,sortValue,searchIteam}=this.state;

      onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1 ,customerStatus:filterValue,searchTerms:''})

      this.setState({ 
        setReset:false,
        searchIteam:'',
      })
    
  }


 
  refreshPage = (member) =>{
    const { onPageChange, discussionGroupId,pageMeta,addExistingUser,addGoogleUser} = this.props;
    const {filterValue,searchIteam,sortValue}=this.state;

    let user = {
      firstName: member.firstname,
      lastName: member.lastname,
      emailAddress: member.emailaddress,
    };

    if (!pageMeta.isGoogleClassroom) {
      addExistingUser(user, discussionGroupId);
    } else {
      user = { ...user, googleProfileId: member.googleprofileid };
      addGoogleUser(user, discussionGroupId);
    }

    onPageChange({ discussionGroupId, sortBy:sortValue, activePage: 1,customerStatus:filterValue,searchTerms:searchIteam})

    /* console.log('kkkkkkkkkkkkkbbbbb');
    onAddClick(values).then(()=>
      console.log('kkkkkkkkkkkkk'),
      onPageChange({ discussionGroupId, sortBy:sortValue, activePage: 1,customerStatus:filterValue,searchTerms:searchIteam})
    ); */
  }

  sortByValue = (sortValues) => {
    const { onPageChange, discussionGroupId } = this.props;
    const {filterValue,searchIteam}=this.state;

    onPageChange({ discussionGroupId, sortBy:sortValues.sortBy, activePage: 1,customerStatus:filterValue,searchTerms:searchIteam})

    this.setState({
      sortValue: sortValues.sortBy,
      //filterValue:sortValues.filterBy
    })

  }

  sortByFilter = (filterValue) => {

    const { onPageChange, discussionGroupId } = this.props;
    const {sortValue,searchIteam}=this.state;

    onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1 ,customerStatus:filterValue.filterBy,searchTerms:searchIteam})

    this.setState({
      filterValue: filterValue.filterBy
    })
  }

  openPopup = (PopupValue) => {
    this.setState({
      popupVal: true,
      popUpListData: PopupValue,
      customerUUID: PopupValue.data.customerUUID

    })
  }

  closePopup = () => {
    this.setState({
      popupVal: false,
      popUpListData: ''
    })
  }

  onInviteClick = () => {
    const {
      fetchInvitePopupContent,
      discussionGroupId
    } = this.props;
    fetchInvitePopupContent(discussionGroupId);
    this.setState({ isInviteOn: true });
  };

  toggleGroup = () =>{
    this.setState(() => ({
      showModal: false
    }));
  }

  openModal = () => {

    this.setState(() => ({
      showModal: true
    }));
    /* if(value==='Leave Club'){

      this.setState(() => ({
        showModal: true
      }));
    }else{
      this.toggleGroup(true)
    } */
  }


  render() {
    const { list, context: { isDesktop }, leadersList, theme, invitePopupContent, isInvitePopupFetching, discussionGroupId,canEditGroup ,t,groupInformation:{customerLinksData},onAddClick} = this.props;
   const { sortValue, popupVal, popUpListData, customerUUID, isInviteOn,setReset,searchIteam,showModal } = this.state;
    let sortIcon = 'https://vega.slooh.com/assets/v4/dashboard-new/clubs/sort.png';
    let sortUp = 'https://vega.slooh.com/assets/v4/dashboard-new/clubs/sort-up--v2.png';
    let sortDownp = 'https://vega.slooh.com/assets/v4/dashboard-new/clubs/sort-down--v2.png';

    const style = {
      tableRowPadding: {
        padding: 15,
        width: 'auto',
        textAlign: 'center',
        fontSize: 14
      },
      filterDesign:{
        display: 'inline-flex',
        paddingTop: '25px',
        flexWrap: 'wrap',
        gap: '8rem',
        paddingLeft: '15px'
      },
      commentsBar:{
       
        //textTransform: 'uppercase',
        color: '#415671',
        backgroundColor:' #ffffff',
        fontWeight: '500',
        padding: '15px',
        boxShadow: '0px 0px 5px 0px rgb(88 88 88 / 50%)',
        display:'flex',
        margin:'5px'
      },
      commentSearch:{
        marginRight: '15px',
        backgroundColor: '#f2f2f2',
        borderRadius: '4px',
        border: '0',
        boxShadow: 'inset 0 0 7px 0 #ced2d8',
        fontFamily: 'adobe-garamond-pro, serif',
        fontSize: '16px',
        padding:'10px',
        width:'100%'
      },
      radioButtonDesign:{
        transform: 'scale(1.4)'
      }

      

    }
    const showSearchTermResultHeading =false;
    return (
      <>
        {!isDesktop && (
          <div className="members-list" style={theme}>
            <div className="members-container">
              <div>
                {leadersList && leadersList.map(x => <MemberListCard {...x} />)}
              </div>
            </div>
            <style jsx>{styles}</style>
          </div>
        )}

        <Row style={style.commentsBar} className='mb-3'>
        <Col lg={5} md={5} sm={5}>
        <h4 className='pt-3'>Your Members</h4>
          {/*  <div className="">
                    <h2 className="">
                      Your Members
                          </h2>
                    <p className="community-group-edit-hero-unit">
                            {customerLinksData &&
                              groupInformation.customerLinksData &&
                              groupInformation.customerLinksData
                                .sectionHeading_LicenseInfo}
                          </p> 
                  </div> */}

                </Col>
                <Col lg={4} md={4} sm={4} className='mt-3'>
                <p className="community-group-edit-hero-unit">
                   { customerLinksData && customerLinksData.sectionHeading_LicenseInfo && (
                    customerLinksData.sectionHeading_LicenseInfo
                  )
                  }
                </p>
                </Col>
                <Col
                  lg={3}
                  md={3}
                  sm={3}
                >
                   <Button onClick={() =>this.onInviteClick()}>
                   Invite <i className="fa fa-plus" />
                   </Button>
                  {/* <Btn
                    onClick={this.onInviteClick}
                    className=""
                  >
                    Invite
                          <i className="fa fa-plus" />
                  </Btn> */}
                  </Col>
        </Row>


        {canEditGroup &&(
        <Row style={style.commentsBar}>
                  <Col  md={3} >
                  <h4 className='pt-3'>Members</h4>
                  </Col>
                  <Col md={6}>
                  <input
                    placeholder="Search"
                    style={style.commentSearch}
                    ref={node => {
                      this.searchInput = node;
                    }}
                  onKeyUp={this.handleSearchEnterPress}
                  />
                  </Col>
                  <Col md={3} >

                    {/* showSearchTermResultHeading */ setReset ? (
                    <Button onClick={()=>this.resetSearch()}>
                      
                    {t('AskAnAstronomer.Reset')}
                   </Button>
                 ) : (
                   <Button onClick={() =>this.searchByValue()}>
                     
                     {t('Clubs.Search')}
                   </Button>
                 )}
                  </Col>

                  <div style={style.filterDesign}>
          <div className='h4'>Filter By:</div>
          <div>
            <input style={style.radioButtonDesign} name='memberFilter' type='radio' onClick={()=>this.sortByFilter({filterBy:'ALL'})}></input><span className='p-3 h4'>All</span>
            </div>
            <div>
          <input style={style.radioButtonDesign} name='memberFilter' type='radio' onClick={()=>this.sortByFilter({filterBy:'Accepted'})}></input> <span className='p-3 h4'>Active</span>
            </div>
          <div>
          <input style={style.radioButtonDesign} name='memberFilter' type='radio' onClick={()=>this.sortByFilter({filterBy:'Sent'})}></input> <span className='p-3 h4'>Invited</span>
            </div>
          <div>
          <input style={style.radioButtonDesign} name='memberFilter'  type='radio' onClick={()=>this.sortByFilter({filterBy:'Archived'})}></input> <span className='p-3 h4'>Archived</span>
          </div>
        </div>
        </Row>
        )}
       
       
      
        <Modal
          show={isInviteOn}
          onHide={() => this.setState({ isInviteOn: false })}
        >
          <DiscussionBoardInviteNewMemberToSlooh
            invitePopupContent={invitePopupContent}
            isFetching={isInvitePopupFetching}
            newInvitationComplete={() => {
              this.setState({ isInviteOn: false });
              const {
                routeParams: { groupId },
                fetchGroupInvitationPanel,
                fetchGoogleClassroomStudentsPanel,
                communityGroupOverview: {
                  pageMeta: { isGoogleClassroom },
                },
              } = this.props;

              this.refreshPage();
            }}
            discussionGroupId={discussionGroupId}
          />
        </Modal>

     
        <Table striped bordered hover>
          <thead>
            <tr style={style.tableRowPadding}>
            <th>ADD TO CLUB
              </th>
              <th onClick={() => {
                this.sortByValue({ sortBy: sortValue == 'ztoa' ? SORT_AZ : SORT_ZA })
              }}>NAME
              {sortValue == 'ztoa' || sortValue == 'atoz' ? sortValue == 'ztoa' ? <img src={sortDownp} /> : <img src={sortUp} /> : <img src={sortIcon} />}

              </th>
              <th onClick={() => {
                this.sortByValue({ sortBy: sortValue == 'rankDESC' ? RANK_ASC : RANK_DESC })
              }}>Status
             
              </th>
              <th onClick={() => {
                this.sortByValue({ sortBy: sortValue == 'rankDESC' ? RANK_ASC : RANK_DESC })
              }}>GP
              {sortValue == 'rankASC' || sortValue == 'rankDESC' ? sortValue == 'rankDESC' ? <img src={sortDownp} /> : <img src={sortUp} /> : <img src={sortIcon} />}
              </th>
              <th onClick={() => {
                this.sortByValue({ sortBy: sortValue == 'rankDESC' ? RANK_ASC : RANK_DESC })
              }}>Last Action
              
              </th>
            </tr>
          </thead>
          <tbody>
            {list && list.map((listData) => {
              return (
                <tr /* onClick={() => {
                  this.openPopup({ data: listData })
                }} */  >



                  <td style={style.tableRowPadding}>{listData.showAddButton ?<Button onClick={()=>this.refreshPage(listData)}>{listData.invitationPrompt}</Button>:null} {listData.showArchiveButton ? <Button onClick={()=>this.openModal()}>{listData.archiveButtonText}</Button>:null}</td>
                  <td style={style.tableRowPadding}>{listData.displayName}</td>
                  <td style={style.tableRowPadding}>{listData.InvitationStatus}</td>
                  <td style={style.tableRowPadding}>{listData.InvitationStatus == 'Sent' || listData.InvitationStatus == 'Viewed' ? '-':listData.gravity}</td>
                  <td style={style.tableRowPadding}>{listData.lastactivity}</td>


                </tr>
              )
            })}
          </tbody>
        </Table>

        {popupVal && (
          <Popup
            ariaHideApp={false}
            isOpen={true}
            style={customModalStylesPublicProfileCardBlueOverlay}
            contentLabel="Public Profile"
            shouldCloseOnOverlayClick={false}
            onRequestClose={this.closePopup}
          >
            <PublicProfileCard
              customerUUID={customerUUID}
              onClose={this.closePopup}
            />
          </Popup>
        )}
        {showModal /* && text ==='Leave Club' */ && (
          <ConfirmationPopUp content='Are you want to archive' showModal={showModal} closeModal={this.toggleGroup} ></ConfirmationPopUp>
        )}
      </>

    );
  }
}
export default Members;






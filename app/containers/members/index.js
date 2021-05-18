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

class Members extends Component {

  constructor(props) {  isInviteOn: false
    super(props)
    this.state = {
      sortValue: 'rankDESC',
      popupVal: false,
      popUpListData: '',
      customerUUID: '',
      isInviteOn: false,
      filterValue:''
    }
  }


  sortByValue = (sortValues) => {

   

    const { onPageChange, discussionGroupId } = this.props;
    const {filterValue}=this.state;

    onPageChange({ discussionGroupId, sortBy:sortValues.sortBy, activePage: 1,customerStatus:filterValue})

    this.setState({
      sortValue: sortValues.sortBy,
      //filterValue:sortValues.filterBy
    })

  }

  sortByFilter = (filterValue) => {

    const { onPageChange, discussionGroupId } = this.props;
    const {sortValue}=this.state;

    onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1 ,customerStatus:filterValue.filterBy})

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

  render() {
    const { list, context: { isDesktop }, leadersList, theme, invitePopupContent, isInvitePopupFetching, discussionGroupId } = this.props;



    const { sortValue, popupVal, popUpListData, customerUUID, isInviteOn } = this.state;
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
        display:'flex',
        justifyContent:'space-around',
        padding:'1rem'
      },
      commentsBar:{
       
        textTransform: 'uppercase',
        color: '#415671',
        backgroundColor:' #ffffff',
        fontWeight: '500',
        padding: '15px',
        boxShadow: '0px 0px 5px 0px rgb(88 88 88 / 50%)',
        display:'flex'
      },
      commentSearch:{
        marginRight: '15px',
        backgroundColor: '#f2f2f2',
        borderRadius: '4px',
        border: '0',
        boxShadow: 'inset 0 0 7px 0 #ced2d8',
        fontFamily: 'adobe-garamond-pro, serif',
        fontSize: '16px',
        padding:'10px'


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

        <Row>
          <Col>
          <div className="community-group-edit-header i-box i-box-white mb-3">
          <Row noGutters>
            <Col lg={7} md={7} sm={7}>
              <div className="flex-row justify-content-between align-items-center pad-20-40">
                <h2 className="community-group-edit-title">
                  Your Members
                      </h2>
                {/*  <p className="community-group-edit-hero-unit">
                        {groupInformation &&
                          groupInformation.customerLinksData &&
                          groupInformation.customerLinksData
                            .sectionHeading_LicenseInfo}
                      </p> */}
              </div>
            </Col>
            <Col
              lg={5}
              md={5}
              sm={5}
              className="flex-row justify-content-between border-left"
            >
              <Btn
                onClick={this.onInviteClick}
                className="margin-auto width-140 justify-content-between"
              >
                Invite
                      <i className="fa fa-plus" />
              </Btn>
            </Col>
          </Row>
            </div>
          </Col>
          <Col>
        <div  style={style.commentsBar}>
          <Row>
            <Col>
            <h4 className='pt-3'>Members</h4>
            </Col>
            <div>
            <input
              placeholder="Search"
              style={style.commentSearch}
              ref={node => {
                this.searchInput = node;
              }}
             // onKeyUp={this.handleSearchEnterPress}
            />
            {showSearchTermResultHeading ? (
              <Button onClick={this.resetSearch}>
              {/*  {t('AskAnAstronomer.Reset')} */}
              </Button>
            ) : (
              <Button onClick={() => this.getThreads(this.props)}>
                Search
              {/*   {t('Clubs.Search')} */}
              </Button>
            )}
          </div>
          
          </Row>
        </div>
          </Col>
        </Row>
       
       
       


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

        <div style={style.filterDesign}>
          <div>Filter By:</div>
          <div>
            <input name='memberFilter' type='radio' onClick={()=>this.sortByFilter({filterBy:'ALL'})}></input>
            All
            </div>
            <div>
          <input name='memberFilter' type='radio' onClick={()=>this.sortByFilter({filterBy:'Accepted'})}></input>
            Active
            </div>
          <div>
          <input name='memberFilter' type='radio' onClick={()=>this.sortByFilter({filterBy:'Sent'})}></input>
            Invited
            </div>
          <div>
          <input name='memberFilter'  type='radio' onClick={()=>this.sortByFilter({filterBy:'Archived'})}></input>
          Archived
          </div>

        </div>
        <Table striped bordered hover>
          <thead>
            <tr style={style.tableRowPadding}>
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
                <tr onClick={() => {
                  this.openPopup({ data: listData })
                }}  >
                  <td style={style.tableRowPadding}>{listData.displayName}</td>
                  <td style={style.tableRowPadding}>jjjjjjj</td>
                  <td style={style.tableRowPadding}>{listData.gravity}</td>
                  <td style={style.tableRowPadding}>jjjjjjj</td>


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
      </>

    );
  }
}
export default Members;






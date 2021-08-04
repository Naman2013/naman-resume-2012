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
import { ConfirmationPopUp } from '../../../app/components/common/ToggleJoinGroup/common/ConfirmationPopUp'

class Members extends Component {

  constructor(props) {
    isInviteOn: false
    super(props)
    this.state = {
      sortValue: 'rankDESC',
      popupVal: false,
      popUpListData: '',
      customerUUID: '',
      customerEmail: '',
      isInviteOn: false,
      filterValue: 'ALL',
      searchIteam: '',
      setReset: false,
      showModal: false,
      showTextOnPopUp: '',
      callApiArchiveOrActivate: '',
      currentRowData: '',
      showInvitePopUP: false,
    }
  }

  confirmArchive = () => {

    const { currentRowData: customerUUID } = this.state;

    const { fetchArchiveMember, discussionGroupId } = this.props;
    fetchArchiveMember(customerUUID).then((data) => {

      if (data.type == 'FETCH_ARCHIVE_SUCCESS') {
        this.resetSearch();
      }
    })
  }

  confirmActivate = () => {
    const { fetechRestoreMember, discussionGroupId } = this.props;
    const { currentRowData: emailaddress } = this.state;
    fetechRestoreMember(emailaddress).then((data) => {
      if (data.type == 'FETCH_RESTORE_SUCCESS') {
        this.resetSearch();
      }
    })
  }

  handleSearchEnterPress = e => {

    this.setState({
      searchIteam: e.target.value.trim(),
      setReset: false
    })
    if (e.keyCode == 13) {
      this.searchByValue();

    }
  };


  searchByValue = () => {
    const { onPageChange, discussionGroupId } = this.props;
    const { filterValue, sortValue, searchIteam } = this.state;
    if (searchIteam) {
      onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1, customerStatus: filterValue, searchTerms: searchIteam })
      this.setState({
        setReset: true
      })
    }
  }

  resetSearch = () => {

    this.searchInput.value = '';

    const { onPageChange, discussionGroupId } = this.props;
    const { filterValue, sortValue, searchIteam } = this.state;

    onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1, customerStatus: filterValue, searchTerms: '' })

    this.setState({
      setReset: false,
      searchIteam: '',
      isInviteOn: false
    })

  }



  refreshPage = (member) => {

    const { onPageChange, discussionGroupId, pageMeta, addExistingUser, addGoogleUser } = this.props;
    const { filterValue, searchIteam, sortValue } = this.state;

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

    onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1, customerStatus: filterValue, searchTerms: searchIteam })

    /* console.log('kkkkkkkkkkkkkbbbbb');
    onAddClick(values).then(()=>
      console.log('kkkkkkkkkkkkk'),
      onPageChange({ discussionGroupId, sortBy:sortValue, activePage: 1,customerStatus:filterValue,searchTerms:searchIteam})
    ); */
  }

  sortByValue = (sortValues) => {
    const { onPageChange, discussionGroupId } = this.props;
    const { filterValue, searchIteam } = this.state;

    onPageChange({ discussionGroupId, sortBy: sortValues.sortBy, activePage: 1, customerStatus: filterValue, searchTerms: searchIteam })

    this.setState({
      sortValue: sortValues.sortBy,
      //filterValue:sortValues.filterBy
    })

  }


  sortByFilter = (filterValue) => {

    const { onPageChange, discussionGroupId } = this.props;
    const { sortValue, searchIteam } = this.state;

    onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1, customerStatus: filterValue.filterBy, searchTerms: searchIteam })

    this.setState({
      filterValue: filterValue.filterBy
    })
  }

  openPopup = (PopupValue) => {

    this.setState({
      popupVal: true,
      popUpListData: PopupValue,
      customerUUID: PopupValue.data.customerUUID,
      customerEmail: PopupValue.data.emailaddress
    })
  }

  closePopup = () => {
    this.setState({
      popupVal: false,
      popUpListData: ''
    })
  }

  onInviteClick = () => {
    const { fetchInvitePopupContent, discussionGroupId } = this.props;
    let showMaxLicensUpsell = true;
    if (showMaxLicensUpsell) {
      this.setState({
        showInvitePopUP: true,
        showTextOnPopUp: {
          mainText:
            'You have reached the maximum number of member licenses for your account. ',
          confirmButtonText: 'BUY',
          cacelButtonText: 'CLOSE',
          // maxLicensesUpsellConfirmationText:''
        },
      });
    } else {
      fetchInvitePopupContent(discussionGroupId);
      this.setState({ isInviteOn: true });
    }
  };

  /*  componentDidUpdate() {
     console.log('componentdidupdate');
     const { sortValue, searchIteam, filterValue } = this.state;
     const {
       discussionGroupId
     } = this.props;
     onPageChange({ discussionGroupId, sortBy: sortValue, activePage: 1, customerStatus: filterValue, searchTerms: searchIteam })
   } */

  toggleGroup = () => {
    this.setState(() => ({
      showModal: false,
      showInvitePopUP: false,
    }));
  }

  archiveModal = (data) => {

    this.setState(() => ({
      showModal: true,
      showTextOnPopUp: {
        mainText: 'Are you want to archive',
        confirmButtonText: 'YES',
        cacelButtonText: 'NO',
      },
      callApiArchiveOrActivate: 'archive',
      currentRowData: data
    }));
    /* if(value==='Leave Club'){

      this.setState(() => ({
        showModal: true
      }));
    }else{
      this.toggleGroup(true)
    } */
  }

  activateModal = (data) => {
    this.setState(() => ({
      showModal: true,
      showTextOnPopUp: {
        mainText: 'Are you want to View Invitation',
        confirmButtonText: 'YES',
        cacelButtonText: 'NO',
      },
      callApiArchiveOrActivate: 'activate',
      currentRowData: data
    }));
  }


  /* componentDidMount(){
    console.log('here i am click');
    const {customerLinkInvitation}=this.props;
    {customerLinkInvitation &&(
      alert(customerLinkInvitation.statusMessage)
    )
    }
  }
  componentDidUpdate(){
    console.log('here i am updated');
  } */


  render() {
    const { list, context: { isDesktop }, leadersList, theme, invitePopupContent, isInvitePopupFetching, discussionGroupId, canEditGroup, t, groupInformation: { customerLinksData }, onAddClick, customerLinkInvitation, customerLinksMemMessage } = this.props;
    const { sortValue, popupVal, popUpListData, customerUUID, isInviteOn, setReset, searchIteam, showModal, showTextOnPopUp, callApiArchiveOrActivate, filterValue,showInvitePopUP } = this.state;

    let listOfIteam = list ? list.length : null;



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
      filterDesign: {
        display: 'inline-flex',
        paddingTop: '25px',
        flexWrap: 'wrap',
        gap: '8rem',
        paddingLeft: '15px'
      },
      commentsBar: {

        //textTransform: 'uppercase',
        color: '#415671',
        backgroundColor: ' #ffffff',
        fontWeight: '500',
        padding: '15px',
        boxShadow: '0px 0px 5px 0px rgb(88 88 88 / 50%)',
        display: 'flex',
        margin: '5px'
      },
      commentSearch: {
        marginRight: '15px',
        backgroundColor: '#f2f2f2',
        borderRadius: '4px',
        border: '0',
        boxShadow: 'inset 0 0 7px 0 #ced2d8',
        fontFamily: 'adobe-garamond-pro, serif',
        fontSize: '16px',
        padding: '10px',
        width: '100%'
      },
      radioButtonDesign: {
        transform: 'scale(1.4)'
      }



    }


    const showSearchTermResultHeading = false;
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

        {canEditGroup && (
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
                {customerLinksData && customerLinksData.sectionHeading_LicenseInfo && (
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
              <Button onClick={() => this.onInviteClick()}>
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
        )}



        {canEditGroup ? (listOfIteam || filterValue !== 'ALL') ?
          <Row style={style.commentsBar}>
            <Col md={3} >
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
                <Button onClick={() => this.resetSearch()}>

                  {t('AskAnAstronomer.Reset')}
                </Button>
              ) : (
                <Button onClick={() => this.searchByValue()}>

                  {t('Clubs.Search')}
                </Button>
              )}
            </Col>

            <div style={style.filterDesign}>
              <div className='h4'>Filter By:</div>
              <div>
                <input style={style.radioButtonDesign} name='memberFilter' type='radio' checked={filterValue == 'ALL'} onClick={() => this.sortByFilter({ filterBy: 'ALL' })}></input><span className='p-3 h4'>All</span>
              </div>
              <div>
                <input style={style.radioButtonDesign} name='memberFilter' checked={filterValue == 'Accepted'} type='radio' onClick={() => this.sortByFilter({ filterBy: 'Accepted' })}></input> <span className='p-3 h4'>Active</span>
              </div>
              <div>
                <input style={style.radioButtonDesign} name='memberFilter' checked={filterValue == 'Sent'} type='radio' onClick={() => this.sortByFilter({ filterBy: 'Sent' })}></input> <span className='p-3 h4'>Invited</span>
              </div>
              <div>
                <input style={style.radioButtonDesign} name='memberFilter' checked={filterValue == 'Archived'} type='radio' onClick={() => this.sortByFilter({ filterBy: 'Archived' })}></input> <span className='p-3 h4'>Archived</span>
              </div>
            </div>
          </Row>
          : null : null}

        {listOfIteam ?

          <Table striped bordered hover>
            <thead>
              <tr style={style.tableRowPadding}>
                {canEditGroup && (
                  <th>
                  </th>
                )}

                <th style={{ width: !canEditGroup ? '50%' : '' }} onClick={() => {
                  this.sortByValue({ sortBy: sortValue == 'ztoa' ? SORT_AZ : SORT_ZA })
                }}>NAME
                  {sortValue == 'ztoa' || sortValue == 'atoz' ? sortValue == 'ztoa' ? <img src={sortDownp} /> : <img src={sortUp} /> : <img src={sortIcon} />}

                </th>
                {canEditGroup && (
                  <th onClick={() => {
                    this.sortByValue({ sortBy: sortValue == 'rankDESC' ? RANK_ASC : RANK_DESC })
                  }}>Status

                  </th>
                )}

                <th onClick={() => {
                  this.sortByValue({ sortBy: sortValue == 'rankDESC' ? RANK_ASC : RANK_DESC })
                }}>GP
                  {sortValue == 'rankASC' || sortValue == 'rankDESC' ? sortValue == 'rankDESC' ? <img src={sortDownp} /> : <img src={sortUp} /> : <img src={sortIcon} />}
                </th>

                {canEditGroup && (
                  <th onClick={() => {
                    this.sortByValue({ sortBy: sortValue == 'rankDESC' ? RANK_ASC : RANK_DESC })
                  }}>Last Action

                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {list && list.map((listData) => {
                return (
                  <tr>
                    {canEditGroup && (
                      <td style={style.tableRowPadding}>

                        {listData.showAddButton ? <Button style={{ margin: '5px' }} onClick={() => this.refreshPage(listData)}>{listData.invitationPrompt}</Button> : null}

                        {listData.showArchiveButton ? <Button onClick={() => this.archiveModal(listData)}>{listData.archiveButtonText} </Button> : <Button onClick={() => this.activateModal(listData)}>View Invitation </Button>}

                      </td>
                    )}

                    <td onClick={() => {
                      this.openPopup({ data: listData })
                    }} style={style.tableRowPadding}>{listData.displayName}</td>

                    {canEditGroup && (
                      <td style={style.tableRowPadding}>{listData.InvitationStatus}</td>
                    )}

                    <td style={style.tableRowPadding}>{listData.InvitationStatus == 'Sent' || listData.InvitationStatus == 'Viewed' ? '-' : listData.gravity}</td>

                    {canEditGroup && (
                      <td style={style.tableRowPadding}>{listData.lastactivity}</td>
                    )}

                  </tr>
                )
              })}
            </tbody>
          </Table>
          : customerLinksMemMessage ? <h3 style={{ textAlign: 'center' }}>
            {customerLinksMemMessage}
          </h3> : null
        }



        {isInviteOn && (
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
              }}
              resetSearch={() => this.resetSearch()}
              discussionGroupId={discussionGroupId}
            />
          </Modal>
        )}



        {popupVal && (
          <Popup
            ariaHideApp={false}
            isOpen={popupVal}
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
          <ConfirmationPopUp confirmArchive={() => callApiArchiveOrActivate == 'archive' ? this.confirmArchive() : this.confirmActivate()} content={showTextOnPopUp} showModal={showModal} closeModal={this.toggleGroup} ></ConfirmationPopUp>
        )}
        {showInvitePopUP && (
          <ConfirmationPopUp
            confirmArchive={() => this.testBuy()}
            content={showTextOnPopUp}
            showModal={showInvitePopUP}
            closeModal={this.toggleGroup}
          ></ConfirmationPopUp>
        )}
      </>

    );
  }
}
export default Members;







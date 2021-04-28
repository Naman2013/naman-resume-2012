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


import { PublicProfileCard } from 'app/modules/new-dashboard/components/public-card';
import { customModalStylesPublicProfileCardBlueOverlay } from 'app/styles/mixins/utilities';
import MemberListCard from 'app/components/community-groups/overview/members-list-card';
import styles from 'app/components/community-groups/overview/members-list.style';




class Members extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sortValue: 'rankDESC',
      popupVal: false,
      popUpListData: '',
      customerUUID: ''
    }
  }





  sortByValue = (sortValue) => {

    const { onPageChange, discussionGroupId } = this.props;

    onPageChange({ discussionGroupId, sortBy: sortValue.sortBy, activePage: 1 })

    this.setState({
      sortValue: sortValue.sortBy
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


  render() {
    const { list, context: { isDesktop }, leadersList, theme } = this.props;

   

    const { sortValue, popupVal, popUpListData, customerUUID } = this.state;
    let sortIcon = 'https://vega.slooh.com/assets/v4/dashboard-new/clubs/sort.png';
    let sortUp = 'https://vega.slooh.com/assets/v4/dashboard-new/clubs/sort-up--v2.png';
    let sortDownp = 'https://vega.slooh.com/assets/v4/dashboard-new/clubs/sort-down--v2.png';

    const style = {
      tableRowPadding: {
        padding: 15,
        width: '50%',
        textAlign: 'center',
        fontSize:14
      },
    }
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
              }}>GP
              {sortValue == 'rankASC' || sortValue == 'rankDESC' ? sortValue == 'rankDESC' ? <img src={sortDownp} /> : <img src={sortUp} /> : <img src={sortIcon} />}
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
                  <td style={style.tableRowPadding}>{listData.gravity}</td>
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






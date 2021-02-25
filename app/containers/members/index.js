import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import {
  SORT_AZ,
  SORT_ZA,
  SORT_DATE,
  RANK_ASC,
  RANK_DESC
} from 'app/modules/community-group-overview/actions';
import Popup from './pop-up'

class Members extends Component {

  state = {
    sortValue: 'rankASC',
    popupVal: false,
    popUpListData: '',
    sort: {
      order: '',
      orderColumn: ''
    }
  }

  sortByValue = (sortValue) => {

    const { onPageChange, discussionGroupId } = this.props;
    onPageChange({ discussionGroupId, sortBy: sortValue.sortBy })

    this.setState({
      sortValue: sortValue.sortBy
    })

  }

  openPopup = (PopupValue) => {

    this.setState({
      popupVal: true,
      popUpListData: PopupValue

    })
  }

  closePopup = () => {
    this.setState({
      popupVal: false,
      popUpListData: ''
    })
  }



  render() {
    const { list } = this.props;
    const { sortValue, popupVal, popUpListData } = this.state;
    let sortIcon = 'https://img.icons8.com/fluent-systems-filled/15/000000/sort.png';
    let sortUp = 'https://img.icons8.com/material/15/000000/sort-up--v2.png';
    let sortDownp = 'https://img.icons8.com/material/15/000000/sort-down--v2.png';

    const style = {
      tableRowPadding: {
        padding: 15,
        width: '50%',
        textAlign: 'center'
      },
    }
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr style={style.tableRowPadding}>
              <th onClick={() => {
                this.sortByValue({ sortBy: sortValue == 'ztoa' ? SORT_AZ : SORT_ZA })
              }}>NAME
              {sortValue == 'ztoa' || sortValue == 'atoz' ? sortValue == 'ztoa' ? <img src={sortDownp} /> : <img src={sortUp} /> : <img src={sortIcon} />}

              </th>
              <th onClick={() => {
                this.sortByValue({ sortBy: sortValue == 'rankASC' ? RANK_DESC : RANK_ASC })
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
        {popupVal == true &&
          <>
            <Popup
              popupValue={popupVal}
              close={this.closePopup}
              popUpListData={popUpListData}

            />
          </>
        }
      </>

    );
  }
}
export default Members;

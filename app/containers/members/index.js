import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import {
  SORT_AZ,
  SORT_ZA,
  SORT_RANK,
  SORT_DATE,
} from 'app/modules/community-group-overview/actions';
//import Popup from './pop-up'

class Members extends Component {

  state = {
    sortValue: SORT_RANK,
    r:false
    

  }

  sortByValue = (sortValue) => {
    console.log('sortValue', sortValue);
    const { onPageChange, discussionGroupId } = this.props;
    onPageChange({ discussionGroupId, sortBy: sortValue.sortBy })

    this.setState({
      sortValue: sortValue.sortBy
    })

  }

  

  /* 
  Example = (value) =>{
    console.log(value);
    const r = true;
    this.setState({
      r: true
    })
  }
  
  PopupClose = () =>{
    this.setState({
      r: false
    })
  }
 */
  

  render() {
    const { list } = this.props;
    const { sortValue , r } = this.state;
    console.log('stateValue', sortValue);
    const style = {
      tableRowPadding: {
        padding: 15,
        width: '50%',
        textAlign: 'center'
      }
    }

    return (
      <>
      <Table striped bordered hover>
        <thead>
          <tr style={style.tableRowPadding}>
            <th onClick={() => {
              this.sortByValue({ sortBy: sortValue == 'ztoa' ? SORT_AZ : SORT_ZA })
            }}>NAME
            <img src="https://img.icons8.com/fluent-systems-filled/15/000000/sort.png" />
            </th>
            <th onClick={() => {
              this.sortByValue({ sortBy: SORT_RANK })
            }}>GP
            <img src="https://img.icons8.com/fluent-systems-filled/15/000000/sort.png" />
            </th>
          </tr>
        </thead>
        <tbody>
          {list && list.map((listData) => {
            return (
              <tr /* onClick={() => {
                this.Example({ data: listData })
              }} */ >
                <td style={style.tableRowPadding}>{listData.displayName}</td>
                <td style={style.tableRowPadding}>{listData.gravity}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
     {/*  {r == true&& 
        <Popup
        close={this.PopupClose}
        />
      } */}
      </>

    );
  }
}
export default Members;

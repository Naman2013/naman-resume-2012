import React, { Component } from 'react';
import ListingsItem from './listings-item';
const dummyListingsData = [{},{},{},{},{},{}];

export default class Listings extends Component {
  constructor(props) {
    super(props);
  }

  getListItem(itemData, index) {
    console.log(index, itemData)
    return (
      <ListingsItem key={index}/>
    );
  }

  render() {
    return (
      <div className="telescope-listings">
        <ul>
          {
            dummyListingsData.map(this.getListItem)
          }
        </ul>
      </div>
    );
  }
}

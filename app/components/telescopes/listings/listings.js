import React, { Component } from 'react';
import ListingsItem from './listings-item';

import exampleData from './example-data';

// listings building stiles
import styles from './listings.scss';

export default class Listings extends Component {
  constructor(props) {
    super(props);
  }

  getListItem(itemData, index) {
    return (
      <ListingsItem key={index} {...itemData}/>
    );
  }

  render() {
    return (
      <div className="telescope-listings">
        <ul className="list">
          {
            exampleData.map(this.getListItem)
          }
        </ul>
      </div>
    );
  }
}

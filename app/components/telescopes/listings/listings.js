import React, { Component } from 'react';
import ListingsItem from './listings-item';
const dummyListingsData = [
  { 
    // booked
    available: false,
    active: true,
    ready: true
  },
  {
    // book me!
    available: true,
    active: true,
    ready: true
  },
  {
    // book me!
    available: true,
    active: true,
    ready: true
  },
  { 
    // booked
    available: false,
    active: true,
    ready: true
  },
  {
    // book me!
    available: true,
    active: true,
    ready: true
  },
  {
    // booked. no object selected
    available: true,
    active: true,
    ready: true
  }
];

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
            dummyListingsData.map(this.getListItem)
          }
        </ul>
      </div>
    );
  }
}

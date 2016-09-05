import React, { Component } from 'react';

export default class MenuSearch extends Component {
  render() {
    return (
      <div className="menu-search">
        <input type="text" className="menu-searchinput" placeholder="Search Objects" />
        <img className="menu-searchimage" src="../assets/images/nav/search-icon.png" alt="Search" />
      </div>
    );
  }
}

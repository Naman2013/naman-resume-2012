import React, { Component, PropTypes } from 'react';
import Navigation from '../components/my-pictures/navigation';
import style from './my-pictures.scss';

class MyPictures extends Component {
  render() {
    return(
      <div className="my-pictures-container">
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

export default MyPictures;

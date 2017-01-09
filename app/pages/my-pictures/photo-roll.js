import React, { Component, PropTypes } from 'react';
import styles from "./my-pictures-gallery.scss";

class PhotoRoll extends Component {
  
  handleNext = (page) => {
    
  };
  
  handlePrevious = (page) => {
    
  };
  
  render() {
    const { pictures: { pictures, count } } = this.props;
    return (
      <div>
        <div className={styles.MyPicturesGallery}>
          {pictures.map(v => <div key={v.id} className="image"><img src={v.url}/>{v.id}</div>)}
        </div>
        <div className={styles.MyPicturesControl}>
          <div className="left"><span className="fa fa-chevron-left"></span>Previous</div>
          <div className="count">1-{pictures.length} of {count}</div>
          <div className="right">Next<span className="fa fa-chevron-right"></span></div>
        </div>
      </div>
    );
  }
}

export default PhotoRoll;

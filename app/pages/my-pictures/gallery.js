import React, { Component, PropTypes } from 'react';
import { Item, ItemMission } from './item';
import styles from './my-pictures-gallery.scss';

class Gallery extends Component {

  handleNext = (page) => {

  };

  handlePrevious = (page) => {

  };

  itemRender(route, missionId, images) {
    switch (route) {
      case 'photoRoll' :
        return Object.keys(images).map(v => <Item key={images[v].imageId} image={images[v]} />);
      case 'missions' :
        if (missionId) {
          return Object.keys(images).map(v => <Item key={images[v].imageId} image={images[v]} />);
        }
        return Object.keys(images).map(v => <ItemMission key={images[v].imageId} image={images[v]} />);
      default:
        return null;
    }
  }

  render() {
    const { images, count, route, missionId } = this.props;
    return (
      <div>
        <div className={styles.MyPicturesGallery}>
          {this.itemRender(route, missionId, images)}
        </div>
        <div className={styles.MyPicturesControl}>
          <div className="left"><span className="fa fa-chevron-left" /> Previous</div>
          <div className="count">1-{count} of {count}</div>
          <div className="right"> Next <span className="fa fa-chevron-right" /></div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.array,
  route: PropTypes.string,
  missionId: PropTypes.string,
  count: PropTypes.number,
};


export default Gallery;

import React, { Component, PropTypes } from 'react';
import SloohExtrasTile from './slooh-extras-tile';

import style from './featured.scss';

const RIGHT_COLUMN = [
  {
    imageUrl: '../../assets/images/sponsors/popular_science.png',
    width: '120',
    height: '45'
  },
  {
    imageUrl: '../../assets/images/sponsors/wash_post_white.png',
    width: '160',
    height: '23'
  },
  {
    imageUrl: '../../assets/images/sponsors/NASA_TV.png',
    width: '112',
    height: '67'
  },
  {
    imageUrl: '../../assets/images/sponsors/spaceimages-com.png',
    width: '125',
    height: '37'
  }
];

const LEFT_COLUMN = [
  {
    imageUrl: '../../assets/images/sponsors/the_new_york_times_logo_white1.png',
    width: '170',
    height: '25'
  },
  {
    imageUrl: '../../assets/images/sponsors/ABC_News_Logo.png',
    width: '134',
    height: '45'
  },
  {
    imageUrl: '../../assets/images/sponsors/wired.png',
    width: '131',
    height: '25'
  },
  {
    imageUrl: '../../assets/images/sponsors/National_Geographic_Society.png',
    width: '131',
    height: '39'
  }
];

class Featured extends Component {

  generateImages(list) {
    return list.map(image =>
        <div className="featured-in-logo">
          <img
            src={image.imageUrl}
            width={image.width}
            height={image.height} />
        </div>);
  }

  render() {
    return(
      <SloohExtrasTile title={this.props.title}>
        <div className="clearfix featured-in-logos">
          <div className={style.leftColumn}>
            {this.generateImages(LEFT_COLUMN)}
          </div>
          <div className={style.rightColumn}>
            {this.generateImages(RIGHT_COLUMN)}
          </div>
        </div>
      </SloohExtrasTile>
    );
  }
}

Featured.propTypes = {
  title: PropTypes.string.isRequired
};

export default Featured;

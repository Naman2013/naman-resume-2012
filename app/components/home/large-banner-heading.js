import React, { Component, PropTypes } from 'react';
import style from './large-banner-heading.scss';

class LargeBannerHeading extends Component {
  render() {
    return(
      <div>
        <h3 className={style.largeBannerHeading}>{this.props.content}</h3>
      </div>
    );
  }
}

LargeBannerHeading.propTypes = {
  content: PropTypes.string.isRequired
};

export default LargeBannerHeading;

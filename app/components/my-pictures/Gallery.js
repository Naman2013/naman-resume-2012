import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { backgroundImageCover } from '../../styles/mixins/utilities';
import { white, pink } from '../../styles/variables/colors';

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({
//   }, dispatch),
// });
//
// @connect(null, mapDispatchToProps)
class Gallery extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    created: PropTypes.string,
  }

  static defaultProps = {
    created: 0
  }

  render() {
    const {
      created,
      imageURL,
      imageTitle,
    } = this.props;
    const createdDate = moment(Number(created) * 1000);
    return (
      <div className="relative">

        <a href={`my-pictures/missions/`} className="gallery-container" style={{ backgroundImage: `url(${imageURL})` }}>
          <div className="innerContainer content">
            <div>{imageTitle}</div>
            <div>Created on {createdDate.format('dddd, MMMM Do YYYY')}</div>
          </div>
          <style jsx>
            {`
              .relative {
                position: relative;
              }
              .gallery-container {
                ${backgroundImageCover}
                background-position: center;
                margin-bottom: 20px;
                display: block;
                border: 4px solid transparent;
              }

              .gallery-container:before {
                display: block;
                content: "";
                width: 100%;
                padding-top: 68.49%;
              }
              .content {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
              }

              .gallery-container:hover {
                border: 4px solid ${pink};
              }

              .gallery-container:hover .innerContainer {
                opacity: 1;
              }

              .innerContainer {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                color: ${white};
                padding: 20px;
                opacity: 0;
              }
            `}
          </style>
        </a>
      </div>
    );
  }
}

export default Gallery;

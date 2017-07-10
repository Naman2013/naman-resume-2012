import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

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
  }

  render() {
    const {
      imageURL,
      imageTitle,
    } = this.props;

    return (
      <Link
        className="gallery-container"
        to={`my-pictures/missions/`}
        style={{ backgroundImage: `url(${imageURL})` }}
      >
        <div className="content">
          <div className="row">{imageTitle}</div>
          <div className="row"></div>
        </div>
        <style jsx>
        {`
          .gallery-container {
            height: 100%;
            width: 100%;
            background: #000;
            margin-bottom: 30px;
            border: 4px solid transparent;
            color: $white;
            cursor: pointer;
            opacity: 0.75;
            display: block;

            .content {
              padding: 20px;
            }
            .row {
              height: 33%;
              margin: 0;

              &:first-child {
                text-align: left;
                font-size: 15px;
                font-weight: 100;
                b{
                  font-size: 20px;
                }
              }
            }
          `}
        </style>
      </Link>
    );
  }
}

export default Gallery;

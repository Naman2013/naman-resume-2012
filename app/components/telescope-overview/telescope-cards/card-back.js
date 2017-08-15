import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './card-back.scss';
import GenericLoadingBox from '../../common/loading-screens/generic-loading-box';


const _ = require('lodash');
const Markdown = require('react-remarkable');

function generateSpecItem(spec) {
  console.log('spec: ', spec);
  // return (
  //   <Markdown source={spec} />
  // );
  return '<Markdown source={spec} />';
}

function generateSpecList(specList) {
  // specList.map((spec) => {
  //   console.log('spec: ', spec);
  //   return spec;
  // });
  return specList.map(generateSpecItem).join('');
}


class CardBack extends Component {

  render() {
    const { teleId, activeTelescopeMissions, telescopeCardBack } = this.props;
    console.log('this CardBack: ', telescopeCardBack);

    // this conditional is obviously not correct...
    if (!telescopeCardBack.teleId) {
      console.log('loading...');
      return (
        <GenericLoadingBox />
      )
    }

    return (
      <div className="telescope-card-back">
        <div className="card-header">

          <button
            onClick={this.props.handleFlip}
            className="flip-card-action">
            <img className="icon" src="https://vega.slooh.com/assets/icons/flip-back-arrow.png" />
          </button>

          <img src="https://vega.slooh.com/assets/icons/observatory.svg" width="50" height="50" />
          <h3 className="title"> <Markdown source={telescopeCardBack.headerArray.pierName} /> </h3>
        </div>

        <div className="telescope-specs">
          <figure className="telescope-image">

            <a href={telescopeCardBack.telescopeArray.telescopeList[0].imageURL}>
              <img
                src={telescopeCardBack.telescopeArray.telescopeList[0].imageThumbnailURL}
                alt="Telescope Preview"
                width="259"
                height="180"
              />
            </a>
            <figcaption className="caption">
              <Markdown source={telescopeCardBack.telescopeArray.telescopeList[0].imageCaption1} />
            </figcaption>
            <figcaption className="caption">
              <Markdown source={telescopeCardBack.telescopeArray.telescopeList[0].imageCaption2} />
            </figcaption>
          </figure>

          <div className="content" key={_.uniqueId('content_')}>
            <h3 className="title">
              <Markdown source={telescopeCardBack.telescopeArray.telescopeList[0].specTitle} />
            </h3>

            {telescopeCardBack.telescopeArray.telescopeList[0].specArray.map(
              (spec) => {
                return (
                  <div key={_.uniqueId('spec_')}>
                    <Markdown source={spec} />
                  </div>
                );
              }
            )}

            <h3 className="title">
              <Markdown source={telescopeCardBack.locationArray.locationTitle} />
            </h3>

            {telescopeCardBack.locationArray.locationDataArray.map(
              (loc) => {
                return <Markdown source={loc} />
              }
            )}

          </div>
        </div>
      </div>
    );
  }
}


CardBack.defaultProps = {
  teleName: '',
  teleId: '',
  telescopeCardBack: {},
};

CardBack.propTypes = {
  teleName: PropTypes.string,
  teleId: PropTypes.string,
  handleFlip: PropTypes.func,
  telescopeCardBack: PropTypes.object,
};

export default CardBack;
